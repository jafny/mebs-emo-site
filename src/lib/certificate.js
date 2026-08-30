const W = 900
const H = 620

/* Only letters, marks, spaces and the punctuation that shows up in real names.
   Everything else is dropped before it ever reaches the markup. */
export function cleanName(raw) {
  return raw
    .replace(/[^\p{L}\p{M}\s'’.-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 32)
}

const escapeXml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c])

/* One laurel arc, mirrored by the caller. The sweep starts well below the
   crown of the circle so the leaves frame the sides rather than crashing
   through the title. */
function laurel(side) {
  const leaves = []
  for (let i = 0; i < 9; i += 1) {
    const a = 52 + i * 12
    const r = (a * Math.PI) / 180
    const x = 450 + Math.sin(r) * 300 * side
    const y = 330 - Math.cos(r) * 210
    leaves.push(
      `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="5" ry="13" transform="rotate(${(a * side).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="#c8102e" opacity="0.35"/>`
    )
  }
  return leaves.join('')
}

/* A single self-contained SVG string, used both for the on-page render and for
   the download. Every style is an attribute rather than a stylesheet rule,
   because a serialized SVG rasterized through an <img> carries no CSS with it.

   The font stack leads with Cinzel and falls back to Georgia. In the document
   Cinzel is loaded and the certificate looks like the rest of the site; in the
   rasterized PNG, where webfonts are not available, it lands on Georgia rather
   than on whatever the platform calls "serif". */
export function buildCertificateSvg(rawName) {
  const name = escapeXml(cleanName(rawName) || 'A Nameless Witness')
  const display = "Cinzel, Georgia, 'Times New Roman', serif"
  const mono = "'JetBrains Mono', Consolas, monospace"
  const year = new Date().getFullYear()
  /* Long names step down a size rather than overflowing the frame. */
  const nameSize = name.length > 22 ? 46 : name.length > 15 ? 58 : 70

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Certificate of Nevermore for ${name}">
  <rect width="${W}" height="${H}" fill="#07070a"/>
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="#c8102e" stroke-width="2" opacity="0.8"/>
  <rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#e8e3d9" stroke-width="1" opacity="0.28"/>
  ${laurel(1)}${laurel(-1)}
  <text x="450" y="112" text-anchor="middle" font-family="${mono}" font-size="15" letter-spacing="7" fill="#4b5f96">NEVERMORE ORDINARY</text>
  <text x="450" y="176" text-anchor="middle" font-family="${display}" font-size="44" font-weight="900" letter-spacing="3" fill="#e8e3d9">Certificate of Nevermore</text>
  <path d="M300 200h300" stroke="#c8102e" stroke-width="1" opacity="0.6"/>
  <text x="450" y="256" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-style="italic" fill="#9c968b">Be it known that</text>
  <text x="450" y="${256 + nameSize + 22}" text-anchor="middle" font-family="${display}" font-size="${nameSize}" font-weight="900" fill="#c8102e">${name}</text>
  <text x="450" y="400" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-style="italic" fill="#9c968b">has beheld the record of Mebs</text>
  <text x="450" y="432" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-style="italic" fill="#9c968b">and stands duly humbled.</text>
  <g transform="translate(450 512)">
    <circle r="44" fill="#8d0c21"/>
    <circle r="44" fill="none" stroke="#c8102e" stroke-width="3"/>
    <circle r="34" fill="none" stroke="#07070a" stroke-width="1" opacity="0.45"/>
    <path d="M0 -26 L24 18 L-24 18 Z" fill="none" stroke="#07070a" stroke-width="2" opacity="0.6"/>
    <circle cy="2" r="8" fill="#07070a" opacity="0.55"/>
  </g>
  <text x="450" y="586" text-anchor="middle" font-family="${mono}" font-size="12" letter-spacing="5" fill="#9c968b">JOHNS HOPKINS UNIVERSITY &#183; SUMMA CUM LAUDE &#183; ${year}</text>
</svg>`
}

/* Rasterizes the SVG through an <img> and a canvas. A blob: URL is same-origin,
   so the canvas is never tainted and toBlob works. */
export function svgToPngBlob(svg, scale = 2) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = W * scale
      canvas.height = H * scale
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('toBlob failed'))), 'image/png')
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('SVG failed to rasterize'))
    }
    img.src = url
  })
}

export function download(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  /* Revoking immediately can cancel the download in some browsers. */
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

export const CERT_SIZE = { W, H }

import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import {
  buildCertificateSvg,
  cleanName,
  download,
  svgToPngBlob,
} from '../lib/certificate.js'

const slug = (name) =>
  (cleanName(name) || 'witness').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function Certificate() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const svg = useMemo(() => buildCertificateSvg(name), [name])

  const savePng = async () => {
    setBusy(true)
    setError('')
    try {
      const blob = await svgToPngBlob(svg)
      download(blob, `nevermore-${slug(name)}.png`)
    } catch {
      setError('This browser would not render the image. The SVG below still works.')
    } finally {
      setBusy(false)
    }
  }

  const saveSvg = () => {
    download(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }), `nevermore-${slug(name)}.svg`)
  }

  return (
    <section className="section certificate" id="certificate">
      <Reveal>
        <p className="section__eyebrow">Proof of witness</p>
        <h2 className="section__title">Certificate of Nevermore</h2>
        <p className="section__sub">
          You have seen the record. Put your name to it and take something home.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="certificate__controls">
          <label className="certificate__label" htmlFor="cert-name">
            Your name
          </label>
          <input
            id="cert-name"
            className="certificate__input oracle__input"
            type="text"
            maxLength={32}
            autoComplete="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn--primary" type="button" onClick={savePng} disabled={busy}>
            {busy ? 'Sealing…' : 'Save as PNG'}
          </button>
          <button className="btn" type="button" onClick={saveSvg}>
            Save as SVG
          </button>
        </div>
        {error && (
          <p className="certificate__error" role="alert">
            {error}
          </p>
        )}
      </Reveal>

      <Reveal delay={180}>
        {/* The markup is built by buildCertificateSvg from a name that has
            already been stripped to letters and escaped — there is no path
            from the field to raw markup. */}
        <div
          className="certificate__frame"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </Reveal>
    </section>
  )
}

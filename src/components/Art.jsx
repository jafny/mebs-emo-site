/* Hand-drawn inline SVG art — no external assets, so the site works offline
   and on GitHub Pages without any hosting quirks. */

export function Raven({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 240 200" aria-hidden="true">
      <g fill="currentColor">
        {/* body, sweeping from wedge tail up to the head */}
        <path d="M188 80c14 0 25 10 25 24 0 5-1 9-4 13-9 14-24 24-44 31-22 8-43 20-62 36l-30 26 15-35c12-27 31-45 56-54 7-3 11-8 13-15 4-15 16-26 31-26z" />
        {/* heavy corvid beak */}
        <path d="M210 92l34 8c2 1 2 3 0 4l-34 10c3-7 3-15 0-22z" />
        {/* near wing */}
        <path d="M162 110c-4-30-22-56-52-78 36 6 62 27 76 62z" />
        {/* far wing */}
        <path d="M126 136c-14-24-38-40-70-48 34-6 64 4 88 30z" opacity=".72" />
      </g>
      <circle cx="193" cy="93" r="3.6" fill="#c8102e" />
    </svg>
  )
}

export function Skull({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 116" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round">
        <path d="M50 6C27 6 12 22 12 45c0 13 4 21 11 27 4 4 5 7 5 12v6h44v-6c0-5 1-8 5-12 7-6 11-14 11-27C88 22 73 6 50 6z" />
        <path d="M28 90h44M34 90v10M50 90v12M66 90v10" />
        <path d="M50 56l-7 14h14l-7-14z" />
        <path d="M36 78c4 3 10 3 14 0M50 78c4 3 10 3 14 0" />
      </g>
      <ellipse cx="34" cy="45" rx="11" ry="13" fill="currentColor" />
      <ellipse cx="66" cy="45" rx="11" ry="13" fill="currentColor" />
    </svg>
  )
}

export function Feather({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 120" aria-hidden="true">
      <path
        d="M20 4c9 18 13 36 12 54-1 18-6 36-12 58-6-22-11-40-12-58C7 40 11 22 20 4z"
        fill="currentColor"
        opacity=".85"
      />
      <path d="M20 8v106" stroke="#07070a" strokeWidth="1.4" opacity=".55" />
    </svg>
  )
}

export function Sigil({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="60" cy="60" r="52" />
        <circle cx="60" cy="60" r="40" opacity=".6" />
        <path d="M60 8v104M8 60h104M24 24l72 72M96 24L24 96" opacity=".35" />
        <path d="M60 20l35 60H25l35-60z" opacity=".8" />
      </g>
    </svg>
  )
}

export function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <svg viewBox="0 0 60 24">
        <path
          d="M30 3l6 9-6 9-6-9 6-9z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M0 12h18M42 12h18" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span />
    </div>
  )
}

/* A single eye, opening. The cold open animates its ry from 0 to full. */
export function RavenEye({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 120" aria-hidden="true">
      <path
        className="eye__lid"
        d="M8 60C40 18 76 2 100 2s60 16 92 58c-32 42-68 58-92 58S40 102 8 60z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity=".55"
      />
      <g className="eye__ball">
        <ellipse cx="100" cy="60" rx="34" ry="34" fill="#c8102e" opacity=".9" />
        <ellipse cx="100" cy="60" rx="13" ry="13" fill="#07070a" />
        <ellipse cx="90" cy="49" rx="5" ry="5" fill="#e8e3d9" opacity=".7" />
      </g>
    </svg>
  )
}

/* Wing-flap variant of the raven: the wings are their own groups so the
   scroll companion can drive them from CSS. */
export function RavenFlying({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 160" aria-hidden="true">
      <g fill="currentColor">
        <path d="M96 74c-8 14-10 30-6 48l-16-14c-8-7-12-17-12-28 0-6 2-12 6-18l28 12z" opacity=".9" />
        <path className="wing wing--far" d="M92 70C74 48 48 36 14 34c30-16 62-12 88 14z" opacity=".6" />
        <path className="wing wing--near" d="M96 66C86 40 92 16 116 0c6 26 2 50-12 70z" />
        <path d="M104 60c12-6 24-6 36 2 8 5 12 12 12 21 0 10-6 18-16 22-14 6-28 4-40-6 4-14 7-27 8-39z" />
        <path d="M150 78l32 6c2 1 2 3 0 4l-32 8c3-6 3-12 0-18z" />
      </g>
      <circle cx="140" cy="76" r="3.2" fill="#c8102e" />
    </svg>
  )
}

/* Laurel-ish wreath for the certificate border. */
export function Wreath({ className = '', style }) {
  const leaf = (i, side) => {
    const a = -70 + i * 14
    const r = a * (Math.PI / 180)
    const x = 100 + Math.sin(r) * 78 * side
    const y = 100 - Math.cos(r) * 78
    return (
      <ellipse
        key={`${side}-${i}`}
        cx={x}
        cy={y}
        rx="4.5"
        ry="11"
        transform={`rotate(${a * side + (side < 0 ? 180 : 0)} ${x} ${y})`}
        fill="currentColor"
        opacity=".65"
      />
    )
  }
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" aria-hidden="true">
      {Array.from({ length: 11 }, (_, i) => leaf(i, 1))}
      {Array.from({ length: 11 }, (_, i) => leaf(i, -1))}
      <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1" opacity=".3" />
    </svg>
  )
}

/* Wax seal, stamped at the foot of the certificate. */
export function Seal({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="46" fill="#8d0c21" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="#c8102e" strokeWidth="3" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="#07070a" strokeWidth="1" opacity=".45" />
      <path d="M60 32l26 44H34l26-44z" fill="none" stroke="#07070a" strokeWidth="2" opacity=".6" />
      <circle cx="60" cy="62" r="9" fill="#07070a" opacity=".55" />
    </svg>
  )
}

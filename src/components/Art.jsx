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

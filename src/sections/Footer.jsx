import { useEffect, useState } from 'react'
import { Raven } from '../components/Art.jsx'
import useRafLoop from '../lib/useRafLoop.js'

const pad = (n) => String(n).padStart(2, '0')

/* How long you have been standing in front of the record. Counts from the
   moment the page loaded, which is the only date here we can honestly claim
   to know. */
function Vigil() {
  const [start] = useState(() => Date.now())
  const [label, setLabel] = useState('00:00:00')

  useRafLoop(() => {
    const s = Math.floor((Date.now() - start) / 1000)
    const next = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`
    setLabel((prev) => (prev === next ? prev : next))
  })

  return (
    <span className="vigil__value">
      <time>{label}</time>
    </span>
  )
}

export default function Footer() {
  /* Rendered client-side only so the two figures never disagree with the page. */
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  return (
    <footer className="footer">
      <Raven className="footer__raven" />
      <p className="footer__gothic">Nevermore</p>

      <dl className="vigil">
        <div className="vigil__row">
          <dt>Days since Baltimore recovered</dt>
          <dd className="vigil__value">0</dd>
        </div>
        <div className="vigil__row">
          <dt>Time spent before the record</dt>
          <dd>{ready ? <Vigil /> : <span className="vigil__value">00:00:00</span>}</dd>
        </div>
      </dl>

      <p className="footer__note">
        Built for Mebs — Johns Hopkins University, summa cum laude.
      </p>
    </footer>
  )
}

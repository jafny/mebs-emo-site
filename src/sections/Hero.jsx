import { useEffect, useRef } from 'react'
import { Raven, Sigil } from '../components/Art.jsx'
import Flock from '../components/Flock.jsx'
import { useHype } from '../lib/HypeContext.jsx'
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js'
import useRafLoop from '../lib/useRafLoop.js'

const PULL = 14 // px the title drifts toward the cursor at the screen's edge

export default function Hero() {
  const { birds } = useHype()
  const reduced = usePrefersReducedMotion()
  const letters = 'MEBS'.split('')
  const innerRef = useRef(null)
  const pointer = useRef({ x: 0, y: 0 })
  const eased = useRef({ x: 0, y: 0 })
  /* Coarse pointers have no hover to follow, and a tap should not fling the
     title across the screen. */
  const magnetic = !reduced && typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  useEffect(() => {
    if (!magnetic) return undefined
    const onMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [magnetic])

  useRafLoop(() => {
    const el = innerRef.current
    if (!el) return
    /* Eased rather than tracked exactly, so the title glides instead of
       snapping to the cursor. */
    eased.current.x += (pointer.current.x - eased.current.x) * 0.06
    eased.current.y += (pointer.current.y - eased.current.y) * 0.06
    el.style.setProperty('--mx', `${(eased.current.x * PULL).toFixed(2)}px`)
    el.style.setProperty('--my', `${(eased.current.y * PULL).toFixed(2)}px`)
  }, magnetic)

  return (
    <header className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <Flock count={birds} />
      <Raven className="hero__raven hero__raven--l" />
      <Raven className="hero__raven hero__raven--r" />
      <Sigil className="hero__sigil" />

      <div className="hero__inner" ref={innerRef}>
        <p className="hero__eyebrow">
          <span>Johns Hopkins University</span>
          <span className="hero__dot" aria-hidden="true">·</span>
          <span>Baltimore, MD</span>
        </p>

        <h1 className="hero__title" aria-label="Mebs">
          {letters.map((ch, i) => (
            <span
              key={i}
              className="hero__letter"
              data-text={ch}
              style={{ animationDelay: `${i * 90}ms` }}
              aria-hidden="true"
            >
              {ch}
            </span>
          ))}
        </h1>

        <p className="hero__gothic">Nevermore Ordinary</p>
        <p className="hero__lede">
          Summa cum laude. DECA champion. Engineer. She walked into one of the hardest
          universities on the planet, took the highest honors it gives out, and
          collected a wall of trophies on the way through.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#record">
            Witness the receipts
          </a>
          <a className="btn" href="#arsenal">
            The arsenal
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>scroll</span>
        <i />
      </div>
    </header>
  )
}

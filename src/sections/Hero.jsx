import { Raven, Sigil } from '../components/Art.jsx'
import Flock from '../components/Flock.jsx'
import { useHype } from '../lib/HypeContext.jsx'

export default function Hero() {
  const { birds } = useHype()
  const letters = 'MEBS'.split('')

  return (
    <header className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <Flock count={birds} />
      <Raven className="hero__raven hero__raven--l" />
      <Raven className="hero__raven hero__raven--r" />
      <Sigil className="hero__sigil" />

      <div className="hero__inner">
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

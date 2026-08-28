import { useEffect, useRef, useState } from 'react'
import { Raven, Skull, Sigil, Divider } from './components/Art.jsx'
import Reveal from './components/Reveal.jsx'
import FeatherFall from './components/FeatherFall.jsx'
import HypeBand from './components/HypeBand.jsx'
import Flock from './components/Flock.jsx'
import { ACCOLADES, SKILLS, CHRONICLE, MARQUEE, MARQUEE_ALT } from './data.js'

const NAV = [
  ['Receipts', 'record'],
  ['Arsenal', 'arsenal'],
  ['The Saga', 'chronicle'],
  ['All Hail', 'hail'],
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <a className="nav__mark" href="#top">
        <Raven className="nav__raven" />
        <span>MEBS</span>
      </a>
      <ul className="nav__links">
        {NAV.map(([label, id]) => (
          <li key={id}>
            <a href={`#${id}`}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Hero() {
  const letters = 'MEBS'.split('')
  return (
    <header className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <Flock />
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

function Marquee({ items, reverse = false }) {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className={`marquee__track ${reverse ? 'marquee__track--rev' : ''}`}>
        {row.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  )
}

function Record() {
  return (
    <section className="section" id="record">
      <Reveal>
        <p className="section__eyebrow">The receipts</p>
        <h2 className="section__title">The Résumé of a Legend</h2>
        <p className="section__sub">
          Three facts. All three documented. All three ridiculous.
        </p>
      </Reveal>

      <div className="cards">
        {ACCOLADES.map((a, i) => (
          <Reveal key={a.title} delay={i * 120}>
            <article className="card">
              <Skull className="card__skull" />
              <span className="card__tag">{a.tag}</span>
              <div className="card__stat">
                <strong>{a.stat}</strong>
                <span>{a.statLabel}</span>
              </div>
              <h3 className="card__title">{a.title}</h3>
              <p className="card__kicker">{a.kicker}</p>
              <p className="card__body">{a.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* Counts a skill bar up from zero once it scrolls into view. */
function SkillBar({ name, level, delay }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      setValue(level)
      return
    }

    let raf
    const run = () => {
      const start = performance.now()
      const DURATION = 1400
      const step = (now) => {
        const t = Math.min(1, (now - start - delay) / DURATION)
        if (t > 0) setValue(Math.round(level * (1 - Math.pow(1 - t, 3))))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [level, delay])

  return (
    <li className="skill" ref={ref}>
      <div className="skill__head">
        <span className="skill__name">{name}</span>
        <span className="skill__val">{value}</span>
      </div>
      <div className="skill__track">
        <div className="skill__fill" style={{ width: `${value}%` }} />
      </div>
    </li>
  )
}

function Arsenal() {
  return (
    <section className="section section--alt" id="arsenal">
      <Reveal>
        <p className="section__eyebrow">Loadout</p>
        <h2 className="section__title">The Arsenal</h2>
        <p className="section__sub">
          Engineer's hands. Strategist's mouth. Genuinely unfair combination.
        </p>
      </Reveal>

      <div className="arsenal">
        <Reveal className="arsenal__art">
          <Skull className="arsenal__skull" />
          <Raven className="arsenal__raven" />
        </Reveal>
        <Reveal delay={120}>
          <ul className="skills">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 110} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Chronicle() {
  return (
    <section className="section" id="chronicle">
      <Reveal>
        <p className="section__eyebrow">Origin story</p>
        <h2 className="section__title">The Saga</h2>
        <p className="section__sub">How the legend got written.</p>
      </Reveal>

      <ol className="timeline">
        {CHRONICLE.map((c, i) => (
          <Reveal as="li" key={c.title} delay={i * 100} className="timeline__item">
            <span className="timeline__dot" aria-hidden="true" />
            <span className="timeline__year">Chapter {c.year}</span>
            <h3 className="timeline__title">{c.title}</h3>
            <p className="timeline__body">{c.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Quote() {
  return (
    <section className="quote">
      <Reveal>
        <Divider />
        <blockquote>
          <p className="quote__text">
            “Quoth the Raven — <em>she did it again.</em>”
          </p>
          <footer className="quote__cite">
            Baltimore, where the ravens keep score
          </footer>
        </blockquote>
        <Divider />
      </Reveal>
    </section>
  )
}

function Hail() {
  return (
    <section className="section section--alt hail" id="hail">
      <Reveal>
        <Skull className="hail__skull" />
        <p className="section__eyebrow">In conclusion</p>
        <h2 className="section__title hail__title">Hear her cackles and tremble</h2>
        <p className="section__sub">
          Highest honors. A wall of DECA hardware. An engineer's hands. The ravens
          have been talking about her for years — now you know why.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#top">
            Run it back
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Raven className="footer__raven" />
      <p className="footer__gothic">Nevermore</p>
      <p className="footer__note">
        Built for Mebs — Johns Hopkins University, summa cum laude.
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <FeatherFall />
      <Nav />
      <main>
        <Hero />
        <Marquee items={MARQUEE} />
        <Record />
        <HypeBand text="Hear her cackles and tremble" />
        <Arsenal />
        <Marquee items={MARQUEE_ALT} reverse />
        <Chronicle />
        <Quote />
        <HypeBand text="NEVERMORE" reverse />
        <Hail />
      </main>
      <Footer />
    </>
  )
}

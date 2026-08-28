import { useEffect, useState } from 'react'
import { Raven, Skull, Sigil, Divider } from './components/Art.jsx'
import Reveal from './components/Reveal.jsx'
import FeatherFall from './components/FeatherFall.jsx'
import { ACCOLADES, SKILLS, CHRONICLE, MARQUEE } from './data.js'

const NAV = [
  ['The Record', 'record'],
  ['Arsenal', 'arsenal'],
  ['Chronicle', 'chronicle'],
  ['Summon', 'summon'],
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
  return (
    <header className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <Raven className="hero__raven hero__raven--l" />
      <Raven className="hero__raven hero__raven--r" />
      <Sigil className="hero__sigil" />

      <div className="hero__inner">
        <p className="hero__eyebrow">
          <span>Johns Hopkins University</span>
          <span className="hero__dot" aria-hidden="true">·</span>
          <span>Baltimore, MD</span>
        </p>
        <h1 className="hero__title" data-text="MEBS">
          MEBS
        </h1>
        <p className="hero__gothic">Nevermore Ordinary</p>
        <p className="hero__lede">
          Summa cum laude. DECA champion. Engineer. She walked into one of the hardest
          universities in the country and left with the highest honors it gives out —
          and a shelf of trophies on the way through.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#record">
            See the record
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

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
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
        <p className="section__eyebrow">Exhibit I</p>
        <h2 className="section__title">The Record</h2>
        <p className="section__sub">
          Three things worth knowing. All three are documented.
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

function SkillBar({ name, level, delay }) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setWidth(level), 200 + delay)
    return () => clearTimeout(t)
  }, [level, delay])

  return (
    <li className="skill">
      <div className="skill__head">
        <span className="skill__name">{name}</span>
        <span className="skill__val">{level}</span>
      </div>
      <div className="skill__track">
        <div className="skill__fill" style={{ width: `${width}%` }} />
      </div>
    </li>
  )
}

function Arsenal() {
  return (
    <section className="section section--alt" id="arsenal">
      <Reveal>
        <p className="section__eyebrow">Exhibit II</p>
        <h2 className="section__title">The Arsenal</h2>
        <p className="section__sub">
          Engineer's hands, strategist's mouth. A dangerous combination.
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
        <p className="section__eyebrow">Exhibit III</p>
        <h2 className="section__title">The Chronicle</h2>
        <p className="section__sub">How the legend got written.</p>
      </Reveal>

      <ol className="timeline">
        {CHRONICLE.map((c, i) => (
          <Reveal as="li" key={c.title} delay={i * 100} className="timeline__item">
            <span className="timeline__dot" aria-hidden="true" />
            <span className="timeline__year">{c.year}</span>
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

function Summon() {
  return (
    <section className="section section--alt summon" id="summon">
      <Reveal>
        <Skull className="summon__skull" />
        <p className="section__eyebrow">Exhibit IV</p>
        <h2 className="section__title">Summon Her</h2>
        <p className="section__sub">
          Hiring, recruiting, or just here to be impressed — the résumé is only the
          opening statement.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#top">
            Back to the top
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
        <Marquee />
        <Record />
        <Arsenal />
        <Chronicle />
        <Quote />
        <Summon />
      </main>
      <Footer />
    </>
  )
}

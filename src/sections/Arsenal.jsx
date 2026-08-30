import { useEffect, useRef, useState } from 'react'
import { Raven, Skull } from '../components/Art.jsx'
import Reveal from '../components/Reveal.jsx'
import { prefersReducedMotion } from '../lib/usePrefersReducedMotion.js'
import { SKILLS } from '../data.js'

/* Counts a skill bar up from zero once it scrolls into view. */
function SkillBar({ name, level, delay }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setValue(level)
      return undefined
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

export default function Arsenal() {
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

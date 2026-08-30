import Reveal from '../components/Reveal.jsx'
import { CHRONICLE } from '../data.js'

export default function Chronicle() {
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

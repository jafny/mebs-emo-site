import { Skull } from '../components/Art.jsx'
import Reveal from '../components/Reveal.jsx'
import { ACCOLADES } from '../data.js'

export default function Record() {
  return (
    <section className="section" id="record">
      <Reveal>
        <p className="section__eyebrow">The receipts</p>
        <h2 className="section__title">The Résumé of a Legend</h2>
        <p className="section__sub">
          Five facts. All five documented. All five ridiculous.
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

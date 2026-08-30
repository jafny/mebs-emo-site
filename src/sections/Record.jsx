import { useState } from 'react'
import { Seal, Skull } from '../components/Art.jsx'
import Reveal from '../components/Reveal.jsx'
import { ACCOLADES } from '../data.js'

function Accolade({ a }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`flip ${open ? 'is-open' : ''}`}>
      <div className="flip__inner">
        <article className="card flip__face flip__face--front" aria-hidden={open}>
          <Skull className="card__skull" />
          <span className="card__tag">{a.tag}</span>
          <div className="card__stat">
            <strong>{a.stat}</strong>
            <span>{a.statLabel}</span>
          </div>
          <h3 className="card__title">{a.title}</h3>
          <p className="card__kicker">{a.kicker}</p>
          <p className="card__body">{a.body}</p>
          <button
            type="button"
            className="card__flipbtn"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            tabIndex={open ? -1 : 0}
          >
            See the seal
          </button>
        </article>

        <div className="card flip__face flip__face--back" aria-hidden={!open}>
          <Seal className="card__seal" />
          <p className="card__backtag">Entered into the record</p>
          <p className="card__backline">{a.kicker}</p>
          <p className="card__backnote">
            Witnessed and sealed by the ravens of Baltimore, who do not hand these
            out lightly.
          </p>
          <button
            type="button"
            className="card__flipbtn"
            onClick={() => setOpen(false)}
            aria-expanded={open}
            tabIndex={open ? 0 : -1}
          >
            Back to the receipt
          </button>
        </div>
      </div>
    </div>
  )
}

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
            <Accolade a={a} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { Skull } from '../components/Art.jsx'
import Reveal from '../components/Reveal.jsx'
import useLocalStorage from '../lib/useLocalStorage.js'
import { QUESTIONS, standingById, standingFor } from '../data/reckoning.js'

const HASH_KEY = 'sworn'

function readSharedStanding() {
  const m = window.location.hash.match(new RegExp(`${HASH_KEY}=([a-z-]+)`))
  return m ? standingById(m[1]) : null
}

/* Five questions, and deliberately not a quiz: no running score, no ticks or
   crosses, no progress dots. Each answer just draws a line from the raven, and
   the end grants a standing rather than a grade. */
export default function Reckoning() {
  const [answers, setAnswers] = useLocalStorage('mebs.reckoning', {})
  const [shared, setShared] = useState(null)

  /* Arriving on someone else's shared link shows their standing first. */
  useEffect(() => {
    setShared(readSharedStanding())
  }, [])

  const answered = QUESTIONS.filter((q) => answers[q.id] !== undefined)
  const done = answered.length === QUESTIONS.length
  const correct = QUESTIONS.reduce(
    (n, q) => n + (q.options[answers[q.id]]?.right ? 1 : 0),
    0
  )
  const standing = done ? standingFor(correct) : null

  useEffect(() => {
    if (!standing) return
    const url = new URL(window.location.href)
    url.hash = `${HASH_KEY}=${standing.id}`
    window.history.replaceState(null, '', url)
  }, [standing])

  const choose = (qid, index) => setAnswers((prev) => ({ ...prev, [qid]: index }))

  return (
    <section className="section reckoning" id="reckoning">
      <Reveal>
        <p className="section__eyebrow">A small rite</p>
        <h2 className="section__title">The Reckoning</h2>
        <p className="section__sub">
          Five questions. Nobody is grading you — the raven simply wants to know
          whether you have been paying attention.
        </p>
      </Reveal>

      {shared && !done && (
        <Reveal>
          <p className="reckoning__shared">
            Someone sent you here standing as <strong>{shared.title}</strong>. See
            how you measure.
          </p>
        </Reveal>
      )}

      <div className="reckoning__list">
        {QUESTIONS.map((q, qi) => {
          const chosen = answers[q.id]
          const picked = chosen === undefined ? null : q.options[chosen]

          return (
            <Reveal key={q.id} delay={qi * 90}>
              <fieldset className="rq">
                <legend className="rq__prompt">
                  <span className="rq__num" aria-hidden="true">
                    {String(qi + 1).padStart(2, '0')}
                  </span>
                  {q.prompt}
                </legend>

                <div className="rq__options">
                  {q.options.map((o, oi) => (
                    <label
                      key={o.label}
                      className={`rq__option ${chosen === oi ? 'is-chosen' : ''}`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={chosen === oi}
                        onChange={() => choose(q.id, oi)}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>

                <p className="rq__reply" role="status">
                  {picked ? picked.reply : ''}
                </p>
              </fieldset>
            </Reveal>
          )
        })}
      </div>

      {standing && (
        <Reveal>
          <div className={`standing standing--${standing.id}`}>
            <Skull className="standing__skull" />
            <p className="standing__eyebrow">You stand as</p>
            <p className="standing__title">{standing.title}</p>
            <p className="standing__line">{standing.line}</p>
            <button
              type="button"
              className="btn"
              onClick={() => setAnswers({})}
            >
              Face it again
            </button>
          </div>
        </Reveal>
      )}
    </section>
  )
}

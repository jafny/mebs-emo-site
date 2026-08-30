import { useState } from 'react'
import { Sigil } from '../components/Art.jsx'
import Reveal from '../components/Reveal.jsx'
import useTypewriter from '../lib/useTypewriter.js'
import { consult } from '../data/oracle.js'

/* Ask the raven anything. It answers in her favour, always, and it answers the
   same way every time you ask the same thing — an oracle that changed its mind
   on a re-ask would just be a randomiser in a black cloak. */
export default function Oracle() {
  const [question, setQuestion] = useState('')
  const [asked, setAsked] = useState('')

  const answer = asked ? consult(asked) : ''
  const typed = useTypewriter(answer, { speed: 26 })

  const onSubmit = (e) => {
    e.preventDefault()
    const q = question.trim()
    if (!q) return
    /* Re-asking the same question should still replay the answer. */
    setAsked('')
    requestAnimationFrame(() => setAsked(q))
  }

  return (
    <section className="section oracle" id="oracle">
      <Reveal>
        <p className="section__eyebrow">Consult the bird</p>
        <h2 className="section__title">The Oracle</h2>
        <p className="section__sub">
          It has been watching her for years. It has opinions. Ask it something.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className={`oracle__stage ${asked ? 'is-answered' : ''}`}>
          <Sigil className="oracle__sigil" />

          <form className="oracle__form" onSubmit={onSubmit}>
            <label className="oracle__label" htmlFor="oracle-q">
              Your question
            </label>
            <input
              id="oracle-q"
              className="oracle__input"
              type="text"
              maxLength={140}
              autoComplete="off"
              placeholder="Could I take her in a case comp?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button className="btn oracle__ask" type="submit">
              Ask
            </button>
          </form>

          <p className="oracle__answer" role="status">
            {typed}
            {typed && typed.length < answer.length && (
              <i className="oracle__caret" aria-hidden="true" />
            )}
          </p>
        </div>
      </Reveal>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Divider } from '../components/Art.jsx'
import Reveal from '../components/Reveal.jsx'
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js'
import { STANZA, STANZA_TITLE } from '../data/stanza.js'

/* Tuned so the whole poem lands in about ten seconds. At a statelier pace
   the reader scrolls past long before the last line arrives. */
const CHAR_MS = 12
const LINE_GAP = 90

/* Alternate lines sit indented, the way the poem is usually set. Counting
   resets at each stanza break — leaving this to CSS nth-child means the blank
   separator shifts the pattern and the second stanza comes out inverted. */
const INDENTS = (() => {
  let pos = 0
  return STANZA.map((line) => {
    if (!line) {
      pos = 0
      return false
    }
    const indent = pos % 2 === 1
    pos += 1
    return indent
  })
})()

/* Types the stanza out line by line once it scrolls into view.

   The full poem is always present as visually-hidden text, so screen readers,
   search engines and anyone who lands mid-animation get the whole thing — the
   typing is decoration layered over content that is already there. */
export default function Stanza() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [typed, setTyped] = useState(() => STANZA.map(() => ''))

  useEffect(() => {
    if (reduced || !('IntersectionObserver' in window)) {
      setTyped(STANZA)
      return undefined
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [reduced])

  useEffect(() => {
    if (!started) return undefined

    const timeouts = []
    const intervals = []
    let elapsed = 0

    STANZA.forEach((line, i) => {
      if (!line) {
        elapsed += LINE_GAP
        return
      }
      timeouts.push(
        setTimeout(() => {
          let c = 0
          const id = setInterval(() => {
            c += 1
            setTyped((prev) => {
              const next = [...prev]
              next[i] = line.slice(0, c)
              return next
            })
            if (c >= line.length) clearInterval(id)
          }, CHAR_MS)
          intervals.push(id)
        }, elapsed)
      )
      elapsed += line.length * CHAR_MS + LINE_GAP
    })

    return () => {
      timeouts.forEach(clearTimeout)
      intervals.forEach(clearInterval)
    }
  }, [started])

  return (
    <section className="section stanza" id="stanza" ref={ref}>
      <Reveal>
        <Divider />
        <p className="section__eyebrow stanza__eyebrow">{STANZA_TITLE}</p>
      </Reveal>

      {/* The real content, for anything that does not watch it type. */}
      <p className="visually-hidden">{STANZA.filter(Boolean).join(' ')}</p>

      <div className="stanza__body" aria-hidden="true">
        {typed.map((line, i) =>
          STANZA[i] === '' ? (
            <span key={i} className="stanza__break" />
          ) : (
            <p
              key={i}
              className={`stanza__line ${INDENTS[i] ? 'stanza__line--in' : ''}`}
            >
              {line}
              {line.length > 0 && line.length < STANZA[i].length && (
                <i className="stanza__caret" />
              )}
            </p>
          )
        )}
      </div>

      <Reveal>
        <Divider />
      </Reveal>
    </section>
  )
}

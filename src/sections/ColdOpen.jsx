import { useEffect, useRef, useState } from 'react'
import { RavenEye } from '../components/Art.jsx'
import { readStored, writeStored } from '../lib/useLocalStorage.js'
import { prefersReducedMotion } from '../lib/usePrefersReducedMotion.js'

const SEEN_KEY = 'mebs.coldopen.seen'
const RUNTIME = 2600

/* A curtain, not an obstacle. It plays once per visitor, it is skippable from
   the keyboard on the first frame, and it never plays at all under reduced
   motion. Anything longer than a couple of seconds stops being theatre. */
export default function ColdOpen() {
  const [active, setActive] = useState(
    () => !prefersReducedMotion() && !readStored(SEEN_KEY, false)
  )
  const skipRef = useRef(null)

  useEffect(() => {
    if (!active) return undefined

    writeStored(SEEN_KEY, true)
    skipRef.current?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => setActive(false), RUNTIME)
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(false)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [active])

  if (!active) return null

  return (
    <div className="coldopen" role="presentation">
      <div className="coldopen__half coldopen__half--top" />
      <div className="coldopen__half coldopen__half--bottom" />

      <div className="coldopen__stage">
        <RavenEye className="coldopen__eye" />
        <p className="coldopen__word" aria-hidden="true">
          MEBS
        </p>
      </div>

      <button
        type="button"
        ref={skipRef}
        className="coldopen__skip"
        onClick={() => setActive(false)}
      >
        Skip
      </button>
    </div>
  )
}

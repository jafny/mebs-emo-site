import { useEffect, useState } from 'react'
import { prefersReducedMotion } from './usePrefersReducedMotion.js'

/* Types a string out one character at a time. Under reduced motion the whole
   string simply appears — the words are the point, the typing is decoration. */
export default function useTypewriter(text, { speed = 30, active = true } = {}) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    if (!active || !text) {
      setShown('')
      return undefined
    }
    if (prefersReducedMotion()) {
      setShown(text)
      return undefined
    }

    setShown('')
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)

    return () => clearInterval(id)
  }, [text, speed, active])

  return shown
}

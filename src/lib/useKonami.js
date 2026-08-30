import { useEffect, useRef } from 'react'

/* Watches for a word typed anywhere on the page. Ignores keystrokes aimed at
   a field, so typing NEVERMORE into the oracle does not also set the sky on
   fire. */
export default function useKonami(word, onMatch) {
  const buffer = useRef('')
  const handler = useRef(onMatch)
  handler.current = onMatch

  useEffect(() => {
    const target = word.toUpperCase()

    const onKey = (e) => {
      const el = e.target
      if (el instanceof HTMLElement) {
        const tag = el.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable) return
      }
      if (e.key.length !== 1) return

      buffer.current = (buffer.current + e.key.toUpperCase()).slice(-target.length)
      if (buffer.current === target) {
        buffer.current = ''
        handler.current()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [word])
}

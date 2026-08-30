import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/* Imperative read, for effects that need the answer before the first paint. */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches
}

/* Reactive read. Honours the user flipping the OS setting mid-visit. */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

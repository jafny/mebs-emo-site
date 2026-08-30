import { useEffect, useRef } from 'react'

/* One passive scroll listener for the page. Publishes into a ref rather than
   state so consumers can read it inside an animation frame without forcing a
   React render on every pixel scrolled. */
export default function useScrollProgress() {
  const state = useRef({ progress: 0, velocity: 0 })

  useEffect(() => {
    let lastY = window.scrollY
    let lastT = performance.now()

    const sample = () => {
      const y = window.scrollY
      const now = performance.now()
      const max = document.documentElement.scrollHeight - window.innerHeight
      const dt = Math.max(1, now - lastT)

      state.current = {
        progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
        velocity: Math.abs(y - lastY) / dt,
      }

      lastY = y
      lastT = now
    }

    sample()
    window.addEventListener('scroll', sample, { passive: true })
    window.addEventListener('resize', sample, { passive: true })
    return () => {
      window.removeEventListener('scroll', sample)
      window.removeEventListener('resize', sample)
    }
  }, [])

  return state
}

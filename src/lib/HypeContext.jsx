import { createContext, useContext, useEffect, useMemo } from 'react'
import useLocalStorage from './useLocalStorage.js'

export const HYPE_MIN = 1
export const HYPE_MAX = 11
const STORAGE_KEY = 'mebs.hype'

const HypeContext = createContext(null)

const lerp = (t, a, b) => a + (b - a) * t

/* The dial's real output is a set of CSS custom properties on <html>. Scaling
   the page in CSS rather than React keeps the whole thing off the render path —
   dragging the dial repaints, it does not re-render the site. */
export function HypeProvider({ children }) {
  const [stored, setHype] = useLocalStorage(STORAGE_KEY, 6)
  const hype = Math.min(HYPE_MAX, Math.max(HYPE_MIN, Number(stored) || HYPE_MIN))
  const max = hype === HYPE_MAX
  const t = (hype - HYPE_MIN) / (HYPE_MAX - HYPE_MIN)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--hype', String(hype))
    root.style.setProperty('--hype-n', t.toFixed(3))
    root.style.setProperty('--hype-grain', lerp(t, 0.3, 0.9).toFixed(3))
    root.style.setProperty('--hype-speed', lerp(t, 1.4, 0.45).toFixed(3))
    root.style.setProperty('--hype-glitch', lerp(t, 0.3, 1.6).toFixed(3))
    root.style.setProperty('--hype-shake', `${lerp(t, 0, 6).toFixed(2)}px`)
    root.dataset.hype = max ? 'max' : 'on'
  }, [hype, t, max])

  const value = useMemo(
    () => ({
      hype,
      setHype,
      max,
      /* The two things CSS cannot scale for us: how many elements exist. */
      feathers: Math.round(lerp(t, 6, 34)),
      birds: Math.round(lerp(t, 2, 11)),
    }),
    [hype, setHype, max, t]
  )

  return <HypeContext.Provider value={value}>{children}</HypeContext.Provider>
}

export function useHype() {
  const ctx = useContext(HypeContext)
  if (!ctx) throw new Error('useHype must be used inside <HypeProvider>')
  return ctx
}

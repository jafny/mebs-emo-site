import { useEffect, useState } from 'react'
import { Raven } from './Art.jsx'
import useKonami from '../lib/useKonami.js'
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js'

const DURATION = 8000
const BIRDS = 30

/* Type NEVERMORE anywhere. The palette inverts to bone-on-blood and the sky
   fills with ravens for eight seconds. */
export default function Ravenstorm() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(false)

  useKonami('NEVERMORE', () => setActive(true))

  useEffect(() => {
    if (!active) return undefined
    document.documentElement.dataset.storm = 'on'
    const timer = setTimeout(() => setActive(false), DURATION)
    return () => {
      clearTimeout(timer)
      delete document.documentElement.dataset.storm
    }
  }, [active])

  return (
    <>
      {/* Announced, so the easter egg is not purely visual. */}
      <p className="visually-hidden" role="status">
        {active ? 'Ravenstorm. Quoth the raven — she did it again.' : ''}
      </p>

      {active && !reduced && (
        <div className="storm" aria-hidden="true">
          {Array.from({ length: BIRDS }, (_, i) => (
            <Raven
              key={i}
              className="storm__bird"
              style={{
                top: `${(i * 41) % 96}%`,
                animationDelay: `${((i * 13) % 40) / 10}s`,
                animationDuration: `${2.4 + ((i * 7) % 22) / 10}s`,
                '--scale': 0.3 + ((i * 19) % 80) / 100,
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}

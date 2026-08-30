import { useMemo } from 'react'
import { Raven } from './Art.jsx'

/* A flock crossing the hero at intervals. Decorative; killed entirely under
   prefers-reduced-motion via styles.css. */
export default function Flock({ count = 5 }) {
  const birds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: 12 + ((i * 37) % 62),
        delay: i * 2.6,
        duration: 13 + ((i * 5) % 9),
        scale: 0.4 + ((i * 17) % 70) / 100,
      })),
    [count]
  )

  return (
    <div className="flock" aria-hidden="true">
      {birds.map((b) => (
        <Raven
          key={b.id}
          className="flock__bird"
          style={{
            top: `${b.top}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `calc(${b.duration}s * var(--hype-speed, 1))`,
            '--scale': b.scale,
          }}
        />
      ))}
    </div>
  )
}

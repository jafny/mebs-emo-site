import { useMemo } from 'react'
import { Feather } from './Art.jsx'

/* Ambient drifting feathers. Purely decorative, hidden from assistive tech,
   and disabled entirely under prefers-reduced-motion (see styles.css). */
export default function FeatherFall({ count = 14 }) {
  const feathers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 97) % 100,
        delay: -(i * 3.1) % 26,
        duration: 20 + ((i * 7) % 16),
        scale: 0.35 + ((i * 13) % 60) / 100,
        drift: i % 2 ? 1 : -1,
      })),
    [count]
  )

  return (
    <div className="featherfall" aria-hidden="true">
      {feathers.map((f) => (
        <Feather
          key={f.id}
          className="featherfall__item"
          style={{
            left: `${f.left}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            '--scale': f.scale,
            '--drift': f.drift,
          }}
        />
      ))}
    </div>
  )
}

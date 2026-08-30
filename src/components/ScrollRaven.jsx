import { useRef } from 'react'
import { RavenFlying } from './Art.jsx'
import useRafLoop from '../lib/useRafLoop.js'
import useScrollProgress from '../lib/useScrollProgress.js'
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion.js'

const SWAY = 18 // px of horizontal drift either side of the gutter's centre
const WAVES = 3 // how many times it crosses the gutter over a full page

/* A raven riding a sine path down the gutter, and a blood rail that fills as
   you scroll. Both read the one shared scroll sampler inside the one shared
   animation frame — neither adds a listener or a loop of its own.

   The path is computed rather than measured from an SVG: getPointAtLength
   returns user-space units, which would need mapping back to pixels on every
   resize for no benefit. */
export default function ScrollRaven() {
  const reduced = usePrefersReducedMotion()
  const scroll = useScrollProgress()
  const birdRef = useRef(null)
  const railRef = useRef(null)
  const flap = useRef(0)

  useRafLoop(() => {
    const { progress, velocity } = scroll.current

    const rail = railRef.current
    if (rail) rail.style.transform = `scaleY(${progress})`

    const bird = birdRef.current
    if (!bird) return

    const phase = progress * Math.PI * WAVES
    const x = Math.sin(phase) * SWAY
    const y = progress * (window.innerHeight - bird.offsetHeight - 24)
    /* Bank into the turn using the slope of the same sine. */
    const tilt = Math.cos(phase) * 16

    bird.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${tilt.toFixed(1)}deg)`

    /* Flap rate follows scroll speed, smoothed so it does not stutter. */
    const target = Math.min(1, velocity / 2.5)
    flap.current += (target - flap.current) * 0.08
    bird.style.setProperty('--flap', `${(0.95 - flap.current * 0.65).toFixed(3)}s`)
  }, !reduced)

  return (
    <div className="gutter" aria-hidden="true">
      <div className="driprail">
        <div className="driprail__fill" ref={railRef} />
      </div>
      <span className="gutter__bird" ref={birdRef}>
        <RavenFlying className="gutter__art" />
      </span>
    </div>
  )
}

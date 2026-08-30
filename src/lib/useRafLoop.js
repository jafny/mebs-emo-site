import { useEffect, useRef } from 'react'

/* One requestAnimationFrame loop for the entire page. Widgets subscribe rather
   than each starting their own, so a page full of animation is still one loop. */

const subscribers = new Set()
let handle = null
let last = 0

function tick(now) {
  const dt = last ? now - last : 16
  last = now
  for (const fn of subscribers) fn(now, dt)
  if (subscribers.size) {
    handle = requestAnimationFrame(tick)
  } else {
    handle = null
    last = 0
  }
}

export function subscribe(fn) {
  subscribers.add(fn)
  if (handle === null) handle = requestAnimationFrame(tick)
  return () => {
    subscribers.delete(fn)
    if (!subscribers.size && handle !== null) {
      cancelAnimationFrame(handle)
      handle = null
      last = 0
    }
  }
}

export default function useRafLoop(fn, active = true) {
  const saved = useRef(fn)
  saved.current = fn

  useEffect(() => {
    if (!active) return undefined
    return subscribe((now, dt) => saved.current(now, dt))
  }, [active])
}

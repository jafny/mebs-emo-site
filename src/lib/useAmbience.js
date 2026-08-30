import { useCallback, useEffect, useRef, useState } from 'react'
import { readStored, writeStored } from './useLocalStorage.js'

const KEY = 'mebs.sound'

/* Everything here is synthesized at runtime — there is not an audio file in
   the repo, and there is not going to be one. A drone, an occasional caw built
   from filtered noise, and rare thunder from brown noise. */

function makeNoiseBuffer(ctx, seconds, brown = false) {
  const length = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1
    if (brown) {
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    } else {
      data[i] = white
    }
  }
  return buffer
}

export default function useAmbience() {
  /* This is whether sound is actually playing, which is not the same as the
     stored preference: a browser will not let us resume audio on page load,
     however much the visitor asked for it last time. */
  const [on, setOn] = useState(false)
  const ref = useRef(null)

  const teardown = useCallback(() => {
    const rig = ref.current
    if (!rig) return
    clearTimeout(rig.cawTimer)
    clearTimeout(rig.thunderTimer)
    try {
      rig.master.gain.cancelScheduledValues(rig.ctx.currentTime)
      rig.master.gain.setTargetAtTime(0, rig.ctx.currentTime, 0.3)
      setTimeout(() => rig.ctx.close().catch(() => {}), 900)
    } catch {
      /* context already gone */
    }
    ref.current = null
  }, [])

  /* Must be called from a user gesture — browsers will not start an
     AudioContext any other way. */
  const start = useCallback(() => {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return false

    const ctx = new Ctx()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    /* Ramped rather than switched, so it fades up instead of clicking. */
    master.gain.setTargetAtTime(0.16, ctx.currentTime, 1.2)

    // --- organ drone: two detuned saws under a slowly breathing filter
    const droneFilter = ctx.createBiquadFilter()
    droneFilter.type = 'lowpass'
    droneFilter.frequency.value = 220
    droneFilter.Q.value = 6
    droneFilter.connect(master)

    const droneGain = ctx.createGain()
    droneGain.gain.value = 0.5
    droneGain.connect(droneFilter)

    const oscs = [55, 82.4].map((f, i) => {
      const o = ctx.createOscillator()
      o.type = 'sawtooth'
      o.frequency.value = f
      o.detune.value = i ? 7 : -7
      o.connect(droneGain)
      o.start()
      return o
    })

    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.06
    lfoGain.gain.value = 130
    lfo.connect(lfoGain).connect(droneFilter.frequency)
    lfo.start()

    const noise = makeNoiseBuffer(ctx, 1)
    const brown = makeNoiseBuffer(ctx, 3, true)

    const rig = { ctx, master, oscs, lfo, cawTimer: 0, thunderTimer: 0 }

    // --- caw: a band of noise swept downward with a hard envelope
    const caw = () => {
      const src = ctx.createBufferSource()
      src.buffer = noise
      const band = ctx.createBiquadFilter()
      band.type = 'bandpass'
      band.Q.value = 9
      const g = ctx.createGain()
      const t = ctx.currentTime

      band.frequency.setValueAtTime(900, t)
      band.frequency.exponentialRampToValueAtTime(400, t + 0.28)
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.5, t + 0.03)
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.34)

      src.connect(band).connect(g).connect(master)
      src.start(t)
      src.stop(t + 0.4)

      rig.cawTimer = setTimeout(caw, 20000 + Math.random() * 40000)
    }

    const thunder = () => {
      const src = ctx.createBufferSource()
      src.buffer = brown
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 160
      const g = ctx.createGain()
      const t = ctx.currentTime

      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.45, t + 0.25)
      g.gain.exponentialRampToValueAtTime(0.001, t + 2.8)

      src.connect(lp).connect(g).connect(master)
      src.start(t)
      src.stop(t + 3)

      rig.thunderTimer = setTimeout(thunder, 60000 + Math.random() * 90000)
    }

    rig.cawTimer = setTimeout(caw, 6000 + Math.random() * 8000)
    rig.thunderTimer = setTimeout(thunder, 30000 + Math.random() * 40000)

    ref.current = rig
    return true
  }, [])

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev
      if (next) {
        if (!start()) return false
      } else {
        teardown()
      }
      writeStored(KEY, next)
      return next
    })
  }, [start, teardown])

  /* A visitor who left sound on last time gets it back on their first
     interaction with the page — the earliest moment a browser will allow it.
     Clicks on the toggle itself are left alone, so its own handler runs
     instead of this one racing it. */
  useEffect(() => {
    if (!readStored(KEY, false)) return undefined

    const remove = () => {
      window.removeEventListener('pointerdown', arm)
      window.removeEventListener('keydown', arm)
    }
    function arm(e) {
      remove()
      if (e.target?.closest?.('.sound')) return
      if (start()) setOn(true)
    }

    window.addEventListener('pointerdown', arm)
    window.addEventListener('keydown', arm)
    return remove
  }, [start])

  /* A backgrounded tab goes quiet rather than droning on unheard. */
  useEffect(() => {
    const onVisibility = () => {
      const rig = ref.current
      if (!rig) return
      if (document.hidden) rig.ctx.suspend().catch(() => {})
      else rig.ctx.resume().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => teardown, [teardown])

  return { on, toggle }
}

import { useCallback, useState } from 'react'

/* localStorage throws in private windows and when site data is blocked, so
   every read and write here is guarded — a failure just means "no memory". */

export function readStored(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* nothing to be done — the visit is simply not remembered */
  }
}

export default function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => readStored(key, fallback))

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        writeStored(key, resolved)
        return resolved
      })
    },
    [key]
  )

  return [value, set]
}

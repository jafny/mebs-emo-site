import useAmbience from '../lib/useAmbience.js'

/* Off by default and started only from this click — browsers will not open an
   AudioContext outside a user gesture, and nobody wants a site that starts
   droning at them unasked. */
export default function SoundToggle() {
  const { on, toggle } = useAmbience()

  return (
    <button
      type="button"
      className={`sound ${on ? 'sound--on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      title={on ? 'Silence the ravens' : 'Wake the ravens'}
    >
      <span className="sound__bars" aria-hidden="true">
        <i /><i /><i />
      </span>
      <span className="visually-hidden">
        {on ? 'Sound on. Silence the ravens.' : 'Sound off. Wake the ravens.'}
      </span>
    </button>
  )
}

import { HYPE_MAX, HYPE_MIN, useHype } from '../lib/HypeContext.jsx'

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']

/* The dial is a real range input, restyled. Screen readers and keyboards get
   the native control; everyone else gets a gothic slider. */
export default function HypeDial() {
  const { hype, setHype, max } = useHype()

  return (
    <div className={`dial ${max ? 'dial--max' : ''}`}>
      <label className="dial__label" htmlFor="hype-dial">
        Hype
      </label>
      <input
        id="hype-dial"
        className="dial__input"
        type="range"
        min={HYPE_MIN}
        max={HYPE_MAX}
        step={1}
        value={hype}
        onChange={(e) => setHype(Number(e.target.value))}
        aria-valuetext={
          max ? 'Hype 11 of 11 — maximum raven' : `Hype ${hype} of ${HYPE_MAX}`
        }
      />
      <output className="dial__value" htmlFor="hype-dial" aria-hidden="true">
        {ROMAN[hype]}
      </output>
    </div>
  )
}

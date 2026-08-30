import { Skull } from '../components/Art.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Hail() {
  return (
    <section className="section section--alt hail" id="hail">
      <Reveal>
        <Skull className="hail__skull" />
        <p className="section__eyebrow">In conclusion</p>
        <h2 className="section__title hail__title">Hear her cackles and tremble</h2>
        <p className="section__sub">
          Highest honors. A wall of DECA hardware. An engineer's hands. The ravens
          have been talking about her for years — now you know why.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#top">
            Run it back
          </a>
        </div>
      </Reveal>
    </section>
  )
}

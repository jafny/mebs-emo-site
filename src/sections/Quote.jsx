import { Divider } from '../components/Art.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Quote() {
  return (
    <section className="quote">
      <Reveal>
        <Divider />
        <blockquote>
          <p className="quote__text">
            “Quoth the Raven — <em>she did it again.</em>”
          </p>
          <footer className="quote__cite">
            Baltimore, where the ravens keep score
          </footer>
        </blockquote>
        <Divider />
      </Reveal>
    </section>
  )
}

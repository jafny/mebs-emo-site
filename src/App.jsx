import FeatherFall from './components/FeatherFall.jsx'
import HypeBand from './components/HypeBand.jsx'
import { HypeProvider, useHype } from './lib/HypeContext.jsx'
import Nav from './sections/Nav.jsx'
import Hero from './sections/Hero.jsx'
import Marquee from './sections/Marquee.jsx'
import Record from './sections/Record.jsx'
import Arsenal from './sections/Arsenal.jsx'
import Chronicle from './sections/Chronicle.jsx'
import Quote from './sections/Quote.jsx'
import Hail from './sections/Hail.jsx'
import Footer from './sections/Footer.jsx'
import { MARQUEE, MARQUEE_ALT } from './data.js'

function Site() {
  const { feathers } = useHype()

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <FeatherFall count={feathers} />
      <Nav />
      <main>
        <Hero />
        <Marquee items={MARQUEE} />
        <Record />
        <HypeBand text="Hear her cackles and tremble" />
        <Arsenal />
        <Marquee items={MARQUEE_ALT} reverse />
        <Chronicle />
        <Quote />
        <HypeBand text="NEVERMORE" reverse />
        <Hail />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HypeProvider>
      <Site />
    </HypeProvider>
  )
}

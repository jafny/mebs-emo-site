import { useEffect, useState } from 'react'
import { Raven } from '../components/Art.jsx'
import HypeDial from '../components/HypeDial.jsx'
import SoundToggle from '../components/SoundToggle.jsx'

const LINKS = [
  ['Receipts', 'record'],
  ['Arsenal', 'arsenal'],
  ['The Saga', 'chronicle'],
  ['Oracle', 'oracle'],
  ['All Hail', 'hail'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
      <a className="nav__mark" href="#top">
        <Raven className="nav__raven" />
        <span>MEBS</span>
      </a>
      <div className="nav__tools">
        <ul className="nav__links">
          {LINKS.map(([label, id]) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
        <HypeDial />
        <SoundToggle />
      </div>
    </nav>
  )
}

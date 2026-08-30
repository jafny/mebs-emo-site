import { Raven } from '../components/Art.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <Raven className="footer__raven" />
      <p className="footer__gothic">Nevermore</p>
      <p className="footer__note">
        Built for Mebs — Johns Hopkins University, summa cum laude.
      </p>
    </footer>
  )
}

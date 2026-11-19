import { personal } from '../data/portfolioData'
import Icon from './Icons'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="container footer">
      <span>© {new Date().getFullYear()} {personal.name}</span>
      <span className="footer-mid">Designed & built by hand · React + Vite</span>
      <a href="#hero" className="footer-top">Back to top <Icon name="arrow" size={14} /></a>
    </footer>
  )
}

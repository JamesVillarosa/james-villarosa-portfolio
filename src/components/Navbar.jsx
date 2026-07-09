import { useEffect, useRef, useState } from 'react'
import Magnetic from '../motion/Magnetic'
import { personal } from '../data/portfolioData'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, scrollTo, ready }) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      setHidden(y > lastY.current && y > 300 && !menuOpen)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

  const go = (id) => {
    setMenuOpen(false)
    scrollTo(id)
  }

  return (
    <>
      <header
        className={`nav ${scrolled ? 'nav--scrolled' : ''} ${hidden ? 'nav--hidden' : ''} ${
          ready ? 'nav--ready' : ''
        }`}
      >
        <button className="nav-logo" onClick={() => go('hero')} aria-label="Back to top">
          James<span className="nav-logo-dot">.</span>
        </button>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${activeSection === l.id ? 'is-active' : ''}`}
              onClick={() => go(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <Magnetic strength={0.3}>
            <a className="nav-cta" href={`mailto:${personal.email}`}>
              Get in touch
            </a>
          </Magnetic>
          <button
            className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`nav-overlay ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="nav-overlay-links" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              className="nav-overlay-link"
              style={{ transitionDelay: menuOpen ? `${0.15 + i * 0.06}s` : '0s' }}
              onClick={() => go(l.id)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="nav-overlay-meta">
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
          <div className="nav-overlay-socials">
            <a href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  )
}

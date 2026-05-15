import { useState } from 'react'
import { personal } from '../data/portfolioData'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activeSection, scrollTo, scrollProgress }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (id) => {
    scrollTo(id)
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={styles.nav}>
        {/* Scroll progress bar */}
        <div style={{ ...styles.progressBar, width: `${scrollProgress}%` }} />

        <div className="container" style={styles.inner}>
          {/* Logo */}
          <button style={styles.logo} onClick={() => handleNav('hero')} aria-label="Home">
            <img src="/villarosa-logo.png" alt="Villarosa" style={styles.logoImg} />
          </button>

          {/* Desktop links */}
          <ul style={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  style={{
                    ...styles.link,
                    ...(activeSection === link.id ? styles.linkActive : {}),
                  }}
                >
                  {link.label}
                  {activeSection === link.id && <span style={styles.linkDot} />}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div style={styles.navRight}>
            <a
              href={`mailto:${personal.email}?subject=Hello%20James`}
              className="btn btn-primary btn-sm"
            >
              Say Hello
            </a>
            <button
              style={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span style={{ ...styles.bar, transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ ...styles.bar, opacity: menuOpen ? 0 : 1 }} />
              <span style={{ ...styles.bar, transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                style={{
                  ...styles.mobileLink,
                  ...(activeSection === link.id ? styles.mobileLinkActive : {}),
                }}
              >
                {link.label}
              </button>
            ))}
            <a
              href={`mailto:${personal.email}?subject=Hello%20James`}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            >
              Say Hello
            </a>
          </div>
        )}
      </nav>
      {/* Spacer so content doesn't hide under fixed nav */}
      <div style={{ height: 68 }} />
    </>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(18px) saturate(160%)',
    WebkitBackdropFilter: 'blur(18px) saturate(160%)',
    borderBottom: '1px solid rgba(226,232,240,0.7)',
    boxShadow: '0 1px 24px rgba(15,23,42,0.04)',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    background: 'linear-gradient(90deg, #2563eb, #60a5fa)',
    transition: 'width 0.1s ease',
    zIndex: 101,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 68,
    gap: 20,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
    cursor: 'pointer',
  },
  logoImg: {
    height: 38,
    width: 'auto',
    display: 'block',
    objectFit: 'contain',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    position: 'relative',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--text-mid)',
    padding: '6px 14px',
    borderRadius: 'var(--radius-full)',
    transition: 'color 0.2s, background 0.2s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  linkActive: {
    color: 'var(--blue)',
    fontWeight: 600,
    background: 'var(--blue-pale)',
  },
  linkDot: {
    display: 'block',
    width: 4,
    height: 4,
    borderRadius: '50%',
    background: 'var(--blue)',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: 5,
    padding: 6,
    cursor: 'pointer',
    '@media(maxWidth:768px)': {
      display: 'flex',
    },
  },
  bar: {
    display: 'block',
    width: 22,
    height: 2,
    background: 'var(--text-dark)',
    borderRadius: 2,
    transition: 'all 0.25s ease',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '16px 20px',
    borderTop: '1px solid var(--border)',
    background: 'var(--white)',
  },
  mobileLink: {
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: 15,
    color: 'var(--text-mid)',
    padding: '12px 16px',
    borderRadius: 'var(--radius-sm)',
    textAlign: 'left',
    transition: 'background 0.2s',
  },
  mobileLinkActive: {
    background: 'var(--blue-pale)',
    color: 'var(--blue)',
    fontWeight: 600,
  },
}

// Responsive: show hamburger on mobile
const mobileStyle = document.createElement('style')
mobileStyle.textContent = `
  @media (max-width: 768px) {
    .nav-links { display: none !important; }
    .nav-hamburger { display: flex !important; }
    .nav-hire { display: none !important; }
  }
`
if (typeof document !== 'undefined') {
  document.head.appendChild(mobileStyle)
}

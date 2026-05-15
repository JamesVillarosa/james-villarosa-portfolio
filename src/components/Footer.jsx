import { personal } from '../data/portfolioData'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Footer({ scrollTo }) {
  const year = new Date().getFullYear()

  return (
    <footer style={styles.footer}>
      <div className="container">
        <div style={styles.top}>
          <div>
            <img src="/villarosa-logo.png" alt="Villarosa" style={styles.logoImg} />
            <p style={styles.tagline}>{personal.tagline}</p>
          </div>
          <nav style={styles.nav}>
            {NAV_LINKS.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} style={styles.navLink}>
                {link.label}
              </button>
            ))}
          </nav>
          <div style={styles.socials}>
            <a href={personal.github} target="_blank" rel="noreferrer" style={styles.socialLink} title="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.03-.01-2.02-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" style={styles.socialLink} title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <a href={`mailto:${personal.email}`} style={styles.socialLink} title="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            © {year} James Carl V. Villarosa · Built with React and Vite
          </p>
          <button onClick={() => scrollTo('hero')} style={styles.backTop}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'var(--text-dark)',
    paddingTop: 56,
    paddingBottom: 32,
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 40,
    paddingBottom: 40,
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    flexWrap: 'wrap',
  },
  logoImg: {
    height: 44,
    width: 'auto',
    display: 'block',
    marginBottom: 10,
    filter: 'brightness(0) invert(1) opacity(0.85)',
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    maxWidth: 220,
    lineHeight: 1.6,
  },
  nav: {
    display: 'flex',
    gap: 4,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  navLink: {
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  socials: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: 10,
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.5)',
    transition: 'all 0.2s',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 24,
    gap: 16,
    flexWrap: 'wrap',
  },
  copyright: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.3)',
  },
  backTop: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--blue-light)',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    fontFamily: 'var(--font-display)',
  },
}

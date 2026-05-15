import { personal } from '../data/portfolioData'
import { useInView } from '../hooks/useInView'

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}
function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.03-.01-2.02-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

const CONTACT_LINKS = [
  {
    Icon: EmailIcon,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
    hint: 'Best for project inquiries',
  },
  {
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'james-villarosa',
    href: personal.linkedin,
    hint: 'Connect professionally',
  },
  {
    Icon: GithubIcon,
    label: 'GitHub',
    value: 'JamesVillarosa',
    href: personal.github,
    hint: 'See my code and projects',
  },
]

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" style={styles.section}>
      <div className="container" ref={ref}>
        <div style={styles.wrapper}>
          <div className={`fade-up ${inView ? 'visible' : ''}`} style={styles.left}>
            <p className="section-label">Get In Touch</p>
            <h2 style={styles.heading}>
              Let's connect<br />
              <span style={{ color: 'var(--blue)' }}>and collaborate.</span>
            </h2>
            <p style={styles.sub}>
              I'm actively looking for remote full-time software engineering roles. Not currently open to contract work,
              but always happy to talk about engineering, AI, or interesting builds.
            </p>
            <div style={styles.availability}>
              <span style={styles.dot} />
              <span style={styles.availText}>Available for work</span>
              <span style={styles.availType}>{personal.available}</span>
            </div>

            <a
              href={`mailto:${personal.email}?subject=Hello%20James`}
              className="btn btn-primary"
              style={{ marginTop: 28, fontSize: 16, padding: '16px 32px' }}
            >
              <EmailIcon /> Say Hello
            </a>
          </div>

          <div style={styles.right}>
            {CONTACT_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className={`fade-up delay-${i + 1} ${inView ? 'visible' : ''}`}
                style={styles.contactCard}
              >
                <div style={styles.contactIcon}>
                  <link.Icon />
                </div>
                <div style={styles.contactInfo}>
                  <div style={styles.contactLabel}>{link.label}</div>
                  <div style={styles.contactValue}>{link.value}</div>
                  <div style={styles.contactHint}>{link.hint}</div>
                </div>
                <div style={styles.contactArrow}>→</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    background: 'rgba(255,255,255,0.42)',
    backdropFilter: 'blur(18px) saturate(150%)',
    WebkitBackdropFilter: 'blur(18px) saturate(150%)',
    borderTop: '1px solid rgba(226,232,240,0.6)',
  },
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 64,
    alignItems: 'start',
  },
  left: {},
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 6vw, 56px)',
    fontWeight: 800,
    color: 'var(--text-dark)',
    lineHeight: 1.1,
    marginBottom: 20,
    marginTop: 8,
  },
  sub: {
    fontSize: 16,
    color: 'var(--text-mid)',
    lineHeight: 1.75,
  },
  availability: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
    background: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(226,232,240,0.8)',
    borderRadius: 'var(--radius-full)',
    padding: '10px 18px',
  },
  dot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#22c55e',
    boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
    flexShrink: 0,
  },
  availText: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-mid)',
  },
  availType: {
    fontSize: 12,
    color: 'var(--text-muted)',
    borderLeft: '1px solid var(--border)',
    paddingLeft: 10,
    marginLeft: 2,
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: 'rgba(255,255,255,0.75)',
    border: '1px solid rgba(226,232,240,0.8)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px 24px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.22s ease',
    boxShadow: 'var(--shadow-sm)',
  },
  contactIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'var(--blue-pale)',
    color: 'var(--blue)',
    flexShrink: 0,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    lineHeight: 1.2,
  },
  contactValue: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 15,
    color: 'var(--text-dark)',
    marginTop: 2,
    lineHeight: 1.2,
    wordBreak: 'break-word',
  },
  contactHint: {
    fontSize: 12,
    color: 'var(--text-muted)',
    marginTop: 2,
  },
  contactArrow: {
    fontSize: 18,
    color: 'var(--blue)',
    fontWeight: 600,
    flexShrink: 0,
  },
}

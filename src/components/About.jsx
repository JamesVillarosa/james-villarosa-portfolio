import { about, education, personal } from '../data/portfolioData'
import { useInView } from '../hooks/useInView'

const QUICK_ICONS = {
  location: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 1 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  school: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  work: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  focus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
}

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" style={styles.section}>
      <div className="container" ref={ref}>
        <div className={`fade-up ${inView ? 'visible' : ''}`}>
          <p className="section-label">Who I Am</p>
          <h2 className="section-title" style={{ marginBottom: 48 }}>About Me</h2>
        </div>

        <div style={styles.grid}>
          <div>
            {about.bio.map((para, i) => (
              <p
                key={i}
                className={`fade-up delay-${i + 1} ${inView ? 'visible' : ''}`}
                style={styles.bio}
              >
                {para}
              </p>
            ))}

            <div
              className={`fade-up delay-3 ${inView ? 'visible' : ''}`}
              style={styles.quickGrid}
            >
              {about.quickInfo.map((info) => (
                <div key={info.label} style={styles.quickItem}>
                  <span style={styles.quickIcon}>{QUICK_ICONS[info.icon]}</span>
                  <div>
                    <div style={styles.quickLabel}>{info.label}</div>
                    <div style={styles.quickValue}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`fade-up delay-4 ${inView ? 'visible' : ''}`}
              style={styles.linksRow}
            >
              <a href={personal.github} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <GithubIcon /> GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </div>

          <div>
            <div
              className={`fade-up delay-2 ${inView ? 'visible' : ''}`}
              style={styles.statsGrid}
            >
              {about.stats.map((stat) => (
                <div key={stat.label} className="card" style={styles.statCard}>
                  <div style={styles.statValue}>{stat.value}</div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div
              className={`fade-up delay-3 ${inView ? 'visible' : ''}`}
              style={styles.eduCard}
            >
              <div style={styles.eduHeader}>
                <span style={styles.eduIcon}>{QUICK_ICONS.school}</span>
                <div>
                  <div style={styles.eduSchool}>{education.shortSchool}</div>
                  <div style={styles.eduDegree}>{education.degree}</div>
                </div>
              </div>
              <div style={styles.eduDetails}>
                <span style={styles.eduPill}>{education.period}</span>
                <span style={styles.eduPill}>GWA {education.gwa}</span>
                <span style={styles.eduPill}>{education.honors}</span>
                <span style={styles.eduPill}>{education.scholarship}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.03-.01-2.02-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const styles = {
  section: {
    background: 'rgba(255,255,255,0.42)',
    backdropFilter: 'blur(18px) saturate(150%)',
    WebkitBackdropFilter: 'blur(18px) saturate(150%)',
    borderTop: '1px solid rgba(226,232,240,0.6)',
    borderBottom: '1px solid rgba(226,232,240,0.6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 56,
    alignItems: 'start',
  },
  bio: {
    fontSize: 16,
    lineHeight: 1.8,
    color: 'var(--text-mid)',
    marginBottom: 16,
  },
  quickGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginTop: 28,
    marginBottom: 28,
  },
  quickItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(226,232,240,0.8)',
    borderRadius: 12,
    padding: '14px 16px',
  },
  quickIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 8,
    background: 'var(--blue-pale)',
    color: 'var(--blue)',
    flexShrink: 0,
  },
  quickLabel: {
    fontSize: 11,
    color: 'var(--text-muted)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    lineHeight: 1.3,
  },
  quickValue: {
    fontSize: 13,
    color: 'var(--text-dark)',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  linksRow: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    textAlign: 'center',
    padding: '24px 16px',
    background: 'rgba(255,255,255,0.75)',
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 34,
    fontWeight: 800,
    color: 'var(--blue)',
    letterSpacing: '-0.02em',
    lineHeight: 1,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: 'var(--text-light)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  eduCard: {
    background: 'rgba(255,255,255,0.75)',
    border: '1px solid rgba(226,232,240,0.8)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    marginTop: 4,
  },
  eduHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  eduIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 42,
    borderRadius: 10,
    background: 'var(--blue-pale)',
    color: 'var(--blue)',
    flexShrink: 0,
  },
  eduSchool: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 18,
    color: 'var(--text-dark)',
  },
  eduDegree: {
    fontSize: 13,
    color: 'var(--text-light)',
    marginTop: 2,
  },
  eduDetails: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
  eduPill: {
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--blue-pale)',
    color: 'var(--blue)',
  },
}

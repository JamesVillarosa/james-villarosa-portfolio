import { projects } from '../data/portfolioData'
import { useInView } from '../hooks/useInView'

export default function Projects() {
  const [ref, inView] = useInView()
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" style={styles.section}>
      <div className="container" ref={ref}>
        <div className={`fade-up ${inView ? 'visible' : ''}`} style={{ marginBottom: 48 }}>
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            From AI-powered mobile apps to full-stack web platforms, all shipped and real.
          </p>
        </div>

        {featured && (
          <div className={`fade-up delay-1 ${inView ? 'visible' : ''}`} style={{ marginBottom: 24 }}>
            <FeaturedCard project={featured} />
          </div>
        )}

        <div style={styles.grid}>
          {rest.map((project, i) => (
            <div
              key={project.id}
              className={`fade-up delay-${Math.min(i + 2, 6)} ${inView ? 'visible' : ''}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCard({ project }) {
  return (
    <div style={styles.featured}>
      <div style={styles.featuredLeft}>
        <div style={styles.featuredBadge}>
          <StarIcon /> Featured Project · UP CMSC 190 Thesis
        </div>
        <h3 style={styles.featuredName}>{project.name}</h3>
        <p style={styles.featuredSubtitle}>{project.subtitle}</p>
        <p style={styles.featuredDesc}>{project.description}</p>
        <div style={styles.featuredTech}>
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
        <div style={styles.featuredLinks}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
              <GithubIcon /> View on GitHub
            </a>
          )}
          {project.note && (
            <span style={styles.noteTag}>{project.note}</span>
          )}
        </div>
      </div>
      <div style={styles.featuredRight}>
        <div style={styles.featuredVisual}>
          <div style={styles.visualStat}>
            <div style={styles.visualStatVal}>84.4</div>
            <div style={styles.visualStatLabel}>SUS Score / 100</div>
          </div>
          <div style={styles.visualStat}>
            <div style={styles.visualStatVal}>A</div>
            <div style={styles.visualStatLabel}>Usability Grade</div>
          </div>
          <div style={styles.visualStat}>
            <div style={styles.visualStatVal}>20+</div>
            <div style={styles.visualStatLabel}>API Endpoints</div>
          </div>
          <div style={styles.visualStat}>
            <div style={styles.visualStatVal}>3</div>
            <div style={styles.visualStatLabel}>Languages</div>
          </div>
          <div style={styles.visualStat}>
            <div style={styles.visualStatVal}>OCR</div>
            <div style={styles.visualStatLabel}>+ Voice + Text</div>
          </div>
          <div style={styles.visualStat}>
            <div style={styles.visualStatVal}>Mobile</div>
            <div style={styles.visualStatLabel}>Expo APK</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="card" style={{ ...styles.card, borderTop: `3px solid ${project.color}` }}>
      <div style={styles.cardTop}>
        <span style={{ ...styles.cardAccent, background: project.color }} />
        <div style={styles.cardLinks}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" style={styles.iconLink} title="GitHub">
              <GithubIcon />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" style={styles.iconLink} title="Live Demo">
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>
      <h3 style={styles.cardName}>{project.name}</h3>
      <p style={styles.cardSubtitle}>{project.subtitle}</p>
      <p style={styles.cardDesc}>{project.description}</p>
      <div style={styles.cardTech}>
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="tech-badge">{t}</span>
        ))}
        {project.tech.length > 4 && (
          <span className="tech-badge">+{project.tech.length - 4}</span>
        )}
      </div>
    </div>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.03-.01-2.02-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

const styles = {
  section: {
    background: 'rgba(240,245,255,0.42)',
    backdropFilter: 'blur(18px) saturate(150%)',
    WebkitBackdropFilter: 'blur(18px) saturate(150%)',
    borderTop: '1px solid rgba(226,232,240,0.6)',
    borderBottom: '1px solid rgba(226,232,240,0.6)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16,
  },
  featured: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: 0,
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(226,232,240,0.8)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  },
  featuredLeft: {
    padding: 40,
    borderRight: '1px solid var(--border)',
  },
  featuredBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--blue)',
    background: 'var(--blue-pale)',
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  featuredName: {
    fontFamily: 'var(--font-display)',
    fontSize: 28,
    fontWeight: 800,
    color: 'var(--text-dark)',
    marginBottom: 6,
  },
  featuredSubtitle: {
    fontSize: 15,
    color: 'var(--blue)',
    fontWeight: 600,
    marginBottom: 16,
  },
  featuredDesc: {
    fontSize: 14,
    color: 'var(--text-mid)',
    lineHeight: 1.75,
    marginBottom: 20,
  },
  featuredTech: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 24,
  },
  featuredLinks: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  noteTag: {
    fontSize: 12,
    color: 'var(--text-light)',
    fontStyle: 'italic',
  },
  featuredRight: {
    background: 'linear-gradient(135deg, var(--blue-pale) 0%, #f0f5ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  featuredVisual: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    width: '100%',
  },
  visualStat: {
    background: 'var(--white)',
    borderRadius: 10,
    padding: '14px 16px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--border)',
  },
  visualStatVal: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 22,
    color: 'var(--blue)',
    lineHeight: 1,
    marginBottom: 4,
  },
  visualStatLabel: {
    fontSize: 10,
    color: 'var(--text-muted)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardAccent: {
    display: 'inline-block',
    width: 36,
    height: 6,
    borderRadius: 999,
    boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
  },
  cardLinks: {
    display: 'flex',
    gap: 8,
  },
  iconLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 8,
    border: '1px solid var(--border)',
    color: 'var(--text-light)',
    transition: 'all 0.2s',
  },
  cardName: {
    fontFamily: 'var(--font-display)',
    fontSize: 18,
    fontWeight: 700,
    color: 'var(--text-dark)',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'var(--blue)',
    fontWeight: 600,
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 13,
    color: 'var(--text-light)',
    lineHeight: 1.7,
    flex: 1,
    marginBottom: 16,
  },
  cardTech: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
}

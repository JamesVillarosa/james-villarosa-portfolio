import { skills } from '../data/portfolioData'
import { useInView } from '../hooks/useInView'

const CATEGORY_ICONS = {
  Languages: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Backend: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
    </svg>
  ),
  Frontend: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  Databases: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  ),
  'DevOps & Tools': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  'AI APIs & Models': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0-4 4 4 4 0 0 0 4 4v2a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-2a4 4 0 0 0 4-4 4 4 0 0 0-4-4V6a4 4 0 0 0-4-4z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  'AI Tooling & Workflows': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
}

export default function Skills() {
  const [ref, inView] = useInView()
  const categories = Object.entries(skills)

  return (
    <section id="skills" style={styles.section}>
      <div className="container" ref={ref}>
        <div className={`fade-up ${inView ? 'visible' : ''}`} style={{ marginBottom: 48 }}>
          <p className="section-label">Tech Stack</p>
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Technologies I work with regularly, from backend APIs to AI integrations.
          </p>
        </div>

        <div style={styles.grid}>
          {categories.map(([category, items], i) => (
            <div
              key={category}
              className={`fade-up delay-${Math.min(i + 1, 6)} ${inView ? 'visible' : ''}`}
              style={styles.categoryCard}
            >
              <div style={styles.categoryHeader}>
                <span style={styles.categoryIcon}>{CATEGORY_ICONS[category]}</span>
                <h3 style={styles.categoryTitle}>{category}</h3>
              </div>
              <div style={styles.badgeRow}>
                {items.map((skill) => (
                  <span key={skill} className="tech-badge" style={styles.badge}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`fade-up delay-6 ${inView ? 'visible' : ''}`}
          style={styles.bottomNote}
        >
          <div style={styles.noteInner}>
            <span style={styles.noteIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </span>
            <p style={styles.noteText}>
              Always learning. Currently exploring advanced RAG pipelines, vector databases, and cloud deployment patterns.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    background: 'transparent',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  categoryCard: {
    background: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(226,232,240,0.8)',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    boxShadow: 'var(--shadow-sm)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid var(--border-light)',
  },
  categoryIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'var(--blue-pale)',
    color: 'var(--blue)',
    flexShrink: 0,
  },
  categoryTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 15,
    color: 'var(--text-dark)',
  },
  badgeRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    fontSize: 13,
    padding: '5px 12px',
  },
  bottomNote: {
    marginTop: 8,
  },
  noteInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: 'rgba(239,246,255,0.7)',
    border: '1px solid rgba(219,234,254,0.9)',
    borderRadius: 'var(--radius-lg)',
    padding: '18px 24px',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  noteIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--blue)',
    flexShrink: 0,
  },
  noteText: {
    fontSize: 14,
    color: 'var(--text-mid)',
    lineHeight: 1.6,
  },
}

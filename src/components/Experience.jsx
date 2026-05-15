import { experience } from '../data/portfolioData'
import { useInView } from '../hooks/useInView'

export default function Experience() {
  const [ref, inView] = useInView()

  return (
    <section id="experience">
      <div className="container" ref={ref}>
        <div className={`fade-up ${inView ? 'visible' : ''}`} style={{ marginBottom: 48 }}>
          <p className="section-label">Where I've Worked</p>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">Building real products in production environments.</p>
        </div>

        <div style={styles.timeline}>
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ exp, index, inView }) {
  return (
    <div
      className={`fade-up delay-${index + 1} ${inView ? 'visible' : ''}`}
      style={styles.item}
    >
      {/* Timeline dot + line */}
      <div style={styles.timelineSide}>
        <div style={styles.dot}>
          <div style={styles.dotInner} />
        </div>
        {index < experience.length - 1 && <div style={styles.line} />}
      </div>

      {/* Content */}
      <div className="card" style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <div style={styles.typePill}>{exp.type}</div>
            <h3 style={styles.role}>{exp.role}</h3>
            <div style={styles.company}>{exp.company}</div>
          </div>
          <div style={styles.metaRight}>
            <div style={styles.period}>{exp.period}</div>
            <div style={styles.location}>{exp.location}</div>
          </div>
        </div>

        {exp.description && (
          <p style={styles.description}>{exp.description}</p>
        )}

        <ul style={styles.bullets}>
          {exp.bullets.map((bullet, bi) => (
            <li key={bi} style={styles.bullet}>
              <span style={styles.bulletDot} />
              {bullet}
            </li>
          ))}
        </ul>

        {exp.tech.length > 0 && (
          <div style={styles.techRow}>
            {exp.tech.map((t) => (
              <span key={t} className="tech-badge">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  item: {
    display: 'flex',
    gap: 24,
    alignItems: 'flex-start',
  },
  timelineSide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 28,
    flexShrink: 0,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: 'var(--blue-pale)',
    border: '2px solid var(--blue)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    zIndex: 1,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--blue)',
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 40,
    background: 'linear-gradient(180deg, var(--blue-subtle) 0%, var(--border) 100%)',
    margin: '4px 0',
  },
  card: {
    flex: 1,
    marginBottom: 24,
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  typePill: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--blue-subtle)',
    color: 'var(--blue)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  role: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--text-dark)',
    lineHeight: 1.2,
  },
  company: {
    fontSize: 15,
    color: 'var(--blue)',
    fontWeight: 600,
    marginTop: 4,
  },
  metaRight: {
    textAlign: 'right',
    flexShrink: 0,
  },
  period: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-mid)',
    fontFamily: 'var(--font-display)',
  },
  location: {
    fontSize: 12,
    color: 'var(--text-muted)',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: 'var(--text-light)',
    fontStyle: 'italic',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottom: '1px solid var(--border-light)',
  },
  bullets: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 16,
  },
  bullet: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: 14,
    color: 'var(--text-mid)',
    lineHeight: 1.65,
  },
  bulletDot: {
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--blue-light)',
    marginTop: 8,
    flexShrink: 0,
  },
  techRow: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    paddingTop: 12,
    borderTop: '1px solid var(--border-light)',
  },
}

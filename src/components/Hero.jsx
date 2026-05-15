import { personal } from '../data/portfolioData'

export default function Hero({ scrollTo }) {
  return (
    <section id="hero" style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={styles.textSide}>
          <div style={styles.greeting}>
            <span style={styles.greetingDot} />
            <span style={styles.greetingText}>Available for remote work</span>
          </div>

          <h1 style={styles.name}>
            <span style={styles.nameHi}>Hi, I'm</span>
            <span style={styles.nameMain}>James Carl</span>
            <span style={styles.nameLast}>Villarosa.</span>
          </h1>

          <div style={styles.titleRow}>
            <span style={styles.titlePill}>Backend Dev</span>
            <span style={styles.titleDivider}>·</span>
            <span style={styles.titlePill}>Full Stack</span>
            <span style={styles.titleDivider}>·</span>
            <span style={styles.titlePill}>AI Engineer</span>
          </div>

          <p style={styles.tagline}>
            Building intelligent systems with Python, FastAPI, and React.
            <br />
            Computer Science at <strong style={{ color: 'var(--blue)' }}>UPLB</strong>.
          </p>

          <div style={styles.ctaRow}>
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              View Projects
              <span style={styles.arrow}>→</span>
            </button>
            <a
              className="btn btn-outline"
              href={`mailto:${personal.email}?subject=Hello%20James`}
            >
              Say Hello
            </a>
          </div>

          <div style={styles.statsRow}>
            {[
              { value: '1.64', label: 'GWA' },
              { value: '678+', label: 'Contributions' },
              { value: '7+', label: 'Projects' },
            ].map((s) => (
              <div key={s.label} style={styles.statItem}>
                <span style={styles.statValue}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.photoSide} className="hero-photo-side">
          <div style={styles.photoOuter}>
            <div style={styles.photoRing} />
            <div style={styles.photoInner}>
              <img
                src={personal.photo}
                alt="James Carl V. Villarosa"
                style={styles.photo}
                onError={(e) => {
                  e.target.style.display = 'none'
                  const fb = e.target.nextSibling
                  if (fb) fb.style.display = 'flex'
                }}
              />
              <div style={styles.photoFallback}>
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                  <circle cx="45" cy="38" r="22" fill="#dbeafe" />
                  <ellipse cx="45" cy="80" rx="34" ry="24" fill="#dbeafe" />
                </svg>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 8, textAlign: 'center' }}>
                  Add james-photo.jpg<br />to /public folder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.scrollIndicator} onClick={() => scrollTo('about')}>
        <div style={styles.scrollMouse}>
          <div style={styles.scrollWheel} />
        </div>
        <span style={styles.scrollText}>Scroll</span>
      </div>

      <style>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.4; }
        }
        @keyframes photo-ring-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 820px) {
          .hero-container { flex-direction: column-reverse !important; align-items: center !important; text-align: center !important; }
          .hero-photo-side { margin-bottom: 32px !important; }
          .hero-title-row { justify-content: center !important; }
          .hero-cta-row { justify-content: center !important; }
          .hero-stats-row { justify-content: center !important; }
          .hero-greeting { justify-content: center !important; }
          .hero-name { text-align: center !important; }
        }
      `}</style>
    </section>
  )
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: 60,
    paddingBottom: 60,
  },
  container: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 64,
    paddingTop: 20,
    paddingBottom: 20,
  },
  textSide: {
    flex: '1 1 0',
    maxWidth: 600,
  },
  greeting: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28,
    padding: '7px 14px',
    background: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(37,99,235,0.12)',
    borderRadius: 'var(--radius-full)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  },
  greetingDot: {
    display: 'inline-block',
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#22c55e',
    boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
  },
  greetingText: {
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--text-mid)',
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    marginBottom: 24,
    lineHeight: 1.05,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  nameHi: {
    fontSize: 'clamp(16px, 2.4vw, 20px)',
    fontWeight: 400,
    color: 'var(--text-light)',
    fontFamily: 'var(--font-body)',
    fontStyle: 'italic',
    letterSpacing: '0.01em',
    marginBottom: 4,
  },
  nameMain: {
    fontSize: 'clamp(44px, 7vw, 76px)',
    color: 'var(--text-dark)',
    letterSpacing: '-0.025em',
  },
  nameLast: {
    fontSize: 'clamp(44px, 7vw, 76px)',
    color: 'var(--blue)',
    letterSpacing: '-0.025em',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  titlePill: {
    fontFamily: 'var(--font-display)',
    fontSize: 12,
    fontWeight: 700,
    color: 'var(--blue)',
    background: 'rgba(239,246,255,0.85)',
    border: '1px solid rgba(37,99,235,0.12)',
    padding: '5px 13px',
    borderRadius: 'var(--radius-full)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
  },
  titleDivider: {
    color: 'var(--text-muted)',
    fontWeight: 300,
  },
  tagline: {
    fontSize: 17,
    color: 'var(--text-mid)',
    lineHeight: 1.7,
    marginBottom: 36,
    fontWeight: 400,
    maxWidth: 520,
  },
  ctaRow: {
    display: 'flex',
    gap: 12,
    marginBottom: 44,
    flexWrap: 'wrap',
  },
  arrow: {
    transition: 'transform 0.22s ease',
  },
  statsRow: {
    display: 'flex',
    gap: 0,
    borderTop: '1px solid rgba(37,99,235,0.12)',
    paddingTop: 26,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '0 26px 0 0',
    marginRight: 26,
    borderRight: '1px solid rgba(37,99,235,0.08)',
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 28,
    fontWeight: 800,
    color: 'var(--text-dark)',
    letterSpacing: '-0.02em',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 11,
    color: 'var(--text-light)',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  photoSide: {
    position: 'relative',
    flexShrink: 0,
  },
  photoOuter: {
    position: 'relative',
    width: 320,
    height: 320,
  },
  photoRing: {
    position: 'absolute',
    inset: -2,
    borderRadius: '50%',
    background: 'conic-gradient(from 0deg, transparent 0%, rgba(37,99,235,0.35) 25%, transparent 50%, rgba(14,165,233,0.3) 75%, transparent 100%)',
    animation: 'photo-ring-rotate 18s linear infinite',
    zIndex: 0,
  },
  photoInner: {
    position: 'absolute',
    inset: 8,
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'var(--blue-pale)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '6px solid var(--white)',
    boxShadow: '0 20px 60px rgba(15,23,42,0.12), 0 8px 24px rgba(37,99,235,0.1)',
    zIndex: 1,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  photoFallback: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 16,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 32,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
    zIndex: 2,
    opacity: 0.5,
    transition: 'opacity 0.2s',
  },
  scrollMouse: {
    width: 22,
    height: 36,
    border: '2px solid var(--text-muted)',
    borderRadius: 11,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 6,
  },
  scrollWheel: {
    width: 4,
    height: 8,
    background: 'var(--blue)',
    borderRadius: 2,
    animation: 'scroll-bounce 1.5s ease-in-out infinite',
  },
  scrollText: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
  },
}

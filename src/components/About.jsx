import { useEffect, useRef, useState } from 'react'
import { about, education, personal } from '../data/portfolioData'
import '../styles/about.css'

// counts a numeric prefix ("678+" -> 0..678 + "+") once visible; non-numbers render as-is
function Count({ value }) {
  const m = /^([\d.]+)(.*)$/.exec(value)
  const ref = useRef(null)
  const [n, setN] = useState(m ? 0 : null)

  useEffect(() => {
    if (!m || matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(m ? +m[1] : null)
    const target = +m[1]
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1)
        setN(target * (1 - Math.pow(1 - p, 4)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [value])

  if (!m) return <span ref={ref} className="stat-word">{value}</span>
  const decimals = (m[1].split('.')[1] || '').length
  return <span ref={ref}>{n.toFixed(decimals)}{m[2]}</span>
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">01 · About</p>
            <h2 className="h2">CS student at UPLB, shipping production software since 2025.</h2>
          </div>
        </div>

        <div className="bento">
          <figure className="b-photo reveal">
            <img src={personal.photo} alt={`Portrait of ${personal.name}`} width="560" height="700" loading="lazy" />
          </figure>

          <div className="shell b-bio reveal">
            <div className="core spot">
              {about.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div className="b-stats">
            {about.stats.map((s, i) => (
              <div key={s.label} className="shell reveal" style={{ '--i': i }}>
                <div className="core stat spot">
                  <span className="stat-value"><Count value={s.value} /></span>
                  <span className="stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="shell b-edu reveal" style={{ '--i': 1 }}>
            <div className="core spot">
              <span className="card-kicker">Education · {education.period}</span>
              <h3 className="card-title">{education.school}</h3>
              <p className="muted">{education.degree}</p>
              <div className="chips">
                <span className="chip">{education.honors}</span>
                <span className="chip">{education.scholarship}</span>
              </div>
            </div>
          </div>

          <div className="shell b-info reveal" style={{ '--i': 2 }}>
            <dl className="core info spot">
              {about.quickInfo.map((q) => (
                <div key={q.label}><dt>{q.label}</dt><dd>{q.value}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

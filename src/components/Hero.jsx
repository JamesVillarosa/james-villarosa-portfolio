import { useEffect, useRef } from 'react'
import { personal } from '../data/portfolioData'
import Icon from './Icons'
import '../styles/hero.css'

const SPECS = [
  ['Role', 'Backend · Full stack · AI'],
  ['Based in', 'Santa Rosa, PH'],
  ['Open to', personal.available],
]

export default function Hero() {
  const canvas = useRef(null)
  const stage = useRef(null)

  useEffect(() => {
    let cleanup, dead = false
    // three.js loads after first paint so the headline never waits on WebGL
    import('./heroScene').then(({ mountHeroScene }) => {
      if (dead || !canvas.current) return
      try { cleanup = mountHeroScene(canvas.current, stage.current) } catch { /* no WebGL: page still works */ }
    })
    return () => { dead = true; cleanup?.() }
  }, [])

  return (
    <section id="hero" className="hero">
      <p className="hero-ghost" aria-hidden="true">Villarosa</p>
      <canvas ref={canvas} className="hero-canvas" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow status hero-in" style={{ '--i': 0 }}>Available for work</p>
          <h1 className="hero-title hero-in" style={{ '--i': 1 }}>James Carl<br />Villarosa</h1>
          <p className="hero-role hero-in" style={{ '--i': 2 }}>{personal.title}</p>
          <p className="hero-tag hero-in" style={{ '--i': 3 }}>
            CS at UPLB. Team lead at a Japanese software startup, building APIs, dashboards and AI features that run in production.
          </p>
          <a href="#projects" className="btn btn-primary hero-in" style={{ '--i': 4 }}>
            View my work <span className="btn-icon"><Icon name="down" size={16} /></span>
          </a>
        </div>

        <div className="hero-stage" ref={stage} aria-hidden="true" />

        <dl className="hero-specs hero-in" style={{ '--i': 5 }}>
          {SPECS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          <div className="hero-social">
            <a href={personal.github} target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub"><Icon name="github" /></a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="icon-link" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={`mailto:${personal.email}`} className="icon-link" aria-label="Email"><Icon name="mail" /></a>
          </div>
        </dl>
      </div>

      <a href="#about" className="hero-scroll hero-in" style={{ '--i': 6 }}>
        <span className="icon-link"><Icon name="down" size={16} /></span> Scroll
      </a>
    </section>
  )
}

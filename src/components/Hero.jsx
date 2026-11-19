import { useEffect, useRef, useState } from 'react'
import { personal } from '../data/portfolioData'
import Icon from './Icons'
import '../styles/hero.css'

const SPECS = [
  ['Focus', 'AI · Automation · Full stack'],
  ['Based in', 'Santa Rosa, PH'],
  ['Open to', personal.available],
]

const INTRO_MS = 3400 // assemble time; holds at 90% until the 3D scene is ready
const STATUS = ['Booting runtime', 'Streaming data', 'Assembling agents', 'Deploying', 'Live']
const MAX_WAIT = 6000 // never trap the visitor if WebGL is slow or missing

// Intro: navy screen, the V spins centre stage while a counter runs, then the navy irises into the V.
function useIntro() {
  const [skip] = useState(() => {
    try { return matchMedia('(prefers-reduced-motion: reduce)').matches || !!sessionStorage.getItem('intro-seen') }
    catch { return false }
  })
  const [p, setP] = useState(0)
  const [phase, setPhase] = useState(skip ? 'done' : 'load')

  useEffect(() => {
    if (skip) return
    const root = document.documentElement
    try { sessionStorage.setItem('intro-seen', '1') } catch { /* ignore */ }
    root.classList.add('is-loading')
    scrollTo(0, 0)
    let raf, t0, timer
    const tick = (t) => {
      t0 ??= t
      const el = t - t0
      const prog = Math.min(el / INTRO_MS, window.__heroReady || el > MAX_WAIT ? 1 : 0.9)
      setP(prog)
      if (prog < 1) { raf = requestAnimationFrame(tick); return }
      root.classList.remove('is-loading')
      setPhase('out')
      timer = setTimeout(() => setPhase('done'), 1400)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); root.classList.remove('is-loading') }
  }, [skip])

  return { p, phase }
}

export default function Hero() {
  const canvas = useRef(null)
  const stage = useRef(null)
  const { p, phase } = useIntro()

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
      {phase !== 'done' && (
        <div className={`intro ${phase === 'out' ? 'is-out' : ''}`} aria-hidden="true">
          <span className="intro-name">James Carl Villarosa</span>
          <span className="intro-status">{STATUS[Math.min(Math.floor(p * STATUS.length), STATUS.length - 1)]}</span>
          <span className="intro-line"><i style={{ transform: `scaleX(${p})` }} /></span>
          <span className="intro-count">{String(Math.round(p * 100)).padStart(3, '0')}</span>
        </div>
      )}
      <canvas ref={canvas} className="hero-canvas" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow status hero-in" style={{ '--i': 0 }}>Available for work</p>
          <h1 className="hero-title hero-in" style={{ '--i': 1 }}>James Carl<br />Villarosa</h1>
          <p className="hero-role hero-in" style={{ '--i': 2 }}>{personal.title}</p>
          <p className="hero-tag hero-in" style={{ '--i': 3 }}>
            Sole AI and automation engineer at a UK ecommerce company. I build the platform, the n8n automations and the AI agents that run its operations.
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

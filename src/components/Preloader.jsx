import { useEffect, useState } from 'react'
import '../styles/preloader.css'

const WORDS = ['Backend', 'Full stack', 'AI engineer', 'Villarosa']
const DURATION = 1900 // ms of counting; holds at 90 until the 3D scene reports ready
const MAX_WAIT = 5000 // never trap the visitor if WebGL is slow or missing

// Intro show: words flash while a counter runs, then two curtains sweep up. Once per session.
export default function Preloader() {
  const [skip] = useState(() => {
    try {
      return matchMedia('(prefers-reduced-motion: reduce)').matches || !!sessionStorage.getItem('intro-seen')
    } catch { return false } // storage blocked: just play it
  })
  const [p, setP] = useState(0)
  const [phase, setPhase] = useState(skip ? 'gone' : 'count')

  useEffect(() => {
    if (skip) return
    const root = document.documentElement
    try { sessionStorage.setItem('intro-seen', '1') } catch { /* ignore */ }
    root.classList.add('is-loading')
    let raf, t0, timer
    const tick = (t) => {
      t0 ??= t
      const el = t - t0
      const ready = window.__heroReady || el > MAX_WAIT
      const prog = Math.min(el / DURATION, ready ? 1 : 0.9)
      setP(prog)
      if (prog < 1) { raf = requestAnimationFrame(tick); return }
      setPhase('lift')
      root.classList.remove('is-loading')
      timer = setTimeout(() => setPhase('gone'), 1100) // curtain is 900ms + 120ms stagger
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); root.classList.remove('is-loading') }
  }, [skip])

  if (phase === 'gone') return null
  const n = Math.round(p * 100)
  const word = WORDS[Math.min(Math.floor(p * WORDS.length), WORDS.length - 1)]

  return (
    <div className={`loader ${phase === 'lift' ? 'is-lifting' : ''}`} aria-hidden="true">
      <div className="loader-hot" />
      <div className="loader-panel">
        <span className="loader-word" key={word}>{word}</span>
        <span className="loader-meta">James Carl Villarosa · Portfolio</span>
        <span className="loader-count">{String(n).padStart(3, '0')}</span>
        <span className="loader-bar" style={{ transform: `scaleX(${p})` }} />
      </div>
    </div>
  )
}

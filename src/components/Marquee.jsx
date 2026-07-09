import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { velocity } from '../motion/LenisProvider'
import { prefersReducedMotion } from '../motion/prefersReducedMotion'

const ITEMS = [
  'Backend Engineering',
  'Full Stack Development',
  'AI & LLM Integration',
  'Database Architecture',
  'Mobile Apps',
  'DevOps',
]

/** Seamless marquee; speed and skew react to scroll velocity. */
export default function Marquee() {
  const trackRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const track = trackRef.current
    const wrap = wrapRef.current
    if (!track || !wrap) return

    let x = 0
    let paused = false
    const half = () => track.scrollWidth / 2

    const tick = (time, delta) => {
      if (paused) return
      const v = Math.min(Math.abs(velocity.value), 30)
      const speed = (60 + v * 14) * (delta / 1000)
      x -= speed
      const h = half()
      if (h > 0 && -x >= h) x += h
      track.style.transform = `translateX(${x}px)`
      wrap.style.transform = `skewX(${gsap.utils.clamp(-4, 4, -velocity.value * 0.18)}deg)`
    }
    gsap.ticker.add(tick)

    const over = () => (paused = true)
    const out = () => (paused = false)
    wrap.addEventListener('mouseenter', over)
    wrap.addEventListener('mouseleave', out)
    return () => {
      gsap.ticker.remove(tick)
      wrap.removeEventListener('mouseenter', over)
      wrap.removeEventListener('mouseleave', out)
    }
  }, [])

  const row = (hidden) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {ITEMS.map((item, i) => (
        <span className="marquee-item" key={i}>
          {item}
          <span className="marquee-diamond" aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" ref={wrapRef}>
      <div className="marquee-track" ref={trackRef}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

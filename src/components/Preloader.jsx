import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../motion/prefersReducedMotion'

/**
 * Intro sequence before the site is revealed:
 * ink-dark screen → name letters rise in → counter runs 0–100 →
 * name exits, double panel wipes upward, hero choreography starts.
 * Calls onComplete() when the reveal begins (hero animates under the wipe).
 */
const NAME = 'JAMES VILLAROSA'
const SEEN_KEY = 'jcv-intro-seen'

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function Preloader({ onComplete }) {
  const rootRef = useRef(null)
  const counterRef = useRef(null)
  const barRef = useRef(null)
  const [gone, setGone] = useState(() => alreadySeen())

  useEffect(() => {
    if (alreadySeen()) {
      onComplete()
      return
    }
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch { /* private mode */ }

    const root = rootRef.current
    if (!root) return

    if (prefersReducedMotion()) {
      onComplete()
      const t = gsap.to(root, {
        opacity: 0,
        duration: 0.4,
        delay: 0.3,
        onComplete: () => setGone(true),
      })
      return () => t.kill()
    }

    const letters = root.querySelectorAll('.pl-letter')
    const counter = { v: 0 }
    const tl = gsap.timeline()

    tl.to(letters, {
      yPercent: 0,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.035,
      delay: 0.15,
    })
      .to(
        counter,
        {
          v: 100,
          duration: 1.5,
          ease: 'power3.inOut',
          onUpdate: () => {
            if (counterRef.current)
              counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
            if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`
          },
        },
        0.3
      )
      .to(letters, {
        yPercent: -110,
        duration: 0.7,
        ease: 'expo.in',
        stagger: 0.02,
      }, '-=0.1')
      .to('.pl-meta', { opacity: 0, duration: 0.3 }, '<')
      // Blue panel sweeps up from below to cover the ink screen…
      .fromTo(
        '.pl-panel--blue',
        { yPercent: 100 },
        { yPercent: 0, duration: 0.6, ease: 'power3.inOut' },
        '-=0.2'
      )
      .add(() => onComplete())
      // …then continues upward, revealing the page
      .to('.pl-panel--blue', { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '+=0.05')
      .add(() => setGone(true))

    return () => tl.kill()
  }, [onComplete])

  if (gone) return null

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="pl-panel pl-panel--ink">
        <div className="pl-center">
          <div className="pl-name">
            {NAME.split('').map((ch, i) =>
              ch === ' ' ? (
                <span key={i} className="pl-space" />
              ) : (
                <span key={i} className="pl-mask">
                  <span className="pl-letter">{ch}</span>
                </span>
              )
            )}
          </div>
        </div>
        <div className="pl-meta">
          <span className="pl-tag">PORTFOLIO — 2026</span>
          <span ref={counterRef} className="pl-counter tabular">000</span>
        </div>
        <div className="pl-bar">
          <div ref={barRef} className="pl-bar-fill" />
        </div>
      </div>
      <div className="pl-panel pl-panel--blue" />
    </div>
  )
}

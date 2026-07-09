import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../motion/prefersReducedMotion'
import { personal } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export default function Footer({ scrollTo }) {
  const closerRef = useRef(null)

  useEffect(() => {
    const el = closerRef.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.transform = 'translateY(0)'
      return
    }
    gsap.set(el, { yPercent: 60 })
    const tween = gsap.to(el, {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 0.6,
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-col">
          <span className="mono-label">Site</span>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('experience')}>Experience</button>
          <button onClick={() => scrollTo('projects')}>Work</button>
        </div>
        <div className="footer-col">
          <span className="mono-label">Elsewhere</span>
          <a href={personal.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${personal.email}`}>Email</a>
        </div>
        <div className="footer-col footer-col--status">
          <span className="mono-label">Status</span>
          <p>
            <span className="footer-dot" aria-hidden="true" /> Available for new work
          </p>
          <p className="footer-copy">© {year} James Carl V. Villarosa</p>
        </div>
      </div>

      <div className="footer-closer" aria-hidden="true">
        <div className="footer-closer-text" ref={closerRef}>
          VILLAROSA
        </div>
      </div>
    </footer>
  )
}

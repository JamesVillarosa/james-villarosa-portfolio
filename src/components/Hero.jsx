import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import RevealText from '../motion/RevealText'
import DrawLine from '../motion/DrawLine'
import { prefersReducedMotion } from '../motion/prefersReducedMotion'
import { personal } from '../data/portfolioData'

const HeroScene = lazy(() => import('./HeroScene'))

const META = [
  { label: 'Based in', value: 'Santa Rosa, Philippines' },
  { label: 'Focus', value: 'Backend · AI · Full Stack' },
  { label: 'Open to', value: 'Remote / Full-time' },
]

export default function Hero({ ready }) {
  const metaRef = useRef(null)
  const cueRef = useRef(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (!ready || reduced) return
    const items = metaRef.current?.querySelectorAll('.hero-meta-item')
    const tweens = []
    if (items?.length) {
      tweens.push(
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.09, delay: 1.1 }
        )
      )
    }
    if (cueRef.current) {
      tweens.push(
        gsap.fromTo(cueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 1.6 })
      )
    }
    return () => tweens.forEach((t) => t.kill())
  }, [ready, reduced])

  return (
    <section id="hero" className="hero">
      <div className="hero-canvas-wrap" aria-hidden="true">
        <Suspense fallback={<div className="hero-orb-fallback" />}>
          <HeroScene ready={ready} />
        </Suspense>
      </div>

      <div className="container hero-inner">
        <RevealText as="p" className="hero-kicker" trigger={ready} delay={0.15}>
          {personal.name} — Backend-focused full stack developer & AI engineer
        </RevealText>

        <h1 className="hero-title">
          <RevealText as="span" className="hero-title-line" trigger={ready} delay={0.3}>
            I build systems
          </RevealText>
          <RevealText as="span" className="hero-title-line" trigger={ready} delay={0.42}>
            that work, scale,
          </RevealText>
          <RevealText as="span" className="hero-title-line" trigger={ready} delay={0.54}>
            <em>and last.</em>
          </RevealText>
        </h1>

        <div className="hero-meta" ref={metaRef}>
          <DrawLine />
          <div className="hero-meta-row">
            {META.map((m) => (
              <div
                className="hero-meta-item"
                key={m.label}
                style={reduced ? undefined : { opacity: 0 }}
              >
                <span className="hero-meta-label">{m.label}</span>
                <span className="hero-meta-value">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="hero-cue"
        ref={cueRef}
        style={reduced ? undefined : { opacity: 0 }}
        aria-hidden="true"
      >
        <span className="hero-cue-line" />
        <span className="hero-cue-text">Scroll</span>
      </div>
    </section>
  )
}

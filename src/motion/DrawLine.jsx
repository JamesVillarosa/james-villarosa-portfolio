import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './prefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/** Hairline that draws itself left→right on enter. */
export default function DrawLine({ className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.transform = 'scaleX(1)'
      return
    }
    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(el, { scaleX: 1, duration: 1.3, ease: 'expo.out', delay })
      },
    })
    return () => st.kill()
  }, [delay])

  return <div ref={ref} className={`draw-line ${className}`} aria-hidden="true" />
}

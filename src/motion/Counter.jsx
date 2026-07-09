import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './prefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/** Counts 0 → value on first viewport entry. Accepts "1.64", "678+", "150%+", "7+". */
export default function Counter({ value, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const match = String(value).match(/^([\d.]+)(.*)$/)
    if (!match || prefersReducedMotion()) {
      el.textContent = value
      return
    }
    const target = parseFloat(match[1])
    const suffix = match[2] || ''
    const decimals = (match[1].split('.')[1] || '').length
    const obj = { v: 0 }
    el.textContent = (0).toFixed(decimals) + suffix

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'expo.out',
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals) + suffix
          },
        })
      },
    })
    return () => st.kill()
  }, [value])

  return <span ref={ref} className={`tabular ${className}`} />
}

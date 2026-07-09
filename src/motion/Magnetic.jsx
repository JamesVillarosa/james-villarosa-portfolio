import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion, isTouchDevice } from './prefersReducedMotion'

/** Element eases toward cursor within its bounds, springs back on leave. */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || isTouchDevice()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.4)' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return (
    <div ref={ref} className={`magnetic ${className}`} style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}

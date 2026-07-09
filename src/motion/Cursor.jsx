import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion, isTouchDevice } from './prefersReducedMotion'

/**
 * Custom cursor: small blue dot + trailing ring. Ring grows and shows a label
 * over elements with [data-cursor="Label"]. Desktop pointer only — elements
 * stay hidden (CSS) until .has-cursor is set on <html>.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return
    document.documentElement.classList.add('has-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      const labelled = e.target.closest('[data-cursor]')
      const interactive = e.target.closest('a, button, [role="button"], input, textarea, select, label')
      setLabel(labelled?.dataset.cursor || '')
      ring.classList.toggle('is-label', !!labelled?.dataset.cursor)
      ring.classList.toggle('is-hover', !!interactive && !labelled?.dataset.cursor)
      const invert = e.target.closest('[data-cursor-invert]')
      ring.classList.toggle('is-invert', !!invert)
      dot.classList.toggle('is-invert', !!invert)
    }
    const onDown = () => ring.classList.add('is-down')
    const onUp = () => ring.classList.remove('is-down')

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-label">{label}</span>
      </div>
    </>
  )
}

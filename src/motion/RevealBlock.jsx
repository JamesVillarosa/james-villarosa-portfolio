import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './prefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/** Opacity 0→1 + y 32→0 on enter. Children stagger if stagger > 0. */
export default function RevealBlock({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  stagger = 0,
  y = 32,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      gsap.set(el.children.length && stagger ? el.children : el, { opacity: 1, y: 0 })
      return
    }

    const targets = stagger ? Array.from(el.children) : el
    gsap.set(targets, { opacity: 0, y })

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger,
          delay,
        })
      },
    })
    return () => st.kill()
  }, [delay, stagger, y])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}

import { useEffect, createContext, useContext, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, isTouchDevice } from './prefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

// Smoothed scroll velocity, readable from anywhere (marquee speed, skew).
export const velocity = { value: 0 }

export default function LenisProvider({ children, ready }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', (e) => {
      velocity.value += (e.velocity - velocity.value) * 0.1
      ScrollTrigger.update()
    })

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Freeze scroll while the preloader plays.
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (ready) lenis.start()
    else lenis.stop()
  }, [ready])

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  )
}

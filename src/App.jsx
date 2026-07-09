import { useState, useEffect, useCallback } from 'react'
import LenisProvider, { useLenis } from './motion/LenisProvider'
import Cursor from './motion/Cursor'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

const SECTIONS = ['hero', 'about', 'experience', 'projects', 'skills', 'contact']

function Page({ ready }) {
  const lenisRef = useLenis()
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 140
      let current = 'hero'
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback(
    (id) => {
      const el = document.getElementById(id)
      if (!el) return
      const offset = id === 'hero' ? 0 : 72
      const lenis = lenisRef?.current
      if (lenis) lenis.scrollTo(el, { offset: -offset, duration: 1.4 })
      else {
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    [lenisRef]
  )

  return (
    <>
      <Navbar activeSection={activeSection} scrollTo={scrollTo} ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer scrollTo={scrollTo} />
    </>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const onComplete = useCallback(() => setReady(true), [])

  return (
    <LenisProvider ready={ready}>
      <Cursor />
      <Preloader onComplete={onComplete} />
      <Page ready={ready} />
      <div className="grain" aria-hidden="true" />
    </LenisProvider>
  )
}

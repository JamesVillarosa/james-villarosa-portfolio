import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    // one observer for every .reveal element (fires once)
    const reveal = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target) }
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el))

    // active section = the one crossing the viewport's middle line
    const spy = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
    }, { rootMargin: '-50% 0px -50% 0px' })
    document.querySelectorAll('main section[id]').forEach((el) => spy.observe(el))

    // cursor spotlight for any .spot card
    const onMove = (e) => {
      const card = e.target.closest?.('.spot')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--x', `${e.clientX - r.left}px`)
      card.style.setProperty('--y', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => { reveal.disconnect(); spy.disconnect(); window.removeEventListener('pointermove', onMove) }
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="progress" aria-hidden="true" />
      <Navbar active={active} />
      <main id="main">
        <Hero />
        <div className="band" aria-hidden="true">
          <div className="band-track">
            {Array.from({ length: 2 }, (_, i) => (
              <span key={i}>Backend systems <b>✕</b> Full stack apps <b>✕</b> AI integrations <b>✕</b> Production deploys <b>✕</b>&nbsp;</span>
            ))}
          </div>
        </div>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

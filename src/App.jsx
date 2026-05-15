import { useState, useEffect } from 'react'
import Aurora from './components/Aurora'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

const SECTIONS = ['hero', 'about', 'experience', 'projects', 'skills', 'contact']

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Progress bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)

      // Active section tracking
      const scrollY = window.scrollY + 120
      let current = 'hero'
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = id === 'hero' ? 0 : 68
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Aurora />
      <Navbar
        activeSection={activeSection}
        scrollTo={scrollTo}
        scrollProgress={scrollProgress}
      />
      <main>
        <Hero scrollTo={scrollTo} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer scrollTo={scrollTo} />
    </div>
  )
}

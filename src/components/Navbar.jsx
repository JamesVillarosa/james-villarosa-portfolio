import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { personal } from '../data/portfolioData'
import '../styles/nav.css'

const LINKS = ['about', 'experience', 'projects', 'skills', 'contact']

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false)
  const listRef = useRef(null)
  const pillRef = useRef(null)

  // slide the active pill under the current link
  useLayoutEffect(() => {
    const link = listRef.current?.querySelector(`[data-id="${active}"]`)
    const pill = pillRef.current
    if (!pill) return
    if (!link) { pill.style.opacity = 0; return }
    pill.style.opacity = 1
    pill.style.width = `${link.offsetWidth}px`
    pill.style.transform = `translateX(${link.offsetLeft}px)`
  }, [active])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary">
        <a href="#hero" className="nav-logo" aria-label="Back to top" onClick={() => setOpen(false)}>
          <img src="/villarosa-logo.png" alt="" width="28" height="28" />
        </a>
        <ul className="nav-links" ref={listRef}>
          <li className="nav-pill" ref={pillRef} aria-hidden="true" />
          {LINKS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} data-id={id} aria-current={active === id ? 'true' : undefined}
                className={active === id ? 'is-active' : ''}>{id}</a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${personal.email}`} className="nav-cta">Let's talk</a>
        <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          <span /><span />
        </button>
      </nav>

      <div id="mobile-menu" className={`menu ${open ? 'is-open' : ''}`} inert={!open ? '' : undefined}>
        <ul>
          {LINKS.map((id, i) => (
            <li key={id} style={{ '--i': i }}>
              <a href={`#${id}`} onClick={() => setOpen(false)}>
                <span className="menu-num">0{i + 1}</span>{id}
              </a>
            </li>
          ))}
        </ul>
        <a href={`mailto:${personal.email}`} className="menu-mail" style={{ '--i': LINKS.length }}>{personal.email}</a>
      </div>
    </header>
  )
}

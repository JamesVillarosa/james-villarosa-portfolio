import { useState } from 'react'
import { personal } from '../data/portfolioData'
import Icon from './Icons'
import '../styles/contact.css'

const LINKS = [
  { icon: 'linkedin', label: 'LinkedIn', value: 'in/james-villarosa', href: personal.linkedin },
  { icon: 'github', label: 'GitHub', value: '@JamesVillarosa', href: personal.github },
  { icon: 'phone', label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
  { icon: 'pin', label: 'Based in', value: 'Santa Rosa, PH' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { window.location.href = `mailto:${personal.email}` }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-hero reveal">
          <p className="eyebrow">05 · Contact</p>
          <h2 className="contact-title">Let's talk.</h2>
          <p className="lede">Open to remote and full-time roles in backend, full-stack, and AI engineering.</p>

          <div className="mail-row">
            <a href={`mailto:${personal.email}`} className="btn btn-primary">
              Email me <span className="btn-icon"><Icon name="arrow" size={16} /></span>
            </a>
            <button className="btn btn-ghost has-icon copy" onClick={copy} aria-live="polite">
              <span className="copy-text">{copied ? 'Copied to clipboard' : personal.email}</span>
              <span className="btn-icon" key={copied}><Icon name={copied ? 'check' : 'copy'} size={16} /></span>
            </button>
          </div>
        </div>

        <ul className="c-grid">
          {LINKS.map((l, i) => {
            const Tag = l.href ? 'a' : 'div'
            const ext = l.href?.startsWith('http')
            return (
              <li key={l.label} className="shell reveal" style={{ '--i': i }}>
                <Tag className="core spot c-card" {...(l.href && { href: l.href })} {...(ext && { target: '_blank', rel: 'noreferrer' })}>
                  <Icon name={l.icon} size={20} />
                  <span className="c-label">{l.label}</span>
                  <span className="c-value">{l.value}</span>
                  {l.href && <span className="c-arrow"><Icon name="arrow" size={16} /></span>}
                </Tag>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

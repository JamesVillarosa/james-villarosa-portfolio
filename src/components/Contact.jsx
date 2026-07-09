import RevealText from '../motion/RevealText'
import RevealBlock from '../motion/RevealBlock'
import Magnetic from '../motion/Magnetic'
import { personal } from '../data/portfolioData'

export default function Contact() {
  return (
    <section id="contact" className="contact" data-cursor-invert>
      <div className="container contact-inner">
        <RevealText as="h2" className="contact-title">
          Let&rsquo;s build something <em>that lasts.</em>
        </RevealText>

        <RevealBlock className="contact-actions" delay={0.15}>
          <Magnetic strength={0.25}>
            <a className="contact-pill" href={`mailto:${personal.email}`}>
              {personal.email}
            </a>
          </Magnetic>
        </RevealBlock>

        <RevealBlock className="contact-meta" delay={0.25} stagger={0.08}>
          <div className="contact-meta-item">
            <span className="contact-meta-label">Socials</span>
            <div className="contact-meta-links">
              <a href={personal.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <div className="contact-meta-item">
            <span className="contact-meta-label">Location</span>
            <span>{personal.location}</span>
          </div>
          <div className="contact-meta-item">
            <span className="contact-meta-label">Availability</span>
            <span>{personal.available} — replies within 1 day</span>
          </div>
        </RevealBlock>
      </div>
    </section>
  )
}

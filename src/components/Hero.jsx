import { personal, skills } from '../data/portfolioData'
import Icon from './Icons'
import '../styles/hero.css'

const STACK = [...skills.Languages.slice(0, 4), ...skills.Backend.slice(0, 3), 'React', 'React Native', 'Docker', 'NGINX', 'MongoDB', 'MySQL', 'Gemini', 'Claude', 'RAG Pipelines']

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow status hero-in" style={{ '--i': 0 }}>Available · {personal.available}</p>

          <h1 className="hero-title">
            <span className="line"><span style={{ '--i': 1 }}>James Carl</span></span>
            <span className="line"><span style={{ '--i': 2 }}>Villarosa<em className="dot">.</em></span></span>
          </h1>

          <p className="hero-tag hero-in" style={{ '--i': 4 }}>
            {personal.title}. I build systems that <span className="serif">work, scale, and last.</span>
          </p>

          <div className="hero-cta hero-in" style={{ '--i': 5 }}>
            <a href="#projects" className="btn btn-primary">
              View my work <span className="btn-icon"><Icon name="down" size={16} /></span>
            </a>
            <a href={personal.github} target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub">
              <Icon name="github" />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="icon-link" aria-label="LinkedIn">
              <Icon name="linkedin" />
            </a>
          </div>
        </div>

        <div className="hero-visual hero-in" style={{ '--i': 3 }}>
          <div className="shell portrait">
            <div className="portrait-core">
              <img src={personal.photo} alt={`Portrait of ${personal.name}`} width="560" height="680" fetchpriority="high" />
              <span className="portrait-tag"><Icon name="pin" size={14} /> {personal.location.split(',')[0]}, PH</span>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee hero-in" style={{ '--i': 6 }} aria-label="Tech stack">
        <ul className="marquee-track">
          {[...STACK, ...STACK].map((s, i) => (
            <li key={i} aria-hidden={i >= STACK.length || undefined}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

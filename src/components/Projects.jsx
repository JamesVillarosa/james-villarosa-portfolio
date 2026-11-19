import { projects } from '../data/portfolioData'
import Icon from './Icons'
import '../styles/projects.css'

function Links({ p }) {
  if (!p.github && !p.live) return <p className="p-private">{p.note || 'Private repository'}</p>
  return (
    <div className="p-links">
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" className="p-link p-link-live">
          View live <Icon name="arrow" size={16} />
        </a>
      )}
      {p.github && (
        <a href={p.github} target="_blank" rel="noreferrer" className="p-link">
          <Icon name="github" size={16} /> Source code
        </a>
      )}
    </div>
  )
}

function Card({ p, i, featured }) {
  return (
    <article className={`p-card reveal ${featured ? 'is-featured' : ''}`} style={{ '--c': p.color, '--i': i % 2 }}>
      <div className="p-cover" aria-hidden="true">
        <span className="p-num">{String(i + 1).padStart(2, '0')}</span>
        <span className="p-initial">{p.initial}</span>
        {featured && (
          <span className="p-score"><b>84.4</b> SUS usability score · Grade A</span>
        )}
      </div>
      <div className="p-body">
        {featured && <p className="p-tag">Featured · Undergraduate thesis</p>}
        <h3 className="p-name">{p.name}</h3>
        <p className="p-sub">{p.subtitle}</p>
        <p className="p-desc">{p.description}</p>
        <p className="p-stack"><span>Built with</span>{p.tech.join(' · ')}</p>
        <Links p={p} />
      </div>
    </article>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects
  return (
    <section id="projects" className="section theme-light" data-ghost="Work">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">03 · Selected work</p>
            <h2 className="h2">Selected projects</h2>
          </div>
          <p className="lede reveal" style={{ '--i': 1 }}>
            Seven projects across AI, web, and mobile, starting with my undergraduate thesis.
          </p>
        </div>

        <Card p={featured} i={0} featured />
        <div className="p-grid">
          {rest.map((p, i) => <Card key={p.id} p={p} i={i + 1} />)}
        </div>
      </div>
    </section>
  )
}

import { projects } from '../data/portfolioData'
import Icon from './Icons'
import '../styles/projects.css'

const SPANS = [7, 5, 5, 7, 6, 6]

function Links({ p }) {
  return (
    <div className="p-links">
      {p.github && (
        <a href={p.github} target="_blank" rel="noreferrer" className="p-link" aria-label={`${p.name} source on GitHub`}>
          <Icon name="github" size={16} /> Code
        </a>
      )}
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer" className="p-link p-link-live" aria-label={`${p.name} live site`}>
          Live <Icon name="arrow" size={16} />
        </a>
      )}
      {!p.github && !p.live && <span className="p-link is-muted">{p.note || 'Private repository'}</span>}
    </div>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">03 · Selected work</p>
            <h2 className="h2">Things I've <span className="serif">built.</span></h2>
          </div>
          <p className="lede reveal" style={{ '--i': 1 }}>
            AI products, full-stack platforms, and data-heavy systems, from thesis research to production apps.
          </p>
        </div>

        <div className="shell p-featured reveal">
          <article className="core spot p-feat-core">
            <div className="p-feat-copy">
              <span className="card-kicker">Featured · Thesis · {featured.note}</span>
              <h3 className="p-feat-title">{featured.name}</h3>
              <p className="p-sub">{featured.subtitle}</p>
              <p className="muted">{featured.description}</p>
              <div className="chips">{featured.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
              <Links p={featured} />
            </div>
            <div className="p-feat-visual" aria-hidden="true">
              <div className="sus">
                <span className="sus-num">84.4</span>
                <span className="sus-label">SUS score<br />Grade A</span>
                <svg viewBox="0 0 120 120" className="sus-ring"><circle cx="60" cy="60" r="52" /><circle cx="60" cy="60" r="52" className="sus-fill" /></svg>
              </div>
              <div className="langs">
                {['Tagalog', 'Cebuano', 'Hiligaynon'].map((l, i) => <span key={l} style={{ '--d': i }}>{l}</span>)}
              </div>
            </div>
          </article>
        </div>

        <div className="p-grid">
          {rest.map((p, i) => (
            <div key={p.id} className="shell p-card reveal" style={{ '--span': SPANS[i], '--i': i % 2 }}>
              <article className="core spot">
                <div className="p-top">
                  <span className="p-mono" style={{ '--c': p.color }}>{p.initial}</span>
                  <span className="p-idx">0{i + 2}</span>
                </div>
                <h3 className="card-title">{p.name}</h3>
                <p className="p-sub">{p.subtitle}</p>
                <p className="muted p-desc">{p.description}</p>
                <div className="chips">{p.tech.slice(0, 5).map((t) => <span key={t} className="chip">{t}</span>)}</div>
                <Links p={p} />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

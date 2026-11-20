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

// tilt the logo toward the cursor (-1..1 on each axis)
const tilt = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--tx', ((e.clientX - r.left) / r.width * 2 - 1).toFixed(3))
  e.currentTarget.style.setProperty('--ty', ((e.clientY - r.top) / r.height * 2 - 1).toFixed(3))
}
const untilt = (e) => { e.currentTarget.style.setProperty('--tx', 0); e.currentTarget.style.setProperty('--ty', 0) }

function Card({ p, i, featured }) {
  const src = `/projects/${p.logo}`
  return (
    <article className={`p-card reveal ${featured ? 'is-featured' : ''}`} style={{ '--c': p.color, '--ink': p.ink || '#fff', '--ls': p.logoScale || 1, '--i': i % 2 }}>
      <div className="p-cover" aria-hidden="true" onPointerMove={tilt} onPointerLeave={untilt}>
        <span className="p-num">{String(i + 1).padStart(2, '0')}</span>
        {/* stacked copies pushed back in Z give the flat logo real thickness when it tilts */}
        <div className="p-float">
          <div className="p-logo">
            {[6, 5, 4, 3, 2, 1].map((d) => <img key={d} src={src} alt="" className="p-depth" style={{ '--d': d }} loading="lazy" />)}
            <img src={src} alt="" className="p-face" loading="lazy" />
          </div>
        </div>
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
            {projects.length} projects across AI, automation, web and mobile, starting with my solo-built thesis.
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

import { experience } from '../data/portfolioData'
import '../styles/experience.css'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">02 · Experience</p>
            <h2 className="h2">Shipped to <span className="serif">production.</span></h2>
          </div>
          <p className="lede reveal" style={{ '--i': 1 }}>
            From a Japanese software startup to campus leadership: real clients, real uptime, real deadlines.
          </p>
        </div>

        <ol className="timeline">
          {experience.map((job) => (
            <li key={job.id} className="job">
              <div className="job-meta reveal">
                <span className="job-period">{job.period}</span>
                <span className="job-type">{job.type}</span>
                <span className="muted job-loc">{job.location}</span>
              </div>
              <div className="shell reveal" style={{ '--i': 1 }}>
                <article className="core spot">
                  <h3 className="card-title">{job.role}</h3>
                  <p className="job-company">{job.company}</p>
                  <p className="muted job-desc">{job.description}</p>
                  <ul className="job-bullets">
                    {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  {job.tech.length > 0 && (
                    <div className="chips">{job.tech.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                  )}
                </article>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

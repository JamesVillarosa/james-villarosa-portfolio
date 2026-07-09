import RevealText from '../motion/RevealText'
import RevealBlock from '../motion/RevealBlock'
import DrawLine from '../motion/DrawLine'
import { experience } from '../data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="container">
        <RevealText as="h2" className="section-thesis">
          Shipped in production, <em>not in theory.</em>
        </RevealText>

        <div className="exp-list">
          {experience.map((job) => (
            <div className="exp-item" key={job.id}>
              <DrawLine />
              <RevealBlock className="exp-row">
                <div className="exp-when">
                  <span className="mono-label">{job.period}</span>
                  <span className="exp-type">{job.type}</span>
                </div>
                <div className="exp-main">
                  <h3 className="exp-role">{job.role}</h3>
                  <p className="exp-company">
                    {job.company} — {job.location}
                  </p>
                  <p className="exp-desc">{job.description}</p>
                  <ul className="exp-bullets">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  {job.tech.length > 0 && (
                    <p className="exp-tech">{job.tech.join(' · ')}</p>
                  )}
                </div>
              </RevealBlock>
            </div>
          ))}
          <DrawLine />
        </div>
      </div>
    </section>
  )
}

import RevealText from '../motion/RevealText'
import RevealBlock from '../motion/RevealBlock'
import DrawLine from '../motion/DrawLine'
import Counter from '../motion/Counter'
import { about, education, personal } from '../data/portfolioData'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <RevealText as="h2" className="section-thesis">
          Backend by discipline, <em>full stack by necessity.</em>
        </RevealText>

        <div className="about-grid">
          <RevealBlock className="about-photo-wrap" delay={0.1}>
            <div className="about-photo-frame" data-cursor="Hi!">
              <img src={personal.photo} alt="James Carl Villarosa" loading="lazy" />
            </div>
            <p className="about-photo-caption">
              {education.shortSchool} — {education.degree}
            </p>
          </RevealBlock>

          <div className="about-copy">
            {about.bio.map((p, i) => (
              <RevealBlock as="p" key={i} delay={0.08 * i} className="about-para">
                {p}
              </RevealBlock>
            ))}
            <RevealBlock className="about-edu" delay={0.2}>
              <span className="mono-label">Education</span>
              <p>
                {education.school} · {education.period}
                <br />
                {education.honors} · {education.scholarship}
              </p>
            </RevealBlock>
          </div>
        </div>

        <div className="about-stats">
          <DrawLine />
          <div className="about-stats-row">
            {about.stats.map((s) => (
              <div className="about-stat" key={s.label}>
                <span className="about-stat-value">
                  <Counter value={s.value} />
                </span>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <DrawLine delay={0.2} />
        </div>
      </div>
    </section>
  )
}

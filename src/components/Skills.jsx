import RevealText from '../motion/RevealText'
import RevealBlock from '../motion/RevealBlock'
import DrawLine from '../motion/DrawLine'
import { skills } from '../data/portfolioData'

export default function Skills() {
  const entries = Object.entries(skills)

  return (
    <section id="skills" className="skills">
      <div className="container">
        <RevealText as="h2" className="section-thesis">
          One stack, <em>end to end.</em>
        </RevealText>

        <div className="skills-list">
          {entries.map(([category, items], i) => (
            <div className="skills-group" key={category}>
              <DrawLine />
              <RevealBlock className="skills-row" delay={0.04 * i}>
                <h3 className="skills-category">{category}</h3>
                <p className="skills-items">
                  {items.map((item, j) => (
                    <span className="skills-item" key={item}>
                      {item}
                      {j < items.length - 1 && <span className="skills-sep" aria-hidden="true"> · </span>}
                    </span>
                  ))}
                </p>
              </RevealBlock>
            </div>
          ))}
          <DrawLine />
        </div>
      </div>
    </section>
  )
}

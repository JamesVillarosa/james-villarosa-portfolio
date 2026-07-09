import { useState } from 'react'
import RevealText from '../motion/RevealText'
import RevealBlock from '../motion/RevealBlock'
import DrawLine from '../motion/DrawLine'
import { projects } from '../data/portfolioData'

const featured = projects.find((p) => p.featured)
const rest = projects.filter((p) => !p.featured)

function projectLink(p) {
  return p.live || p.github || null
}

export default function Projects() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <RevealText as="h2" className="section-thesis">
          Proof over <em>promises.</em>
        </RevealText>

        {/* Featured case */}
        {featured && (
          <RevealBlock className="proj-featured" delay={0.1}>
            <a
              className="proj-featured-card"
              href={projectLink(featured) || undefined}
              target="_blank"
              rel="noreferrer"
              data-cursor="View"
              style={{ '--proj-color': featured.color }}
            >
              <div className="proj-featured-visual" aria-hidden="true">
                <span className="proj-featured-initial">{featured.initial}</span>
                <div className="proj-featured-orbit" />
              </div>
              <div className="proj-featured-body">
                <span className="mono-label">Featured — UP Thesis · SUS 84.4/100</span>
                <h3 className="proj-featured-name">{featured.name}</h3>
                <p className="proj-featured-sub">{featured.subtitle}</p>
                <p className="proj-featured-desc">{featured.description}</p>
                <p className="proj-tech">{featured.tech.join(' · ')}</p>
              </div>
            </a>
          </RevealBlock>
        )}

        {/* Editorial index */}
        <div
          className={`proj-index ${hovered !== null ? 'has-hover' : ''}`}
          onMouseLeave={() => setHovered(null)}
        >
          {rest.map((p, i) => {
            const link = projectLink(p)
            const Tag = link ? 'a' : 'div'
            return (
              <div className="proj-row-wrap" key={p.id}>
                <DrawLine />
                <Tag
                  className={`proj-row ${hovered === i ? 'is-hovered' : ''}`}
                  href={link || undefined}
                  target={link ? '_blank' : undefined}
                  rel={link ? 'noreferrer' : undefined}
                  data-cursor={link ? 'View' : 'Soon'}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  style={{ '--proj-color': p.color }}
                >
                  <span className="proj-row-index tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="proj-row-main">
                    <h3 className="proj-row-name">{p.name}</h3>
                    <p className="proj-row-sub">{p.subtitle}</p>
                  </div>
                  <span className="proj-row-tech">{p.tech.slice(0, 3).join(' · ')}</span>
                  <span className="proj-row-arrow" aria-hidden="true">
                    {link ? '↗' : '—'}
                  </span>
                </Tag>
              </div>
            )
          })}
          <DrawLine />
        </div>

        <RevealBlock className="proj-more" delay={0.1}>
          <a href="https://github.com/JamesVillarosa" target="_blank" rel="noreferrer" className="text-link">
            All projects on GitHub ↗
          </a>
        </RevealBlock>
      </div>
    </section>
  )
}

import { skills } from '../data/portfolioData'
import '../styles/skills.css'

// one plain-language line per category so non-engineers can scan it
const WHAT = {
  'AI & Automation': 'Agents and workflows that do the work',
  'AI-Assisted Development': 'How I write and check code with AI',
  'Back-End & Data': 'APIs, servers and databases',
  'Front-End': 'Web and mobile interfaces',
  'Practices & Reliability': 'Keeping things running in production',
  'Other Languages': 'Also written in school and side work',
}

export default function Skills() {
  return (
    <section id="skills" className="section theme-navy" data-ghost="Stack">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">04 · Toolkit</p>
            <h2 className="h2">Tools I work with</h2>
          </div>
        </div>

        <ol className="s-list">
          {Object.entries(skills).map(([cat, list], i) => (
            <li key={cat} className="s-row reveal">
              <div className="s-head">
                <span className="s-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{cat}</h3>
                  <p>{WHAT[cat]}</p>
                </div>
              </div>
              <ul className="s-items">
                {list.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

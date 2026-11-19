import { skills } from '../data/portfolioData'
import '../styles/skills.css'

// one plain-language line per category so non-engineers can scan it
const WHAT = {
  Languages: 'What I write code in',
  Backend: 'Building APIs and servers',
  Frontend: 'Web and mobile interfaces',
  Databases: 'Storing and querying data',
  'DevOps & Tools': 'Shipping and running apps',
  'AI APIs & Models': 'Models I build features with',
  'AI Tooling & Workflows': 'AI tools I use every day',
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

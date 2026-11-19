import { skills } from '../data/portfolioData'
import '../styles/skills.css'

// bento spans on a 12-col grid, in data order
const SPANS = [7, 5, 4, 4, 4, 6, 6]

export default function Skills() {
  return (
    <section id="skills" className="section theme-navy">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">04 · Toolkit</p>
            <h2 className="h2">Tools I work with</h2>
          </div>
        </div>

        <div className="s-grid">
          {Object.entries(skills).map(([cat, list], i) => (
            <div key={cat} className="shell reveal" style={{ '--span': SPANS[i], '--i': i % 3 }}>
              <div className="core spot s-card">
                <div className="s-head">
                  <h3>{cat}</h3>
                  <span>{String(list.length).padStart(2, '0')}</span>
                </div>
                <ul className="chips">
                  {list.map((s) => <li key={s} className="chip">{s}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

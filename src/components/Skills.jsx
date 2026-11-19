import { skills } from '../data/portfolioData'
import '../styles/skills.css'

// bento spans on a 12-col grid, in data order
const SPANS = [7, 5, 4, 4, 4, 6, 6]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head">
          <div className="reveal">
            <p className="eyebrow">04 · Toolkit</p>
            <h2 className="h2">The <span className="serif">stack</span> behind the work.</h2>
          </div>
          <p className="lede reveal" style={{ '--i': 1 }}>
            Backend-first, comfortable across the stack, and building AI into everyday engineering.
          </p>
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

import { projects } from '../../data/projects'

export const metadata = {
  title: 'Projects — Sujan Magar',
  description: 'DevOps projects by Sujan Magar — pipelines, IaC, observability, and more.',
}

export default function Projects() {
  return (
    <main className="site-wrap page-content">
      <div className="page-hero">
        <h1>Projects</h1>
        <p>Production work, personal experiments, and open-source tools — with full setup instructions.</p>
      </div>

      {projects.map((p) => (
        <div className="proj-entry" id={p.id} key={p.id}>
          <div className="proj-entry-header">
            <div className="proj-entry-header-left">
              <h2>{p.name}</h2>
              <p>{p.shortDesc}</p>
            </div>
            <div className="proj-entry-header-right">
              <span className="proj-year-badge">{p.year}</span>
              <div className="tags">
                <span className={`tag ${p.status}`}>{p.status}</span>
              </div>
            </div>
          </div>

          <div className="proj-body">
            <div className="tags" style={{ marginBottom: '1.25rem' }}>
              {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>

            <div className="sec-label" style={{ marginBottom: '1rem' }}>Setup Instructions</div>

            <ol className="steps">
              {p.steps.map((step, i) => (
                <li key={i}>
                  <div className="step-content">
                    <div className="step-title">{step.title}</div>
                    {step.desc && <div className="step-desc">{step.desc}</div>}
                    {step.code && <pre>{step.code}</pre>}
                  </div>
                </li>
              ))}
            </ol>

            <div className="proj-links">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
                  github →
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="proj-link secondary">
                  live demo →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </main>
  )
}

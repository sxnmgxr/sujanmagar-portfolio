import Link from 'next/link'
import { projects } from '../../src/data/projects'

export const metadata = {
  title: 'Sujan Magar — DevOps Engineer',
  description: 'DevOps Engineer based in Kathmandu. Building reliable infrastructure, CI/CD pipelines, and cloud-native systems.',
}

export default function Home() {
  const featured = projects.slice(0, 3)

  return (
    <main className="site-wrap page-content">

      {/* ── Hero ── */}
      <section style={{ padding: '4rem 0 2rem' }}>
        <p style={{ fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 10 }}>
          DevOps Engineer · Kathmandu, Nepal
        </p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px,6vw,56px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05, letterSpacing: -1, marginBottom: 16 }}>
          Sujan Magar
        </h1>
        <p style={{ fontSize: 13, lineHeight: 1.9, color: 'var(--muted)', maxWidth: 500, marginBottom: 18 }}>
          5 years building and maintaining cloud infrastructure, CI/CD pipelines, and
          observability systems. I work across AWS, Kubernetes, and Terraform to keep
          things running reliably at scale.
        </p>
        <div className="avail">
          <span className="avail-dot" />
          open to opportunities
        </div>

        <div className="stats">
          <div className="stat"><strong>5</strong><span>years experience</span></div>
          <div className="stat"><strong>50+</strong><span>pipelines shipped</span></div>
          <div className="stat"><strong>99.9%</strong><span>uptime delivered</span></div>
          <div className="stat"><strong>3</strong><span>cloud platforms</span></div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── Experience ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div className="sec-label">Experience</div>

        {[
          { title: 'Senior DevOps Engineer', company: 'Acme Corp · full-time', date: '2022 – present', desc: 'Led migration of monolithic deployments onto EKS. Cut deploy time from 45 min to 4 min. Owned incident response and on-call rotation for 20+ services.' },
          { title: 'DevOps Engineer', company: 'ByteStack · full-time', date: '2020 – 2022', desc: 'Built CI/CD pipelines with GitHub Actions, wrote Terraform modules for multi-region AWS provisioning, and set up Prometheus + Grafana monitoring from zero.' },
          { title: 'Junior Systems Engineer', company: 'TechNep · full-time', date: '2018 – 2020', desc: 'Managed Linux servers, automated backup jobs, and wrote internal tooling in Python and Bash for the ops team.' },
        ].map((job) => (
          <div className="xp-item" key={job.title}>
            <div className="xp-row">
              <span className="xp-title">{job.title}</span>
              <span className="xp-date">{job.date}</span>
            </div>
            <div className="xp-co">{job.company}</div>
            <p className="xp-desc">{job.desc}</p>
          </div>
        ))}
      </section>

      <hr className="rule" />

      {/* ── Featured Projects ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div className="sec-label">Featured Projects</div>

        {featured.map((p) => (
          <div className="proj-card" key={p.id}>
            <div className="proj-card-top">
              <span className="proj-card-name">{p.name}</span>
              <span className="proj-card-year">{p.year}</span>
            </div>
            <p className="proj-card-desc">{p.shortDesc}</p>
            <div className="tags" style={{ marginBottom: 10 }}>
              {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              <span className={`tag ${p.status}`}>{p.status}</span>
            </div>
            <Link href={`/projects#${p.id}`} className="proj-card-link">view details →</Link>
          </div>
        ))}

        <p style={{ marginTop: '1rem' }}>
          <Link href="/projects" style={{ fontSize: 12, color: 'var(--accent)' }}>all projects →</Link>
        </p>
      </section>

      <hr className="rule" />

      {/* ── Skills + Certs ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div className="two-col">
          <div>
            <div className="sec-label">Skills</div>
            {[
              { name: 'Cloud & infra',      tags: ['AWS','GCP','Terraform','Ansible'] },
              { name: 'Containers',          tags: ['Docker','Kubernetes','Helm'] },
              { name: 'CI/CD & monitoring',  tags: ['GitHub Actions','Jenkins','Prometheus','Grafana'] },
              { name: 'Scripting',           tags: ['Python','Bash','Go'] },
            ].map((group) => (
              <div className="sg" key={group.name}>
                <div className="sg-name">{group.name}</div>
                <div className="tags">
                  {group.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="sec-label">Certifications</div>
            {[
              { name: 'AWS Solutions Architect', year: '2023' },
              { name: 'CKA — Kubernetes',        year: '2022' },
              { name: 'Terraform Associate',      year: '2023' },
            ].map((c) => (
              <div className="cert" key={c.name}>
                <span className="cert-name">{c.name}</span>
                <span className="cert-yr">{c.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* ── Contact ── */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div className="sec-label">Contact</div>
        <div className="contact-grid">
          <div className="c-item"><div className="c-key">email</div><a href="mailto:sujan@sujanmagar.info.np" className="c-val">sujan@sujanmagar.info.np</a></div>
          <div className="c-item"><div className="c-key">github</div><a href="https://github.com/sujanmagar" target="_blank" rel="noreferrer" className="c-val">github.com/sujanmagar</a></div>
          <div className="c-item"><div className="c-key">linkedin</div><a href="#" className="c-val">linkedin.com/in/sujanmagar</a></div>
          <div className="c-item"><div className="c-key">location</div><span className="c-val">Kathmandu, Nepal · remote-friendly</span></div>
        </div>
      </section>

    </main>
  )
}

import Link from 'next/link'
import { posts } from '../../data/posts'

export const metadata = {
  title: 'Blog — Sujan Magar',
  description: 'Writing on DevOps, infrastructure, Kubernetes, and cloud engineering.',
}

export default function Blog() {
  return (
    <main className="site-wrap page-content">
      <div className="page-hero">
        <h1>Writing</h1>
        <p>Notes on DevOps, infrastructure, Kubernetes, and things I learned the hard way.</p>
      </div>

      {posts.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id} style={{ display: 'block', textDecoration: 'none' }}>
          <div className="post-row">
            <div className="post-date">{post.date}</div>
            <div>
              <div className="post-title">{post.title}</div>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-meta">
                <div className="tags">
                  {post.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
                <span className="read-time">{post.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </main>
  )
}

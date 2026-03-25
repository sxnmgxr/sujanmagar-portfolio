import Link from 'next/link'
import { posts } from '../../../data/posts'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }))
}

export function generateMetadata({ params }) {
  const post = posts.find((p) => p.id === params.id)
  if (!post) return {}
  return {
    title: `${post.title} — Sujan Magar`,
    description: post.excerpt,
  }
}

export default function BlogPost({ params }) {
  const post = posts.find((p) => p.id === params.id)
  if (!post) notFound()

  return (
    <main className="site-wrap page-content">
      <div className="article-header">
        <Link href="/blog" className="article-back">← back to writing</Link>
        <div className="article-date">{post.date}</div>
        <h1 className="article-title">{post.title}</h1>
        <div className="article-meta">
          <span>Sujan Magar</span>
          <span>·</span>
          <span>{post.readTime}</span>
          <span>·</span>
          <span>{post.tags.join(' · ')}</span>
        </div>
      </div>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  )
}

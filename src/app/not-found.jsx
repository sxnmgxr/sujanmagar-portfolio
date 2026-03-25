import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="site-wrap page-content" style={{ padding: '4rem 0' }}>
      <p style={{ fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 12 }}>
        404
      </p>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 300, fontStyle: 'italic', marginBottom: 16 }}>
        Page not found
      </h1>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>
        This page doesn't exist or has been moved.
      </p>
      <Link href="/" style={{ fontSize: 12, color: 'var(--accent)' }}>← back to home</Link>
    </main>
  )
}

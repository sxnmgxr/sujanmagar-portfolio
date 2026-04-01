import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Sujan Magar</span>
        <div className="footer-links">
          <Link href="/">resume</Link>
          <Link href="/projects">projects</Link>
          <Link href="/blog">blog</Link>
        </div>
      </div>
    </footer>
  )
}

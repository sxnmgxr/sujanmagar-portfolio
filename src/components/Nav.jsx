'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Nav() {
  const pathname = usePathname()

  const links = [
    { href: '/',         label: 'home' },
    { href: '/projects', label: 'projects' },
    { href: '/blog',     label: 'blog' },
  ]

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">sujanmagar.info.np</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <ul className="nav-links">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={pathname === href ? 'active' : ''}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
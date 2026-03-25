import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Sujan Magar — DevOps Engineer',
  description: 'DevOps Engineer based in Kathmandu. Building reliable infrastructure, CI/CD pipelines, and cloud-native systems.',
  openGraph: {
    title: 'Sujan Magar — DevOps Engineer',
    description: 'DevOps Engineer based in Kathmandu. Building reliable infrastructure, CI/CD pipelines, and cloud-native systems.',
    url: 'https://sujanmagar.info.np',
    siteName: 'Sujan Magar',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Nav />
        <main className="site-wrap page-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
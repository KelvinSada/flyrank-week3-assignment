import { Link } from '../components/Link'

export function NotFoundPage() {
  return (
    <section className="panel placeholder-panel not-found">
      <span className="not-found-code">404</span>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/" className="primary-button">Back to overview</Link>
    </section>
  )
}

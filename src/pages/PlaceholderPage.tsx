import type { Route } from '../types'
import { PageHeader } from '../components/PageHeader'

export function PlaceholderPage({ route }: { route: Route }) {
  return (
    <>
      <PageHeader
        title={route.label}
        description={route.description}
        action={<button className="primary-button" type="button">＋ Get started</button>}
      />
      <section className="panel placeholder-panel">
        <div className="placeholder-icon">{route.icon}</div>
        <h2>{route.label} workspace</h2>
        <p>This placeholder is ready for the {route.label.toLowerCase()} experience.</p>
        <button className="secondary-button" type="button">Get started</button>
      </section>
    </>
  )
}

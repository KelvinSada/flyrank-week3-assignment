import { PageHeader } from '../components/PageHeader'

export function HelpPage() {
  return (
    <>
      <PageHeader title="Help center" description="Find answers and learn how to use FlyRank." />
      <section className="panel placeholder-panel">
        <div className="placeholder-icon">?</div>
        <h2>Help center</h2>
        <p>Documentation, guides, and support content will live here.</p>
        <button className="secondary-button" type="button">Browse guides</button>
      </section>
    </>
  )
}

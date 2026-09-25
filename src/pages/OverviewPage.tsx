import { Link } from '../components/Link'
import { PageHeader } from '../components/PageHeader'

const metrics = [
  ['Average position', '8.4', '↑ 12.5% vs last month'],
  ['Organic traffic', '24,892', '↑ 18.2% vs last month'],
  ['Tracked keywords', '1,248', '↑ 64 new this month'],
  ['Visibility score', '72.6%', 'No change vs last month'],
]

const keywords = ['seo tools', 'rank tracking', 'keyword research', 'seo dashboard']

export function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Good morning, Jordan"
        description="Here is what is happening with your search performance."
        action={<button className="primary-button" type="button">＋ Add project</button>}
      />
      <section className="metrics-grid" aria-label="Performance summary">
        {metrics.map(([label, value, change]) => (
          <article className="metric-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{change}</small>
          </article>
        ))}
      </section>
      <section className="content-grid">
        <article className="panel chart-panel">
          <div className="panel-header">
            <div>
              <h2>Search performance</h2>
              <p>Organic clicks and impressions over time</p>
            </div>
            <select defaultValue="30" aria-label="Chart date range">
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
          <div className="chart-placeholder" aria-label="Search performance chart placeholder">
            <div className="chart-line" />
          </div>
          <div className="chart-legend">
            <span><i className="legend-dot purple" />Clicks</span>
            <span><i className="legend-dot green" />Impressions</span>
          </div>
        </article>
        <article className="panel">
          <div className="panel-header">
            <div>
              <h2>Top keywords</h2>
              <p>Best performing keywords this month</p>
            </div>
            <Link href="/rankings" className="text-link">View all →</Link>
          </div>
          <div className="keyword-list">
            {keywords.map((keyword, index) => (
              <div className="keyword-row" key={keyword}>
                <span className="keyword-rank">0{index + 1}</span>
                <span className="keyword-name">{keyword}<small>novoh.co</small></span>
                <strong>{[1, 3, 4, 7][index]}</strong>
                <span className="rank-up">↑</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}

import { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { env } from '../env'

type HealthCheck = {
  name: string
  status: 'operational' | 'degraded' | 'outage'
  latencyMs?: number
  message?: string
}

type HealthResponse = {
  status: 'operational' | 'degraded' | 'outage'
  service: string
  version: string
  environment: string
  checkedAt: string
  checks: HealthCheck[]
}

function statusLabel(status: HealthResponse['status'] | HealthCheck['status']) {
  return status === 'operational' ? 'Operational' : status === 'degraded' ? 'Degraded' : 'Outage'
}

export function HealthPage() {
  const [data, setData] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchHealth() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(env.healthCheckUrl, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Health endpoint returned ${response.status}`)
        }

        const healthData = await response.json() as HealthResponse
        setData(healthData)
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') {
          return
        }

        setError(fetchError instanceof Error ? fetchError.message : 'Unable to fetch health data.')
      } finally {
        setLoading(false)
      }
    }

    void fetchHealth()
    return () => controller.abort()
  }, [])

  return (
    <>
      <PageHeader
        title="System health"
        description="Live status data fetched from the configured health endpoint."
        action={<button className="secondary-button" type="button" onClick={() => window.location.reload()}>Refresh</button>}
      />

      {loading && (
        <section className="panel health-state">
          <span className="health-spinner" aria-hidden="true" />
          <p>Fetching service health...</p>
        </section>
      )}

      {error && (
        <section className="panel health-state health-error" role="alert">
          <div className="placeholder-icon">!</div>
          <h2>Health data unavailable</h2>
          <p>{error}</p>
        </section>
      )}

      {data && (
        <>
          <section className="health-summary-grid">
            <article className={`panel health-status-card status-${data.status}`}>
              <span className="health-card-label">Overall status</span>
              <strong>{statusLabel(data.status)}</strong>
              <small>{data.service}</small>
            </article>
            <article className="panel health-meta-card">
              <span className="health-card-label">Version</span>
              <strong>{data.version}</strong>
              <small>{data.environment} environment</small>
            </article>
            <article className="panel health-meta-card">
              <span className="health-card-label">Last checked</span>
              <strong>{new Date(data.checkedAt).toLocaleTimeString()}</strong>
              <small>{new Date(data.checkedAt).toLocaleDateString()}</small>
            </article>
          </section>

          <section className="panel health-checks-panel">
            <div className="panel-header">
              <div>
                <h2>Service checks</h2>
                <p>Results returned by the health endpoint</p>
              </div>
              <span className={`health-pill status-${data.status}`}>{statusLabel(data.status)}</span>
            </div>
            <div className="health-check-list">
              {data.checks.map((check) => (
                <div className="health-check-row" key={check.name}>
                  <span className={`health-check-indicator status-${check.status}`} />
                  <span className="health-check-name">
                    <strong>{check.name}</strong>
                    <small>{check.message ?? statusLabel(check.status)}</small>
                  </span>
                  <span className="health-check-latency">
                    {check.latencyMs === undefined ? '—' : `${check.latencyMs} ms`}
                  </span>
                  <span className={`health-pill status-${check.status}`}>{statusLabel(check.status)}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}

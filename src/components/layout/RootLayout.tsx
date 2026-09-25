import { useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from '../Link'
import { routes } from '../../routes'

export function RootLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const currentRoute = routes.find((route) => route.path === pathname)

  return (
    <div className="app-layout">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">F</span>
          flyrank
        </div>

        <div className="workspace-switcher">
          <span className="workspace-avatar">N</span>
          <span>Novoh workspace</span>
          <span className="muted-icon">⌄</span>
        </div>

        <nav aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`nav-link ${pathname === route.path ? 'nav-link-active' : ''}`}
              onNavigate={() => setMobileNavOpen(false)}
            >
              <span className="nav-icon">{route.icon}</span>
              {route.label}
            </Link>
          ))}
          <Link href="/help" className="nav-link" onNavigate={() => setMobileNavOpen(false)}>
            <span className="nav-icon">?</span>
            Help center
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <span className="user-avatar">JD</span>
            <span className="user-details">
              <strong>Jordan Davis</strong>
              <small>Administrator</small>
            </span>
            <span className="muted-icon">⌄</span>
          </div>
        </div>
      </aside>

      {mobileNavOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <div className="main-column">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            type="button"
            aria-label="Open navigation"
            onClick={() => setMobileNavOpen(true)}
          >
            ☰
          </button>
          <div className="breadcrumbs">
            <span>Workspace</span>
            <span>/</span>
            <strong>{currentRoute?.label ?? 'Not found'}</strong>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="Notifications">◌</button>
            <button className="primary-button" type="button">Upgrade plan</button>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}

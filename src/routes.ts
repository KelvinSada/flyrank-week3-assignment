import type { Route } from './types'

export const routes: Route[] = [
  { path: '/', label: 'Overview', description: 'Track your search performance at a glance.', icon: '⌂' },
  { path: '/projects', label: 'Projects', description: 'Manage the websites and campaigns you track.', icon: '▣' },
  { path: '/rankings', label: 'Rankings', description: 'Monitor keyword positions and movement.', icon: '↗' },
  { path: '/reports', label: 'Reports', description: 'Review and share SEO performance reports.', icon: '▤' },
  { path: '/settings', label: 'Settings', description: 'Configure your workspace and preferences.', icon: '⚙' },
  { path: '/health', label: 'Health', description: 'Check the status of connected services.', icon: '♥' },
]

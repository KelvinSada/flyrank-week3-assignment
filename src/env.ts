const booleanValues = new Set(['true', '1', 'yes'])

function readBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined || value === '') {
    return fallback
  }

  return booleanValues.has(value.toLowerCase())
}

export const env = {
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
  publicAppUrl: import.meta.env.VITE_PUBLIC_APP_URL ?? window.location.origin,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  enableAnalytics: readBoolean(import.meta.env.VITE_ENABLE_ANALYTICS, false),
} as const

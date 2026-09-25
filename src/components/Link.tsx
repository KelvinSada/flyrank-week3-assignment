import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type LinkProps = {
  href: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
}

export function Link({ href, children, className = '', onNavigate }: LinkProps) {
  return (
    <RouterLink
      className={className}
      to={href}
      onClick={onNavigate}
    >
      {children}
    </RouterLink>
  )
}

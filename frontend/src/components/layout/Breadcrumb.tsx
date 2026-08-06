import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)

  return segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`
    const label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())

    const isLast = index === segments.length - 1
    return { label, href: isLast ? undefined : href }
  })
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const location = useLocation()
  const breadcrumbs = items ?? buildBreadcrumbs(location.pathname)

  if (breadcrumbs.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1 text-sm text-muted-foreground', className)}
    >
      <Link
        to="/dashboard"
        className="hover:text-foreground flex items-center gap-1 transition-colors"
      >
        <Home className="size-3.5" />
        <span className="sr-only">Dashboard</span>
      </Link>
      {breadcrumbs.map((item) => (
        <div key={item.label} className="flex items-center gap-1">
          <ChevronRight className="size-3.5" />
          {item.href ? (
            <Link to={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

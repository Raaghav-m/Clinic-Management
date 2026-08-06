import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Loader } from '@/components/common/Loader'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: number | string
  href?: string
  icon: LucideIcon
  isLoading?: boolean
  className?: string
}

export function StatCard({
  label,
  value,
  href,
  icon: Icon,
  isLoading = false,
  className,
}: StatCardProps) {
  const content = (
    <div
      className={cn(
        'rounded-xl border bg-card p-6 shadow-xs transition-shadow',
        href && 'hover:shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-lg">
          <Icon className="size-4" />
        </div>
      </div>
      <div className="mt-4 min-h-9">
        {isLoading ? (
          <Loader size="sm" className="justify-start" />
        ) : (
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link to={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}

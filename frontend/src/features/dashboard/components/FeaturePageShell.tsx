import type { ReactNode } from 'react'

interface FeaturePageShellProps {
  title: string
  description: string
  actions?: ReactNode
  children?: ReactNode
}

export function FeaturePageShell({
  title,
  description,
  actions,
  children,
}: FeaturePageShellProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>
        {actions}
      </div>
      {children}
    </div>
  )
}

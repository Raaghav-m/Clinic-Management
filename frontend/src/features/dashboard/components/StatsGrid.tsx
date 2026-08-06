import { ErrorState } from '@/components/common/ErrorState'
import { getDashboardStatsForRole } from '@/features/dashboard/config'
import { StatCard } from '@/features/dashboard/components/StatCard'
import type { DashboardStat } from '@/features/dashboard/types'
import { usePermissions } from '@/hooks/usePermissions'

interface StatsGridProps {
  stats: DashboardStat[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}

export function StatsGrid({ stats, isLoading, isError, onRetry }: StatsGridProps) {
  const { role } = usePermissions()
  const definitions = getDashboardStatsForRole(role)

  if (isError) {
    return (
      <ErrorState
        title="Unable to load dashboard metrics"
        message="Could not fetch clinic statistics. Check that the backend is running and try again."
        onRetry={onRetry}
      />
    )
  }

  if (definitions.length === 0) {
    return null
  }

  const statMap = new Map(stats.map((stat) => [stat.key, stat.value]))

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {definitions.map((definition) => (
        <StatCard
          key={definition.key}
          label={definition.label}
          value={statMap.get(definition.key) ?? 0}
          href={isLoading ? undefined : definition.href}
          icon={definition.icon}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}

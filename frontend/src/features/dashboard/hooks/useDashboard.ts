import { useQuery } from '@tanstack/react-query'

import { getDashboardStatsForRole } from '@/features/dashboard/config'
import { dashboardService } from '@/features/dashboard/service'
import { usePermissions } from '@/hooks/usePermissions'

export function useDashboardOverview() {
  const { role } = usePermissions()
  const definitions = getDashboardStatsForRole(role)

  return useQuery({
    queryKey: ['dashboard', 'overview', role],
    queryFn: () => dashboardService.getOverview(role!, definitions),
    enabled: Boolean(role) && definitions.length > 0,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  })
}

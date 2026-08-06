import { CalendarDays, Pill } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { AppointmentStatusSummaryCards } from '@/features/dashboard/components/AppointmentStatusSummary'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader'
import { QuickActions } from '@/features/dashboard/components/QuickActions'
import { StatsGrid } from '@/features/dashboard/components/StatsGrid'
import { UpcomingAppointments } from '@/features/dashboard/components/UpcomingAppointments'
import { useDashboardOverview } from '@/features/dashboard/hooks/useDashboard'
import { useAuthStore } from '@/features/auth/authStore'
import { usePermissions } from '@/hooks/usePermissions'
import { ROUTES } from '@/utils/constants'

export function DashboardPage() {
  const { isPatient, role } = usePermissions()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { data, isLoading, isPending, isError, refetch, isFetching } =
    useDashboardOverview()

  const showStatsLoading = isPending || isLoading || isFetching

  if (isAuthenticated && !role) {
    return (
      <div className="space-y-6">
        <DashboardHeader />
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
          <h2 className="font-semibold">Session needs refresh</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Your saved session is missing role information. Sign out and sign in
            again to load dashboard metrics.
          </p>
          <Button asChild className="mt-4">
            <Link to={ROUTES.LOGIN}>Sign in again</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isPatient) {
    return (
      <div className="space-y-6">
        <DashboardHeader />
        <QuickActions />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-xs">
            <CalendarDays className="text-primary mb-3 size-8" />
            <h2 className="text-base font-semibold">Your Appointments</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Track upcoming visits and appointment history from the appointments
              module.
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-xs">
            <Pill className="text-primary mb-3 size-8" />
            <h2 className="text-base font-semibold">Your Prescriptions</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Access medications and dosage instructions prescribed during your
              consultations.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <StatsGrid
        stats={data?.stats ?? []}
        isLoading={showStatsLoading}
        isError={isError}
        onRetry={() => refetch()}
      />

      {data?.hasFailedStats ? (
        <p className="text-muted-foreground text-sm">
          Some metrics could not be loaded and are showing as 0. Ensure the
          backend is running on port 8080.
        </p>
      ) : null}

      <QuickActions />

      {data?.statusSummary ? (
        <AppointmentStatusSummaryCards summary={data.statusSummary} />
      ) : null}

      <UpcomingAppointments
        appointments={data?.upcomingAppointments ?? []}
        isLoading={showStatsLoading}
        isError={isError}
        onRetry={() => refetch()}
      />
    </div>
  )
}

import { usePermissions } from '@/hooks/usePermissions'
import { formatFullName, formatRole } from '@/utils/formatters'

export function DashboardHeader() {
  const { user, role } = usePermissions()

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        {user
          ? `Welcome, ${formatFullName(user.firstName, user.lastName)}`
          : 'Dashboard'}
      </h1>
      <p className="text-muted-foreground mt-1 text-sm">
        {role
          ? `Overview for ${formatRole(role)} — live clinic metrics and upcoming activity.`
          : 'Clinic operations overview.'}
      </p>
    </div>
  )
}

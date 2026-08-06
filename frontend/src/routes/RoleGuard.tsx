import { Navigate, Outlet } from 'react-router-dom'

import { usePermissions } from '@/hooks/usePermissions'
import { ROUTES } from '@/utils/constants'
import type { UserRole } from '@/types/auth'

interface RoleGuardProps {
  allowedRoles: UserRole[]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { canAccess } = usePermissions()

  if (!canAccess(allowedRoles)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  }

  return <Outlet />
}

import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/features/auth/authStore'
import { ROUTES } from '@/utils/constants'

export function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return <Outlet />
}

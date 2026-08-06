import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/features/auth/authStore'
import { ROUTES } from '@/utils/constants'
import { isTokenExpired } from '@/utils/jwt'

export function ProtectedRoute() {
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const location = useLocation()

  const hasValidSession =
    isAuthenticated && Boolean(token) && !isTokenExpired(token!)

  if (!hasValidSession) {
    if (token && isTokenExpired(token)) {
      clearAuth()
    }

    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  }

  return <Outlet />
}

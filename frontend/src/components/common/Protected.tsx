import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { Loader } from '@/components/common/Loader'
import { useAuthStore } from '@/features/auth/authStore'
import { ROUTES } from '@/utils/constants'

interface ProtectedProps {
  children: ReactNode
  fallback?: ReactNode
}

export function Protected({ children, fallback }: ProtectedProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      fallback ?? (
        <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
      )
    )
  }

  return <>{children}</>
}

interface AuthBootstrapProps {
  children: ReactNode
}

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const hasHydrated = useAuthStore((state) => state._hasHydrated)

  if (!hasHydrated) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader size="lg" />
      </div>
    )
  }

  return <>{children}</>
}

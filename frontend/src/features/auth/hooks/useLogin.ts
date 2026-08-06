import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'

import { authService } from '@/features/auth/authService'
import { useAuthStore } from '@/features/auth/authStore'
import { useToast } from '@/hooks/useToast'
import type { LoginRequest } from '@/types/auth'
import { getApiErrorMessage } from '@/types/api'
import { ROUTES } from '@/utils/constants'

export function useLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: (payload: LoginRequest) => authService.login(payload),
    onSuccess: ({ token, user }) => {
      setAuth(token, user)
      toast.success(`Welcome back, ${user.firstName}!`)

      const redirectTo =
        (location.state as { from?: { pathname: string } } | null)?.from
          ?.pathname ?? ROUTES.DASHBOARD

      navigate(redirectTo, { replace: true })
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Invalid email or password.'))
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const toast = useToast()

  return () => {
    clearAuth()
    toast.info('You have been signed out.')
    navigate(ROUTES.LOGIN, { replace: true })
  }
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthUser } from '@/types/auth'
import { isTokenExpired } from '@/utils/jwt'

interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  setAuth: (token: string, user: AuthUser) => void
  clearAuth: () => void
  setHasHydrated: (value: boolean) => void
}

function isValidSession(token: string | null, user: AuthUser | null): boolean {
  if (!token || !user || !user.role) return false
  return !isTokenExpired(token)
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setAuth: (token, user) =>
        set({ token, user, isAuthenticated: true }),
      clearAuth: () =>
        set({ token: null, user: null, isAuthenticated: false }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'clinic-auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const valid = isValidSession(state.token, state.user)
          if (!valid) {
            state.clearAuth()
          } else if (state.token && state.user) {
            state.setAuth(state.token, state.user)
          }
        }
        state?.setHasHydrated(true)
      },
    },
  ),
)

export function getAuthSession() {
  const { token, user, isAuthenticated } = useAuthStore.getState()
  return { token, user, isAuthenticated }
}

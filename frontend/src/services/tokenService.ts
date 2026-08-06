import { useAuthStore } from '@/features/auth/authStore'

export const tokenService = {
  getToken(): string | null {
    return useAuthStore.getState().token
  },

  clearToken(): void {
    useAuthStore.getState().clearAuth()
  },

  isAuthenticated(): boolean {
    return useAuthStore.getState().isAuthenticated
  },
}

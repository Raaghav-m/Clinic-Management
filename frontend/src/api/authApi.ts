import apiClient from '@/api/axios'
import type { AuthResponse, LoginRequest } from '@/types/auth'

export const authApi = {
  login: (payload: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', payload),
}

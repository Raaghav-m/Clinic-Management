import { authApi } from '@/api/authApi'
import type { LoginRequest } from '@/types/auth'
import { mapAuthResponseToUser } from '@/utils/auth'

export const authService = {
  login: async (payload: LoginRequest) => {
    const response = await authApi.login(payload)
    return {
      token: response.data.token,
      user: mapAuthResponseToUser(response.data),
    }
  },
}

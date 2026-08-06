import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

import { tokenService } from '@/services/tokenService'
import { ROUTES } from '@/utils/constants'
import { isTokenExpired } from '@/utils/jwt'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenService.getToken()

  if (token) {
    if (isTokenExpired(token)) {
      tokenService.clearToken()
      redirectToLogin('Your session has expired. Please sign in again.')
      return Promise.reject(new Error('Session expired'))
    }

    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status
    const requestUrl = error.config?.url ?? ''

    if (status === 401 && !requestUrl.includes('/auth/login')) {
      tokenService.clearToken()
      redirectToLogin('Your session has expired. Please sign in again.')
    }

    return Promise.reject(error)
  },
)

function redirectToLogin(message?: string) {
  if (window.location.pathname !== ROUTES.LOGIN) {
    if (message) {
      toast.error(message)
    }
    window.location.href = ROUTES.LOGIN
  }
}

export default apiClient

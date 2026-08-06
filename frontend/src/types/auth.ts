export type UserRole = 'ADMIN' | 'DOCTOR' | 'RECEPTIONIST' | 'PATIENT'

export interface AuthUser {
  id: number
  email: string
  firstName: string
  lastName: string
  role: UserRole
  profileId?: number | null
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  id: number
  name: string
  email: string
  role: UserRole
  profileId?: number | null
}

export interface RegisterRequest {
  name: string
  email: string
  phone: string
  password: string
}

export interface ApiErrorResponse {
  timestamp?: string
  status?: number
  error?: string
  message?: string
  path?: string
  errors?: Record<string, string>
}

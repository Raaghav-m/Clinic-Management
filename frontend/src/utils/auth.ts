import type { AuthResponse, AuthUser } from '@/types/auth'

export function parseFullName(name: string): Pick<AuthUser, 'firstName' | 'lastName'> {
  const trimmed = name.trim()
  const spaceIndex = trimmed.indexOf(' ')

  if (spaceIndex === -1) {
    return { firstName: trimmed, lastName: '' }
  }

  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1),
  }
}

export function mapAuthResponseToUser(response: AuthResponse): AuthUser {
  const { firstName, lastName } = parseFullName(response.name)

  return {
    id: response.id,
    email: response.email,
    firstName,
    lastName,
    role: response.role,
    profileId: response.profileId ?? null,
  }
}

interface JwtPayload {
  sub?: string
  exp?: number
  iat?: number
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = atob(normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '='))
    return JSON.parse(decoded) as JwtPayload
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token)
  if (!payload?.exp) return true

  return payload.exp * 1000 <= Date.now()
}

export function getTokenExpiry(token: string): Date | null {
  const payload = decodeJwtPayload(token)
  if (!payload?.exp) return null

  return new Date(payload.exp * 1000)
}

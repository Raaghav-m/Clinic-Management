export type { ApiErrorResponse } from '@/types/auth'

export function getApiErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response
  ) {
    const data = error.response.data as { message?: string; errors?: Record<string, string> }

    if (data.errors && Object.keys(data.errors).length > 0) {
      return Object.values(data.errors)[0]
    }

    if (data.message) {
      return data.message
    }
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

import { useAuthStore } from '@/features/auth/authStore'
import { canAccessRoute, hasRole } from '@/utils/permissions'
import type { UserRole } from '@/types/auth'

export function usePermissions() {
  const user = useAuthStore((state) => state.user)
  const role = user?.role

  return {
    role,
    user,
    profileId: user?.profileId ?? null,
    hasRole: (allowedRoles: UserRole[]) => hasRole(role, allowedRoles),
    canAccess: (allowedRoles: UserRole[]) => canAccessRoute(role, allowedRoles),
    isAdmin: role === 'ADMIN',
    isDoctor: role === 'DOCTOR',
    isReceptionist: role === 'RECEPTIONIST',
    isPatient: role === 'PATIENT',
  }
}

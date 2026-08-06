import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Pill,
  Stethoscope,
  Users,
} from 'lucide-react'

import { ROUTES } from '@/utils/constants'
import type { UserRole } from '@/types/auth'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  roles: UserRole[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PATIENT'],
  },
  {
    label: 'Patients',
    href: ROUTES.PATIENTS,
    icon: Users,
    roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'],
  },
  {
    label: 'Doctors',
    href: ROUTES.DOCTORS,
    icon: Stethoscope,
    roles: ['ADMIN'],
  },
  {
    label: 'Appointments',
    href: ROUTES.APPOINTMENTS,
    icon: CalendarDays,
    roles: ['ADMIN', 'RECEPTIONIST'],
  },
  {
    label: 'My Appointments',
    href: ROUTES.APPOINTMENTS,
    icon: CalendarDays,
    roles: ['PATIENT'],
  },
  {
    label: 'Consultations',
    href: ROUTES.CONSULTATIONS,
    icon: ClipboardList,
    roles: ['ADMIN', 'DOCTOR'],
  },
  {
    label: 'Prescriptions',
    href: ROUTES.PRESCRIPTIONS,
    icon: Pill,
    roles: ['ADMIN', 'DOCTOR', 'PATIENT'],
  },
]

export function getNavItemsForRole(role: UserRole | undefined): NavItem[] {
  if (!role) return []
  return NAV_ITEMS.filter((item) => item.roles.includes(role))
}

export function hasRole(
  userRole: UserRole | undefined,
  allowedRoles: UserRole[],
): boolean {
  if (!userRole) return false
  return allowedRoles.includes(userRole)
}

export function canAccessRoute(
  userRole: UserRole | undefined,
  allowedRoles: UserRole[],
): boolean {
  return hasRole(userRole, allowedRoles)
}

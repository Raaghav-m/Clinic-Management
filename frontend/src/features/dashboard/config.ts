import {
  CalendarDays,
  ClipboardList,
  Pill,
  Stethoscope,
  Users,
} from 'lucide-react'

import type { DashboardStatDefinition } from '@/features/dashboard/types'
import { ROUTES } from '@/utils/constants'

export const DASHBOARD_STATS: DashboardStatDefinition[] = [
  {
    key: 'patients',
    label: 'Patients',
    href: ROUTES.PATIENTS,
    icon: Users,
    roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'],
  },
  {
    key: 'doctors',
    label: 'Doctors',
    href: ROUTES.DOCTORS,
    icon: Stethoscope,
    roles: ['ADMIN', 'RECEPTIONIST'],
  },
  {
    key: 'appointments',
    label: 'Appointments',
    href: ROUTES.APPOINTMENTS,
    icon: CalendarDays,
    roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'],
  },
  {
    key: 'consultations',
    label: 'Consultations',
    href: ROUTES.CONSULTATIONS,
    icon: ClipboardList,
    roles: ['ADMIN', 'DOCTOR'],
  },
  {
    key: 'prescriptions',
    label: 'Prescriptions',
    href: ROUTES.PRESCRIPTIONS,
    icon: Pill,
    roles: ['ADMIN', 'DOCTOR'],
  },
]

export function getDashboardStatsForRole(role: string | undefined) {
  if (!role) return []
  return DASHBOARD_STATS.filter((stat) =>
    stat.roles.includes(role as DashboardStatDefinition['roles'][number]),
  )
}

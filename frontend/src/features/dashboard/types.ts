import type { LucideIcon } from 'lucide-react'

import type { Appointment } from '@/types/appointment'
import type { UserRole } from '@/types/auth'

export interface DashboardStatDefinition {
  key: string
  label: string
  href: string
  icon: LucideIcon
  roles: UserRole[]
}

export interface DashboardStat {
  key: string
  label: string
  href: string
  value: number
}

export interface AppointmentStatusSummary {
  booked: number
  completed: number
  cancelled: number
}

export interface DashboardOverview {
  stats: DashboardStat[]
  upcomingAppointments: Appointment[]
  statusSummary: AppointmentStatusSummary | null
  hasFailedStats?: boolean
}

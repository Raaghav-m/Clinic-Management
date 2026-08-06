import { appointmentApi } from '@/api/appointmentApi'
import { consultationApi } from '@/api/consultationApi'
import { doctorApi } from '@/api/doctorApi'
import { patientApi } from '@/api/patientApi'
import { prescriptionApi } from '@/api/prescriptionApi'
import type {
  AppointmentStatusSummary,
  DashboardOverview,
  DashboardStat,
  DashboardStatDefinition,
} from '@/features/dashboard/types'
import type { Appointment } from '@/types/appointment'
import type { UserRole } from '@/types/auth'

const statFetchers: Record<string, () => Promise<number>> = {
  patients: async () => (await patientApi.getAll()).data.length,
  doctors: async () => (await doctorApi.getAll()).data.length,
  appointments: async () => (await appointmentApi.getAll()).data.length,
  consultations: async () => (await consultationApi.getAll()).data.length,
  prescriptions: async () => (await prescriptionApi.getAll()).data.length,
}

function summarizeAppointments(
  appointments: Appointment[],
): AppointmentStatusSummary {
  return appointments.reduce<AppointmentStatusSummary>(
    (summary, appointment) => {
      if (appointment.status === 'BOOKED') summary.booked += 1
      if (appointment.status === 'COMPLETED') summary.completed += 1
      if (appointment.status === 'CANCELLED') summary.cancelled += 1
      return summary
    },
    { booked: 0, completed: 0, cancelled: 0 },
  )
}

async function fetchStatValue(key: string): Promise<number> {
  const fetcher = statFetchers[key]
  if (!fetcher) return 0
  return fetcher()
}

export const dashboardService = {
  getOverview: async (
    role: UserRole,
    definitions: DashboardStatDefinition[],
  ): Promise<DashboardOverview> => {
    const statResults = await Promise.allSettled(
      definitions.map(async (definition) => ({
        key: definition.key,
        label: definition.label,
        href: definition.href,
        value: await fetchStatValue(definition.key),
      })),
    )

    const stats: DashboardStat[] = statResults.map((result, index) => {
      const definition = definitions[index]

      if (result.status === 'fulfilled') {
        return result.value
      }

      return {
        key: definition.key,
        label: definition.label,
        href: definition.href,
        value: 0,
      }
    })

    const canLoadAppointments =
      role === 'ADMIN' || role === 'DOCTOR' || role === 'RECEPTIONIST'

    const [upcomingAppointments, allAppointments] = await Promise.all([
      canLoadAppointments
        ? appointmentApi
            .getUpcoming()
            .then((response) => response.data.slice(0, 5))
            .catch(() => [] as Appointment[])
        : Promise.resolve([] as Appointment[]),
      canLoadAppointments
        ? appointmentApi
            .getAll()
            .then((response) => response.data)
            .catch(() => [] as Appointment[])
        : Promise.resolve([] as Appointment[]),
    ])

    const hasFailedStats = statResults.some(
      (result) => result.status === 'rejected',
    )

    return {
      stats,
      upcomingAppointments,
      statusSummary:
        allAppointments.length > 0
          ? summarizeAppointments(allAppointments)
          : null,
      hasFailedStats,
    }
  },
}

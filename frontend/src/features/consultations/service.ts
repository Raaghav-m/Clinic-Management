import { appointmentApi } from '@/api/appointmentApi'
import { consultationApi } from '@/api/consultationApi'
import type { Appointment } from '@/types/appointment'
import type { Consultation, ConsultationRequest } from '@/types/consultation'

export interface ConsultationView extends Consultation {
  patientName: string
  doctorName: string
  appointmentTime: string
}

function enrichConsultations(
  consultations: Consultation[],
  appointments: Appointment[],
): ConsultationView[] {
  const appointmentMap = new Map(
    appointments.map((appointment) => [appointment.id, appointment]),
  )

  return consultations.map((consultation) => {
    const appointment = appointmentMap.get(consultation.appointmentId)

    return {
      ...consultation,
      patientName: appointment?.patientName ?? '—',
      doctorName: appointment?.doctorName ?? '—',
      appointmentTime: appointment?.appointmentTime ?? '',
    }
  })
}

export const consultationService = {
  getAll: async () => {
    const [consultations, appointments] = await Promise.all([
      consultationApi.getAll().then((response) => response.data),
      appointmentApi.getAll().then((response) => response.data),
    ])
    return enrichConsultations(consultations, appointments)
  },

  searchByDiagnosis: async (diagnosis: string) => {
    const [consultations, appointments] = await Promise.all([
      consultationApi.searchByDiagnosis(diagnosis).then((response) => response.data),
      appointmentApi.getAll().then((response) => response.data),
    ])
    return enrichConsultations(consultations, appointments)
  },

  getById: async (id: number) => {
    const consultation = (await consultationApi.getById(id)).data
    const appointment = (
      await appointmentApi.getById(consultation.appointmentId)
    ).data

    return enrichConsultations([consultation], [appointment])[0]
  },

  create: async (payload: ConsultationRequest) =>
    (await consultationApi.create(payload)).data,

  update: async (id: number, payload: ConsultationRequest) =>
    (await consultationApi.update(id, payload)).data,

  delete: async (id: number) => consultationApi.delete(id),

  getAvailableAppointments: async (doctorId?: number | null) => {
    const [appointments, consultations] = await Promise.all([
      appointmentApi.getAll().then((response) => response.data),
      consultationApi.getAll().then((response) => response.data),
    ])

    const usedAppointmentIds = new Set(
      consultations.map((consultation) => consultation.appointmentId),
    )

    return appointments.filter((appointment) => {
      if (usedAppointmentIds.has(appointment.id)) return false
      if (doctorId && appointment.doctorId !== doctorId) return false
      return appointment.status === 'BOOKED'
    })
  },

  getByAppointmentId: async (appointmentId: number) => {
    try {
      return (await consultationApi.getByAppointmentId(appointmentId)).data
    } catch {
      return null
    }
  },
}

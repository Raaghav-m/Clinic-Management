import { appointmentApi } from '@/api/appointmentApi'
import { patientApi } from '@/api/patientApi'
import { prescriptionApi } from '@/api/prescriptionApi'
import { consultationService } from '@/features/consultations/service'
import type { ConsultationView } from '@/features/consultations/service'
import type { Prescription, PrescriptionRequest } from '@/types/prescription'

export interface PrescriptionView extends Prescription {
  patientName: string
  doctorName: string
  diagnosis: string
  appointmentTime: string
}

function enrichPrescriptions(
  prescriptions: Prescription[],
  consultations: ConsultationView[],
): PrescriptionView[] {
  const consultationMap = new Map(
    consultations.map((consultation) => [consultation.id, consultation]),
  )

  return prescriptions.map((prescription) => {
    const consultation = consultationMap.get(prescription.consultationId)

    return {
      ...prescription,
      patientName: consultation?.patientName ?? '—',
      doctorName: consultation?.doctorName ?? '—',
      diagnosis: consultation?.diagnosis ?? '—',
      appointmentTime: consultation?.appointmentTime ?? '',
    }
  })
}

export const prescriptionService = {
  getAll: async () => {
    const [prescriptions, consultations] = await Promise.all([
      prescriptionApi.getAll().then((response) => response.data),
      consultationService.getAll(),
    ])
    return enrichPrescriptions(prescriptions, consultations)
  },

  getByPatient: async (patientId: number) => {
    const [prescriptions, consultations] = await Promise.all([
      patientApi.getPrescriptions(patientId).then((response) => response.data),
      consultationService.getAll(),
    ])
    return enrichPrescriptions(prescriptions, consultations)
  },

  getById: async (id: number) => {
    const prescription = (await prescriptionApi.getById(id)).data
    const consultation = await consultationService.getById(
      prescription.consultationId,
    )

    return enrichPrescriptions([prescription], [consultation])[0]
  },

  getByIdForPatient: async (patientId: number, prescriptionId: number) => {
    const prescriptions = await prescriptionService.getByPatient(patientId)
    const prescription = prescriptions.find((item) => item.id === prescriptionId)
    if (!prescription) {
      throw new Error('Prescription not found')
    }
    return prescription
  },

  create: async (payload: PrescriptionRequest) =>
    (await prescriptionApi.create(payload)).data,

  update: async (id: number, payload: PrescriptionRequest) =>
    (await prescriptionApi.update(id, payload)).data,

  delete: async (id: number) => prescriptionApi.delete(id),

  getByConsultationId: async (consultationId: number) => {
    try {
      const prescription = (
        await prescriptionApi.getByConsultationId(consultationId)
      ).data
      const consultation = await consultationService.getById(consultationId)
      return enrichPrescriptions([prescription], [consultation])[0]
    } catch {
      return null
    }
  },

  getAvailableConsultations: async (doctorId?: number | null) => {
    const [consultations, prescriptions, appointments] = await Promise.all([
      consultationService.getAll(),
      prescriptionApi.getAll().then((response) => response.data),
      appointmentApi.getAll().then((response) => response.data),
    ])

    const usedConsultationIds = new Set(
      prescriptions.map((prescription) => prescription.consultationId),
    )
    const appointmentMap = new Map(
      appointments.map((appointment) => [appointment.id, appointment]),
    )

    return consultations.filter((consultation) => {
      if (usedConsultationIds.has(consultation.id)) return false
      if (doctorId) {
        const appointment = appointmentMap.get(consultation.appointmentId)
        if (appointment?.doctorId !== doctorId) return false
      }
      return true
    })
  },
}

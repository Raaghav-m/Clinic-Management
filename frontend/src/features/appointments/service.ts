import { appointmentApi } from '@/api/appointmentApi'
import { patientApi } from '@/api/patientApi'
import type { AppointmentRequest } from '@/types/appointment'
import type { AppointmentStatus } from '@/types/appointment'

export const appointmentService = {
  getAll: async () => (await appointmentApi.getAll()).data,
  getByPatient: async (patientId: number) =>
    (await patientApi.getAppointments(patientId)).data,
  getById: async (id: number) => (await appointmentApi.getById(id)).data,
  getByStatus: async (status: AppointmentStatus) =>
    (await appointmentApi.getByStatus(status)).data,
  create: async (payload: AppointmentRequest) =>
    (await appointmentApi.create(payload)).data,
  update: async (id: number, payload: AppointmentRequest) =>
    (await appointmentApi.update(id, payload)).data,
  delete: async (id: number) => appointmentApi.delete(id),
  cancel: async (id: number) => (await appointmentApi.cancel(id)).data,
  complete: async (id: number) => (await appointmentApi.complete(id)).data,
}

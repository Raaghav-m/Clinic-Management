import { doctorApi } from '@/api/doctorApi'
import type { DoctorRequest } from '@/types/doctor'

export const doctorService = {
  getAll: async () => (await doctorApi.getAll()).data,
  getById: async (id: number) => (await doctorApi.getById(id)).data,
  create: async (payload: DoctorRequest) =>
    (await doctorApi.create(payload)).data,
  update: async (id: number, payload: DoctorRequest) =>
    (await doctorApi.update(id, payload)).data,
  delete: async (id: number) => doctorApi.delete(id),
  searchByName: async (name: string) =>
    (await doctorApi.searchByName(name)).data,
  searchBySpecialization: async (specialization: string) =>
    (await doctorApi.searchBySpecialization(specialization)).data,
  getAppointments: async (id: number) =>
    (await doctorApi.getAppointments(id)).data,
  getConsultations: async (id: number) =>
    (await doctorApi.getConsultations(id)).data,
}

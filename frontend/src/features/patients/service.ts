import { patientApi } from '@/api/patientApi'
import type { PatientRequest } from '@/types/patient'

export const patientService = {
  getAll: async () => (await patientApi.getAll()).data,
  getById: async (id: number) => (await patientApi.getById(id)).data,
  getSummary: async (id: number) => (await patientApi.getSummary(id)).data,
  create: async (payload: PatientRequest) =>
    (await patientApi.create(payload)).data,
  update: async (id: number, payload: PatientRequest) =>
    (await patientApi.update(id, payload)).data,
  delete: async (id: number) => patientApi.delete(id),
  searchByName: async (name: string) =>
    (await patientApi.searchByName(name)).data,
  searchByPhone: async (phone: string) =>
    (await patientApi.searchByPhone(phone)).data,
}

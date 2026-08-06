import apiClient from '@/api/axios'
import type { Appointment } from '@/types/appointment'
import type { Patient, PatientRequest, PatientSummary } from '@/types/patient'
import type { Prescription } from '@/types/prescription'

export const patientApi = {
  getAll: () => apiClient.get<Patient[]>('/patients'),
  getById: (id: number) => apiClient.get<Patient>(`/patients/${id}`),
  getSummary: (id: number) =>
    apiClient.get<PatientSummary>(`/patients/${id}/summary`),
  create: (payload: PatientRequest) =>
    apiClient.post<Patient>('/patients', payload),
  update: (id: number, payload: PatientRequest) =>
    apiClient.put<Patient>(`/patients/${id}`, payload),
  delete: (id: number) => apiClient.delete(`/patients/${id}`),
  searchByName: (name: string) =>
    apiClient.get<Patient[]>('/patients/search', { params: { name } }),
  searchByPhone: (phone: string) =>
    apiClient.get<Patient[]>('/patients/search/phone', { params: { phone } }),
  getAppointments: (id: number) =>
    apiClient.get<Appointment[]>(`/patients/${id}/appointments`),
  getPrescriptions: (id: number) =>
    apiClient.get<Prescription[]>(`/patients/${id}/prescriptions`),
}

import apiClient from '@/api/axios'
import type { Appointment } from '@/types/appointment'
import type { Consultation } from '@/types/consultation'
import type { Doctor, DoctorRequest } from '@/types/doctor'

export const doctorApi = {
  getAll: () => apiClient.get<Doctor[]>('/doctors'),
  getById: (id: number) => apiClient.get<Doctor>(`/doctors/${id}`),
  create: (payload: DoctorRequest) =>
    apiClient.post<Doctor>('/doctors', payload),
  update: (id: number, payload: DoctorRequest) =>
    apiClient.put<Doctor>(`/doctors/${id}`, payload),
  delete: (id: number) => apiClient.delete(`/doctors/${id}`),
  searchByName: (name: string) =>
    apiClient.get<Doctor[]>('/doctors/search/name', { params: { name } }),
  searchBySpecialization: (specialization: string) =>
    apiClient.get<Doctor[]>('/doctors/search/specialization', {
      params: { specialization },
    }),
  getAppointments: (id: number) =>
    apiClient.get<Appointment[]>(`/doctors/${id}/appointments`),
  getConsultations: (id: number) =>
    apiClient.get<Consultation[]>(`/doctors/${id}/consultations`),
}

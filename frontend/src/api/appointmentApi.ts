import apiClient from '@/api/axios'
import type { Appointment, AppointmentRequest } from '@/types/appointment'

export const appointmentApi = {
  getAll: () => apiClient.get<Appointment[]>('/appointments'),
  getById: (id: number) => apiClient.get<Appointment>(`/appointments/${id}`),
  getUpcoming: () => apiClient.get<Appointment[]>('/appointments/upcoming'),
  getByStatus: (status: Appointment['status']) =>
    apiClient.get<Appointment[]>(`/appointments/status/${status}`),
  create: (payload: AppointmentRequest) =>
    apiClient.post<Appointment>('/appointments', payload),
  update: (id: number, payload: AppointmentRequest) =>
    apiClient.put<Appointment>(`/appointments/${id}`, payload),
  delete: (id: number) => apiClient.delete(`/appointments/${id}`),
  cancel: (id: number) =>
    apiClient.patch<Appointment>(`/appointments/${id}/cancel`),
  complete: (id: number) =>
    apiClient.patch<Appointment>(`/appointments/${id}/completed`),
}

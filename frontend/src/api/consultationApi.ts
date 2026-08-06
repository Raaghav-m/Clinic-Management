import apiClient from '@/api/axios'
import type { Consultation, ConsultationRequest } from '@/types/consultation'

export const consultationApi = {
  getAll: () => apiClient.get<Consultation[]>('/consultation'),
  getById: (id: number) =>
    apiClient.get<Consultation>(`/consultation/${id}`),
  create: (payload: ConsultationRequest) =>
    apiClient.post<Consultation>('/consultation', payload),
  update: (id: number, payload: ConsultationRequest) =>
    apiClient.put<Consultation>(`/consultation/${id}`, payload),
  delete: (id: number) => apiClient.delete(`/consultation/${id}`),
  searchByDiagnosis: (diagnosis: string) =>
    apiClient.get<Consultation[]>('/consultation/search', {
      params: { diagnosis },
    }),
  getByAppointmentId: (appointmentId: number) =>
    apiClient.get<Consultation>(`/consultation/appointment/${appointmentId}`),
}

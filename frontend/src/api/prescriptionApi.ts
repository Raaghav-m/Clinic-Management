import apiClient from '@/api/axios'
import type { Prescription, PrescriptionRequest } from '@/types/prescription'

export const prescriptionApi = {
  getAll: () => apiClient.get<Prescription[]>('/prescriptions'),
  getById: (id: number) =>
    apiClient.get<Prescription>(`/prescriptions/${id}`),
  create: (payload: PrescriptionRequest) =>
    apiClient.post<Prescription>('/prescriptions', payload),
  update: (id: number, payload: PrescriptionRequest) =>
    apiClient.put<Prescription>(`/prescriptions/${id}`, payload),
  delete: (id: number) => apiClient.delete(`/prescriptions/${id}`),
  getByConsultationId: (consultationId: number) =>
    apiClient.get<Prescription>(`/prescriptions/consultation/${consultationId}`),
}

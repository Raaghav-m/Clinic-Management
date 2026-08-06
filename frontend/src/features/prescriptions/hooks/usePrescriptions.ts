import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { consultationKeys } from '@/features/consultations/hooks/useConsultations'
import {
  prescriptionService,
  type PrescriptionView,
} from '@/features/prescriptions/service'
import { usePermissions } from '@/hooks/usePermissions'
import { useToast } from '@/hooks/useToast'
import { getApiErrorMessage } from '@/types/api'
import type { PrescriptionRequest } from '@/types/prescription'

export const prescriptionKeys = {
  all: ['prescriptions'] as const,
  lists: () => [...prescriptionKeys.all, 'list'] as const,
  list: (scope: string) => [...prescriptionKeys.lists(), scope] as const,
  details: () => [...prescriptionKeys.all, 'detail'] as const,
  detail: (id: number) => [...prescriptionKeys.details(), id] as const,
  consultations: (doctorId?: number | null) =>
    [...prescriptionKeys.all, 'consultations', doctorId ?? 'all'] as const,
  byConsultation: (consultationId: number) =>
    [...prescriptionKeys.all, 'by-consultation', consultationId] as const,
}

export function usePrescriptions() {
  const { role, profileId } = usePermissions()
  const scope =
    role === 'PATIENT' ? `patient-${profileId ?? 'unknown'}` : 'all'

  return useQuery<PrescriptionView[]>({
    queryKey: prescriptionKeys.list(scope),
    queryFn: async () => {
      if (role === 'PATIENT') {
        if (!profileId) return []
        return prescriptionService.getByPatient(profileId)
      }
      return prescriptionService.getAll()
    },
    enabled: role !== 'PATIENT' || Boolean(profileId),
  })
}

export function usePrescription(id: number) {
  const { role, profileId } = usePermissions()

  return useQuery({
    queryKey: prescriptionKeys.detail(id),
    queryFn: () => {
      if (role === 'PATIENT' && profileId) {
        return prescriptionService.getByIdForPatient(profileId, id)
      }
      return prescriptionService.getById(id)
    },
    enabled: id > 0 && (role !== 'PATIENT' || Boolean(profileId)),
  })
}

export function usePrescriptionByConsultation(
  consultationId: number,
  enabled = true,
) {
  return useQuery({
    queryKey: prescriptionKeys.byConsultation(consultationId),
    queryFn: () => prescriptionService.getByConsultationId(consultationId),
    enabled: enabled && consultationId > 0,
  })
}

export function usePrescriptionConsultations() {
  const { isDoctor, profileId } = usePermissions()

  return useQuery({
    queryKey: prescriptionKeys.consultations(isDoctor ? profileId : null),
    queryFn: () =>
      prescriptionService.getAvailableConsultations(
        isDoctor ? profileId : null,
      ),
    enabled: isDoctor,
  })
}

export function useCreatePrescription() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: PrescriptionRequest) =>
      prescriptionService.create(payload),
    onSuccess: (prescription) => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.lists() })
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      queryClient.invalidateQueries({
        queryKey: prescriptionKeys.byConsultation(prescription.consultationId),
      })
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() })
      toast.success('Prescription created successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to create prescription.'))
    },
  })
}

export function useUpdatePrescription(id: number) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: PrescriptionRequest) =>
      prescriptionService.update(id, payload),
    onSuccess: (prescription) => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.lists() })
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.detail(id) })
      queryClient.invalidateQueries({
        queryKey: prescriptionKeys.byConsultation(prescription.consultationId),
      })
      toast.success('Prescription updated successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update prescription.'))
    },
  })
}

export function useDeletePrescription() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => prescriptionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.lists() })
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.all })
      toast.success('Prescription deleted successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete prescription.'))
    },
  })
}

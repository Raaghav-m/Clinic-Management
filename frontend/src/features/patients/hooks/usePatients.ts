import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { patientService } from '@/features/patients/service'
import { useToast } from '@/hooks/useToast'
import { getApiErrorMessage } from '@/types/api'
import type { PatientRequest } from '@/types/patient'

export const patientKeys = {
  all: ['patients'] as const,
  lists: () => [...patientKeys.all, 'list'] as const,
  list: (search: string) => [...patientKeys.lists(), search] as const,
  details: () => [...patientKeys.all, 'detail'] as const,
  detail: (id: number) => [...patientKeys.details(), id] as const,
  summary: (id: number) => [...patientKeys.detail(id), 'summary'] as const,
}

export function usePatients(search: string) {
  const trimmed = search.trim()

  return useQuery({
    queryKey: patientKeys.list(trimmed),
    queryFn: () =>
      trimmed
        ? patientService.searchByName(trimmed)
        : patientService.getAll(),
  })
}

export function usePatient(id: number) {
  return useQuery({
    queryKey: patientKeys.detail(id),
    queryFn: () => patientService.getById(id),
    enabled: id > 0,
  })
}

export function usePatientSummary(id: number, enabled = true) {
  return useQuery({
    queryKey: patientKeys.summary(id),
    queryFn: () => patientService.getSummary(id),
    enabled: id > 0 && enabled,
    retry: false,
  })
}

export function useCreatePatient() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: PatientRequest) => patientService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() })
      toast.success('Patient created successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to create patient.'))
    },
  })
}

export function useUpdatePatient(id: number) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: PatientRequest) =>
      patientService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() })
      queryClient.invalidateQueries({ queryKey: patientKeys.detail(id) })
      toast.success('Patient updated successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update patient.'))
    },
  })
}

export function useDeletePatient() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => patientService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() })
      toast.success('Patient deleted successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete patient.'))
    },
  })
}

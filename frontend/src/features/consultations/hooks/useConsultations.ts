import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { appointmentKeys } from '@/features/appointments/hooks/useAppointments'
import {
  consultationService,
  type ConsultationView,
} from '@/features/consultations/service'
import { usePermissions } from '@/hooks/usePermissions'
import { useToast } from '@/hooks/useToast'
import { getApiErrorMessage } from '@/types/api'
import type { ConsultationRequest } from '@/types/consultation'

export const consultationKeys = {
  all: ['consultations'] as const,
  lists: () => [...consultationKeys.all, 'list'] as const,
  list: (search: string) => [...consultationKeys.lists(), search] as const,
  details: () => [...consultationKeys.all, 'detail'] as const,
  detail: (id: number) => [...consultationKeys.details(), id] as const,
  appointments: (doctorId?: number | null) =>
    [...consultationKeys.all, 'appointments', doctorId ?? 'all'] as const,
  byAppointment: (appointmentId: number) =>
    [...consultationKeys.all, 'by-appointment', appointmentId] as const,
}

export function useConsultations(search: string) {
  const trimmed = search.trim()

  return useQuery<ConsultationView[]>({
    queryKey: consultationKeys.list(trimmed),
    queryFn: () =>
      trimmed
        ? consultationService.searchByDiagnosis(trimmed)
        : consultationService.getAll(),
  })
}

export function useConsultation(id: number) {
  return useQuery({
    queryKey: consultationKeys.detail(id),
    queryFn: () => consultationService.getById(id),
    enabled: id > 0,
  })
}

export function useConsultationAppointments() {
  const { isDoctor, profileId } = usePermissions()

  return useQuery({
    queryKey: consultationKeys.appointments(isDoctor ? profileId : null),
    queryFn: () =>
      consultationService.getAvailableAppointments(
        isDoctor ? profileId : null,
      ),
    enabled: true,
  })
}

export function useConsultationByAppointment(appointmentId: number, enabled = true) {
  return useQuery({
    queryKey: consultationKeys.byAppointment(appointmentId),
    queryFn: () => consultationService.getByAppointmentId(appointmentId),
    enabled: enabled && appointmentId > 0,
  })
}

export function useCreateConsultation() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: ConsultationRequest) =>
      consultationService.create(payload),
    onSuccess: (consultation) => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: consultationKeys.all })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.detail(consultation.appointmentId),
      })
      queryClient.invalidateQueries({
        queryKey: consultationKeys.byAppointment(consultation.appointmentId),
      })
      toast.success('Consultation recorded and appointment marked completed.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to create consultation.'))
    },
  })
}

export function useUpdateConsultation(id: number) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: ConsultationRequest) =>
      consultationService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() })
      queryClient.invalidateQueries({ queryKey: consultationKeys.detail(id) })
      toast.success('Consultation updated successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update consultation.'))
    },
  })
}

export function useDeleteConsultation() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => consultationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() })
      toast.success('Consultation deleted successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete consultation.'))
    },
  })
}

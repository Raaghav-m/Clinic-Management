import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { doctorService } from '@/features/doctors/service'
import { useToast } from '@/hooks/useToast'
import { getApiErrorMessage } from '@/types/api'
import type { DoctorRequest } from '@/types/doctor'

export const doctorKeys = {
  all: ['doctors'] as const,
  lists: () => [...doctorKeys.all, 'list'] as const,
  list: (search: string, specialization: string) =>
    [...doctorKeys.lists(), { search, specialization }] as const,
  details: () => [...doctorKeys.all, 'detail'] as const,
  detail: (id: number) => [...doctorKeys.details(), id] as const,
  appointments: (id: number) =>
    [...doctorKeys.detail(id), 'appointments'] as const,
  consultations: (id: number) =>
    [...doctorKeys.detail(id), 'consultations'] as const,
}

export function useDoctors(search: string, specialization: string) {
  const trimmedSearch = search.trim()
  const trimmedSpecialization = specialization.trim()

  return useQuery({
    queryKey: doctorKeys.list(trimmedSearch, trimmedSpecialization),
    queryFn: async () => {
      if (trimmedSpecialization) {
        return doctorService.searchBySpecialization(trimmedSpecialization)
      }
      if (trimmedSearch) {
        return doctorService.searchByName(trimmedSearch)
      }
      return doctorService.getAll()
    },
  })
}

export function useDoctor(id: number) {
  return useQuery({
    queryKey: doctorKeys.detail(id),
    queryFn: () => doctorService.getById(id),
    enabled: id > 0,
  })
}

export function useDoctorAppointments(id: number) {
  return useQuery({
    queryKey: doctorKeys.appointments(id),
    queryFn: () => doctorService.getAppointments(id),
    enabled: id > 0,
    retry: false,
  })
}

export function useDoctorConsultations(id: number) {
  return useQuery({
    queryKey: doctorKeys.consultations(id),
    queryFn: () => doctorService.getConsultations(id),
    enabled: id > 0,
    retry: false,
  })
}

export function useCreateDoctor() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: DoctorRequest) => doctorService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() })
      toast.success('Doctor created successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to create doctor.'))
    },
  })
}

export function useUpdateDoctor(id: number) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: DoctorRequest) =>
      doctorService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() })
      queryClient.invalidateQueries({ queryKey: doctorKeys.detail(id) })
      toast.success('Doctor updated successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update doctor.'))
    },
  })
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => doctorService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() })
      toast.success('Doctor deleted successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete doctor.'))
    },
  })
}

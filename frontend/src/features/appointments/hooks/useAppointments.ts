import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { appointmentService } from '@/features/appointments/service'
import { usePermissions } from '@/hooks/usePermissions'
import { useToast } from '@/hooks/useToast'
import { getApiErrorMessage } from '@/types/api'
import type { AppointmentRequest, AppointmentStatus } from '@/types/appointment'
import type { UserRole } from '@/types/auth'

export const appointmentKeys = {
  all: ['appointments'] as const,
  lists: () => [...appointmentKeys.all, 'list'] as const,
  list: (scope: string, status: string) =>
    [...appointmentKeys.lists(), scope, status] as const,
  details: () => [...appointmentKeys.all, 'detail'] as const,
  detail: (id: number) => [...appointmentKeys.details(), id] as const,
}

interface UseAppointmentsOptions {
  role: UserRole
  profileId?: number | null
  status: string
}

export function useAppointments({
  role,
  profileId,
  status,
}: UseAppointmentsOptions) {
  const scope =
    role === 'PATIENT' ? `patient-${profileId ?? 'unknown'}` : 'all'

  return useQuery({
    queryKey: appointmentKeys.list(scope, status),
    queryFn: async () => {
      if (role === 'PATIENT') {
        if (!profileId) return []
        const appointments = await appointmentService.getByPatient(profileId)
        if (!status) return appointments
        return appointments.filter((item) => item.status === status)
      }
      if (status) {
        return appointmentService.getByStatus(status as AppointmentStatus)
      }
      return appointmentService.getAll()
    },
    enabled: role !== 'PATIENT' || Boolean(profileId),
  })
}

export function useAppointment(id: number, enabled = true) {
  const { role, profileId } = usePermissions()

  const patientAppointmentsQuery = useQuery({
    queryKey: appointmentKeys.list(`patient-${profileId ?? 'unknown'}`, ''),
    queryFn: () => appointmentService.getByPatient(profileId!),
    enabled: enabled && role === 'PATIENT' && Boolean(profileId),
  })

  const staffAppointmentQuery = useQuery({
    queryKey: appointmentKeys.detail(id),
    queryFn: () => appointmentService.getById(id),
    enabled: enabled && role !== 'PATIENT' && id > 0,
  })

  if (role === 'PATIENT') {
    const appointment = patientAppointmentsQuery.data?.find(
      (item) => item.id === id,
    )

    return {
      ...patientAppointmentsQuery,
      data: appointment,
      isError: patientAppointmentsQuery.isError || (!patientAppointmentsQuery.isLoading && !appointment),
    }
  }

  return staffAppointmentQuery
}

export function useCreateAppointment() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: AppointmentRequest) =>
      appointmentService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      toast.success('Appointment booked successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to book appointment.'))
    },
  })
}

export function useUpdateAppointment(id: number) {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (payload: AppointmentRequest) =>
      appointmentService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({ queryKey: appointmentKeys.detail(id) })
      toast.success('Appointment updated successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update appointment.'))
    },
  })
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => appointmentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      toast.success('Appointment deleted successfully.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to delete appointment.'))
    },
  })
}

export function useCancelAppointment() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => appointmentService.cancel(id),
    onSuccess: (_, appointmentId) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.detail(appointmentId),
      })
      toast.success('Appointment cancelled.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to cancel appointment.'))
    },
  })
}

export function useCompleteAppointment() {
  const queryClient = useQueryClient()
  const toast = useToast()

  return useMutation({
    mutationFn: (id: number) => appointmentService.complete(id),
    onSuccess: (_, appointmentId) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() })
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.detail(appointmentId),
      })
      toast.success('Appointment marked as completed.')
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to complete appointment.'))
    },
  })
}

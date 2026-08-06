import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/common/Button'
import { Loader } from '@/components/common/Loader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { doctorService } from '@/features/doctors/service'
import { patientService } from '@/features/patients/service'
import { cn } from '@/lib/utils'
import type { Appointment } from '@/types/appointment'

const appointmentSchema = z.object({
  patientId: z.coerce.number().min(1, 'Select a patient'),
  doctorId: z.coerce.number().min(1, 'Select a doctor'),
  appointmentTime: z.string().min(1, 'Select date and time'),
})

export type AppointmentFormValues = z.infer<typeof appointmentSchema>

interface AppointmentFormProps {
  defaultValues?: Partial<AppointmentFormValues>
  onSubmit: (values: AppointmentFormValues) => void
  isSubmitting?: boolean
  submitLabel?: string
  disablePatientSelect?: boolean
}

function toDateTimeLocalValue(value: string): string {
  if (!value) return ''
  return value.slice(0, 16)
}

function toApiDateTime(value: string): string {
  if (value.length === 16) return `${value}:00`
  return value
}

export function toAppointmentFormValues(
  appointment: Appointment,
): AppointmentFormValues {
  return {
    patientId: appointment.patientId,
    doctorId: appointment.doctorId,
    appointmentTime: toDateTimeLocalValue(appointment.appointmentTime),
  }
}

export function toAppointmentRequest(values: AppointmentFormValues) {
  return {
    patientId: values.patientId,
    doctorId: values.doctorId,
    appointmentTime: toApiDateTime(values.appointmentTime),
  }
}

export function AppointmentForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save Appointment',
  disablePatientSelect = false,
}: AppointmentFormProps) {
  const patientsQuery = useQuery({
    queryKey: ['patients', 'options'],
    queryFn: () => patientService.getAll(),
  })
  const doctorsQuery = useQuery({
    queryKey: ['doctors', 'options'],
    queryFn: () => doctorService.getAll(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientId: 0,
      doctorId: 0,
      appointmentTime: '',
      ...defaultValues,
    },
  })

  const isLoadingOptions = patientsQuery.isLoading || doctorsQuery.isLoading

  if (isLoadingOptions) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <Loader label="Loading form options..." />
      </div>
    )
  }

  const selectClassName = cn(
    'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="patientId">Patient</Label>
          <select
            id="patientId"
            disabled={disablePatientSelect}
            className={selectClassName}
            {...register('patientId')}
          >
            <option value={0}>Select patient</option>
            {(patientsQuery.data ?? []).map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          {errors.patientId ? (
            <p className="text-destructive text-sm">{errors.patientId.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="doctorId">Doctor</Label>
          <select id="doctorId" className={selectClassName} {...register('doctorId')}>
            <option value={0}>Select doctor</option>
            {(doctorsQuery.data ?? []).map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} — {doctor.specialization}
              </option>
            ))}
          </select>
          {errors.doctorId ? (
            <p className="text-destructive text-sm">{errors.doctorId.message}</p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="appointmentTime">Date & Time</Label>
          <Input
            id="appointmentTime"
            type="datetime-local"
            {...register('appointmentTime')}
          />
          {errors.appointmentTime ? (
            <p className="text-destructive text-sm">
              {errors.appointmentTime.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  )
}

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/common/Button'
import { Loader } from '@/components/common/Loader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useConsultationAppointments } from '@/features/consultations/hooks/useConsultations'
import { cn } from '@/lib/utils'
import type { Consultation } from '@/types/consultation'
import { formatDateTime } from '@/utils/date'
import { requiredString } from '@/utils/validators'

const consultationSchema = z.object({
  appointmentId: z.coerce.number().min(1, 'Select an appointment'),
  symptoms: requiredString('Symptoms').max(
    60,
    'Symptoms must be at most 60 characters',
  ),
  diagnosis: z.string().max(100, 'Diagnosis must be at most 100 characters'),
  notes: z.string().max(100, 'Notes must be at most 100 characters'),
})

export type ConsultationFormValues = z.infer<typeof consultationSchema>

interface ConsultationFormProps {
  defaultValues?: Partial<ConsultationFormValues>
  onSubmit: (values: ConsultationFormValues) => void
  isSubmitting?: boolean
  submitLabel?: string
  lockAppointment?: boolean
  appointmentLabel?: string
  preselectedAppointmentId?: number
}

export function toConsultationFormValues(
  consultation: Consultation,
): ConsultationFormValues {
  return {
    appointmentId: consultation.appointmentId,
    symptoms: consultation.symptoms,
    diagnosis: consultation.diagnosis ?? '',
    notes: consultation.notes ?? '',
  }
}

export function ConsultationForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save Consultation',
  lockAppointment = false,
  appointmentLabel,
  preselectedAppointmentId,
}: ConsultationFormProps) {
  const appointmentsQuery = useConsultationAppointments()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      appointmentId: preselectedAppointmentId ?? 0,
      symptoms: '',
      diagnosis: '',
      notes: '',
      ...defaultValues,
    },
  })

  if (!lockAppointment && appointmentsQuery.isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <Loader label="Loading appointments..." />
      </div>
    )
  }

  const appointments = appointmentsQuery.data ?? []
  const selectClassName = cn(
    'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="appointmentId">Appointment</Label>
        {lockAppointment ? (
          <>
            <input type="hidden" {...register('appointmentId')} />
            <p className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
              {appointmentLabel ?? 'Selected appointment'}
            </p>
          </>
        ) : (
          <select
            id="appointmentId"
            className={selectClassName}
            {...register('appointmentId')}
          >
            <option value={0}>Select appointment</option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>
                #{appointment.id} — {appointment.patientName} with{' '}
                {appointment.doctorName} (
                {formatDateTime(appointment.appointmentTime)})
              </option>
            ))}
          </select>
        )}
        {errors.appointmentId ? (
          <p className="text-destructive text-sm">
            {errors.appointmentId.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="symptoms">Symptoms</Label>
        <Input
          id="symptoms"
          placeholder="Chest pain, breathlessness..."
          {...register('symptoms')}
        />
        {errors.symptoms ? (
          <p className="text-destructive text-sm">{errors.symptoms.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="diagnosis">Diagnosis</Label>
        <Input
          id="diagnosis"
          placeholder="Stable angina, mild hypertension"
          {...register('diagnosis')}
        />
        {errors.diagnosis ? (
          <p className="text-destructive text-sm">{errors.diagnosis.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          rows={4}
          className={cn(
            'border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          )}
          placeholder="Treatment plan, follow-up instructions..."
          {...register('notes')}
        />
        {errors.notes ? (
          <p className="text-destructive text-sm">{errors.notes.message}</p>
        ) : null}
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

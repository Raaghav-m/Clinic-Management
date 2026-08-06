import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/common/Button'
import { Loader } from '@/components/common/Loader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePrescriptionConsultations } from '@/features/prescriptions/hooks/usePrescriptions'
import { cn } from '@/lib/utils'
import type { Prescription } from '@/types/prescription'
import { formatDateTime } from '@/utils/date'
import { requiredString } from '@/utils/validators'

const prescriptionSchema = z.object({
  consultationId: z.coerce.number().min(1, 'Select a consultation'),
  medicine: requiredString('Medicine').max(
    100,
    'Medicine must be at most 100 characters',
  ),
  dosage: requiredString('Dosage').max(
    100,
    'Dosage must be at most 100 characters',
  ),
  frequency: requiredString('Frequency').max(
    100,
    'Frequency must be at most 100 characters',
  ),
  duration: requiredString('Duration'),
  instructions: z
    .string()
    .max(100, 'Instructions must be at most 100 characters'),
})

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>

interface PrescriptionFormProps {
  defaultValues?: Partial<PrescriptionFormValues>
  onSubmit: (values: PrescriptionFormValues) => void
  isSubmitting?: boolean
  submitLabel?: string
  lockConsultation?: boolean
  consultationLabel?: string
  preselectedConsultationId?: number
}

export function toPrescriptionFormValues(
  prescription: Prescription,
): PrescriptionFormValues {
  return {
    consultationId: prescription.consultationId,
    medicine: prescription.medicineName,
    dosage: prescription.dosage,
    frequency: prescription.frequency,
    duration: prescription.duration,
    instructions: prescription.instructions ?? '',
  }
}

export function PrescriptionForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save Prescription',
  lockConsultation = false,
  consultationLabel,
  preselectedConsultationId,
}: PrescriptionFormProps) {
  const consultationsQuery = usePrescriptionConsultations()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      consultationId: preselectedConsultationId ?? 0,
      medicine: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      ...defaultValues,
    },
  })

  if (!lockConsultation && consultationsQuery.isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center">
        <Loader label="Loading consultations..." />
      </div>
    )
  }

  const consultations = consultationsQuery.data ?? []
  const selectClassName = cn(
    'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="consultationId">Consultation</Label>
        {lockConsultation ? (
          <>
            <input type="hidden" {...register('consultationId')} />
            <p className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
              {consultationLabel ?? 'Selected consultation'}
            </p>
          </>
        ) : (
          <select
            id="consultationId"
            className={selectClassName}
            {...register('consultationId')}
          >
            <option value={0}>Select consultation</option>
            {consultations.map((consultation) => (
              <option key={consultation.id} value={consultation.id}>
                #{consultation.id} — {consultation.patientName} (
                {consultation.diagnosis || consultation.symptoms}) —{' '}
                {formatDateTime(consultation.appointmentTime)}
              </option>
            ))}
          </select>
        )}
        {errors.consultationId ? (
          <p className="text-destructive text-sm">
            {errors.consultationId.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="medicine">Medicine</Label>
          <Input
            id="medicine"
            placeholder="Paracetamol 500mg"
            {...register('medicine')}
          />
          {errors.medicine ? (
            <p className="text-destructive text-sm">{errors.medicine.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dosage">Dosage</Label>
          <Input id="dosage" placeholder="1 tablet" {...register('dosage')} />
          {errors.dosage ? (
            <p className="text-destructive text-sm">{errors.dosage.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Input
            id="frequency"
            placeholder="Twice daily"
            {...register('frequency')}
          />
          {errors.frequency ? (
            <p className="text-destructive text-sm">
              {errors.frequency.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            placeholder="5 days"
            {...register('duration')}
          />
          {errors.duration ? (
            <p className="text-destructive text-sm">{errors.duration.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions</Label>
        <textarea
          id="instructions"
          rows={3}
          className={cn(
            'border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          )}
          placeholder="Take after meals..."
          {...register('instructions')}
        />
        {errors.instructions ? (
          <p className="text-destructive text-sm">
            {errors.instructions.message}
          </p>
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

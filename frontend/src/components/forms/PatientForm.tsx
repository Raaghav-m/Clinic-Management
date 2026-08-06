import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/common/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { Patient } from '@/types/patient'
import { PATIENT_GENDERS } from '@/types/patient'
import { emailSchema, phoneSchema, requiredString } from '@/utils/validators'

const patientSchema = z.object({
  name: requiredString('Name').max(60, 'Name must be at most 60 characters'),
  email: emailSchema.max(40, 'Email must be at most 40 characters'),
  gender: requiredString('Gender'),
  phone: phoneSchema,
})

export type PatientFormValues = z.infer<typeof patientSchema>

interface PatientFormProps {
  defaultValues?: Partial<PatientFormValues>
  onSubmit: (values: PatientFormValues) => void
  isSubmitting?: boolean
  submitLabel?: string
}

export function toPatientFormValues(patient: Patient): PatientFormValues {
  return {
    name: patient.name,
    email: patient.email,
    gender: patient.gender,
    phone: patient.phone,
  }
}

export function PatientForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save Patient',
}: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: '',
      email: '',
      gender: '',
      phone: '',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Priya Sharma"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name ? (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="patient@email.com"
            aria-invalid={Boolean(errors.email)}
            {...register('email')}
          />
          {errors.email ? (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="9876543210"
            aria-invalid={Boolean(errors.phone)}
            {...register('phone')}
          />
          {errors.phone ? (
            <p className="text-destructive text-sm">{errors.phone.message}</p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            aria-invalid={Boolean(errors.gender)}
            className={cn(
              'border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none',
              'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            )}
            {...register('gender')}
          >
            <option value="">Select gender</option>
            {PATIENT_GENDERS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {errors.gender ? (
            <p className="text-destructive text-sm">{errors.gender.message}</p>
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

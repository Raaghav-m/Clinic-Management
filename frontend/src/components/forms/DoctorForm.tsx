import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/common/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Doctor } from '@/types/doctor'
import { emailSchema, phoneSchema, requiredString } from '@/utils/validators'

const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Enter a valid time (HH:mm)')

const doctorSchema = z.object({
  name: requiredString('Name').max(60, 'Name must be at most 60 characters'),
  email: emailSchema.max(40, 'Email must be at most 40 characters'),
  phone: phoneSchema,
  specialization: requiredString('Specialization').max(
    60,
    'Specialization must be at most 60 characters',
  ),
  experience: z.coerce
    .number()
    .min(0, 'Experience cannot be negative')
    .max(60, 'Experience seems too high'),
  consultationFee: z.coerce
    .number()
    .positive('Consultation fee must be greater than 0'),
  startTime: timeSchema,
  endTime: timeSchema,
})

export type DoctorFormValues = z.infer<typeof doctorSchema>

interface DoctorFormProps {
  defaultValues?: Partial<DoctorFormValues>
  onSubmit: (values: DoctorFormValues) => void
  isSubmitting?: boolean
  submitLabel?: string
}

function toTimeInputValue(time: string): string {
  return time?.slice(0, 5) ?? ''
}

function toApiTimeValue(time: string): string {
  return time.length === 5 ? `${time}:00` : time
}

export function toDoctorFormValues(doctor: Doctor): DoctorFormValues {
  return {
    name: doctor.name,
    email: doctor.email,
    phone: doctor.phone,
    specialization: doctor.specialization,
    experience: doctor.experience,
    consultationFee: doctor.consultationFee,
    startTime: toTimeInputValue(doctor.startTime),
    endTime: toTimeInputValue(doctor.endTime),
  }
}

export function toDoctorRequest(values: DoctorFormValues) {
  return {
    ...values,
    startTime: toApiTimeValue(values.startTime),
    endTime: toApiTimeValue(values.endTime),
  }
}

export function DoctorForm({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save Doctor',
}: DoctorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: 0,
      consultationFee: 0,
      startTime: '09:00',
      endTime: '17:00',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Dr. Ananya Reddy" {...register('name')} />
          {errors.name ? (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register('email')} />
          {errors.email ? (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="9876543210" {...register('phone')} />
          {errors.phone ? (
            <p className="text-destructive text-sm">{errors.phone.message}</p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Input
            id="specialization"
            placeholder="Cardiology"
            {...register('specialization')}
          />
          {errors.specialization ? (
            <p className="text-destructive text-sm">
              {errors.specialization.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience (years)</Label>
          <Input
            id="experience"
            type="number"
            min={0}
            {...register('experience')}
          />
          {errors.experience ? (
            <p className="text-destructive text-sm">
              {errors.experience.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="consultationFee">Consultation Fee (₹)</Label>
          <Input
            id="consultationFee"
            type="number"
            min={0}
            step="0.01"
            {...register('consultationFee')}
          />
          {errors.consultationFee ? (
            <p className="text-destructive text-sm">
              {errors.consultationFee.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input id="startTime" type="time" {...register('startTime')} />
          {errors.startTime ? (
            <p className="text-destructive text-sm">{errors.startTime.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input id="endTime" type="time" {...register('endTime')} />
          {errors.endTime ? (
            <p className="text-destructive text-sm">{errors.endTime.message}</p>
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

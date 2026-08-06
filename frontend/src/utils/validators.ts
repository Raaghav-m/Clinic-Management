import { z } from 'zod'

export const emailSchema = z.string().email('Enter a valid email address')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')

export const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number')

export const requiredString = (field: string) =>
  z.string().min(1, `${field} is required`)

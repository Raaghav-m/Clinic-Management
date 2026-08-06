import type { UserRole } from '@/types/auth'

export const APP_NAME = 'Clinic Management System'

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',
  PATIENTS_NEW: '/patients/new',
  PATIENT_DETAIL: '/patients/:id',
  PATIENTS_EDIT: '/patients/:id/edit',
  DOCTORS: '/doctors',
  DOCTORS_NEW: '/doctors/new',
  DOCTOR_DETAIL: '/doctors/:id',
  DOCTORS_EDIT: '/doctors/:id/edit',
  APPOINTMENTS: '/appointments',
  APPOINTMENTS_NEW: '/appointments/new',
  APPOINTMENT_DETAIL: '/appointments/:id',
  APPOINTMENTS_EDIT: '/appointments/:id/edit',
  CONSULTATIONS: '/consultations',
  CONSULTATIONS_NEW: '/consultations/new',
  CONSULTATION_DETAIL: '/consultations/:id',
  CONSULTATIONS_EDIT: '/consultations/:id/edit',
  PRESCRIPTIONS: '/prescriptions',
  PRESCRIPTIONS_NEW: '/prescriptions/new',
  PRESCRIPTION_DETAIL: '/prescriptions/:id',
  PRESCRIPTIONS_EDIT: '/prescriptions/:id/edit',
  UNAUTHORIZED: '/unauthorized',
} as const

export const ROLES = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  RECEPTIONIST: 'RECEPTIONIST',
  PATIENT: 'PATIENT',
} as const satisfies Record<string, UserRole>

export const DEFAULT_PAGE_SIZE = 10

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const

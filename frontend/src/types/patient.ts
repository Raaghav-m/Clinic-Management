export interface Patient {
  id: number
  name: string
  email: string
  gender: string
  phone: string
}

export interface PatientRequest {
  name: string
  email: string
  gender: string
  phone: string
}

export interface PatientSummary {
  id: number
  patientName: string
  phone: string
  totalAppointments: number
  completedAppointments: number
  cancelledAppointments: number
  upcomingAppointments: number
  totalConsultations: number
  totalPrescriptions: number
  lastAppointmentDate: string | null
  lastConsultationDate: string | null
}

export type PatientGender = 'Male' | 'Female' | 'Other'

export const PATIENT_GENDERS: PatientGender[] = ['Male', 'Female', 'Other']

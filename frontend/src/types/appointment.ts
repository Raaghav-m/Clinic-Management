export type AppointmentStatus = 'BOOKED' | 'COMPLETED' | 'CANCELLED'

export interface Appointment {
  id: number
  patientId: number
  doctorId: number
  patientName: string
  doctorName: string
  appointmentTime: string
  status: AppointmentStatus
}

export interface AppointmentRequest {
  patientId: number
  doctorId: number
  appointmentTime: string
}

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  'BOOKED',
  'COMPLETED',
  'CANCELLED',
]

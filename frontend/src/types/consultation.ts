export interface Consultation {
  id: number
  appointmentId: number
  symptoms: string
  diagnosis: string
  notes: string
}

export interface ConsultationRequest {
  appointmentId: number
  symptoms: string
  diagnosis: string
  notes: string
}

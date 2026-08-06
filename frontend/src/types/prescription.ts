export interface Prescription {
  id: number
  consultationId: number
  medicineName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export interface PrescriptionRequest {
  consultationId: number
  medicine: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

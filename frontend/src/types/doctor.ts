export interface Doctor {
  id: number
  name: string
  email: string
  phone: string
  specialization: string
  experience: number
  consultationFee: number
  startTime: string
  endTime: string
}

export interface DoctorRequest {
  name: string
  email: string
  phone: string
  specialization: string
  experience: number
  consultationFee: number
  startTime: string
  endTime: string
}

import { lazy, type ComponentType } from 'react'

function lazyPage<T extends Record<string, ComponentType>>(
  loader: () => Promise<T>,
  exportName: keyof T,
) {
  return lazy(() =>
    loader().then((module) => ({
      default: module[exportName] as ComponentType,
    })),
  )
}

export const LoginPage = lazyPage(
  () => import('@/pages/Login'),
  'LoginPage',
)
export const DashboardPage = lazyPage(
  () => import('@/features/dashboard/pages/DashboardPage'),
  'DashboardPage',
)
export const NotFoundPage = lazyPage(
  () => import('@/pages/NotFound'),
  'NotFoundPage',
)
export const UnauthorizedPage = lazyPage(
  () => import('@/pages/Unauthorized'),
  'UnauthorizedPage',
)

export const PatientsListPage = lazyPage(
  () => import('@/features/patients/pages/PatientsListPage'),
  'PatientsListPage',
)
export const PatientDetailPage = lazyPage(
  () => import('@/features/patients/pages/PatientDetailPage'),
  'PatientDetailPage',
)
export const PatientCreatePage = lazyPage(
  () => import('@/features/patients/pages/PatientCreatePage'),
  'PatientCreatePage',
)
export const PatientEditPage = lazyPage(
  () => import('@/features/patients/pages/PatientEditPage'),
  'PatientEditPage',
)

export const DoctorsListPage = lazyPage(
  () => import('@/features/doctors/pages/DoctorsListPage'),
  'DoctorsListPage',
)
export const DoctorDetailPage = lazyPage(
  () => import('@/features/doctors/pages/DoctorDetailPage'),
  'DoctorDetailPage',
)
export const DoctorCreatePage = lazyPage(
  () => import('@/features/doctors/pages/DoctorCreatePage'),
  'DoctorCreatePage',
)
export const DoctorEditPage = lazyPage(
  () => import('@/features/doctors/pages/DoctorEditPage'),
  'DoctorEditPage',
)

export const AppointmentsListPage = lazyPage(
  () => import('@/features/appointments/pages/AppointmentsListPage'),
  'AppointmentsListPage',
)
export const AppointmentDetailPage = lazyPage(
  () => import('@/features/appointments/pages/AppointmentDetailPage'),
  'AppointmentDetailPage',
)
export const AppointmentCreatePage = lazyPage(
  () => import('@/features/appointments/pages/AppointmentCreatePage'),
  'AppointmentCreatePage',
)
export const AppointmentEditPage = lazyPage(
  () => import('@/features/appointments/pages/AppointmentEditPage'),
  'AppointmentEditPage',
)

export const ConsultationsListPage = lazyPage(
  () => import('@/features/consultations/pages/ConsultationsPage'),
  'ConsultationsListPage',
)
export const ConsultationDetailPage = lazyPage(
  () => import('@/features/consultations/pages/ConsultationDetailPage'),
  'ConsultationDetailPage',
)
export const ConsultationCreatePage = lazyPage(
  () => import('@/features/consultations/pages/ConsultationCreatePage'),
  'ConsultationCreatePage',
)
export const ConsultationEditPage = lazyPage(
  () => import('@/features/consultations/pages/ConsultationEditPage'),
  'ConsultationEditPage',
)

export const PrescriptionsListPage = lazyPage(
  () => import('@/features/prescriptions/pages/PrescriptionsPage'),
  'PrescriptionsListPage',
)
export const PrescriptionDetailPage = lazyPage(
  () => import('@/features/prescriptions/pages/PrescriptionDetailPage'),
  'PrescriptionDetailPage',
)
export const PrescriptionCreatePage = lazyPage(
  () => import('@/features/prescriptions/pages/PrescriptionCreatePage'),
  'PrescriptionCreatePage',
)
export const PrescriptionEditPage = lazyPage(
  () => import('@/features/prescriptions/pages/PrescriptionEditPage'),
  'PrescriptionEditPage',
)

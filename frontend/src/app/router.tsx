import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import {
  AppointmentCreatePage,
  AppointmentDetailPage,
  AppointmentEditPage,
  AppointmentsListPage,
  ConsultationCreatePage,
  ConsultationDetailPage,
  ConsultationEditPage,
  ConsultationsListPage,
  DashboardPage,
  DoctorCreatePage,
  DoctorDetailPage,
  DoctorEditPage,
  DoctorsListPage,
  LoginPage,
  NotFoundPage,
  PatientCreatePage,
  PatientDetailPage,
  PatientEditPage,
  PatientsListPage,
  PrescriptionCreatePage,
  PrescriptionDetailPage,
  PrescriptionEditPage,
  PrescriptionsListPage,
  UnauthorizedPage,
} from '@/app/lazyPages'
import { AuthBootstrap } from '@/components/common/Protected'
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { LoadingPage } from '@/pages/Loading'
import { GuestRoute } from '@/routes/GuestRoute'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { RoleGuard } from '@/routes/RoleGuard'

export function AppRouter() {
  return (
    <AuthBootstrap>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route element={<GuestRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              <Route
                element={
                  <RoleGuard allowedRoles={['ADMIN', 'DOCTOR', 'RECEPTIONIST']} />
                }
              >
                <Route path="/patients" element={<PatientsListPage />} />
                <Route path="/patients/:id" element={<PatientDetailPage />} />
              </Route>

              <Route element={<RoleGuard allowedRoles={['ADMIN', 'RECEPTIONIST']} />}>
                <Route path="/patients/new" element={<PatientCreatePage />} />
                <Route path="/patients/:id/edit" element={<PatientEditPage />} />
              </Route>

              <Route element={<RoleGuard allowedRoles={['ADMIN']} />}>
                <Route path="/doctors" element={<DoctorsListPage />} />
                <Route path="/doctors/new" element={<DoctorCreatePage />} />
                <Route path="/doctors/:id" element={<DoctorDetailPage />} />
                <Route path="/doctors/:id/edit" element={<DoctorEditPage />} />
              </Route>

              <Route
                element={
                  <RoleGuard
                    allowedRoles={['ADMIN', 'RECEPTIONIST', 'DOCTOR', 'PATIENT']}
                  />
                }
              >
                <Route path="/appointments" element={<AppointmentsListPage />} />
                <Route
                  path="/appointments/:id"
                  element={<AppointmentDetailPage />}
                />
              </Route>

              <Route element={<RoleGuard allowedRoles={['ADMIN', 'RECEPTIONIST']} />}>
                <Route path="/appointments/new" element={<AppointmentCreatePage />} />
                <Route
                  path="/appointments/:id/edit"
                  element={<AppointmentEditPage />}
                />
              </Route>

              <Route element={<RoleGuard allowedRoles={['ADMIN', 'DOCTOR']} />}>
                <Route path="/consultations" element={<ConsultationsListPage />} />
              </Route>

              <Route element={<RoleGuard allowedRoles={['DOCTOR']} />}>
                <Route
                  path="/consultations/new"
                  element={<ConsultationCreatePage />}
                />
                <Route
                  path="/consultations/:id/edit"
                  element={<ConsultationEditPage />}
                />
              </Route>

              <Route element={<RoleGuard allowedRoles={['ADMIN', 'DOCTOR']} />}>
                <Route
                  path="/consultations/:id"
                  element={<ConsultationDetailPage />}
                />
              </Route>

              <Route
                element={
                  <RoleGuard allowedRoles={['ADMIN', 'DOCTOR', 'PATIENT']} />
                }
              >
                <Route path="/prescriptions" element={<PrescriptionsListPage />} />
              </Route>

              <Route element={<RoleGuard allowedRoles={['DOCTOR']} />}>
                <Route
                  path="/prescriptions/new"
                  element={<PrescriptionCreatePage />}
                />
                <Route
                  path="/prescriptions/:id/edit"
                  element={<PrescriptionEditPage />}
                />
              </Route>

              <Route
                element={
                  <RoleGuard allowedRoles={['ADMIN', 'DOCTOR', 'PATIENT']} />
                }
              >
                <Route
                  path="/prescriptions/:id"
                  element={<PrescriptionDetailPage />}
                />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthBootstrap>
  )
}

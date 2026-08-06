import { CalendarDays, ClipboardList, Mail, Phone, Pill, User } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  usePatient,
  usePatientSummary,
} from '@/features/patients/hooks/usePatients'
import { usePermissions } from '@/hooks/usePermissions'
import { formatDateTime } from '@/utils/date'
import { ROUTES } from '@/utils/constants'

export function PatientDetailPage() {
  const { id } = useParams()
  const patientId = Number(id)
  const { isAdmin, isReceptionist, isDoctor } = usePermissions()
  const canManage = isAdmin || isReceptionist
  const canViewSummary = isAdmin || isDoctor

  const { data: patient, isLoading, isError, refetch } = usePatient(patientId)
  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    refetch: refetchSummary,
  } = usePatientSummary(patientId, canViewSummary)

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader size="lg" label="Loading patient..." />
      </div>
    )
  }

  if (isError || !patient) {
    return (
      <ErrorState
        title="Patient not found"
        message="The requested patient record could not be found."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <FeaturePageShell
      title={patient.name}
      description="Patient profile and clinical activity summary."
      actions={
        canManage ? (
          <Button asChild>
            <Link to={`/patients/${patient.id}/edit`}>Edit Patient</Link>
          </Button>
        ) : undefined
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-xs lg:col-span-1">
          <h2 className="text-base font-semibold">Contact Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <User className="text-muted-foreground size-4" />
              <span>{patient.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-muted-foreground size-4" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-muted-foreground size-4" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <User className="text-muted-foreground size-4" />
              <span>{patient.gender}</span>
            </div>
          </div>
        </div>

        {canViewSummary && isSummaryLoading ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border lg:col-span-2">
            <Loader label="Loading clinical summary..." />
          </div>
        ) : canViewSummary && isSummaryError ? (
          <div className="lg:col-span-2">
            <ErrorState
              title="Failed to load summary"
              message="Clinical summary could not be loaded."
              onRetry={() => refetchSummary()}
            />
          </div>
        ) : summary ? (
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-base font-semibold">Clinical Summary</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <SummaryCard
                icon={CalendarDays}
                label="Total Appointments"
                value={summary.totalAppointments}
              />
              <SummaryCard
                icon={CalendarDays}
                label="Upcoming"
                value={summary.upcomingAppointments}
              />
              <SummaryCard
                icon={ClipboardList}
                label="Consultations"
                value={summary.totalConsultations}
              />
              <SummaryCard
                icon={Pill}
                label="Prescriptions"
                value={summary.totalPrescriptions}
              />
            </div>
            <div className="rounded-xl border bg-muted/20 p-4 text-sm">
              <p>
                <span className="text-muted-foreground">Last appointment:</span>{' '}
                {summary.lastAppointmentDate
                  ? formatDateTime(summary.lastAppointmentDate)
                  : '—'}
              </p>
              <p className="mt-2">
                <span className="text-muted-foreground">Last consultation:</span>{' '}
                {summary.lastConsultationDate
                  ? formatDateTime(summary.lastConsultationDate)
                  : '—'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center rounded-xl border border-dashed p-6 lg:col-span-2">
            <p className="text-muted-foreground text-sm">
              Clinical summary is available for admin and doctor roles.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Button asChild variant="outline">
          <Link to={ROUTES.PATIENTS}>Back to Patients</Link>
        </Button>
      </div>
    </FeaturePageShell>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: number
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-xs">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{label}</p>
        <Icon className="text-primary size-4" />
      </div>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}

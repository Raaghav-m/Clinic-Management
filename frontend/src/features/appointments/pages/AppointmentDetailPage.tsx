import { CalendarDays, Stethoscope, User } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  useAppointment,
  useCancelAppointment,
} from '@/features/appointments/hooks/useAppointments'
import { useConsultationByAppointment } from '@/features/consultations/hooks/useConsultations'
import { usePermissions } from '@/hooks/usePermissions'
import { formatDateTime } from '@/utils/date'
import { ROUTES } from '@/utils/constants'
import { cn } from '@/lib/utils'

const statusStyles = {
  BOOKED: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-rose-100 text-rose-700',
} as const

export function AppointmentDetailPage() {
  const { id } = useParams()
  const appointmentId = Number(id)
  const { isAdmin, isReceptionist, isDoctor, isPatient } = usePermissions()

  const { data: appointment, isLoading, isError, refetch } =
    useAppointment(appointmentId)
  const { data: consultation } = useConsultationByAppointment(
    appointmentId,
    isDoctor,
  )
  const cancelMutation = useCancelAppointment()

  const canEdit = isAdmin || isReceptionist
  const canCancel =
    (isAdmin || isReceptionist || isDoctor) &&
    appointment?.status === 'BOOKED'
  const canRecordConsultation =
    isDoctor && appointment?.status === 'BOOKED' && !consultation

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader size="lg" label="Loading appointment..." />
      </div>
    )
  }

  if (isError || !appointment) {
    return (
      <ErrorState
        title="Appointment not found"
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <FeaturePageShell
      title="Appointment Details"
      description={formatDateTime(appointment.appointmentTime)}
      actions={
        <div className="flex flex-wrap gap-2">
          {canEdit ? (
            <Button asChild variant="outline">
              <Link to={`/appointments/${appointment.id}/edit`}>Edit</Link>
            </Button>
          ) : null}
          {canCancel ? (
            <Button
              variant="outline"
              disabled={cancelMutation.isPending}
              onClick={() => cancelMutation.mutate(appointment.id)}
            >
              Cancel Appointment
            </Button>
          ) : null}
          {canRecordConsultation ? (
            <Button asChild>
              <Link
                to={`${ROUTES.CONSULTATIONS_NEW}?appointmentId=${appointment.id}`}
              >
                Record Consultation
              </Link>
            </Button>
          ) : null}
          {consultation ? (
            <Button asChild variant="outline">
              <Link to={`/consultations/${consultation.id}`}>
                View Consultation
              </Link>
            </Button>
          ) : null}
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <DetailCard icon={User} label="Patient" value={appointment.patientName} />
        <DetailCard icon={Stethoscope} label="Doctor" value={appointment.doctorName} />
        <DetailCard
          icon={CalendarDays}
          label="Scheduled Time"
          value={formatDateTime(appointment.appointmentTime)}
        />
        <div className="rounded-xl border bg-card p-6 shadow-xs">
          <p className="text-muted-foreground text-sm">Status</p>
          <span
            className={cn(
              'mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize',
              statusStyles[appointment.status],
            )}
          >
            {appointment.status.toLowerCase()}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <Button asChild variant="outline">
          <Link to={ROUTES.APPOINTMENTS}>
            {isPatient ? 'Back to My Appointments' : 'Back to Appointments'}
          </Link>
        </Button>
      </div>
    </FeaturePageShell>
  )
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-xs">
      <div className="flex items-center gap-3">
        <Icon className="text-primary size-5" />
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      </div>
    </div>
  )
}

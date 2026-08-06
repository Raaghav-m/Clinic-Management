import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import {
  AppointmentForm,
  toAppointmentFormValues,
  toAppointmentRequest,
  type AppointmentFormValues,
} from '@/components/forms/AppointmentForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  useAppointment,
  useUpdateAppointment,
} from '@/features/appointments/hooks/useAppointments'
import { usePermissions } from '@/hooks/usePermissions'

export function AppointmentEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const appointmentId = Number(id)
  const { isAdmin, isReceptionist } = usePermissions()
  const canAccess = isAdmin || isReceptionist

  const { data: appointment, isLoading, isError, refetch } =
    useAppointment(appointmentId, canAccess)
  const updateMutation = useUpdateAppointment(appointmentId)

  const handleSubmit = (values: AppointmentFormValues) => {
    updateMutation.mutate(toAppointmentRequest(values), {
      onSuccess: () => navigate(`/appointments/${appointmentId}`),
    })
  }

  if (!canAccess) {
    return (
      <ErrorState
        title="Access denied"
        message="You do not have permission to edit appointments."
      />
    )
  }

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
      title="Edit Appointment"
      description={`Update booking for ${appointment.patientName}.`}
      actions={
        <Button asChild variant="outline">
          <Link to={`/appointments/${appointment.id}`}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <AppointmentForm
          defaultValues={toAppointmentFormValues(appointment)}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          submitLabel="Update Appointment"
        />
      </div>
    </FeaturePageShell>
  )
}

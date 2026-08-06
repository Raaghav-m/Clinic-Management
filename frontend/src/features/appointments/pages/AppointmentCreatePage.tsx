import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import {
  AppointmentForm,
  toAppointmentRequest,
  type AppointmentFormValues,
} from '@/components/forms/AppointmentForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { useCreateAppointment } from '@/features/appointments/hooks/useAppointments'
import { ROUTES } from '@/utils/constants'

export function AppointmentCreatePage() {
  const navigate = useNavigate()
  const createMutation = useCreateAppointment()

  const handleSubmit = (values: AppointmentFormValues) => {
    createMutation.mutate(toAppointmentRequest(values), {
      onSuccess: (appointment) => navigate(`/appointments/${appointment.id}`),
    })
  }

  return (
    <FeaturePageShell
      title="Book Appointment"
      description="Schedule a new patient visit with a doctor."
      actions={
        <Button asChild variant="outline">
          <Link to={ROUTES.APPOINTMENTS}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <AppointmentForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
          submitLabel="Book Appointment"
        />
      </div>
    </FeaturePageShell>
  )
}

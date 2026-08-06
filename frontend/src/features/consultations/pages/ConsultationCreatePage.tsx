import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import {
  ConsultationForm,
  type ConsultationFormValues,
} from '@/components/forms/ConsultationForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { useCreateConsultation } from '@/features/consultations/hooks/useConsultations'
import { ROUTES } from '@/utils/constants'

export function ConsultationCreatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const createMutation = useCreateConsultation()

  const preselectedAppointmentId = Number(searchParams.get('appointmentId') ?? 0)
  const validPreselectedId =
    preselectedAppointmentId > 0 ? preselectedAppointmentId : undefined

  const handleSubmit = (values: ConsultationFormValues) => {
    createMutation.mutate(values, {
      onSuccess: (consultation) =>
        navigate(`/consultations/${consultation.id}`),
    })
  }

  return (
    <FeaturePageShell
      title="Record Consultation"
      description="Document symptoms, diagnosis, and notes for an appointment."
      actions={
        <Button asChild variant="outline">
          <Link to={ROUTES.CONSULTATIONS}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <ConsultationForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
          submitLabel="Record Consultation"
          preselectedAppointmentId={validPreselectedId}
        />
      </div>
    </FeaturePageShell>
  )
}

import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import {
  ConsultationForm,
  toConsultationFormValues,
  type ConsultationFormValues,
} from '@/components/forms/ConsultationForm'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  useConsultation,
  useUpdateConsultation,
} from '@/features/consultations/hooks/useConsultations'
import { formatDateTime } from '@/utils/date'

export function ConsultationEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const consultationId = Number(id)

  const { data: consultation, isLoading, isError, refetch } =
    useConsultation(consultationId)
  const updateMutation = useUpdateConsultation(consultationId)

  const handleSubmit = (values: ConsultationFormValues) => {
    updateMutation.mutate(values, {
      onSuccess: () => navigate(`/consultations/${consultationId}`),
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader size="lg" label="Loading consultation..." />
      </div>
    )
  }

  if (isError || !consultation) {
    return (
      <ErrorState
        title="Consultation not found"
        onRetry={() => refetch()}
      />
    )
  }

  const appointmentLabel = consultation.appointmentTime
    ? `#${consultation.appointmentId} — ${consultation.patientName} with ${consultation.doctorName} (${formatDateTime(consultation.appointmentTime)})`
    : `#${consultation.appointmentId} — ${consultation.patientName} with ${consultation.doctorName}`

  return (
    <FeaturePageShell
      title="Edit Consultation"
      description={`Update consultation for appointment #${consultation.appointmentId}.`}
      actions={
        <Button asChild variant="outline">
          <Link to={`/consultations/${consultationId}`}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <ConsultationForm
          defaultValues={toConsultationFormValues(consultation)}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          submitLabel="Save Changes"
          lockAppointment
          appointmentLabel={appointmentLabel}
        />
      </div>
    </FeaturePageShell>
  )
}

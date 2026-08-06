import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import {
  PrescriptionForm,
  toPrescriptionFormValues,
  type PrescriptionFormValues,
} from '@/components/forms/PrescriptionForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  usePrescription,
  useUpdatePrescription,
} from '@/features/prescriptions/hooks/usePrescriptions'
import { formatDateTime } from '@/utils/date'

export function PrescriptionEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const prescriptionId = Number(id)

  const { data: prescription, isLoading, isError, refetch } =
    usePrescription(prescriptionId)
  const updateMutation = useUpdatePrescription(prescriptionId)

  const handleSubmit = (values: PrescriptionFormValues) => {
    updateMutation.mutate(values, {
      onSuccess: () => navigate(`/prescriptions/${prescriptionId}`),
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader size="lg" label="Loading prescription..." />
      </div>
    )
  }

  if (isError || !prescription) {
    return (
      <ErrorState
        title="Prescription not found"
        onRetry={() => refetch()}
      />
    )
  }

  const consultationLabel = prescription.appointmentTime
    ? `#${prescription.consultationId} — ${prescription.patientName} (${prescription.diagnosis || 'Consultation'}) — ${formatDateTime(prescription.appointmentTime)}`
    : `#${prescription.consultationId} — ${prescription.patientName}`

  return (
    <FeaturePageShell
      title="Edit Prescription"
      description={`Update prescription for ${prescription.patientName}.`}
      actions={
        <Button asChild variant="outline">
          <Link to={`/prescriptions/${prescriptionId}`}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <PrescriptionForm
          defaultValues={toPrescriptionFormValues(prescription)}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          submitLabel="Save Changes"
          lockConsultation
          consultationLabel={consultationLabel}
        />
      </div>
    </FeaturePageShell>
  )
}

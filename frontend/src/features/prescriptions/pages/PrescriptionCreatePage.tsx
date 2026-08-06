import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import {
  PrescriptionForm,
  type PrescriptionFormValues,
} from '@/components/forms/PrescriptionForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { useCreatePrescription } from '@/features/prescriptions/hooks/usePrescriptions'
import { ROUTES } from '@/utils/constants'

export function PrescriptionCreatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const createMutation = useCreatePrescription()

  const preselectedConsultationId = Number(searchParams.get('consultationId') ?? 0)
  const validPreselectedId =
    preselectedConsultationId > 0 ? preselectedConsultationId : undefined

  const handleSubmit = (values: PrescriptionFormValues) => {
    createMutation.mutate(values, {
      onSuccess: (prescription) =>
        navigate(`/prescriptions/${prescription.id}`),
    })
  }

  return (
    <FeaturePageShell
      title="Add Prescription"
      description="Prescribe medication for a consultation."
      actions={
        <Button asChild variant="outline">
          <Link to={ROUTES.PRESCRIPTIONS}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <PrescriptionForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
          submitLabel="Create Prescription"
          preselectedConsultationId={validPreselectedId}
        />
      </div>
    </FeaturePageShell>
  )
}

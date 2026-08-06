import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import {
  PatientForm,
  type PatientFormValues,
} from '@/components/forms/PatientForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { useCreatePatient } from '@/features/patients/hooks/usePatients'
import { ROUTES } from '@/utils/constants'

export function PatientCreatePage() {
  const navigate = useNavigate()
  const createMutation = useCreatePatient()

  const handleSubmit = (values: PatientFormValues) => {
    createMutation.mutate(values, {
      onSuccess: (patient) => navigate(`/patients/${patient.id}`),
    })
  }

  return (
    <FeaturePageShell
      title="Add Patient"
      description="Create a new patient record in the clinic system."
      actions={
        <Button asChild variant="outline">
          <Link to={ROUTES.PATIENTS}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <PatientForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
          submitLabel="Create Patient"
        />
      </div>
    </FeaturePageShell>
  )
}

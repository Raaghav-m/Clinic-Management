import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import {
  PatientForm,
  toPatientFormValues,
  type PatientFormValues,
} from '@/components/forms/PatientForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  usePatient,
  useUpdatePatient,
} from '@/features/patients/hooks/usePatients'

export function PatientEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const patientId = Number(id)

  const { data: patient, isLoading, isError, refetch } = usePatient(patientId)
  const updateMutation = useUpdatePatient(patientId)

  const handleSubmit = (values: PatientFormValues) => {
    updateMutation.mutate(values, {
      onSuccess: () => navigate(`/patients/${patientId}`),
    })
  }

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
        message="The patient you are trying to edit does not exist."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <FeaturePageShell
      title="Edit Patient"
      description={`Update details for ${patient.name}.`}
      actions={
        <Button asChild variant="outline">
          <Link to={`/patients/${patient.id}`}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <PatientForm
          defaultValues={toPatientFormValues(patient)}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          submitLabel="Update Patient"
        />
      </div>
    </FeaturePageShell>
  )
}

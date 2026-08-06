import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import {
  DoctorForm,
  toDoctorFormValues,
  toDoctorRequest,
  type DoctorFormValues,
} from '@/components/forms/DoctorForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  useDoctor,
  useUpdateDoctor,
} from '@/features/doctors/hooks/useDoctors'

export function DoctorEditPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const doctorId = Number(id)

  const { data: doctor, isLoading, isError, refetch } = useDoctor(doctorId)
  const updateMutation = useUpdateDoctor(doctorId)

  const handleSubmit = (values: DoctorFormValues) => {
    updateMutation.mutate(toDoctorRequest(values), {
      onSuccess: () => navigate(`/doctors/${doctorId}`),
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader size="lg" label="Loading doctor..." />
      </div>
    )
  }

  if (isError || !doctor) {
    return (
      <ErrorState
        title="Doctor not found"
        message="The doctor you are trying to edit does not exist."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <FeaturePageShell
      title="Edit Doctor"
      description={`Update details for ${doctor.name}.`}
      actions={
        <Button asChild variant="outline">
          <Link to={`/doctors/${doctor.id}`}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <DoctorForm
          defaultValues={toDoctorFormValues(doctor)}
          onSubmit={handleSubmit}
          isSubmitting={updateMutation.isPending}
          submitLabel="Update Doctor"
        />
      </div>
    </FeaturePageShell>
  )
}

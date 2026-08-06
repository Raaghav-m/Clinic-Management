import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import {
  DoctorForm,
  toDoctorRequest,
  type DoctorFormValues,
} from '@/components/forms/DoctorForm'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { useCreateDoctor } from '@/features/doctors/hooks/useDoctors'
import { ROUTES } from '@/utils/constants'

export function DoctorCreatePage() {
  const navigate = useNavigate()
  const createMutation = useCreateDoctor()

  const handleSubmit = (values: DoctorFormValues) => {
    createMutation.mutate(toDoctorRequest(values), {
      onSuccess: (doctor) => navigate(`/doctors/${doctor.id}`),
    })
  }

  return (
    <FeaturePageShell
      title="Add Doctor"
      description="Register a new doctor and set their clinic schedule."
      actions={
        <Button asChild variant="outline">
          <Link to={ROUTES.DOCTORS}>Cancel</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 shadow-xs">
        <DoctorForm
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending}
          submitLabel="Create Doctor"
        />
      </div>
    </FeaturePageShell>
  )
}

import { CalendarDays, Pill, Stethoscope, User } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  useDeletePrescription,
  usePrescription,
} from '@/features/prescriptions/hooks/usePrescriptions'
import { usePermissions } from '@/hooks/usePermissions'
import { formatDateTime } from '@/utils/date'
import { ROUTES } from '@/utils/constants'

export function PrescriptionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const prescriptionId = Number(id)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { isAdmin, isDoctor, isPatient } = usePermissions()
  const { data: prescription, isLoading, isError, refetch } =
    usePrescription(prescriptionId)
  const deleteMutation = useDeletePrescription()

  const canEdit = isDoctor
  const canDelete = isAdmin

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(prescriptionId, {
      onSuccess: () => navigate(ROUTES.PRESCRIPTIONS),
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

  return (
    <FeaturePageShell
      title="Prescription Details"
      description={prescription.medicineName}
      actions={
        <div className="flex flex-wrap gap-2">
          {canEdit ? (
            <Button asChild variant="outline">
              <Link to={`/prescriptions/${prescription.id}/edit`}>Edit</Link>
            </Button>
          ) : null}
          {canDelete ? (
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </Button>
          ) : null}
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        <DetailCard icon={Pill} label="Medicine" value={prescription.medicineName} />
        <DetailCard icon={User} label="Patient" value={prescription.patientName} />
        <DetailCard icon={Stethoscope} label="Doctor" value={prescription.doctorName} />
        <DetailCard
          icon={CalendarDays}
          label="Consultation Date"
          value={
            prescription.appointmentTime
              ? formatDateTime(prescription.appointmentTime)
              : '—'
          }
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <TextBlock label="Dosage" value={prescription.dosage} />
        <TextBlock label="Frequency" value={prescription.frequency} />
        <TextBlock label="Duration" value={prescription.duration} />
        <TextBlock
          label="Instructions"
          value={prescription.instructions || '—'}
        />
      </div>

      {prescription.diagnosis ? (
        <div className="mt-6">
          <TextBlock label="Diagnosis" value={prescription.diagnosis} />
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link to={ROUTES.PRESCRIPTIONS}>
            {isPatient ? 'Back to My Prescriptions' : 'Back to Prescriptions'}
          </Link>
        </Button>
        {!isPatient ? (
          <Button asChild variant="outline">
            <Link to={`/consultations/${prescription.consultationId}`}>
              View Consultation
            </Link>
          </Button>
        ) : null}
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete prescription"
        description="Are you sure you want to permanently delete this prescription?"
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </FeaturePageShell>
  )
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-xs">
      <div className="flex items-center gap-3">
        <Icon className="text-primary size-5" />
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      </div>
    </div>
  )
}

function TextBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-xs">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="mt-2 whitespace-pre-wrap">{value}</p>
    </div>
  )
}

import { CalendarDays, ClipboardList, Stethoscope, User } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  useConsultation,
  useDeleteConsultation,
} from '@/features/consultations/hooks/useConsultations'
import { usePrescriptionByConsultation } from '@/features/prescriptions/hooks/usePrescriptions'
import { usePermissions } from '@/hooks/usePermissions'
import { formatDateTime } from '@/utils/date'
import { ROUTES } from '@/utils/constants'
import { useState } from 'react'

export function ConsultationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const consultationId = Number(id)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { isAdmin, isDoctor } = usePermissions()
  const { data: consultation, isLoading, isError, refetch } =
    useConsultation(consultationId)
  const { data: prescription } = usePrescriptionByConsultation(
    consultationId,
    isDoctor || isAdmin,
  )
  const deleteMutation = useDeleteConsultation()

  const canEdit = isDoctor
  const canDelete = isAdmin
  const canAddPrescription = isDoctor && !prescription

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(consultationId, {
      onSuccess: () => navigate(ROUTES.CONSULTATIONS),
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

  return (
    <FeaturePageShell
      title="Consultation Details"
      description={`Appointment #${consultation.appointmentId}`}
      actions={
        <div className="flex flex-wrap gap-2">
          {canEdit ? (
            <Button asChild variant="outline">
              <Link to={`/consultations/${consultation.id}/edit`}>Edit</Link>
            </Button>
          ) : null}
          {canAddPrescription ? (
            <Button asChild>
              <Link
                to={`${ROUTES.PRESCRIPTIONS_NEW}?consultationId=${consultation.id}`}
              >
                Add Prescription
              </Link>
            </Button>
          ) : null}
          {prescription ? (
            <Button asChild variant="outline">
              <Link to={`/prescriptions/${prescription.id}`}>
                View Prescription
              </Link>
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
        <DetailCard icon={User} label="Patient" value={consultation.patientName} />
        <DetailCard icon={Stethoscope} label="Doctor" value={consultation.doctorName} />
        <DetailCard
          icon={CalendarDays}
          label="Appointment Time"
          value={
            consultation.appointmentTime
              ? formatDateTime(consultation.appointmentTime)
              : '—'
          }
        />
        <DetailCard
          icon={ClipboardList}
          label="Symptoms"
          value={consultation.symptoms}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <TextBlock label="Diagnosis" value={consultation.diagnosis || '—'} />
        <TextBlock label="Notes" value={consultation.notes || '—'} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link to={ROUTES.CONSULTATIONS}>Back to Consultations</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={`/appointments/${consultation.appointmentId}`}>
            View Appointment
          </Link>
        </Button>
      </div>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete consultation"
        description="Are you sure you want to permanently delete this consultation record?"
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

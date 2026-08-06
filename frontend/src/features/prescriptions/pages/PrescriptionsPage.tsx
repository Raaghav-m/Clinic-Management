import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { TableSkeleton } from '@/components/common/TableSkeleton'
import { Pagination } from '@/components/common/Pagination'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { PrescriptionFilters } from '@/features/prescriptions/components/PrescriptionFilters'
import { PrescriptionTable } from '@/features/prescriptions/components/PrescriptionTable'
import {
  useDeletePrescription,
  usePrescriptions,
} from '@/features/prescriptions/hooks/usePrescriptions'
import type { PrescriptionView } from '@/features/prescriptions/service'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import { usePermissions } from '@/hooks/usePermissions'
import { ROUTES } from '@/utils/constants'

export function PrescriptionsListPage() {
  const [search, setSearch] = useState('')
  const [prescriptionToDelete, setPrescriptionToDelete] =
    useState<PrescriptionView | null>(null)

  const debouncedSearch = useDebounce(search, 300)
  const { isAdmin, isDoctor, isPatient, profileId } = usePermissions()

  const canCreate = isDoctor
  const canEdit = isDoctor
  const canDelete = isAdmin

  const { data: prescriptions = [], isLoading, isError, refetch } =
    usePrescriptions()
  const deleteMutation = useDeletePrescription()

  const filteredPrescriptions = useMemo(() => {
    if (!debouncedSearch.trim()) return prescriptions
    const query = debouncedSearch.toLowerCase()
    return prescriptions.filter(
      (prescription) =>
        prescription.medicineName.toLowerCase().includes(query) ||
        prescription.patientName.toLowerCase().includes(query) ||
        prescription.doctorName.toLowerCase().includes(query) ||
        prescription.diagnosis.toLowerCase().includes(query),
    )
  }, [prescriptions, debouncedSearch])

  const { page, pageSize, totalPages, setPage } = usePagination({
    totalItems: filteredPrescriptions.length,
  })

  const paginatedPrescriptions = filteredPrescriptions.slice(
    page * pageSize,
    page * pageSize + pageSize,
  )

  const handleDeleteConfirm = () => {
    if (!prescriptionToDelete) return
    deleteMutation.mutate(prescriptionToDelete.id, {
      onSuccess: () => setPrescriptionToDelete(null),
    })
  }

  if (isPatient && !profileId) {
    return (
      <FeaturePageShell
        title="My Prescriptions"
        description="View your prescribed medications."
      >
        <EmptyState
          title="Session update required"
          description="Sign out and sign in again to load your prescriptions."
        />
      </FeaturePageShell>
    )
  }

  return (
    <FeaturePageShell
      title={isPatient ? 'My Prescriptions' : 'Prescriptions'}
      description={
        isPatient
          ? 'Your medication prescriptions from clinic visits.'
          : 'View and manage patient prescriptions.'
      }
      actions={
        canCreate ? (
          <Button asChild>
            <Link to={ROUTES.PRESCRIPTIONS_NEW}>
              <Plus className="size-4" />
              Add Prescription
            </Link>
          </Button>
        ) : undefined
      }
    >
      <div className="space-y-4">
        <PrescriptionFilters search={search} onSearchChange={setSearch} />

        {isLoading ? (
          <div className="rounded-xl border bg-card p-6">
            <TableSkeleton columns={7} />
          </div>
        ) : isError ? (
          <ErrorState
            title="Failed to load prescriptions"
            onRetry={() => refetch()}
          />
        ) : filteredPrescriptions.length === 0 ? (
          <EmptyState
            title="No prescriptions found"
            description={
              search
                ? 'Try adjusting your search.'
                : 'Add the first prescription to get started.'
            }
            action={
              canCreate ? (
                <Button asChild>
                  <Link to={ROUTES.PRESCRIPTIONS_NEW}>Add Prescription</Link>
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <PrescriptionTable
              prescriptions={paginatedPrescriptions}
              canEdit={canEdit}
              canDelete={canDelete}
              onDelete={setPrescriptionToDelete}
            />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(prescriptionToDelete)}
        onOpenChange={(open) => !open && setPrescriptionToDelete(null)}
        title="Delete prescription"
        description="Are you sure you want to permanently delete this prescription?"
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </FeaturePageShell>
  )
}

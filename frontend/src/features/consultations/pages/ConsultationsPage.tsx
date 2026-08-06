import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { TableSkeleton } from '@/components/common/TableSkeleton'
import { Pagination } from '@/components/common/Pagination'
import { ConsultationFilters } from '@/features/consultations/components/ConsultationFilters'
import { ConsultationTable } from '@/features/consultations/components/ConsultationTable'
import {
  useConsultations,
  useDeleteConsultation,
} from '@/features/consultations/hooks/useConsultations'
import type { ConsultationView } from '@/features/consultations/service'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import { usePermissions } from '@/hooks/usePermissions'
import { ROUTES } from '@/utils/constants'

export function ConsultationsListPage() {
  const [search, setSearch] = useState('')
  const [consultationToDelete, setConsultationToDelete] =
    useState<ConsultationView | null>(null)

  const debouncedSearch = useDebounce(search, 300)
  const { isAdmin, isDoctor } = usePermissions()

  const canCreate = isDoctor
  const canEdit = isDoctor
  const canDelete = isAdmin

  const { data: consultations = [], isLoading, isError, refetch } =
    useConsultations(debouncedSearch)
  const deleteMutation = useDeleteConsultation()

  const filteredConsultations = useMemo(() => {
    if (!search.trim() || debouncedSearch.trim()) return consultations
    const query = search.toLowerCase()
    return consultations.filter(
      (consultation) =>
        consultation.symptoms.toLowerCase().includes(query) ||
        consultation.diagnosis.toLowerCase().includes(query) ||
        consultation.patientName.toLowerCase().includes(query) ||
        consultation.doctorName.toLowerCase().includes(query),
    )
  }, [consultations, search, debouncedSearch])

  const { page, pageSize, totalPages, setPage } = usePagination({
    totalItems: filteredConsultations.length,
  })

  const paginatedConsultations = filteredConsultations.slice(
    page * pageSize,
    page * pageSize + pageSize,
  )

  const handleDeleteConfirm = () => {
    if (!consultationToDelete) return
    deleteMutation.mutate(consultationToDelete.id, {
      onSuccess: () => setConsultationToDelete(null),
    })
  }

  return (
    <FeaturePageShell
      title="Consultations"
      description="Review and manage doctor consultation records."
      actions={
        canCreate ? (
          <Button asChild>
            <Link to={ROUTES.CONSULTATIONS_NEW}>
              <Plus className="size-4" />
              Record Consultation
            </Link>
          </Button>
        ) : undefined
      }
    >
      <div className="space-y-4">
        <ConsultationFilters search={search} onSearchChange={setSearch} />

        {isLoading ? (
          <div className="rounded-xl border bg-card p-6">
            <TableSkeleton columns={6} />
          </div>
        ) : isError ? (
          <ErrorState
            title="Failed to load consultations"
            onRetry={() => refetch()}
          />
        ) : filteredConsultations.length === 0 ? (
          <EmptyState
            title="No consultations found"
            description={
              search
                ? 'Try adjusting your search.'
                : 'Record the first consultation to get started.'
            }
            action={
              canCreate ? (
                <Button asChild>
                  <Link to={ROUTES.CONSULTATIONS_NEW}>
                    Record Consultation
                  </Link>
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <ConsultationTable
              consultations={paginatedConsultations}
              canEdit={canEdit}
              canDelete={canDelete}
              onDelete={setConsultationToDelete}
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
        open={Boolean(consultationToDelete)}
        onOpenChange={(open) => !open && setConsultationToDelete(null)}
        title="Delete consultation"
        description="Are you sure you want to permanently delete this consultation record?"
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </FeaturePageShell>
  )
}

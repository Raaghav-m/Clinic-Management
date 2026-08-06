import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { TableSkeleton } from '@/components/common/TableSkeleton'
import { Pagination } from '@/components/common/Pagination'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { DoctorFilters } from '@/features/doctors/components/DoctorFilters'
import { DoctorTable } from '@/features/doctors/components/DoctorTable'
import {
  useDeleteDoctor,
  useDoctors,
} from '@/features/doctors/hooks/useDoctors'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import type { Doctor } from '@/types/doctor'
import { ROUTES } from '@/utils/constants'

export function DoctorsListPage() {
  const [search, setSearch] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [doctorToDelete, setDoctorToDelete] = useState<Doctor | null>(null)

  const debouncedSearch = useDebounce(search, 300)
  const debouncedSpecialization = useDebounce(specialization, 300)

  const { data: doctors = [], isLoading, isError, refetch } = useDoctors(
    debouncedSearch,
    debouncedSpecialization,
  )
  const deleteMutation = useDeleteDoctor()

  const { page, pageSize, totalPages, setPage } = usePagination({
    totalItems: doctors.length,
  })

  const paginatedDoctors = doctors.slice(
    page * pageSize,
    page * pageSize + pageSize,
  )

  const handleDeleteConfirm = () => {
    if (!doctorToDelete) return
    deleteMutation.mutate(doctorToDelete.id, {
      onSuccess: () => setDoctorToDelete(null),
    })
  }

  return (
    <FeaturePageShell
      title="Doctors"
      description="Manage doctor profiles, specializations, and clinic schedules."
      actions={
        <Button asChild>
          <Link to={ROUTES.DOCTORS_NEW}>
            <Plus className="size-4" />
            Add Doctor
          </Link>
        </Button>
      }
    >
      <div className="space-y-4">
        <DoctorFilters
          search={search}
          onSearchChange={setSearch}
          specialization={specialization}
          onSpecializationChange={setSpecialization}
        />

        {isLoading ? (
          <div className="rounded-xl border bg-card p-6">
            <TableSkeleton columns={5} />
          </div>
        ) : isError ? (
          <ErrorState title="Failed to load doctors" onRetry={() => refetch()} />
        ) : doctors.length === 0 ? (
          <EmptyState
            title="No doctors found"
            description={
              search || specialization
                ? 'Try adjusting your search or filters.'
                : 'Add your first doctor to get started.'
            }
            action={
              <Button asChild>
                <Link to={ROUTES.DOCTORS_NEW}>Add Doctor</Link>
              </Button>
            }
          />
        ) : (
          <>
            <DoctorTable
              doctors={paginatedDoctors}
              onDelete={setDoctorToDelete}
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
        open={Boolean(doctorToDelete)}
        onOpenChange={(open) => !open && setDoctorToDelete(null)}
        title="Delete doctor"
        description={`Are you sure you want to delete ${doctorToDelete?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </FeaturePageShell>
  )
}

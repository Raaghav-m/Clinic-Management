import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { TableSkeleton } from '@/components/common/TableSkeleton'
import { Pagination } from '@/components/common/Pagination'
import { PatientFilters } from '@/features/patients/components/PatientFilters'
import { PatientTable } from '@/features/patients/components/PatientTable'
import {
  useDeletePatient,
  usePatients,
} from '@/features/patients/hooks/usePatients'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import { usePermissions } from '@/hooks/usePermissions'
import type { Patient } from '@/types/patient'
import { ROUTES } from '@/utils/constants'

export function PatientsListPage() {
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState('')
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null)

  const debouncedSearch = useDebounce(search, 300)
  const { isAdmin, isReceptionist } = usePermissions()
  const canManage = isAdmin || isReceptionist

  const { data: patients = [], isLoading, isError, refetch } = usePatients(
    debouncedSearch,
  )
  const deleteMutation = useDeletePatient()

  const filteredPatients = useMemo(() => {
    if (!gender) return patients
    return patients.filter(
      (patient) => patient.gender.toLowerCase() === gender.toLowerCase(),
    )
  }, [patients, gender])

  const { page, pageSize, totalPages, setPage } = usePagination({
    totalItems: filteredPatients.length,
  })

  const paginatedPatients = filteredPatients.slice(
    page * pageSize,
    page * pageSize + pageSize,
  )

  const handleDeleteConfirm = () => {
    if (!patientToDelete) return
    deleteMutation.mutate(patientToDelete.id, {
      onSuccess: () => setPatientToDelete(null),
    })
  }

  return (
    <FeaturePageShell
      title="Patients"
      description="Manage patient records, profiles, and contact information."
      actions={
        canManage ? (
          <Button asChild>
            <Link to={ROUTES.PATIENTS_NEW}>
              <Plus className="size-4" />
              Add Patient
            </Link>
          </Button>
        ) : undefined
      }
    >
      <div className="space-y-4">
        <PatientFilters
          search={search}
          onSearchChange={setSearch}
          gender={gender}
          onGenderChange={setGender}
        />

        {isLoading ? (
          <div className="rounded-xl border bg-card p-6">
            <TableSkeleton columns={6} />
          </div>
        ) : isError ? (
          <ErrorState
            title="Failed to load patients"
            onRetry={() => refetch()}
          />
        ) : filteredPatients.length === 0 ? (
          <EmptyState
            title="No patients found"
            description={
              search || gender
                ? 'Try adjusting your search or filters.'
                : 'Get started by adding your first patient.'
            }
            action={
              canManage ? (
                <Button asChild>
                  <Link to={ROUTES.PATIENTS_NEW}>Add Patient</Link>
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <PatientTable
              patients={paginatedPatients}
              canManage={canManage}
              onDelete={setPatientToDelete}
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
        open={Boolean(patientToDelete)}
        onOpenChange={(open) => !open && setPatientToDelete(null)}
        title="Delete patient"
        description={`Are you sure you want to delete ${patientToDelete?.name}? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </FeaturePageShell>
  )
}

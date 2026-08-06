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
import { AppointmentFilters } from '@/features/appointments/components/AppointmentFilters'
import { AppointmentTable } from '@/features/appointments/components/AppointmentTable'
import {
  useAppointments,
  useDeleteAppointment,
} from '@/features/appointments/hooks/useAppointments'
import { useDebounce } from '@/hooks/useDebounce'
import { usePagination } from '@/hooks/usePagination'
import { usePermissions } from '@/hooks/usePermissions'
import type { Appointment } from '@/types/appointment'
import { ROUTES } from '@/utils/constants'

export function AppointmentsListPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<Appointment | null>(null)

  const debouncedSearch = useDebounce(search, 300)
  const { role, profileId, isAdmin, isReceptionist, isPatient } =
    usePermissions()

  const canManage = isAdmin || isReceptionist
  const canDelete = isAdmin

  const { data: appointments = [], isLoading, isError, refetch } =
    useAppointments({
      role: role!,
      profileId,
      status,
    })
  const deleteMutation = useDeleteAppointment()

  const filteredAppointments = useMemo(() => {
    if (!debouncedSearch.trim()) return appointments
    const query = debouncedSearch.toLowerCase()
    return appointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(query) ||
        appointment.doctorName.toLowerCase().includes(query),
    )
  }, [appointments, debouncedSearch])

  const { page, pageSize, totalPages, setPage } = usePagination({
    totalItems: filteredAppointments.length,
  })

  const paginatedAppointments = filteredAppointments.slice(
    page * pageSize,
    page * pageSize + pageSize,
  )

  const handleDeleteConfirm = () => {
    if (!appointmentToDelete) return
    deleteMutation.mutate(appointmentToDelete.id, {
      onSuccess: () => setAppointmentToDelete(null),
    })
  }

  if (isPatient && !profileId) {
    return (
      <FeaturePageShell
        title="My Appointments"
        description="View your scheduled clinic visits."
      >
        <EmptyState
          title="Session update required"
          description="Sign out and sign in again to load your appointment history."
        />
      </FeaturePageShell>
    )
  }

  return (
    <FeaturePageShell
      title={isPatient ? 'My Appointments' : 'Appointments'}
      description={
        isPatient
          ? 'Your upcoming and past clinic appointments.'
          : 'Schedule and manage patient appointments.'
      }
      actions={
        canManage ? (
          <Button asChild>
            <Link to={ROUTES.APPOINTMENTS_NEW}>
              <Plus className="size-4" />
              Book Appointment
            </Link>
          </Button>
        ) : undefined
      }
    >
      <div className="space-y-4">
        <AppointmentFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        {isLoading ? (
          <div className="rounded-xl border bg-card p-6">
            <TableSkeleton columns={5} />
          </div>
        ) : isError ? (
          <ErrorState
            title="Failed to load appointments"
            onRetry={() => refetch()}
          />
        ) : filteredAppointments.length === 0 ? (
          <EmptyState
            title="No appointments found"
            description={
              search || status
                ? 'Try adjusting your search or filters.'
                : 'Book the first appointment to get started.'
            }
            action={
              canManage ? (
                <Button asChild>
                  <Link to={ROUTES.APPOINTMENTS_NEW}>Book Appointment</Link>
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <AppointmentTable
              appointments={paginatedAppointments}
              canManage={canManage}
              canDelete={canDelete}
              onDelete={setAppointmentToDelete}
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
        open={Boolean(appointmentToDelete)}
        onOpenChange={(open) => !open && setAppointmentToDelete(null)}
        title="Delete appointment"
        description="Are you sure you want to permanently delete this appointment?"
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
        onConfirm={handleDeleteConfirm}
      />
    </FeaturePageShell>
  )
}

import { Link } from 'react-router-dom'

import { EmptyState } from '@/components/common/EmptyState'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/Table'
import type { Appointment } from '@/types/appointment'
import { formatDateTime } from '@/utils/date'
import { ROUTES } from '@/utils/constants'
import { cn } from '@/lib/utils'

const statusStyles: Record<Appointment['status'], string> = {
  BOOKED: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  COMPLETED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  CANCELLED: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
}

export function UpcomingAppointments({
  appointments,
  isLoading = false,
  isError = false,
  onRetry,
}: UpcomingAppointmentsProps) {
  return (
    <div className="rounded-xl border bg-card shadow-xs">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-base font-semibold">Upcoming Appointments</h2>
          <p className="text-muted-foreground text-sm">
            Next booked appointments across the clinic
          </p>
        </div>
        <Link
          to={ROUTES.APPOINTMENTS}
          className="text-primary text-sm font-medium hover:underline"
        >
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className="flex min-h-48 items-center justify-center p-6">
          <Loader label="Loading appointments..." />
        </div>
      ) : isError ? (
        <div className="p-6">
          <ErrorState
            title="Failed to load appointments"
            message="Upcoming appointments could not be loaded."
            onRetry={onRetry}
            className="border-0 bg-transparent p-6"
          />
        </div>
      ) : appointments.length === 0 ? (
        <EmptyState
          title="No upcoming appointments"
          description="Booked appointments will appear here once scheduled."
          className="border-0 shadow-none"
        />
      ) : (
        <Table className="border-0">
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {appointment.patientName}
                </TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{formatDateTime(appointment.appointmentTime)}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                      statusStyles[appointment.status],
                    )}
                  >
                    {appointment.status.toLowerCase()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

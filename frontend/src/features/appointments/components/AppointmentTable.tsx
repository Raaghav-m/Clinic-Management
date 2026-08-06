import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/common/Button'
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
import { cn } from '@/lib/utils'

const statusStyles: Record<Appointment['status'], string> = {
  BOOKED: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  COMPLETED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  CANCELLED: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
}

interface AppointmentTableProps {
  appointments: Appointment[]
  canManage?: boolean
  canDelete?: boolean
  onDelete: (appointment: Appointment) => void
}

export function AppointmentTable({
  appointments,
  canManage = false,
  canDelete = false,
  onDelete,
}: AppointmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.patientName}</TableCell>
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
            <TableCell>
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="icon">
                  <Link to={`/appointments/${appointment.id}`}>
                    <Eye className="size-4" />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>
                {canManage ? (
                  <Button asChild variant="ghost" size="icon">
                    <Link to={`/appointments/${appointment.id}/edit`}>
                      <Pencil className="size-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                ) : null}
                {canDelete ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(appointment)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                    <span className="sr-only">Delete</span>
                  </Button>
                ) : null}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

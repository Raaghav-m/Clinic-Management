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
import type { ConsultationView } from '@/features/consultations/service'
import { formatDateTime } from '@/utils/date'

interface ConsultationTableProps {
  consultations: ConsultationView[]
  canEdit?: boolean
  canDelete?: boolean
  onDelete: (consultation: ConsultationView) => void
}

export function ConsultationTable({
  consultations,
  canEdit = false,
  canDelete = false,
  onDelete,
}: ConsultationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Appointment</TableHead>
          <TableHead>Symptoms</TableHead>
          <TableHead>Diagnosis</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {consultations.map((consultation) => (
          <TableRow key={consultation.id}>
            <TableCell className="font-medium">
              {consultation.patientName}
            </TableCell>
            <TableCell>{consultation.doctorName}</TableCell>
            <TableCell>
              {consultation.appointmentTime
                ? formatDateTime(consultation.appointmentTime)
                : `#${consultation.appointmentId}`}
            </TableCell>
            <TableCell className="max-w-[180px] truncate">
              {consultation.symptoms}
            </TableCell>
            <TableCell className="max-w-[180px] truncate">
              {consultation.diagnosis || '—'}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="icon">
                  <Link to={`/consultations/${consultation.id}`}>
                    <Eye className="size-4" />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>
                {canEdit ? (
                  <Button asChild variant="ghost" size="icon">
                    <Link to={`/consultations/${consultation.id}/edit`}>
                      <Pencil className="size-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                ) : null}
                {canDelete ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(consultation)}
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

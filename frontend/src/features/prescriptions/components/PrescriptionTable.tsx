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
import type { PrescriptionView } from '@/features/prescriptions/service'

interface PrescriptionTableProps {
  prescriptions: PrescriptionView[]
  canEdit?: boolean
  canDelete?: boolean
  onDelete: (prescription: PrescriptionView) => void
}

export function PrescriptionTable({
  prescriptions,
  canEdit = false,
  canDelete = false,
  onDelete,
}: PrescriptionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Medicine</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Dosage</TableHead>
          <TableHead>Frequency</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prescriptions.map((prescription) => (
          <TableRow key={prescription.id}>
            <TableCell className="font-medium">
              {prescription.medicineName}
            </TableCell>
            <TableCell>{prescription.patientName}</TableCell>
            <TableCell>{prescription.doctorName}</TableCell>
            <TableCell>{prescription.dosage}</TableCell>
            <TableCell>{prescription.frequency}</TableCell>
            <TableCell>{prescription.duration}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="icon">
                  <Link to={`/prescriptions/${prescription.id}`}>
                    <Eye className="size-4" />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>
                {canEdit ? (
                  <Button asChild variant="ghost" size="icon">
                    <Link to={`/prescriptions/${prescription.id}/edit`}>
                      <Pencil className="size-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                ) : null}
                {canDelete ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(prescription)}
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

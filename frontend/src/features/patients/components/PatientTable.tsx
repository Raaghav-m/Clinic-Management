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
import type { Patient } from '@/types/patient'

interface PatientTableProps {
  patients: Patient[]
  canManage?: boolean
  onDelete: (patient: Patient) => void
}

export function PatientTable({
  patients,
  canManage = false,
  onDelete,
}: PatientTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium">{patient.name}</TableCell>
            <TableCell>{patient.email}</TableCell>
            <TableCell>{patient.phone}</TableCell>
            <TableCell>{patient.gender}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="icon">
                  <Link to={`/patients/${patient.id}`}>
                    <Eye className="size-4" />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>
                {canManage ? (
                  <>
                    <Button asChild variant="ghost" size="icon">
                      <Link to={`/patients/${patient.id}/edit`}>
                        <Pencil className="size-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(patient)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </>
                ) : null}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

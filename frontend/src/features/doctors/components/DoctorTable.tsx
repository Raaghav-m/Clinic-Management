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
import type { Doctor } from '@/types/doctor'
import { formatTime } from '@/utils/date'

interface DoctorTableProps {
  doctors: Doctor[]
  onDelete: (doctor: Doctor) => void
}

export function DoctorTable({ doctors, onDelete }: DoctorTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Fee (₹)</TableHead>
          <TableHead>Hours</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.id}>
            <TableCell className="font-medium">{doctor.name}</TableCell>
            <TableCell>{doctor.specialization}</TableCell>
            <TableCell>{doctor.experience} yrs</TableCell>
            <TableCell>{doctor.consultationFee.toLocaleString('en-IN')}</TableCell>
            <TableCell>
              {formatTime(doctor.startTime)} – {formatTime(doctor.endTime)}
            </TableCell>
            <TableCell>{doctor.phone}</TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <Button asChild variant="ghost" size="icon">
                  <Link to={`/doctors/${doctor.id}`}>
                    <Eye className="size-4" />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <Link to={`/doctors/${doctor.id}/edit`}>
                    <Pencil className="size-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(doctor)}
                >
                  <Trash2 className="size-4 text-destructive" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

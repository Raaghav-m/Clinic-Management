import { Link } from 'react-router-dom'
import {
  CalendarPlus,
  ClipboardPlus,
  Pill,
  Stethoscope,
  UserPlus,
} from 'lucide-react'

import { Button } from '@/components/common/Button'
import { usePermissions } from '@/hooks/usePermissions'
import { ROUTES } from '@/utils/constants'

const actions = [
  {
    label: 'Add Patient',
    href: ROUTES.PATIENTS_NEW,
    icon: UserPlus,
    roles: ['ADMIN', 'RECEPTIONIST'] as const,
  },
  {
    label: 'Add Doctor',
    href: ROUTES.DOCTORS_NEW,
    icon: Stethoscope,
    roles: ['ADMIN'] as const,
  },
  {
    label: 'Book Appointment',
    href: ROUTES.APPOINTMENTS_NEW,
    icon: CalendarPlus,
    roles: ['ADMIN', 'RECEPTIONIST'] as const,
  },
  {
    label: 'View Consultations',
    href: ROUTES.CONSULTATIONS,
    icon: ClipboardPlus,
    roles: ['DOCTOR', 'ADMIN'] as const,
  },
  {
    label: 'My Appointments',
    href: ROUTES.APPOINTMENTS,
    icon: CalendarPlus,
    roles: ['PATIENT'] as const,
  },
  {
    label: 'My Prescriptions',
    href: ROUTES.PRESCRIPTIONS,
    icon: Pill,
    roles: ['PATIENT'] as const,
  },
]

export function QuickActions() {
  const { role, hasRole } = usePermissions()

  const visibleActions = actions.filter((action) => hasRole([...action.roles]))

  if (!role || visibleActions.length === 0) return null

  return (
    <div className="rounded-xl border bg-card p-6 shadow-xs">
      <h2 className="text-base font-semibold">Quick Actions</h2>
      <p className="text-muted-foreground mt-1 text-sm">
        Common tasks for your role
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {visibleActions.map((action) => {
          const Icon = action.icon
          return (
            <Button key={action.label} asChild variant="outline">
              <Link to={action.href}>
                <Icon className="size-4" />
                {action.label}
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

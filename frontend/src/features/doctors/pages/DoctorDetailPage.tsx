import {
  CalendarDays,
  ClipboardList,
  Clock,
  IndianRupee,
  Mail,
  Phone,
  Stethoscope,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@/components/common/Button'
import { ErrorState } from '@/components/common/ErrorState'
import { Loader } from '@/components/common/Loader'
import { FeaturePageShell } from '@/features/dashboard/components/FeaturePageShell'
import {
  useDoctor,
  useDoctorAppointments,
  useDoctorConsultations,
} from '@/features/doctors/hooks/useDoctors'
import { formatTime } from '@/utils/date'
import { ROUTES } from '@/utils/constants'

export function DoctorDetailPage() {
  const { id } = useParams()
  const doctorId = Number(id)

  const { data: doctor, isLoading, isError, refetch } = useDoctor(doctorId)
  const {
    data: appointments = [],
    isLoading: isAppointmentsLoading,
  } = useDoctorAppointments(doctorId)
  const {
    data: consultations = [],
    isLoading: isConsultationsLoading,
  } = useDoctorConsultations(doctorId)

  const isStatsLoading = isAppointmentsLoading || isConsultationsLoading

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader size="lg" label="Loading doctor..." />
      </div>
    )
  }

  if (isError || !doctor) {
    return (
      <ErrorState
        title="Doctor not found"
        message="The requested doctor profile could not be found."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <FeaturePageShell
      title={doctor.name}
      description={doctor.specialization}
      actions={
        <Button asChild>
          <Link to={`/doctors/${doctor.id}/edit`}>Edit Doctor</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-xl border bg-card p-6 shadow-xs lg:col-span-1">
          <h2 className="text-base font-semibold">Profile</h2>
          <div className="space-y-3 text-sm">
            <InfoRow icon={Stethoscope} label="Specialization" value={doctor.specialization} />
            <InfoRow icon={Mail} label="Email" value={doctor.email} />
            <InfoRow icon={Phone} label="Phone" value={doctor.phone} />
            <InfoRow
              icon={Clock}
              label="Working Hours"
              value={`${formatTime(doctor.startTime)} – ${formatTime(doctor.endTime)}`}
            />
            <InfoRow
              icon={IndianRupee}
              label="Consultation Fee"
              value={`₹${doctor.consultationFee.toLocaleString('en-IN')}`}
            />
            <InfoRow
              icon={Stethoscope}
              label="Experience"
              value={`${doctor.experience} years`}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {isStatsLoading ? (
            <div className="col-span-full flex min-h-32 items-center justify-center rounded-xl border">
              <Loader label="Loading activity stats..." />
            </div>
          ) : (
            <>
              <StatCard
                icon={CalendarDays}
                label="Appointments"
                value={appointments.length}
              />
              <StatCard
                icon={ClipboardList}
                label="Consultations"
                value={consultations.length}
              />
            </>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Button asChild variant="outline">
          <Link to={ROUTES.DOCTORS}>Back to Doctors</Link>
        </Button>
      </div>
    </FeaturePageShell>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
      <div>
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays
  label: string
  value: number
}) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{label}</p>
        <Icon className="text-primary size-4" />
      </div>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  )
}

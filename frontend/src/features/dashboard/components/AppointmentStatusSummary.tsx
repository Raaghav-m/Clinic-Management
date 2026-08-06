import type { AppointmentStatusSummary } from '@/features/dashboard/types'

interface AppointmentStatusSummaryProps {
  summary: AppointmentStatusSummary
}

export function AppointmentStatusSummaryCards({
  summary,
}: AppointmentStatusSummaryProps) {
  const cards = [
    { label: 'Booked', value: summary.booked, color: 'text-blue-600' },
    { label: 'Completed', value: summary.completed, color: 'text-emerald-600' },
    { label: 'Cancelled', value: summary.cancelled, color: 'text-rose-600' },
  ]

  return (
    <div className="rounded-xl border bg-card p-6 shadow-xs">
      <h2 className="text-base font-semibold">Appointment Overview</h2>
      <p className="text-muted-foreground mt-1 text-sm">
        Status breakdown across all appointments
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border bg-muted/30 px-4 py-3"
          >
            <p className="text-muted-foreground text-sm">{card.label}</p>
            <p className={`mt-1 text-2xl font-semibold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

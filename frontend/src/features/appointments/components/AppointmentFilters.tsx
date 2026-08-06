import { SearchBar } from '@/components/common/SearchBar'
import { Label } from '@/components/ui/label'
import { APPOINTMENT_STATUSES } from '@/types/appointment'
import { cn } from '@/lib/utils'

interface AppointmentFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
}

export function AppointmentFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: AppointmentFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search patient or doctor..."
        className="max-w-md"
      />
      <div className="space-y-2">
        <Label htmlFor="status-filter">Status</Label>
        <select
          id="status-filter"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className={cn(
            'border-input h-9 min-w-[140px] rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          )}
        >
          <option value="">All statuses</option>
          {APPOINTMENT_STATUSES.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0) + option.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

import { SearchBar } from '@/components/common/SearchBar'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { PATIENT_GENDERS } from '@/types/patient'

interface PatientFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  gender: string
  onGenderChange: (value: string) => void
}

export function PatientFilters({
  search,
  onSearchChange,
  gender,
  onGenderChange,
}: PatientFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search by name..."
        className="max-w-md"
      />
      <div className="space-y-2">
        <Label htmlFor="gender-filter">Gender</Label>
        <select
          id="gender-filter"
          value={gender}
          onChange={(event) => onGenderChange(event.target.value)}
          className={cn(
            'border-input h-9 min-w-[140px] rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          )}
        >
          <option value="">All genders</option>
          {PATIENT_GENDERS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

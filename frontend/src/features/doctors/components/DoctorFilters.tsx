import { SearchBar } from '@/components/common/SearchBar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DoctorFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  specialization: string
  onSpecializationChange: (value: string) => void
}

export function DoctorFilters({
  search,
  onSearchChange,
  specialization,
  onSpecializationChange,
}: DoctorFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search by name..."
        className="max-w-md"
      />
      <div className="space-y-2">
        <Label htmlFor="specialization-filter">Specialization</Label>
        <Input
          id="specialization-filter"
          value={specialization}
          onChange={(event) => onSpecializationChange(event.target.value)}
          placeholder="e.g. Cardiology"
          className="min-w-[180px]"
        />
      </div>
    </div>
  )
}

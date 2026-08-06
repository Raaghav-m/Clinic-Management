import { SearchBar } from '@/components/common/SearchBar'

interface PrescriptionFiltersProps {
  search: string
  onSearchChange: (value: string) => void
}

export function PrescriptionFilters({
  search,
  onSearchChange,
}: PrescriptionFiltersProps) {
  return (
    <SearchBar
      value={search}
      onChange={onSearchChange}
      placeholder="Search medicine, patient, or doctor..."
      className="max-w-md"
    />
  )
}

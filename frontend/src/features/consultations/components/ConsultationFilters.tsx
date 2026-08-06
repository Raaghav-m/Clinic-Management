import { SearchBar } from '@/components/common/SearchBar'

interface ConsultationFiltersProps {
  search: string
  onSearchChange: (value: string) => void
}

export function ConsultationFilters({
  search,
  onSearchChange,
}: ConsultationFiltersProps) {
  return (
    <SearchBar
      value={search}
      onChange={onSearchChange}
      placeholder="Search by diagnosis..."
      className="max-w-md"
    />
  )
}

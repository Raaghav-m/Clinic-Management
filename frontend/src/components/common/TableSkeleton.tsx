import { cn } from '@/lib/utils'

interface TableSkeletonProps {
  rows?: number
  columns?: number
  className?: string
}

export function TableSkeleton({
  rows = 6,
  columns = 5,
  className,
}: TableSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)} aria-hidden="true">
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`header-${index}`}
            className="bg-muted h-4 flex-1 animate-pulse rounded"
          />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <div
              key={`cell-${rowIndex}-${columnIndex}`}
              className="bg-muted/70 h-10 flex-1 animate-pulse rounded-md"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface TableProps {
  children: ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn('relative w-full overflow-auto rounded-lg border', className)}>
      <table className="w-full caption-bottom text-sm">{children}</table>
    </div>
  )
}

export function TableHeader({ children, className }: TableProps) {
  return <thead className={cn('[&_tr]:border-b', className)}>{children}</thead>
}

export function TableBody({ children, className }: TableProps) {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className }: TableProps) {
  return (
    <tr
      className={cn(
        'hover:bg-muted/50 border-b transition-colors data-[state=selected]:bg-muted',
        className,
      )}
    >
      {children}
    </tr>
  )
}

export function TableHead({ children, className }: TableProps) {
  return (
    <th
      className={cn(
        'text-muted-foreground h-10 px-4 text-left align-middle font-medium whitespace-nowrap',
        className,
      )}
    >
      {children}
    </th>
  )
}

export function TableCell({ children, className }: TableProps) {
  return (
    <td className={cn('p-4 align-middle whitespace-nowrap', className)}>
      {children}
    </td>
  )
}

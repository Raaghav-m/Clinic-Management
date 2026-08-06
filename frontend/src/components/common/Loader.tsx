import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface LoaderProps {
  className?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-10',
}

export function Loader({ className, label = 'Loading...', size = 'md' }: LoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('flex items-center justify-center', className)}
    >
      <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
      <span className="sr-only">{label}</span>
    </div>
  )
}

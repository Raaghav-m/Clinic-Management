import { AlertCircle } from 'lucide-react'

import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-destructive/20 bg-destructive/5 p-12 text-center',
        className,
      )}
    >
      <AlertCircle className="size-10 text-destructive" />
      <div className="space-y-1">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-muted-foreground max-w-md text-sm">{message}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}

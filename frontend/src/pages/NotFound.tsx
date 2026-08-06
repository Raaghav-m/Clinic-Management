import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'

import { Button } from '@/components/common/Button'
import { ROUTES } from '@/utils/constants'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="bg-muted flex size-16 items-center justify-center rounded-full">
        <FileQuestion className="text-muted-foreground size-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md text-sm">
          The page you are looking for does not exist or may have been moved.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link to={ROUTES.DASHBOARD}>Go to Dashboard</Link>
      </Button>
    </div>
  )
}

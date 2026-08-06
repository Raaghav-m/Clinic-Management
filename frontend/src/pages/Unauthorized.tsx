import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'

import { Button } from '@/components/common/Button'
import { ROUTES } from '@/utils/constants'

export function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="bg-destructive/10 flex size-16 items-center justify-center rounded-full">
        <ShieldAlert className="text-destructive size-8" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-muted-foreground max-w-md text-sm">
          You do not have permission to view this page. Contact your administrator
          if you believe this is a mistake.
        </p>
      </div>
      <Button asChild>
        <Link to={ROUTES.DASHBOARD}>Back to Dashboard</Link>
      </Button>
    </div>
  )
}

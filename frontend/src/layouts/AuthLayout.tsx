import { Outlet } from 'react-router-dom'

import { APP_NAME } from '@/utils/constants'

export function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-primary relative hidden flex-col justify-between p-10 text-primary-foreground lg:flex">
        <div>
          <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/10 text-xl font-bold">
            C
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{APP_NAME}</h1>
          <p className="mt-3 max-w-md text-primary-foreground/80">
            Streamline patient care, appointments, consultations, and
            prescriptions in one secure platform.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/70">
          Secure access for admins, doctors, receptionists, and patients.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-6 md:p-10">
        <div className="mb-8 w-full max-w-md lg:hidden">
          <h1 className="text-2xl font-semibold">{APP_NAME}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Sign in to manage clinic operations.
          </p>
        </div>
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

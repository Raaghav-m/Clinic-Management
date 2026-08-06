import { LoginForm } from '@/features/auth/components/LoginForm'

export function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground text-sm">
          Sign in with your clinic credentials to continue.
        </p>
      </div>

      <LoginForm />

      <p className="text-muted-foreground text-center text-xs lg:text-left">
        Demo: admin@clinic.com / Password@123
      </p>
    </div>
  )
}

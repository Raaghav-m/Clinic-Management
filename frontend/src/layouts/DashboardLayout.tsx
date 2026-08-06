import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export function DashboardLayout() {
  return (
    <div className="flex min-h-svh bg-background">
      <div className="hidden md:block">
        <Sidebar className="fixed inset-y-0 left-0 z-30" />
      </div>

      <div className="flex min-h-svh flex-1 flex-col md:pl-64">
        <Navbar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

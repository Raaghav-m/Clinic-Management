import { Menu } from 'lucide-react'
import { useState } from 'react'

import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Sidebar } from '@/components/layout/Sidebar'
import { UserMenu } from '@/components/layout/UserMenu'
import { Button } from '@/components/common/Button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'

interface NavbarProps {
  title?: string
}

export function Navbar({ title }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="bg-background sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-4" />
            <span className="sr-only">Open navigation</span>
          </Button>
          <div>
            {title ? (
              <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            ) : null}
            <Breadcrumb className="hidden md:flex" />
          </div>
        </div>
        <UserMenu />
      </header>

      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent className="h-[100dvh] max-w-xs rounded-none p-0 sm:max-w-xs">
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <Sidebar onNavigate={() => setMobileOpen(false)} className="w-full border-0" />
        </DialogContent>
      </Dialog>
    </>
  )
}

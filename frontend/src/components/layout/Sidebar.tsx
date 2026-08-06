import { Link, useLocation } from 'react-router-dom'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { usePermissions } from '@/hooks/usePermissions'
import { cn } from '@/lib/utils'
import { APP_NAME } from '@/utils/constants'
import { getNavItemsForRole } from '@/utils/permissions'

interface SidebarProps {
  className?: string
  onNavigate?: () => void
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const location = useLocation()
  const { role } = usePermissions()
  const navItems = getNavItemsForRole(role)

  return (
    <aside
      className={cn(
        'bg-sidebar text-sidebar-foreground flex h-full w-64 flex-col border-r',
        className,
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/dashboard" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="bg-primary flex size-8 items-center justify-center rounded-lg">
            <span className="text-sm font-bold text-primary-foreground">C</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">{APP_NAME}</p>
            <p className="text-muted-foreground mt-1 text-xs">Management Portal</p>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive =
              location.pathname === item.href ||
              (item.href !== '/dashboard' &&
                location.pathname.startsWith(`${item.href}/`))

            return (
              <Link
                key={`${item.label}-${item.href}`}
                to={item.href}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />
      <div className="text-muted-foreground p-4 text-xs">
        Signed in as {role ?? 'Guest'}
      </div>
    </aside>
  )
}

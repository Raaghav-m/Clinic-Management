import { APP_NAME } from '@/utils/constants'

export function Footer() {
  return (
    <footer className="text-muted-foreground border-t px-4 py-4 text-center text-xs md:px-6">
      © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
    </footer>
  )
}

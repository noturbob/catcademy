'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Bell, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthStore } from '@/lib/store/authStore'
import { MobileNav } from '@/components/layout/MobileNav'

export function Topbar() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  // Generate breadcrumb from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: '/' + pathSegments.slice(0, index + 1).join('/'),
  }))

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="flex items-center justify-between px-4 py-3 md:ml-60">
        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
            Dashboard
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-gray-400">/</span>
              <Link
                href={crumb.href}
                className={index === breadcrumbs.length - 1
                  ? 'font-medium text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'}
              >
                {crumb.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0">
              <div className="py-6">
                <MobileNav />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right side - Streak and Notifications */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>{user.streak}</span>
            </div>
          )}
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

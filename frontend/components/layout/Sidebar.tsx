'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  BookOpen,
  Pencil,
  Timer,
  Archive,
  TrendingUp,
  Trophy,
  LogOut,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/lib/store/authStore'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'Practice', href: '/practice', icon: Pencil },
  { name: 'Mock Tests', href: '/mock', icon: Timer },
  { name: 'Previous Years', href: '/pyq', icon: Archive },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  return (
    <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-40 md:w-60 md:flex md:flex-col md:border-r md:border-border md:bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Catcademy
        </Link>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <Separator />

      {/* User Profile */}
      <div className="flex items-center gap-3 border-t border-border p-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.avatarUrl} />
          <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user?.username}</p>
          {user?.isPro && (
            <p className="text-xs text-indigo-600 font-semibold">Pro</p>
          )}
        </div>
        <button
          onClick={logout}
          className="ml-auto px-1 py-1 text-gray-600 hover:bg-gray-100 rounded"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  )
}

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
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Learn', href: '/learn', icon: BookOpen },
  { name: 'Practice', href: '/practice', icon: Pencil },
  { name: 'Mock Tests', href: '/mock', icon: Timer },
  { name: 'Previous Years', href: '/pyq', icon: Archive },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
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
  )
}

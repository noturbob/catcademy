'use client'

import { Badge } from '@/components/ui/badge'
import type { MasteryState } from '@/lib/hooks/useLearnProgress'
import { Check } from 'lucide-react'

interface MasteryBadgeProps {
  state: MasteryState
  className?: string
}

export function MasteryBadge({ state, className }: MasteryBadgeProps) {
  const variants: Record<MasteryState, { variant: any; label: string; icon?: any }> = {
    not_started: {
      variant: 'secondary',
      label: 'Not Started',
    },
    learning: {
      variant: 'outline',
      label: 'Learning',
    },
    practicing: {
      variant: 'outline',
      label: 'Practicing',
    },
    mastered: {
      variant: 'default',
      label: 'Mastered',
      icon: Check,
    },
  }

  const config = variants[state]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={className}>
      {Icon && <Icon className="mr-1 h-3 w-3" />}
      {config.label}
    </Badge>
  )
}

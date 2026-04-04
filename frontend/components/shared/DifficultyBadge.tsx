'use client'

import { Badge } from '@/components/ui/badge'
import type { Difficulty } from '@/types/question'

interface DifficultyBadgeProps {
  difficulty: Difficulty
  className?: string
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const colors: Record<Difficulty, string> = {
    EASY: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HARD: 'bg-red-100 text-red-800',
  }

  return (
    <Badge className={`${colors[difficulty]} ${className}`}>
      {difficulty}
    </Badge>
  )
}

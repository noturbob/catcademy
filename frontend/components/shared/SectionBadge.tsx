'use client'

import { Badge } from '@/components/ui/badge'
import type { Section } from '@/types/question'

interface SectionBadgeProps {
  section: Section
  className?: string
}

export function SectionBadge({ section, className }: SectionBadgeProps) {
  const colors: Record<Section, string> = {
    QUANT: 'bg-indigo-100 text-indigo-800',
    VARC: 'bg-sky-100 text-sky-800',
    DILR: 'bg-amber-100 text-amber-800',
  }

  return (
    <Badge className={`${colors[section]} ${className}`}>
      {section}
    </Badge>
  )
}

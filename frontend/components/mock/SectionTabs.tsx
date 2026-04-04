'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Section } from '@/types/question'
import { SectionBadge } from '@/components/shared/SectionBadge'

interface SectionTabsProps {
  currentSection: Section
  onSectionChange: (section: Section) => void
  sections: Section[]
}

export function SectionTabs({
  currentSection,
  onSectionChange,
  sections,
}: SectionTabsProps) {
  return (
    <Tabs value={currentSection} onValueChange={(v) => onSectionChange(v as Section)}>
      <TabsList className="w-full">
        {sections.map((section) => (
          <TabsTrigger key={section} value={section} className="flex-1">
            <SectionBadge section={section} />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3 } from 'lucide-react'

interface PreMockDisclaimerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mockTitle: string
  cohortSize: number
  cohortGrowth: number
  onStart: () => void
}

export function PreMockDisclaimer({
  open,
  onOpenChange,
  mockTitle,
  cohortSize,
  cohortGrowth,
  onStart,
}: PreMockDisclaimerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            About this week's percentile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <DialogDescription className="text-sm leading-relaxed space-y-3">
            <p>
              Percentile is calculated based on <strong>{cohortSize.toLocaleString()}</strong> students
              who've taken <strong>{mockTitle}</strong> so far.
            </p>

            <p>
              As CATalyst is a growing platform, the larger the cohort, the more accurate your
              percentile becomes. We always show you the cohort size so you know exactly what
              you're comparing against.
            </p>

            <p>Results update live as more students submit.</p>
          </DialogDescription>

          {/* Cohort badge */}
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <Badge className="bg-indigo-600 text-white mb-2">
              {cohortSize.toLocaleString()} students so far ↑ {cohortGrowth}% from last week
            </Badge>
            <p className="text-xs text-indigo-700 mt-2">
              This sample size ensures reliable percentile calculations
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onStart()
              onOpenChange(false)
            }}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          >
            I Understand — Start Mock
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

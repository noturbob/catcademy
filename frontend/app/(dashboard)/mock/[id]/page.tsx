'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PreMockDisclaimer } from '@/components/mock/PreMockDisclaimer'
import { Clock, Users, Info } from 'lucide-react'
import Link from 'next/link'

export default function MockStartPage({
  params,
}: {
  params: { id: string }
}) {
  const [disclaimerOpen, setDisclaimerOpen] = useState(false)

  // Mock data - replace with real data from backend
  const mockData = {
    id: params.id,
    title: 'Weekly Mock #12',
    type: 'FULL',
    duration: 120,
    sections: 3,
    totalQuestions: 100,
    participants: 1247,
    cohortGrowth: 12,
    description:
      'Full-length CAT-style mock with 100 questions across all three sections. Tests your time management, stamina, and strategic approach to the exam.',
  }

  const handleStartMock = () => {
    // Redirect to attempt page
    window.location.href = `/dashboard/mock/${params.id}/attempt`
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <Link href="/dashboard/mock">
        <Button variant="ghost" className="mb-4">← Back to Mocks</Button>
      </Link>

      {/* Mock info */}
      <div>
        <h1 className="text-4xl font-bold mb-2">{mockData.title}</h1>
        <p className="text-muted-foreground">{mockData.description}</p>
      </div>

      {/* Key details */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">Duration</p>
          <div className="flex items-center justify-center gap-1">
            <Clock className="w-4 h-4 text-indigo-600" />
            <p className="text-2xl font-bold">{mockData.duration}m</p>
          </div>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">Questions</p>
          <p className="text-2xl font-bold">{mockData.totalQuestions}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">Sections</p>
          <p className="text-2xl font-bold">{mockData.sections}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">Participants</p>
          <div className="flex items-center justify-center gap-1">
            <Users className="w-4 h-4 text-indigo-600" />
            <p className="text-2xl font-bold">{mockData.participants}</p>
          </div>
        </Card>
      </div>

      {/* Section breakdown */}
      <Card className="p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Section Details
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-4 text-sm font-semibold pb-3 border-b">
            <div>Section</div>
            <div>Questions</div>
            <div>Duration</div>
            <div>Avg Time/Q</div>
          </div>
          {[
            { name: 'Quantitative', q: 40, dur: 40, avg: '60s' },
            { name: 'Verbal & RC', q: 34, dur: 40, avg: '71s' },
            { name: 'DI & LR', q: 26, dur: 40, avg: '92s' },
          ].map((section) => (
            <div key={section.name} className="grid grid-cols-4 gap-4 text-sm py-2 border-b last:border-b-0">
              <div className="font-medium">{section.name}</div>
              <div>{section.q}</div>
              <div>{section.dur}m</div>
              <div className="text-muted-foreground">{section.avg}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Important notes */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h3 className="font-bold mb-3">Before You Start ⚠️</h3>
        <ul className="space-y-2 text-sm list-disc list-inside">
          <li>Find a quiet place and eliminate distractions</li>
          <li>Make sure your internet connection is stable</li>
          <li>Keep water and snacks nearby</li>
          <li>Once started, the timer cannot be paused</li>
          <li>Your progress is auto-saved every 30 seconds</li>
          <li>You cannot navigate away from the mock during the attempt</li>
        </ul>
      </Card>

      {/* CTA */}
      <div className="flex gap-3">
        <Link href="/dashboard/mock" className="flex-1">
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </Link>
        <Button
          onClick={() => setDisclaimerOpen(true)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
          size="lg"
        >
          Start Mock
        </Button>
      </div>

      {/* Disclaimer dialog */}
      <PreMockDisclaimer
        open={disclaimerOpen}
        onOpenChange={setDisclaimerOpen}
        mockTitle={mockData.title}
        cohortSize={mockData.participants}
        cohortGrowth={mockData.cohortGrowth}
        onStart={handleStartMock}
      />
    </div>
  )
}

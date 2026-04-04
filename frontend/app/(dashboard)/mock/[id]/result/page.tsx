'use client'

import { ResultSummary } from '@/components/mock/ResultSummary'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function MockResultPage({
  params,
}: {
  params: { id: string }
}) {
  // Mock result data - replace with real data from backend
  const resultData = {
    percentile: 87.3,
    cohortSize: 1247,
    newParticipants: 47,
    totalScore: 128,
    sectionScores: [
      {
        section: 'QUANT' as const,
        score: 48,
        accuracy: 85.2,
        avgTime: 48.5,
      },
      {
        section: 'VARC' as const,
        score: 52,
        accuracy: 82.1,
        avgTime: 61.2,
      },
      {
        section: 'DILR' as const,
        score: 28,
        accuracy: 73.7,
        avgTime: 92.3,
      },
    ],
    mockTitle: 'Weekly Mock #12',
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Mock Result</h1>
        <p className="text-muted-foreground">Your detailed performance analysis</p>
      </div>

      {/* Results */}
      <ResultSummary
        percentile={resultData.percentile}
        cohortSize={resultData.cohortSize}
        newParticipants={resultData.newParticipants}
        sectionScores={resultData.sectionScores}
        totalScore={resultData.totalScore}
        mockTitle={resultData.mockTitle}
      />

      {/* Answer review section placeholder */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-bold">Review Your Answers</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-4 justify-between p-3 rounded bg-gray-50">
            <label className="cursor-pointer">
              <input type="radio" name="filter" defaultChecked className="mr-2" />
              Show All ({resultData.sectionScores.reduce((sum, s) => sum + Math.floor(s.accuracy), 0)})
            </label>
          </div>
          <div className="flex gap-4 justify-between p-3 rounded bg-gray-50">
            <label className="cursor-pointer">
              <input type="radio" name="filter" className="mr-2" />
              Show Wrong Only (~{100 - Math.round(resultData.percentile * 0.75)})
            </label>
          </div>
          <div className="flex gap-4 justify-between p-3 rounded bg-gray-50">
            <label className="cursor-pointer">
              <input type="radio" name="filter" className="mr-2" />
              Show Marked for Review (8)
            </label>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Full answer review coming soon. Review specific questions to understand your performance.
        </p>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Link href="/dashboard/mock" className="flex-1">
          <Button variant="outline" className="w-full">
            Back to Mocks
          </Button>
        </Link>
        <Link href="/dashboard/practice" className="flex-1">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
            Practice Weak Areas
          </Button>
        </Link>
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface QuestionStatus {
  index: number
  attempted: boolean
  markedForReview: boolean
  isCorrect?: boolean
}

interface QuestionPaletteProps {
  questions: QuestionStatus[]
  currentIndex: number
  onSelectQuestion: (index: number) => void
}

export function QuestionPalette({
  questions,
  currentIndex,
  onSelectQuestion,
}: QuestionPaletteProps) {
  const statusCounts = {
    unattempted: questions.filter((q) => !q.attempted && !q.markedForReview).length,
    attempted: questions.filter((q) => q.attempted && !q.markedForReview).length,
    marked: questions.filter((q) => q.markedForReview).length,
  }

  const getButtonColor = (q: QuestionStatus, isCurrent: boolean) => {
    if (isCurrent) return 'bg-indigo-600 text-white'
    if (q.markedForReview && q.attempted) return 'bg-amber-200 hover:bg-amber-300'
    if (q.markedForReview) return 'bg-red-200 hover:bg-red-300'
    if (q.attempted) return 'bg-green-200 hover:bg-green-300'
    return 'bg-gray-200 hover:bg-gray-300'
  }

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-semibold">Question Palette</h3>

      {/* Status legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <span>Unattempted ({statusCounts.unattempted})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 rounded" />
          <span>Attempted ({statusCounts.attempted})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 rounded" />
          <span>Marked ({statusCounts.marked})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-200 rounded" />
          <span>Marked & Attempted</span>
        </div>
      </div>

      {/* Question grid */}
      <ScrollArea className="h-80">
        <div className="grid grid-cols-5 gap-2 pr-4">
          {questions.map((q) => (
            <Button
              key={q.index}
              onClick={() => onSelectQuestion(q.index)}
              variant="ghost"
              size="sm"
              className={`h-10 w-full p-0 text-sm font-semibold rounded ${getButtonColor(
                q,
                q.index === currentIndex
              )}`}
            >
              {q.index + 1}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}

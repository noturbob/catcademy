'use client'

import { Question } from '@/types/question'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'
import { SectionBadge } from '@/components/shared/SectionBadge'
import { QuestionRenderer } from '@/components/shared/QuestionRenderer'

interface QuestionCardProps {
  question: Question
  currentIndex: number
  totalQuestions: number
  selectedOption: string | null
  onSelectOption: (option: string) => void
  onMarkForReview: () => void
  isMarkedForReview: boolean
  tita?: boolean
  tiataAnswer?: string
  onTitaAnswerChange?: (answer: string) => void
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onMarkForReview,
  isMarkedForReview,
  tita = false,
  tiataAnswer = '',
  onTitaAnswerChange,
}: QuestionCardProps) {
  return (
    <Card className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SectionBadge section={question.section} />
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="text-sm text-muted-foreground">
            Q {currentIndex + 1}/{totalQuestions}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">{question.topic}</div>
      </div>

      {/* Question content */}
      <div className="space-y-4">
        <QuestionRenderer content={question.content} />
      </div>

      {/* Options or TITA input */}
      {tita ? (
        <div className="space-y-2">
          <label className="text-sm font-semibold">Your Answer</label>
          <input
            type="text"
            value={tiataAnswer}
            onChange={(e) => onTitaAnswerChange?.(e.target.value)}
            placeholder="Type your answer here"
            className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      ) : (
        <div className="space-y-2">
          {question.options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              onClick={() => onSelectOption(option.id)}
              className={`w-full justify-start h-auto py-3 text-left transition-all ${
                selectedOption === option.id
                  ? 'border-2 border-indigo-500 bg-indigo-50'
                  : 'border-input hover:border-indigo-300'
              }`}
            >
              <span className="font-semibold mr-3 w-6 text-center">
                {option.id}.
              </span>
              <span>{option.text}</span>
            </Button>
          ))}
        </div>
      )}

      {/* Mark for review */}
      <div>
        <Button
          variant={isMarkedForReview ? 'default' : 'outline'}
          onClick={onMarkForReview}
          className={isMarkedForReview ? 'bg-amber-500 hover:bg-amber-600' : ''}
        >
          {isMarkedForReview ? '⭐ Marked for Review' : '☆ Mark for Review'}
        </Button>
      </div>
    </Card>
  )
}

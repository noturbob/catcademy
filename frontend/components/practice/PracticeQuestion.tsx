'use client'

import { Question } from '@/types/question'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DifficultyBadge } from '@/components/shared/DifficultyBadge'
import { SectionBadge } from '@/components/shared/SectionBadge'
import { QuestionRenderer } from '@/components/shared/QuestionRenderer'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'

interface PracticeQuestionProps {
  question: Question
  onSubmit: (answer: string) => void
  loading?: boolean
}

export function PracticeQuestion({
  question,
  onSubmit,
  loading = false,
}: PracticeQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleSubmit = () => {
    if (!selectedOption) return
    onSubmit(selectedOption)
    setSubmitted(true)
  }

  const isCorrect = selectedOption === question.answer

  return (
    <Card className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SectionBadge section={question.section} />
          <DifficultyBadge difficulty={question.difficulty} />
        </div>
        <p className="text-sm text-muted-foreground">{question.topic}</p>
      </div>

      {/* Question content */}
      <div className="space-y-4">
        <QuestionRenderer content={question.content} />
      </div>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            onClick={() => {
              if (!submitted) setSelectedOption(option.id)
            }}
            disabled={submitted}
            className={`w-full justify-start h-auto py-3 text-left transition-all ${
              selectedOption === option.id
                ? submitted
                  ? isCorrect
                    ? 'border-2 border-green-500 bg-green-50'
                    : 'border-2 border-red-500 bg-red-50'
                  : 'border-2 border-indigo-500 bg-indigo-50'
                : 'border-input hover:border-indigo-300'
            }`}
          >
            <span className="font-semibold mr-3 w-6 text-center">
              {option.id}.
            </span>
            <span className="flex-1">{option.text}</span>
            {submitted && option.id === question.answer && (
              <CheckCircle2 className="w-5 h-5 text-green-600 ml-2" />
            )}
            {submitted && selectedOption === option.id && !isCorrect && (
              <XCircle className="w-5 h-5 text-red-600 ml-2" />
            )}
          </Button>
        ))}
      </div>

      {/* Submitted feedback */}
      {submitted && (
        <div className={`p-4 rounded-lg border ${
          isCorrect
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <p className="font-semibold text-green-900">Correct!</p>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <p className="font-semibold text-red-900">Incorrect</p>
              </>
            )}
          </div>
          {!isCorrect && (
            <p className="text-sm text-red-700">
              The correct answer is <strong>{question.answer}</strong>
            </p>
          )}
        </div>
      )}

      {/* Explanation */}
      {submitted && question.explanation && (
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full"
          >
            {showExplanation ? '▼ Hide' : '▶ Show'} Explanation
          </Button>
          {showExplanation && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm">
              {question.explanation}
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      {!submitted ? (
        <Button
          onClick={handleSubmit}
          disabled={!selectedOption || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700"
        >
          {loading ? 'Submitting...' : 'Submit Answer'}
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => {
            setSelectedOption(null)
            setSubmitted(false)
            setShowExplanation(false)
          }}
          className="w-full"
        >
          ← Back to Questions
        </Button>
      )}
    </Card>
  )
}

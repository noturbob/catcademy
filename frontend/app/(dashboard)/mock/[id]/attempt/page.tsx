'use client'

import { useEffect, useState } from 'react'
import { QuestionCard } from '@/components/mock/QuestionCard'
import { MockTimer } from '@/components/mock/MockTimer'
import { SectionTabs } from '@/components/mock/SectionTabs'
import { QuestionPalette } from '@/components/mock/QuestionPalette'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Question, Section } from '@/types/question'
import { useRouter } from 'next/navigation'

// Mock questions data
const MOCK_QUESTIONS: Question[] = Array.from({ length: 100 }, (_, i) => ({
  id: `q${i + 1}`,
  section: (['QUANT', 'VARC', 'DILR'] as const)[Math.floor(i / 34)],
  topic: 'Sample Topic',
  difficulty: (['EASY', 'MEDIUM', 'HARD'] as const)[i % 3],
  source: 'AI_GENERATED',
  content: `<p><strong>Question ${i + 1}:</strong> This is a sample question. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Choose the best answer from the options below.</p>`,
  options: [
    { id: 'A', text: 'Option A' },
    { id: 'B', text: 'Option B' },
    { id: 'C', text: 'Option C' },
    { id: 'D', text: 'Option D' },
  ],
  answer: 'A',
  explanation: 'This is the correct answer because...',
  tags: [],
  isTITA: false,
}))

export default function MockAttemptPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState<Section>('QUANT')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120 * 60) // 120 minutes in seconds
  const [responses, setResponses] = useState<Record<string, string | null>>({})
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set())
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Filter questions by section
  const sectionQuestions = MOCK_QUESTIONS.filter(
    (q) => q.section === currentSection
  )

  const currentQuestion = sectionQuestions[currentIndex]

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitMock()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Auto-save every 30 seconds
  useEffect(() => {
    const saveInterval = setInterval(async () => {
      setIsSaving(true)
      // Save to backend
      setTimeout(() => setIsSaving(false), 500)
    }, 30000)

    return () => clearInterval(saveInterval)
  }, [responses])

  // Prevent navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue =
        'Your progress is saved, but the timer keeps running. Leave anyway?'
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const handleSelectOption = (option: string) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }))
  }

  const handleMarkForReview = () => {
    setMarkedForReview((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(currentQuestion.id)) {
        newSet.delete(currentQuestion.id)
      } else {
        newSet.add(currentQuestion.id)
      }
      return newSet
    })
  }

  const handleNext = () => {
    if (currentIndex < sectionQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (currentSection === 'QUANT') {
      setCurrentSection('VARC')
      setCurrentIndex(0)
    } else if (currentSection === 'VARC') {
      setCurrentSection('DILR')
      setCurrentIndex(0)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleJumpToQuestion = (section: Section, index: number) => {
    setCurrentSection(section)
    setCurrentIndex(index)
  }

  const handleSubmitMock = () => {
    // Save responses and redirect to result page
    router.push(`/dashboard/mock/${params.id}/result`)
  }

  const allQuestions = MOCK_QUESTIONS.map((q, idx) => ({
    index: idx,
    attempted: !!responses[q.id],
    markedForReview: markedForReview.has(q.id),
  }))

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="border-b bg-white p-4 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="font-bold">Weekly Mock #12</h2>
        </div>
        <div className="flex-1 flex justify-center">
          <MockTimer
            secondsLeft={timeLeft}
            onTimeUp={handleSubmitMock}
            isRunning={true}
          />
        </div>
        <div className="flex-1 flex justify-end gap-2">
          {isSaving && (
            <span className="text-xs text-muted-foreground">💾 Saving...</span>
          )}
          <Button
            onClick={() => setShowSubmitConfirm(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Submit Mock
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto flex gap-6 p-6 bg-gray-50">
        {/* Left: Question */}
        <div className="flex-1 min-w-0">
          <div className="space-y-4">
            <SectionTabs
              currentSection={currentSection}
              onSectionChange={(section) => {
                setCurrentSection(section)
                setCurrentIndex(0)
              }}
              sections={['QUANT', 'VARC', 'DILR']}
            />

            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={sectionQuestions.length}
                selectedOption={responses[currentQuestion.id] || null}
                onSelectOption={handleSelectOption}
                onMarkForReview={handleMarkForReview}
                isMarkedForReview={markedForReview.has(currentQuestion.id)}
              />
            )}
          </div>

          {/* Bottom navigation */}
          <div className="flex gap-2 mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0 && currentSection === 'QUANT'}
            >
              ← Previous
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              className="flex-1"
            >
              Next →
            </Button>
          </div>
        </div>

        {/* Right: Question Palette */}
        <div className="w-80 hidden md:block">
          <QuestionPalette
            questions={allQuestions}
            currentIndex={MOCK_QUESTIONS.findIndex((q) => q.id === currentQuestion?.id)}
            onSelectQuestion={(idx) => {
              const q = MOCK_QUESTIONS[idx]
              handleJumpToQuestion(q.section, sectionQuestions.indexOf(q))
            }}
          />
        </div>
      </div>

      {/* Submit confirmation dialog */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-sm">
            <h3 className="font-bold text-lg mb-4">Submit Mock?</h3>
            <p className="text-muted-foreground mb-6">
              You have answered {Object.keys(responses).length} questions.
              Once submitted, you cannot make changes.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1"
              >
                Continue Attempting
              </Button>
              <Button
                onClick={handleSubmitMock}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              >
                Submit Now
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getTableValue, getRandomMultiplier } from '@/lib/constants/tables'
import { CheckCircle2, XCircle, Zap } from 'lucide-react'

type Difficulty = 'easy' | 'medium' | 'hard'
type Mode = 'practice' | 'test' | 'results'

interface SessionResult {
  multiplier: number
  userAnswer: number | null
  correct: number
  timeTaken: number
  isCorrect: boolean
}

interface TrainerState {
  currentTable: number
  currentMultiplier: number
  userInput: string
  timeLeft: number
  score: { correct: number; wrong: number; avgTime: number }
  sessionHistory: SessionResult[]
  mode: Mode
  difficulty: Difficulty
  questionsAnswered: number
}

export function SpeedTableTrainer() {
  const [state, setState] = useState<TrainerState>({
    currentTable: 12,
    currentMultiplier: 1,
    userInput: '',
    timeLeft: 5,
    score: { correct: 0, wrong: 0, avgTime: 0 },
    sessionHistory: [],
    mode: 'practice',
    difficulty: 'medium',
    questionsAnswered: 0,
  })

  const [tableSelector, setTableSelector] = useState<number | 'random'>(12)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const sessionStartRef = useRef<number>(0)
  const questionStartRef = useRef<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize question
  useEffect(() => {
    if (state.mode === 'practice' || state.mode === 'test') {
      if (state.questionsAnswered === 0) {
        resetQuestion()
      }
    }
  }, [state.mode])

  // Timer effect
  useEffect(() => {
    if (state.mode === 'practice' || state.mode === 'test') {
      if (state.timeLeft <= 0) {
        handleTimeout()
        return
      }

      timerRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 0.1,
        }))
      }, 100)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [state.timeLeft, state.mode])

  // Auto-focus input
  useEffect(() => {
    if (
      (state.mode === 'practice' || state.mode === 'test') &&
      inputRef.current
    ) {
      inputRef.current.focus()
    }
  }, [state.currentMultiplier, state.mode])

  const getDifficultyTime = () => {
    switch (state.difficulty) {
      case 'easy':
        return 5
      case 'medium':
        return 3
      case 'hard':
        return 2
      default:
        return 3
    }
  }

  const resetQuestion = () => {
    const newTable =
      tableSelector === 'random'
        ? Math.floor(Math.random() * 29) + 2
        : tableSelector
    const newMultiplier = getRandomMultiplier()

    setState((prev) => ({
      ...prev,
      currentTable: newTable,
      currentMultiplier: newMultiplier,
      userInput: '',
      timeLeft: getDifficultyTime(),
    }))
    questionStartRef.current = Date.now()
  }

  const handleTimeout = () => {
    const result: SessionResult = {
      multiplier: state.currentMultiplier,
      userAnswer: null,
      correct: getTableValue(state.currentTable, state.currentMultiplier),
      timeTaken: getDifficultyTime(),
      isCorrect: false,
    }

    setState((prev) => {
      const newHistory = [...prev.sessionHistory, result]
      const newQuestionsAnswered = prev.questionsAnswered + 1

      if (newQuestionsAnswered >= 20) {
        const totalTime = newHistory.reduce((sum, r) => sum + r.timeTaken, 0)
        const avgTime = totalTime / newHistory.length
        return {
          ...prev,
          sessionHistory: newHistory,
          questionsAnswered: newQuestionsAnswered,
          score: {
            correct: result.isCorrect ? prev.score.correct : prev.score.correct,
            wrong: prev.score.wrong + 1,
            avgTime: avgTime,
          },
          mode: 'results',
        }
      }

      return {
        ...prev,
        sessionHistory: newHistory,
        questionsAnswered: newQuestionsAnswered,
        score: {
          ...prev.score,
          wrong: prev.score.wrong + 1,
        },
      }
    })

    setTimeout(resetQuestion, 500)
  }

  const handleSubmit = () => {
    const userAnswer = parseInt(state.userInput, 10)
    const correctAnswer = getTableValue(
      state.currentTable,
      state.currentMultiplier
    )
    const timeTaken = (Date.now() - questionStartRef.current) / 1000
    const isCorrect = userAnswer === correctAnswer

    const result: SessionResult = {
      multiplier: state.currentMultiplier,
      userAnswer: isNaN(userAnswer) ? null : userAnswer,
      correct: correctAnswer,
      timeTaken,
      isCorrect,
    }

    setState((prev) => {
      const newHistory = [...prev.sessionHistory, result]
      const newQuestionsAnswered = prev.questionsAnswered + 1
      const newCorrect = isCorrect ? prev.score.correct + 1 : prev.score.correct
      const newWrong = isCorrect ? prev.score.wrong : prev.score.wrong + 1

      if (newQuestionsAnswered >= 20) {
        const totalTime = newHistory.reduce((sum, r) => sum + r.timeTaken, 0)
        const avgTime = totalTime / newHistory.length
        return {
          ...prev,
          sessionHistory: newHistory,
          questionsAnswered: newQuestionsAnswered,
          score: {
            correct: newCorrect,
            wrong: newWrong,
            avgTime: avgTime,
          },
          mode: 'results',
        }
      }

      return {
        ...prev,
        sessionHistory: newHistory,
        questionsAnswered: newQuestionsAnswered,
        score: {
          correct: newCorrect,
          wrong: newWrong,
          avgTime:
            newHistory.reduce((sum, r) => sum + r.timeTaken, 0) /
            newHistory.length,
        },
      }
    })

    setTimeout(resetQuestion, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      userInput: e.target.value,
    }))
  }

  const startSession = () => {
    setState((prev) => ({
      ...prev,
      mode: 'practice',
      questionsAnswered: 0,
      sessionHistory: [],
      score: { correct: 0, wrong: 0, avgTime: 0 },
    }))
    sessionStartRef.current = Date.now()
    setTimeout(resetQuestion, 100)
  }

  const resetSession = () => {
    setState((prev) => ({
      ...prev,
      mode: 'practice',
      questionsAnswered: 0,
      sessionHistory: [],
      score: { correct: 0, wrong: 0, avgTime: 0 },
      userInput: '',
      currentTable: 12,
      currentMultiplier: 1,
    }))
  }

  const accuracy =
    state.questionsAnswered > 0
      ? ((state.score.correct / state.questionsAnswered) * 100).toFixed(1)
      : '0'

  const isMastered =
    parseFloat(accuracy) > 90 && state.score.avgTime < 4 && state.questionsAnswered >= 20

  const lastResult =
    state.sessionHistory[state.sessionHistory.length - 1]
  const showFeedback = lastResult && state.questionsAnswered > 0

  // Practice mode (not started)
  if (state.mode === 'practice' && state.questionsAnswered === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Speed Table Trainer</h2>
            <p className="text-sm text-muted-foreground">
              Master multiplication tables 2–30 with rapid-fire drills
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Select Table
              </label>
              <div className="grid grid-cols-6 gap-2">
                <Button
                  variant={
                    tableSelector === 'random' ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => setTableSelector('random')}
                  className="col-span-2"
                >
                  Random Mix
                </Button>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20, 25, 30].map(
                  (table) => (
                    <Button
                      key={table}
                      variant={
                        tableSelector === table ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setTableSelector(table)}
                    >
                      ×{table}
                    </Button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">
                Difficulty
              </label>
              <div className="flex gap-3">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                  <Button
                    key={diff}
                    variant={state.difficulty === diff ? 'default' : 'outline'}
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        difficulty: diff,
                      }))
                    }
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    {diff === 'easy' && ' (5s)'}
                    {diff === 'medium' && ' (3s)'}
                    {diff === 'hard' && ' (2s)'}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={startSession}
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600"
          >
            <Zap className="w-4 h-4 mr-2" />
            Start Training (20 Questions)
          </Button>
        </div>
      </Card>
    )
  }

  // Active training mode
  if (
    (state.mode === 'practice' || state.mode === 'test') &&
    state.questionsAnswered < 20
  ) {
    const correctAnswer = getTableValue(
      state.currentTable,
      state.currentMultiplier
    )
    const timerPercentage = (state.timeLeft / getDifficultyTime()) * 100
    const timerColor =
      state.timeLeft < 1
        ? 'bg-red-500'
        : state.timeLeft < 2
          ? 'bg-amber-500'
          : 'bg-green-500'

    return (
      <Card className="w-full max-w-2xl mx-auto p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Question {state.questionsAnswered + 1} / 20
              </p>
              <p className="text-2xl font-bold text-indigo-600">
                {state.score.correct}
                <span className="text-sm text-muted-foreground"> correct</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-2xl font-bold">{accuracy}%</p>
            </div>
          </div>

          {/* Timer bar */}
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className={timerColor}
                initial={{ width: '100%' }}
                animate={{ width: `${Math.max(0, timerPercentage)}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
                style={{ height: '100%' }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Time left: {state.timeLeft.toFixed(1)}s
            </p>
          </div>

          {/* Question */}
          <div className="text-center py-12">
            <p className="text-6xl font-bold text-indigo-600 mb-4">
              {state.currentTable} × {state.currentMultiplier} = ?
            </p>
          </div>

          {/* Feedback */}
          {showFeedback && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`p-4 rounded-lg ${lastResult.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {lastResult.isCorrect ? (
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
              {!lastResult.isCorrect && (
                <p className={lastResult.isCorrect ? 'text-green-700' : 'text-red-700'}>
                  The correct answer is <strong>{lastResult.correct}</strong>
                </p>
              )}
            </motion.div>
          )}

          {/* Input */}
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="number"
              value={state.userInput}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer..."
              className="flex-1 px-4 py-3 border border-input rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={state.questionsAnswered >= 20}
            />
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={!state.userInput || state.questionsAnswered >= 20}
              className="px-8 bg-indigo-600 hover:bg-indigo-700"
            >
              Submit
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
              <p className="text-2xl font-bold">{accuracy}%</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Avg Time</p>
              <p className="text-2xl font-bold">
                {state.score.avgTime.toFixed(1)}s
              </p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Progress</p>
              <p className="text-2xl font-bold">
                {Math.round((state.questionsAnswered / 20) * 100)}%
              </p>
            </Card>
          </div>
        </div>
      </Card>
    )
  }

  // Results mode
  if (state.mode === 'results') {
    const finalAccuracy = ((state.score.correct / 20) * 100).toFixed(1)

    return (
      <Card className="w-full max-w-2xl mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center">
            {isMastered ? (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold mb-2 text-green-600">
                  Mastered!
                </h2>
                <p className="text-muted-foreground">
                  You've mastered ×{tableSelector === 'random' ? 'Random' : tableSelector}!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2">Session Complete</h2>
                <p className="text-muted-foreground">
                  Keep practicing to reach mastery
                </p>
              </>
            )}
          </div>

          {isMastered && (
            <Badge className="w-full justify-center py-2 bg-green-100 text-green-900">
              ✓ Mastered Badge Unlocked
            </Badge>
          )}

          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
              <p className="text-3xl font-bold text-indigo-600">
                {finalAccuracy}%
              </p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Correct</p>
              <p className="text-3xl font-bold text-green-600">
                {state.score.correct}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Avg Time</p>
              <p className="text-3xl font-bold text-amber-600">
                {state.score.avgTime.toFixed(2)}s
              </p>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Recent Attempts</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {state.sessionHistory.slice(-10).map((result, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    result.isCorrect
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <span className="font-mono">
                    {state.currentTable} × {result.multiplier}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {result.timeTaken.toFixed(2)}s
                    </span>
                    {result.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={resetSession}
            size="lg"
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {isMastered ? 'Practice Again' : 'Try Again'}
          </Button>
        </div>
      </Card>
    )
  }

  return null
}

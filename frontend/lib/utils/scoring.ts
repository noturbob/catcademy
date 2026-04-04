import type { Question } from '@/types/question'
import type { QuestionResponse } from '@/types/mock'

export function calculateScore(
  responses: Record<string, QuestionResponse>,
  questions: Question[]
): number {
  let score = 0
  for (const q of questions) {
    const response = responses[q.id]
    if (!response || !response.selected) continue // unattempted: 0
    if (response.selected === q.answer) {
      score += 3 // correct: +3
    } else if (!q.isTITA) {
      score -= 1 // wrong MCQ: -1 (TITA has no negative marking)
    }
  }
  return score
}

export function calculatePercentile(
  userScore: number,
  allScores: number[]
): number {
  if (allScores.length === 0) return 0
  const below = allScores.filter((s) => s < userScore).length
  return parseFloat(((below / allScores.length) * 100).toFixed(1))
}

export function calculateAccuracy(
  responses: Record<string, QuestionResponse>,
  questions: Question[]
): number {
  if (questions.length === 0) return 0
  let correct = 0
  for (const q of questions) {
    const response = responses[q.id]
    if (response?.selected === q.answer) {
      correct++
    }
  }
  return parseFloat(((correct / questions.length) * 100).toFixed(1))
}

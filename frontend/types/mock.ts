import type { Section, Question } from './question'

export type MockType = 'FULL' | 'SECTIONAL' | 'MINI'
export type MockStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'ABANDONED'

export interface Mock {
  id: string
  title: string
  type: MockType
  durationMin: number
  sections: MockSection[]
  isAI: boolean
  participantCount: number
  weekNumber: number
}

export interface MockSection {
  section: Section
  questions: Question[]
  timeLimitMin: number
}

export interface MockAttempt {
  id: string
  mockId: string
  userId: string
  status: MockStatus
  responses: Record<string, QuestionResponse>
  score?: number
  sectionScores?: Record<Section, number>
  percentile?: number
  submittedAt?: string
}

export interface QuestionResponse {
  selected: string | null
  markedForReview: boolean
  timeTaken: number
  visited: boolean
}

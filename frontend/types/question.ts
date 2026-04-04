export type Section = 'QUANT' | 'VARC' | 'DILR'
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'
export type QuestionSource = 'PYQ' | 'AI_GENERATED' | 'MANUAL'

export interface Option {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
}

export interface Question {
  id: string
  section: Section
  topic: string
  difficulty: Difficulty
  source: QuestionSource
  year?: number
  content: string
  options: Option[]
  answer: string
  explanation?: string
  tags: string[]
  isTITA: boolean // non-MCQ, no negative marking
}

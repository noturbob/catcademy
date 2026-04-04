import type { Section } from './question'

export interface SectionStats {
  section: Section
  accuracy: number
  avgTimeSec: number
  attempted: number
  correct: number
}

export interface WeakArea {
  topic: string
  section: Section
  accuracy: number
  attempted: number
}

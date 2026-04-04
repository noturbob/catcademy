'use client'

import { create } from 'zustand'
import type { Section } from '@/types/question'
import type { QuestionResponse } from '@/types/mock'

interface MockState {
  mockId: string | null
  currentSection: Section
  currentQuestionIndex: number
  responses: Record<string, QuestionResponse>
  sectionTimeLeft: Record<Section, number>
  totalTimeLeft: number
  status: 'not_started' | 'in_progress' | 'submitted'
  isSaving: boolean

  // Actions
  initializeMock: (mockId: string, totalMinutes: number) => void
  setCurrentSection: (section: Section) => void
  setCurrentQuestionIndex: (index: number) => void
  setResponse: (questionId: string, response: QuestionResponse) => void
  updateTimeLeft: (sectionOrTotal: 'total' | Section, seconds: number) => void
  markForReview: (questionId: string) => void
  unmarkForReview: (questionId: string) => void
  setStatus: (status: 'not_started' | 'in_progress' | 'submitted') => void
  setSaving: (saving: boolean) => void
  resetMock: () => void
}

const initialState = {
  mockId: null,
  currentSection: 'QUANT' as Section,
  currentQuestionIndex: 0,
  responses: {},
  sectionTimeLeft: {
    QUANT: 0,
    VARC: 0,
    DILR: 0,
  },
  totalTimeLeft: 0,
  status: 'not_started' as const,
  isSaving: false,
}

export const useMockStore = create<MockState>((set) => ({
  ...initialState,

  initializeMock: (mockId, totalMinutes) =>
    set({
      mockId,
      totalTimeLeft: totalMinutes * 60,
      sectionTimeLeft: {
        QUANT: (totalMinutes / 3) * 60,
        VARC: (totalMinutes / 3) * 60,
        DILR: (totalMinutes / 3) * 60,
      },
      status: 'in_progress',
    }),

  setCurrentSection: (section) => set({ currentSection: section }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  setResponse: (questionId, response) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [questionId]: response,
      },
    })),

  updateTimeLeft: (sectionOrTotal, seconds) =>
    set((state) => {
      if (sectionOrTotal === 'total') {
        return { totalTimeLeft: Math.max(0, seconds) }
      }
      return {
        sectionTimeLeft: {
          ...state.sectionTimeLeft,
          [sectionOrTotal]: Math.max(0, seconds),
        },
      }
    }),

  markForReview: (questionId) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [questionId]: {
          ...state.responses[questionId],
          markedForReview: true,
        },
      },
    })),

  unmarkForReview: (questionId) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [questionId]: {
          ...state.responses[questionId],
          markedForReview: false,
        },
      },
    })),

  setStatus: (status) => set({ status }),

  setSaving: (saving) => set({ isSaving: saving }),

  resetMock: () => set(initialState),
}))

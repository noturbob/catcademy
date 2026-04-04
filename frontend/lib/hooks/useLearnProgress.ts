'use client'

import { useEffect, useState, useCallback } from 'react'

export type MasteryState = 'not_started' | 'learning' | 'practicing' | 'mastered'

export function useLearnProgress(module: string, subtopic?: string) {
  const [mastery, setMastery] = useState<MasteryState>('not_started')
  const [progress, setProgress] = useState(0)

  const storageKey = subtopic
    ? `catalyst_learn_${module}_${subtopic}`
    : `catalyst_learn_${module}`

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    if (stored) {
      const data = JSON.parse(stored)
      setMastery(data.mastery || 'not_started')
      setProgress(data.progress || 0)
    }
  }, [storageKey])

  const updateProgress = useCallback(
    (correct: number, total: number) => {
      const newProgress = Math.round((correct / total) * 100)
      setProgress(newProgress)

      // Determine mastery state
      let newMastery: MasteryState = 'learning'
      if (newProgress >= 90) {
        newMastery = 'mastered'
      } else if (newProgress >= 60) {
        newMastery = 'practicing'
      }

      setMastery(newMastery)

      // Save to localStorage
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          mastery: newMastery,
          progress: newProgress,
          updatedAt: new Date().toISOString(),
        })
      )
    },
    [storageKey]
  )

  return { mastery, progress, updateProgress }
}

'use client'

import { useEffect, useState, useCallback } from 'react'

export function useMockTimer(initialSeconds: number, onTimeUp?: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onTimeUp?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, onTimeUp])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resume = useCallback(() => {
    setIsRunning(true)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(initialSeconds)
  }, [initialSeconds])

  return { timeLeft, isRunning, start, pause, resume, reset, setTimeLeft }
}

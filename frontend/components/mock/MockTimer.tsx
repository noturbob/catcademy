'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface MockTimerProps {
  secondsLeft: number
  onTimeUp?: () => void
  isRunning?: boolean
}

export function MockTimer({ secondsLeft, onTimeUp, isRunning = true }: MockTimerProps) {
  const [displayTime, setDisplayTime] = useState(secondsLeft)

  useEffect(() => {
    if (!isRunning) return

    if (displayTime <= 0) {
      onTimeUp?.()
      return
    }

    const timer = setInterval(() => {
      setDisplayTime((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          onTimeUp?.()
        }
        return Math.max(0, newTime)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [displayTime, isRunning, onTimeUp])

  const hours = Math.floor(displayTime / 3600)
  const minutes = Math.floor((displayTime % 3600) / 60)
  const seconds = displayTime % 60

  const isLowTime = displayTime < 300 // < 5 minutes
  const isVeryLowTime = displayTime < 60 // < 1 minute

  return (
    <motion.div
      animate={{
        scale: isVeryLowTime ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 1,
        repeat: isVeryLowTime ? Infinity : 0,
      }}
      className={`font-mono text-3xl font-bold text-center px-6 py-3 rounded-lg transition-colors ${
        isVeryLowTime
          ? 'bg-red-100 text-red-600'
          : isLowTime
            ? 'bg-amber-100 text-amber-600'
            : 'bg-green-100 text-green-600'
      }`}
    >
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </motion.div>
  )
}

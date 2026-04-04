'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react'

export interface FlashcardProps {
  id: string
  front: string
  back: string
  hint?: string
}

interface FlashcardDeckProps {
  cards: FlashcardProps[]
  title: string
  description?: string
  onComplete?: () => void
}

export function Flashcard({ card, isFlipped, onFlip }: {
  card: FlashcardProps
  isFlipped: boolean
  onFlip: () => void
}) {
  return (
    <motion.div
      onClick={onFlip}
      whileHover={{ scale: 1.02 }}
      className="perspective cursor-pointer h-64"
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: 'preserve-3d',
        } as React.CSSProperties}
        className="w-full h-full relative"
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: 'hidden' } as React.CSSProperties}
          className="absolute w-full h-full"
        >
          <Card className="w-full h-full p-8 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200">
            <p className="text-center text-sm text-indigo-600 mb-2">Click to reveal</p>
            <p className="text-center text-3xl font-bold text-indigo-900">
              {card.front}
            </p>
            {card.hint && (
              <p className="text-center text-xs text-indigo-600 mt-4">
                💡 {card.hint}
              </p>
            )}
          </Card>
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          } as React.CSSProperties}
          className="absolute w-full h-full"
        >
          <Card className="w-full h-full p-8 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
            <p className="text-center text-sm text-green-600 mb-2">Answer</p>
            <p className="text-center text-3xl font-bold text-green-900">
              {card.back}
            </p>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FlashcardDeck({ cards, title, description, onComplete }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mastered, setMastered] = useState<Set<string>>(new Set())

  const currentCard = cards[currentIndex]
  const progress = ((currentIndex + 1) / cards.length) * 100

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      onComplete?.()
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleMastered = () => {
    const newMastered = new Set(mastered)
    newMastered.add(currentCard.id)
    setMastered(newMastered)
    handleNext()
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setMastered(new Set())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <p>
            Card {currentIndex + 1} of {cards.length}
          </p>
          <p className="text-indigo-600 font-semibold">
            {mastered.size} Mastered
          </p>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="bg-indigo-500 h-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card */}
      <Flashcard
        card={currentCard}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {isFlipped && (
          <Button
            onClick={handleMastered}
            className="bg-green-600 hover:bg-green-700"
          >
            Got it! ✓
          </Button>
        )}

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1 && !isFlipped}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Reset button */}
      {mastered.size > 0 && (
        <Button
          variant="ghost"
          onClick={handleReset}
          className="w-full"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          Reset Deck
        </Button>
      )}

      {/* Mastered cards */}
      {mastered.size > 0 && (
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-sm text-green-900">
            You've mastered <strong>{mastered.size}</strong> out of <strong>{cards.length}</strong> cards!
          </p>
        </Card>
      )}
    </div>
  )
}

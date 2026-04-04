'use client'

import { FlashcardDeck, FlashcardProps } from '@/components/learn/Flashcard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const SQUARES_CUBES_CARDS: FlashcardProps[] = [
  { id: '1', front: '11²', back: '121', hint: 'Ends in 1' },
  { id: '2', front: '12²', back: '144', hint: 'Ends in 4' },
  { id: '3', front: '13²', back: '169', hint: 'Ends in 9' },
  { id: '4', front: '14²', back: '196', hint: '196' },
  { id: '5', front: '15²', back: '225', hint: 'Ends in 5' },
  { id: '6', front: '16²', back: '256', hint: '256' },
  { id: '7', front: '17²', back: '289', hint: '289' },
  { id: '8', front: '18²', back: '324', hint: '324' },
  { id: '9', front: '19²', back: '361', hint: '361' },
  { id: '10', front: '20²', back: '400', hint: 'Perfect 400' },
  { id: '11', front: '25²', back: '625', hint: 'Ends in 25' },
  { id: '12', front: '10³', back: '1000', hint: 'Perfect cube' },
  { id: '13', front: '11³', back: '1331', hint: '11 × 121' },
  { id: '14', front: '12³', back: '1728', hint: '12 × 144' },
  { id: '15', front: '5³', back: '125', hint: '5 × 25' },
  { id: '16', front: '6³', back: '216', hint: '6 × 36' },
  { id: '17', front: '7³', back: '343', hint: '7 × 49' },
  { id: '18', front: '8³', back: '512', hint: '8 × 64' },
  { id: '19', front: '9³', back: '729', hint: '9 × 81' },
  { id: '20', front: '2⁵', back: '32', hint: 'Powers of 2' },
]

export default function SquaresPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <Link href="/dashboard/learn">
          <Button variant="ghost" className="mb-4">← Back to Learn</Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Squares & Cubes</h1>
        <p className="text-muted-foreground">
          Memorize perfect squares and cubes for faster mental math during the exam.
        </p>
      </div>

      {/* Flashcard Deck */}
      <FlashcardDeck
        cards={SQUARES_CUBES_CARDS}
        title="Squares & Cubes Flashcards"
        description="Master perfect squares (11-20, 25) and cubes (2-12) that appear in CAT"
      />

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">⚡ Speed Tips</h3>
        <ul className="space-y-2 text-sm">
          <li>• <strong>Group by pattern:</strong> Squares ending in 1, 4, 5, 6, 9</li>
          <li>• <strong>Remember:</strong> n² grows quadratically, n³ grows cubically</li>
          <li>• <strong>Use these:</strong> (a+b)² = a² + 2ab + b² for compound squares</li>
          <li>• <strong>Focus on:</strong> 11² to 20² and common cubes (5³, 10³, 12³)</li>
          <li>• <strong>Exam trick:</strong> Often 3-4 of these values are in answer choices</li>
        </ul>
      </div>

      {/* Quick reference */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">📋 Quick Reference</h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold mb-2">Perfect Squares:</p>
            <div className="font-mono space-y-1">
              <div>11-20: 121, 144, 169, 196, 225, 256, 289, 324, 361, 400</div>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-2">Perfect Cubes:</p>
            <div className="font-mono space-y-1">
              <div>2-9: 8, 27, 64, 125, 216, 343, 512, 729</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

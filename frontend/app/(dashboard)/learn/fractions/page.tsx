'use client'

import { FlashcardDeck, FlashcardProps } from '@/components/learn/Flashcard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const FRACTIONS_DECIMALS_CARDS: FlashcardProps[] = [
  { id: '1', front: '1/2', back: '0.5', hint: 'Half' },
  { id: '2', front: '1/3', back: '0.333...', hint: 'Repeating' },
  { id: '3', front: '1/4', back: '0.25', hint: 'Quarter' },
  { id: '4', front: '1/5', back: '0.2', hint: 'One-fifth' },
  { id: '5', front: '1/6', back: '0.1666...', hint: 'Repeating' },
  { id: '6', front: '1/8', back: '0.125', hint: 'One-eighth' },
  { id: '7', front: '1/10', back: '0.1', hint: 'One-tenth' },
  { id: '8', front: '2/3', back: '0.666...', hint: 'Two-thirds' },
  { id: '9', front: '3/4', back: '0.75', hint: 'Three-quarters' },
  { id: '10', front: '3/5', back: '0.6', hint: 'Three-fifths' },
  { id: '11', front: '4/5', back: '0.8', hint: 'Four-fifths' },
  { id: '12', front: '5/8', back: '0.625', hint: 'Five-eighths' },
  { id: '13', front: '7/10', back: '0.7', hint: 'Seven-tenths' },
  { id: '14', front: '0.5', back: '1/2', hint: 'Decimal to fraction' },
  { id: '15', front: '0.75', back: '3/4', hint: 'Decimal to fraction' },
  { id: '16', front: '0.125', back: '1/8', hint: 'Decimal to fraction' },
  { id: '17', front: '0.666...', back: '2/3', hint: 'Repeating decimal' },
  { id: '18', front: '0.2', back: '1/5', hint: 'One-fifth' },
  { id: '19', front: '1/7', back: '0.142857...', hint: 'Repeating 6-digit cycle' },
  { id: '20', front: '0.375', back: '3/8', hint: 'Three-eighths' },
]

export default function FractionsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <Link href="/dashboard/learn">
          <Button variant="ghost" className="mb-4">← Back to Learn</Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Fraction ↔ Decimal Conversion</h1>
        <p className="text-muted-foreground">
          Quick conversions between fractions and decimals. Essential for CAT mental math.
        </p>
      </div>

      {/* Flashcard Deck */}
      <FlashcardDeck
        cards={FRACTIONS_DECIMALS_CARDS}
        title="Fractions ↔ Decimals"
        description="Master instant conversions between common fractions and their decimal equivalents"
      />

      {/* Tips */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">💡 Conversion Tips</h3>
        <ul className="space-y-2 text-sm">
          <li>• <strong>Terminating decimals:</strong> Denominator has only factors of 2 and 5</li>
          <li>• <strong>Repeating decimals:</strong> All other fractions (1/3, 2/7, etc.)</li>
          <li>• <strong>Quick multiply:</strong> 1/8 = 0.125 → 2/8 = 0.25 → 3/8 = 0.375</li>
          <li>• <strong>Pattern for 1/n:</strong> As n increases, decimal gets smaller</li>
          <li>• <strong>Exam shortcut:</strong> If options have decimals, convert to fractions first</li>
        </ul>
      </div>

      {/* Common conversions */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">📊 Most Common Conversions</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold mb-2">Halves & Fourths:</p>
            <div className="space-y-1 font-mono text-xs">
              <div>1/2 = 0.5</div>
              <div>1/4 = 0.25, 3/4 = 0.75</div>
              <div>1/8 = 0.125, 3/8 = 0.375, 5/8 = 0.625, 7/8 = 0.875</div>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-2">Thirds & Fifths:</p>
            <div className="space-y-1 font-mono text-xs">
              <div>1/3 = 0.333..., 2/3 = 0.666...</div>
              <div>1/5 = 0.2, 2/5 = 0.4, 3/5 = 0.6, 4/5 = 0.8</div>
            </div>
          </div>
        </div>
      </div>

      {/* Method */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">📝 Conversion Method</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold">Fraction to Decimal:</p>
            <p className="text-muted-foreground">Divide numerator by denominator</p>
            <p className="font-mono text-xs bg-white p-2 rounded">3/4 = 3 ÷ 4 = 0.75</p>
          </div>
          <div>
            <p className="font-semibold">Decimal to Fraction:</p>
            <p className="text-muted-foreground">Place over appropriate power of 10, then simplify</p>
            <p className="font-mono text-xs bg-white p-2 rounded">0.75 = 75/100 = 3/4</p>
          </div>
        </div>
      </div>
    </div>
  )
}

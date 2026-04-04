'use client'

import { FlashcardDeck, FlashcardProps } from '@/components/learn/Flashcard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LCM_HCF_CARDS: FlashcardProps[] = [
  { id: '1', front: 'HCF(12, 18)', back: '6', hint: 'Common factors: 1,2,3,6' },
  { id: '2', front: 'LCM(12, 18)', back: '36', hint: 'Common multiples: 36, 72...' },
  { id: '3', front: 'HCF(15, 25)', back: '5', hint: 'Common factors: 1, 5' },
  { id: '4', front: 'LCM(15, 25)', back: '75', hint: 'First common multiple' },
  { id: '5', front: 'HCF(20, 30)', back: '10', hint: 'Greatest common divisor' },
  { id: '6', front: 'LCM(20, 30)', back: '60', hint: 'Least common multiple' },
  { id: '7', front: 'HCF(14, 35)', back: '7', hint: 'Factor of both' },
  { id: '8', front: 'LCM(14, 35)', back: '70', hint: 'Product ÷ HCF rule' },
  { id: '9', front: 'a×b = ?', back: 'HCF(a,b) × LCM(a,b)', hint: 'Key formula!' },
  { id: '10', front: 'HCF(48, 64)', back: '16', hint: 'Largest common divisor' },
  { id: '11', front: 'LCM(48, 64)', back: '192', hint: 'Smallest common multiple' },
  { id: '12', front: 'Co-prime numbers?', back: 'HCF = 1', hint: 'No common factors except 1' },
  { id: '13', front: 'HCF(17, 19)', back: '1', hint: 'Both are prime' },
  { id: '14', front: 'Prime factors of 60?', back: '2²×3×5', hint: '60 = 4×15' },
  { id: '15', front: 'Prime factors of 84?', back: '2²×3×7', hint: '84 = 4×21' },
]

export default function LcmHcfPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <Link href="/dashboard/learn">
          <Button variant="ghost" className="mb-4">← Back to Learn</Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">LCM & HCF</h1>
        <p className="text-muted-foreground">
          Master Least Common Multiple (LCM) and Highest Common Factor (HCF) calculations.
        </p>
      </div>

      {/* Flashcard Deck */}
      <FlashcardDeck
        cards={LCM_HCF_CARDS}
        title="LCM & HCF Flashcards"
        description="Quick reference for common LCM and HCF problems"
      />

      {/* Methods */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">📐 Calculation Methods</h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold">Method 1: Prime Factorization</p>
            <p className="text-muted-foreground">Find prime factors of both numbers, then:</p>
            <ul className="list-disc list-inside text-muted-foreground mt-1">
              <li><strong>HCF:</strong> Product of common factors (with lowest power)</li>
              <li><strong>LCM:</strong> Product of all factors (with highest power)</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Method 2: Division Method</p>
            <p className="text-muted-foreground">Divide by smallest prime repeatedly</p>
          </div>
          <div>
            <p className="font-semibold">🔑 Key Formula:</p>
            <p className="font-mono bg-white p-2 rounded">a × b = HCF(a,b) × LCM(a,b)</p>
          </div>
        </div>
      </div>

      {/* Important notes */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">⚠️ Important Notes</h3>
        <ul className="space-y-2 text-sm">
          <li>• <strong>Co-prime numbers:</strong> Numbers with HCF = 1 (e.g., 7 and 11)</li>
          <li>• <strong>LCM ≥ max(a,b)</strong> always (LCM is at least the larger number)</li>
          <li>• <strong>HCF ≤ min(a,b)</strong> always (HCF is at most the smaller number)</li>
          <li>• <strong>For 3 numbers:</strong> Find LCM(a,b), then LCM(result, c)</li>
          <li>• <strong>Exam pattern:</strong> Often requires finding smallest number divisible by given numbers</li>
        </ul>
      </div>
    </div>
  )
}

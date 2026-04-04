'use client'

import { FlashcardDeck, FlashcardProps } from '@/components/learn/Flashcard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

const FORMULA_CARDS: FlashcardProps[] = [
  { id: '1', front: 'Percentage increase', back: '((New - Old) / Old) × 100', hint: 'Change over old value' },
  { id: '2', front: 'Simple Interest', back: 'SI = (P × R × T) / 100', hint: 'Principal × Rate × Time' },
  { id: '3', front: 'Compound Interest', back: 'A = P(1 + r/100)^n', hint: 'Exponential growth' },
  { id: '4', front: 'Profit %', back: '((SP - CP) / CP) × 100', hint: 'Selling - Cost price' },
  { id: '5', front: 'Speed = ?', back: 'Distance / Time', hint: 'D/T formula' },
  { id: '6', front: 'Average Speed', back: 'Total Distance / Total Time', hint: 'Not just average of speeds!' },
  { id: '7', front: 'Work = Rate × Time', back: 'Amount = Efficiency × Duration', hint: 'Combined work rule' },
  { id: '8', front: 'Ratio prob A:B', back: 'A/(A+B)', hint: 'Part of whole' },
  { id: '9', front: 'Combination nCr', back: 'n! / (r!(n-r)!)', hint: 'Order doesn\'t matter' },
  { id: '10', front: 'Permutation nPr', back: 'n! / (n-r)!', hint: 'Order matters' },
  { id: '11', front: '(a+b)²', back: 'a² + 2ab + b²', hint: 'Perfect square' },
  { id: '12', front: '(a-b)²', back: 'a² - 2ab + b²', hint: 'Perfect square' },
  { id: '13', front: 'a² - b²', back: '(a+b)(a-b)', hint: 'Difference of squares' },
  { id: '14', front: 'AP: nth term', back: 'a + (n-1)d', hint: 'First term + (n-1)×diff' },
  { id: '15', front: 'AP: Sum of n terms', back: 'S = n/2 × (first + last)', hint: 'Average × count' },
  { id: '16', front: 'GP: nth term', back: 'a × r^(n-1)', hint: 'First × ratio^(n-1)' },
  { id: '17', front: 'Sum of angles (polygon)', back: '(n-2) × 180°', hint: 'n = number of sides' },
  { id: '18', front: 'Area of triangle', back: '1/2 × base × height', hint: 'Half of base-height product' },
  { id: '19', front: 'Pythagorean theorem', back: 'a² + b² = c²', hint: 'Right triangle' },
  { id: '20', front: 'Circle area', back: 'πr²', hint: 'Radius squared times π' },
]

export default function FormulasPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <Link href="/dashboard/learn">
          <Button variant="ghost" className="mb-4">← Back to Learn</Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">CAT Formulas</h1>
        <p className="text-muted-foreground">
          Essential formulas across all CAT math topics. Memorize these for faster problem solving.
        </p>
      </div>

      {/* Flashcard Deck */}
      <FlashcardDeck
        cards={FORMULA_CARDS}
        title="CAT Formula Collection"
        description="Master 20+ essential formulas tested in the CAT exam"
      />

      {/* Formula categories */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 border-2 border-indigo-200 bg-indigo-50">
          <h3 className="font-semibold mb-3">📊 Arithmetic</h3>
          <div className="space-y-2 text-sm font-mono">
            <div>% change = ((N-O)/O)×100</div>
            <div>SI = PRT/100</div>
            <div>Profit% = ((SP-CP)/CP)×100</div>
            <div>Discount = MP - SP</div>
          </div>
        </Card>

        <Card className="p-4 border-2 border-sky-200 bg-sky-50">
          <h3 className="font-semibold mb-3">⏱️ Time & Work</h3>
          <div className="space-y-2 text-sm font-mono">
            <div>Speed = D/T</div>
            <div>Avg Speed = Total D / Total T</div>
            <div>Work = Rate × Time</div>
            <div>Relative Speed = S₁ ± S₂</div>
          </div>
        </Card>

        <Card className="p-4 border-2 border-amber-200 bg-amber-50">
          <h3 className="font-semibold mb-3">📐 Algebra</h3>
          <div className="space-y-2 text-sm font-mono">
            <div>(a+b)² = a² + 2ab + b²</div>
            <div>a² - b² = (a+b)(a-b)</div>
            <div>AP: Sn = n/2(a+l)</div>
            <div>GP: Sn = a(r^n-1)/(r-1)</div>
          </div>
        </Card>

        <Card className="p-4 border-2 border-purple-200 bg-purple-50">
          <h3 className="font-semibold mb-3">📏 Geometry</h3>
          <div className="space-y-2 text-sm font-mono">
            <div>Triangle = 1/2 × b × h</div>
            <div>Circle = πr²</div>
            <div>a² + b² = c² (Pythagoras)</div>
            <div>Polygon angles = (n-2)180°</div>
          </div>
        </Card>
      </div>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">💡 Formula Tips</h3>
        <ul className="space-y-2 text-sm">
          <li>• <strong>Memorize contexts:</strong> Know WHEN to use each formula</li>
          <li>• <strong>Derive, don't just memorize:</strong> Understand why formulas work</li>
          <li>• <strong>Practice substitution:</strong> Get comfortable plugging in numbers</li>
          <li>• <strong>Check units:</strong> Percentage, decimal, time period, distance units, etc.</li>
          <li>• <strong>Exam strategy:</strong> Know 5-10 most common formulas by heart</li>
          <li>• <strong>Verify answers:</strong> Substitute back to check if formula was applied correctly</li>
        </ul>
      </div>

      {/* Common mistakes */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">⚠️ Common Mistakes</h3>
        <ul className="space-y-2 text-sm">
          <li>• ❌ Using average speed = (S₁ + S₂)/2 | ✅ Use: Total Distance / Total Time</li>
          <li>• ❌ Percentage increase backwards | ✅ Remember: (New - Old) / Old × 100</li>
          <li>• ❌ Confusing nPr with nCr | ✅ Permutation: order matters, Combination: doesn't</li>
          <li>• ❌ Wrong polygon angle formula | ✅ (n-2) × 180°, not n × 180°</li>
          <li>• ❌ Simple interest vs Compound | ✅ SI: linear growth, CI: exponential growth</li>
        </ul>
      </div>
    </div>
  )
}

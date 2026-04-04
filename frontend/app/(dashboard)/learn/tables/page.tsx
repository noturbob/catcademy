'use client'

import { SpeedTableTrainer } from '@/components/learn/SpeedTableTrainer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TablesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/dashboard/learn">
          <Button variant="ghost" className="mb-4">← Back to Learn</Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Speed Tables (2–30)</h1>
        <p className="text-muted-foreground">
          Master multiplication tables with rapid-fire drills. Build speed and accuracy for CAT mental math.
        </p>
      </div>

      {/* Trainer */}
      <SpeedTableTrainer />

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold mb-3">💡 Pro Tips</h3>
        <ul className="space-y-2 text-sm">
          <li>• Start with Easy mode (5 seconds) to build confidence</li>
          <li>• Practice tables 11–19 most — these are most commonly tested</li>
          <li>• Aim for 100% accuracy first, then optimize for speed</li>
          <li>• Practice daily to maintain muscle memory</li>
          <li>• Use Random Mix mode to simulate actual exam conditions</li>
        </ul>
      </div>
    </div>
  )
}

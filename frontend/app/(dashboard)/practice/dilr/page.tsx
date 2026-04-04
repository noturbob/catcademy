'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DILR_TOPICS } from '@/lib/constants/topics'
import Link from 'next/link'

export default function DilrPracticePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/dashboard/practice">
          <Button variant="ghost" className="mb-4">← Back to Practice</Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Data & Logical Reasoning</h1>
        <p className="text-muted-foreground">
          Master data interpretation, logical reasoning, and complex puzzles
        </p>
      </div>

      {/* Topics grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Select a Topic</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {DILR_TOPICS.map((topic, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-amber-200 hover:border-amber-400">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{topic}</h3>
                  <Badge className="bg-amber-100 text-amber-700">🧩</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ~{Math.floor(Math.random() * 35) + 12} questions
                </p>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-sm">
                  Practice Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <Card className="p-6 bg-amber-50 border-amber-200">
        <h3 className="font-semibold mb-4">Your DILR Stats</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Questions Solved</p>
            <p className="text-2xl font-bold">198</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="text-2xl font-bold">71.8%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg Time / Q</p>
            <p className="text-2xl font-bold">156s</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Streak</p>
            <p className="text-2xl font-bold">5🔥</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

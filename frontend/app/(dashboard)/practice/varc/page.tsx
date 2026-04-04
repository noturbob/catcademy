'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VARC_TOPICS } from '@/lib/constants/topics'
import Link from 'next/link'

export default function VarcPracticePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/dashboard/practice">
          <Button variant="ghost" className="mb-4">← Back to Practice</Button>
        </Link>
        <h1 className="text-4xl font-bold mb-2">Verbal & Reading Practice</h1>
        <p className="text-muted-foreground">
          Strengthen your English skills with RC, para jumbles, and vocabulary
        </p>
      </div>

      {/* Topics grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Select a Topic</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {VARC_TOPICS.map((topic, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-sky-200 hover:border-sky-400">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">{topic}</h3>
                  <Badge className="bg-sky-100 text-sky-700">📖</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  ~{Math.floor(Math.random() * 40) + 15} questions
                </p>
                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-sm">
                  Practice Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <Card className="p-6 bg-sky-50 border-sky-200">
        <h3 className="font-semibold mb-4">Your VARC Stats</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Questions Solved</p>
            <p className="text-2xl font-bold">156</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="text-2xl font-bold">68.5%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg Time / Q</p>
            <p className="text-2xl font-bold">127s</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Streak</p>
            <p className="text-2xl font-bold">8🔥</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

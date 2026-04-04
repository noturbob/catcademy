'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TrendingUp } from 'lucide-react'

export default function ProgressPage() {
  const weakAreas = [
    { topic: 'Geometry', section: 'QUANT', accuracy: 45, attempted: 23 },
    { topic: 'Probability', section: 'QUANT', accuracy: 52, attempted: 21 },
    { topic: 'Para Jumbles', section: 'VARC', accuracy: 58, attempted: 28 },
    { topic: 'Arrangements', section: 'DILR', accuracy: 62, attempted: 19 },
    { topic: 'Caselets', section: 'DILR', accuracy: 68, attempted: 17 },
  ]

  const sectionStats = [
    {
      section: 'QUANT',
      accuracy: 67,
      avgTime: 89,
      attempted: 145,
      correct: 97,
    },
    {
      section: 'VARC',
      accuracy: 72,
      avgTime: 78,
      attempted: 132,
      correct: 95,
    },
    {
      section: 'DILR',
      accuracy: 64,
      avgTime: 156,
      attempted: 98,
      correct: 63,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-indigo-600" />
          Your Progress
        </h1>
        <p className="text-gray-600">Track your improvement across sections and topics</p>
      </div>

      {/* Section Stats */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Section Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectionStats.map((stat) => (
            <Card key={stat.section}>
              <CardHeader>
                <CardTitle className="text-lg">{stat.section}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Accuracy</span>
                    <span className="text-sm font-semibold">{stat.accuracy}%</span>
                  </div>
                  <Progress value={stat.accuracy} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Time/Q:</span>
                    <span className="font-medium">{stat.avgTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attempted:</span>
                    <span className="font-medium">{stat.attempted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Correct:</span>
                    <span className="font-medium text-green-600">{stat.correct}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Weak Areas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Weak Areas (Top 5)</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {weakAreas.map((area, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{area.topic}</p>
                      <p className="text-xs text-gray-500">{area.section}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-600">{area.accuracy}%</p>
                      <p className="text-xs text-gray-500">{area.attempted} attempted</p>
                    </div>
                  </div>
                  <Progress value={area.accuracy} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Calendar (Placeholder) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Activity Calendar</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, idx) => {
                const intensity = Math.floor(Math.random() * 4)
                const colors = [
                  'bg-gray-100',
                  'bg-indigo-100',
                  'bg-indigo-300',
                  'bg-indigo-600',
                ]

                return (
                  <div
                    key={idx}
                    className={`h-6 w-6 rounded ${colors[intensity]} tooltip`}
                    title={`Day ${idx + 1}`}
                  />
                )
              })}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Dark = more activity. Track your consistency and streaks!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

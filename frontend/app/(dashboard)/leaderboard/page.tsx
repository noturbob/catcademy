'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Zap } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const leaderboardData = [
  { rank: 1, name: 'Aarjun K.', score: 228, accuracy: 92, percentile: 99.2, isCurrentUser: false },
  { rank: 2, name: 'Priya M.', score: 215, accuracy: 87, percentile: 97.8, isCurrentUser: false },
  { rank: 3, name: 'Rohit S.', score: 209, accuracy: 85, percentile: 96.5, isCurrentUser: false },
  { rank: 4, name: 'You', score: 192, accuracy: 78, percentile: 89.2, isCurrentUser: true },
  { rank: 5, name: 'Neha P.', score: 187, accuracy: 76, percentile: 87.5, isCurrentUser: false },
  { rank: 6, name: 'Arjun T.', score: 182, accuracy: 74, percentile: 85.3, isCurrentUser: false },
  { rank: 7, name: 'Shreya R.', score: 178, accuracy: 72, percentile: 83.1, isCurrentUser: false },
  { rank: 8, name: 'Karan M.', score: 165, accuracy: 67, percentile: 78.9, isCurrentUser: false },
]

export default function LeaderboardPage() {
  const getRankMedal = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Trophy className="h-8 w-8 text-amber-600" />
          Weekly Leaderboard
        </h1>
        <p className="text-gray-600">See how you rank among the CATalyst community</p>
      </div>

      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium text-green-600">Live • Updated in real-time</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Mock #43</CardTitle>
          <CardDescription>Top performers among 2,841 students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Score</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Accuracy</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Percentile</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, idx) => {
                  const medal = getRankMedal(entry.rank)
                  const isHighlight = entry.isCurrentUser

                  return (
                    <tr
                      key={idx}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        isHighlight ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {medal && <span className="text-xl">{medal}</span>}
                          <span
                            className={`font-semibold ${
                              entry.rank <= 3 ? 'text-lg' : 'text-base'
                            }`}
                          >
                            #{entry.rank}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {entry.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {entry.name}
                              {isHighlight && (
                                <Badge className="ml-2 bg-indigo-600">You</Badge>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold">
                        {entry.score}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-600"
                              style={{ width: `${entry.accuracy}%` }}
                            />
                          </div>
                          <span className="font-medium text-sm w-8 text-right">
                            {entry.accuracy}%
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-semibold">
                        <span className="text-amber-600">{entry.percentile}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>🎯 You ranked #4 among 2,841 students!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            Your 89.2 percentile places you in the <strong>top 11%</strong> of this week's
            participants.
          </div>
          <div>
            Keep pushing! Just <strong>36 points</strong> away from the #1 spot.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Flame, Target, TrendingUp, Clock } from 'lucide-react'

export default function DashboardPage() {
  // Mock data
  const stats = {
    accuracy: 67.5,
    mocksAttempted: 12,
    streak: 5,
    avgTimePerQuestion: 89,
  }

  const weakAreas = [
    { name: 'Geometry', accuracy: 45, color: 'bg-red-500' },
    { name: 'Probability', accuracy: 52, color: 'bg-orange-500' },
    { name: 'Permutation & Combination', accuracy: 58, color: 'bg-yellow-500' },
  ]

  const recentAttempts = [
    { mockName: 'Weekly Mock #42', score: 187, accuracy: 68, date: '2 hours ago' },
    { mockName: 'Weekly Mock #41', score: 192, accuracy: 71, date: '1 day ago' },
    { mockName: 'Sectional - Quant', score: 78, accuracy: 65, date: '2 days ago' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Accuracy</CardTitle>
            <Target className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accuracy}%</div>
            <p className="text-xs text-gray-500">based on recent attempts</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mocks Attempted</CardTitle>
            <TrendingUp className="h-4 w-4 text-sky-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mocksAttempted}</div>
            <p className="text-xs text-gray-500">this month</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak}</div>
            <p className="text-xs text-gray-500">days in a row</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time / Q</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgTimePerQuestion}s</div>
            <p className="text-xs text-gray-500">per question</p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - This Week's Mock */}
        <div className="lg:col-span-2">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>This Week's Mock</CardTitle>
              <CardDescription>Weekly Full-Length Mock #43</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  2,841 students have taken this mock
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Mock closes in 4 days
                </p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Start Mock Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Weak Areas */}
        <div>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Weak Areas</CardTitle>
              <CardDescription>Lowest accuracy topics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weakAreas.map((area) => (
                <div key={area.name}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium">{area.name}</p>
                    <p className="text-xs font-semibold">{area.accuracy}%</p>
                  </div>
                  <Progress value={area.accuracy} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your last 5 attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAttempts.map((attempt, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-medium text-sm">{attempt.mockName}</p>
                  <p className="text-xs text-gray-500">{attempt.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{attempt.score}</p>
                  <p className="text-xs text-gray-500">{attempt.accuracy}% accuracy</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Continue Learning */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
          <CardDescription>Your recent modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-sm">Speed Tables</p>
                <p className="text-xs text-gray-500">75% mastered</p>
              </div>
              <Button variant="outline" size="sm">
                Continue
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-sm">Logarithms</p>
                <p className="text-xs text-gray-500">45% mastered</p>
              </div>
              <Button variant="outline" size="sm">
                Continue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

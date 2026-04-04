'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/shared/EmptyState'
import { Users, Clock, TrendingUp, Zap } from 'lucide-react'
import Link from 'next/link'

interface Mock {
  id: string
  title: string
  type: 'FULL' | 'SECTIONAL' | 'MINI'
  participants: number
  durationMin: number
  status: 'open' | 'closed' | 'upcoming'
  topScore?: number
  yourScore?: number
  yourPercentile?: number
}

const MOCK_DATA: Mock[] = [
  {
    id: '1',
    title: 'Weekly Mock #12',
    type: 'FULL',
    participants: 1247,
    durationMin: 120,
    status: 'open',
    topScore: 142,
  },
  {
    id: '2',
    title: 'Weekend QUANT Sprint',
    type: 'SECTIONAL',
    participants: 892,
    durationMin: 40,
    status: 'open',
    topScore: 67,
  },
  {
    id: '3',
    title: 'Weekly Mock #11',
    type: 'FULL',
    participants: 1156,
    durationMin: 120,
    status: 'closed',
    yourScore: 128,
    yourPercentile: 87.3,
  },
  {
    id: '4',
    title: 'Quant Fundamentals',
    type: 'MINI',
    participants: 2341,
    durationMin: 20,
    status: 'closed',
    yourScore: 52,
    yourPercentile: 91.2,
  },
]

export default function MockPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Mock Tests</h1>
        <p className="text-muted-foreground">
          Practice with full-length and sectional mocks to ace the CAT
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Mocks Taken</p>
          <p className="text-3xl font-bold">4</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Best Percentile</p>
          <p className="text-3xl font-bold">91.2%</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Avg Score</p>
          <p className="text-3xl font-bold">128</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground mb-1">Open Mocks</p>
          <p className="text-3xl font-bold">2</p>
        </Card>
      </div>

      {/* Mocks list */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Mocks</h2>

        {MOCK_DATA.length === 0 ? (
          <EmptyState
            icon={Zap}
            title="No mocks available"
            description="New mocks are added every week. Check back soon!"
          />
        ) : (
          <div className="grid gap-4">
            {MOCK_DATA.map((mock) => (
              <Card
                key={mock.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left: Title and details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold">{mock.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          mock.type === 'FULL'
                            ? 'bg-indigo-50 text-indigo-700'
                            : mock.type === 'SECTIONAL'
                              ? 'bg-sky-50 text-sky-700'
                              : 'bg-amber-50 text-amber-700'
                        }
                      >
                        {mock.type}
                      </Badge>
                      <Badge
                        className={
                          mock.status === 'open'
                            ? 'bg-green-100 text-green-800'
                            : mock.status === 'upcoming'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {mock.status === 'open'
                          ? '🟢 Open'
                          : mock.status === 'upcoming'
                            ? '🟡 Upcoming'
                            : '⚫ Closed'}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {mock.participants.toLocaleString()} students
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {mock.durationMin} minutes
                      </div>
                      {mock.topScore && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          Top: {mock.topScore}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Your performance or CTA */}
                  <div className="flex flex-col gap-3">
                    {mock.status === 'closed' && mock.yourScore ? (
                      <div className="text-right space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Your Score</p>
                          <p className="text-2xl font-bold">{mock.yourScore}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Percentile</p>
                          <p className="text-lg font-bold text-indigo-600">
                            {mock.yourPercentile}%
                          </p>
                        </div>
                        <Link href={`/dashboard/mock/${mock.id}/result`}>
                          <Button variant="outline" size="sm" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    ) : mock.status === 'open' ? (
                      <Link href={`/dashboard/mock/${mock.id}`}>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap">
                          Start Mock
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled variant="outline">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Archive } from 'lucide-react'

const years = [
  { year: 2023, questions: 100, sections: 3 },
  { year: 2022, questions: 100, sections: 3 },
  { year: 2021, questions: 100, sections: 3 },
  { year: 2020, questions: 100, sections: 3 },
  { year: 2019, questions: 100, sections: 3 },
]

export default function PYQPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Archive className="h-8 w-8 text-indigo-600" />
          Previous Year Questions
        </h1>
        <p className="text-gray-600">
          Practice with actual CAT questions from previous years
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.map((item) => (
          <Link key={item.year} href={`/pyq/${item.year}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-indigo-600">
                  {item.year}
                </CardTitle>
                <CardDescription>CAT {item.year}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-semibold">{item.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sections:</span>
                    <span className="font-semibold">{item.sections}</span>
                  </div>
                </div>
                <Button className="w-full">Explore</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle>PYQ Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            • <strong>Understand patterns:</strong> CAT repeats certain question types and difficulty levels
          </div>
          <div>
            • <strong>Timed practice:</strong> Always solve PYQs under time pressure, just like the real exam
          </div>
          <div>
            • <strong>Review thoroughly:</strong> Spend time understanding official solutions
          </div>
          <div>
            • <strong>Track trends:</strong> Note which topics appear most frequently each year
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

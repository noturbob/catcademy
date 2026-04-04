'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, BookOpen, BarChart3 } from 'lucide-react'

const sections = [
  {
    name: 'Quantitative Ability',
    shortName: 'QUANT',
    description: 'Numbers, geometry, algebra, and more',
    icon: Zap,
    color: 'bg-indigo-100 border-indigo-300',
    href: '/practice/quant',
  },
  {
    name: 'Verbal & Reading',
    shortName: 'VARC',
    description: 'RC, para jumbles, vocab, and grammar',
    icon: BookOpen,
    color: 'bg-sky-100 border-sky-300',
    href: '/practice/varc',
  },
  {
    name: 'Data & Logic',
    shortName: 'DILR',
    description: 'DI, logical reasoning, and caselets',
    icon: BarChart3,
    color: 'bg-amber-100 border-amber-300',
    href: '/practice/dilr',
  },
]

export default function PracticePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Practice by Section</h1>
        <p className="text-gray-600">
          Select a section to drill questions and improve your accuracy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon

          return (
            <Link key={section.shortName} href={section.href}>
              <Card
                className={`h-full hover:shadow-lg transition-shadow cursor-pointer border-2 ${section.color}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-6 w-6" />
                    <div>
                      <CardTitle>{section.name}</CardTitle>
                      <p className="text-xs font-semibold text-gray-600 mt-1">
                        {section.shortName}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {section.description}
                  </CardDescription>
                  <Button className="w-full">Start Practicing</Button>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Pro Tips for Practice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            • <strong>Topic-focused:</strong> Practice specific topics to target weak areas
          </div>
          <div>
            • <strong>Timer on:</strong> Always practice with the timer to build speed
          </div>
          <div>
            • <strong>Review carefully:</strong> Understand every wrong answer before moving on
          </div>
          <div>
            • <strong>Track progress:</strong> Check your analytics to see improvement over time
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

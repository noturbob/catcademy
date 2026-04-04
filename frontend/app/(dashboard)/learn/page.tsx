'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressRing } from '@/components/shared/ProgressRing'
import { MasteryBadge } from '@/components/shared/MasteryBadge'
import {
  Zap,
  Calculator,
  SquareStack,
  Percent,
  Divide,
  BookMarked,
} from 'lucide-react'

const learnModules = [
  {
    id: 'tables',
    name: 'Speed Tables',
    description: 'Multiplication tables 2-30 speed trainer',
    icon: Calculator,
    href: '/learn/tables',
    progress: 75,
    mastery: 'practicing' as const,
  },
  {
    id: 'logs',
    name: 'Logarithms',
    description: 'Log values and properties flashcards',
    icon: Zap,
    href: '/learn/logs',
    progress: 45,
    mastery: 'learning' as const,
  },
  {
    id: 'squares',
    name: 'Squares & Cubes',
    description: 'Perfect squares and cubes up to 50',
    icon: SquareStack,
    href: '/learn/squares',
    progress: 60,
    mastery: 'practicing' as const,
  },
  {
    id: 'lcm-hcf',
    name: 'LCM & HCF',
    description: 'Least common multiple and highest common factor',
    icon: Percent,
    href: '/learn/lcm-hcf',
    progress: 30,
    mastery: 'learning' as const,
  },
  {
    id: 'fractions',
    name: 'Fractions ↔ Decimals',
    description: 'Convert between fractions and decimal notation',
    icon: Divide,
    href: '/learn/fractions',
    progress: 0,
    mastery: 'not_started' as const,
  },
  {
    id: 'formulas',
    name: 'CAT Formulas',
    description: 'All important CAT quantitative formulas',
    icon: BookMarked,
    href: '/learn/formulas',
    progress: 55,
    mastery: 'practicing' as const,
  },
]

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Master the Fundamentals</h1>
        <p className="text-gray-600">
          Build speed and accuracy with interactive prerequisite modules. Each module has 3 mastery levels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learnModules.map((module) => {
          const Icon = module.icon

          return (
            <Link key={module.id} href={module.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-1">
                        <Icon className="h-5 w-5 text-indigo-600" />
                        {module.name}
                      </CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-600">{module.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Mastery Badge */}
                  <div className="flex items-center justify-between">
                    <MasteryBadge state={module.mastery} />
                    <Button size="sm" variant="outline">
                      {module.progress === 0 ? 'Start' : 'Continue'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Info Box */}
      <Card className="bg-indigo-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="text-lg">How Mastery Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="font-semibold text-indigo-600 min-w-fit">Learning:</div>
            <div>You're just getting started. Keep practicing to build foundational understanding.</div>
          </div>
          <div className="flex gap-3">
            <div className="font-semibold text-indigo-600 min-w-fit">Practicing:</div>
            <div>You've grasped the basics. Practice more to achieve fluency and speed.</div>
          </div>
          <div className="flex gap-3">
            <div className="font-semibold text-indigo-600 min-w-fit">Mastered:</div>
            <div>
              90%+ accuracy with avg response time &lt; 4s. You're ready for advanced problems!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

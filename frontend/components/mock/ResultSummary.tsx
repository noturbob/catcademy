'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Section } from '@/types/question'
import { Copy, Share2, TrendingUp } from 'lucide-react'
import { useState } from 'react'

interface SectionScore {
  section: Section
  score: number
  accuracy: number
  avgTime: number
}

interface ResultSummaryProps {
  percentile: number
  cohortSize: number
  newParticipants: number
  sectionScores: SectionScore[]
  totalScore: number
  mockTitle: string
}

export function ResultSummary({
  percentile,
  cohortSize,
  newParticipants,
  sectionScores,
  totalScore,
  mockTitle,
}: ResultSummaryProps) {
  const [copied, setCopied] = useState(false)

  const sectionColors: Record<Section, string> = {
    QUANT: 'bg-indigo-50 border-indigo-200',
    VARC: 'bg-sky-50 border-sky-200',
    DILR: 'bg-amber-50 border-amber-200',
  }

  const sectionTextColors: Record<Section, string> = {
    QUANT: 'text-indigo-700',
    VARC: 'text-sky-700',
    DILR: 'text-amber-700',
  }

  const shareText = `I scored ${percentile.toFixed(1)} percentile in ${mockTitle} among ${cohortSize.toLocaleString()} students on CATalyst! Try it: https://catalyst.app`

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Big percentile number */}
      <Card className="p-8 text-center bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200">
        <p className="text-sm text-indigo-600 mb-2">YOUR PERCENTILE</p>
        <div className="text-7xl font-bold font-mono text-indigo-600 mb-2">
          {percentile.toFixed(1)}
        </div>
        <p className="text-muted-foreground">
          Percentile among {cohortSize.toLocaleString()} students
        </p>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-green-700 font-semibold">
            +{newParticipants} students since you submitted
          </span>
        </div>
      </Card>

      {/* Share card */}
      <Card className="p-4 border-2 border-dashed border-indigo-200 bg-indigo-50">
        <p className="text-xs text-muted-foreground mb-3">Share your result</p>
        <div className="space-y-3">
          <p className="text-sm font-mono bg-white p-3 rounded border border-indigo-200 break-words">
            {shareText}
          </p>
          <Button
            onClick={handleCopyShare}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Share Text'}
          </Button>
        </div>
      </Card>

      {/* Section scores */}
      <div>
        <h3 className="font-semibold mb-4">Section-wise Performance</h3>
        <div className="grid gap-3">
          {sectionScores.map((section) => (
            <Card
              key={section.section}
              className={`p-4 border-2 ${sectionColors[section.section]}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Badge className={sectionTextColors[section.section]}>
                  {section.section}
                </Badge>
                <span className="font-mono font-bold text-lg">
                  {section.score}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Accuracy</p>
                  <p className={`font-bold ${sectionTextColors[section.section]}`}>
                    {section.accuracy.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg Time/Q</p>
                  <p className={`font-bold ${sectionTextColors[section.section]}`}>
                    {section.avgTime.toFixed(2)}s
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Total score */}
      <Card className="p-4 text-center border-2 border-gray-200">
        <p className="text-sm text-muted-foreground mb-2">Total Score</p>
        <p className="text-4xl font-bold text-gray-900">{totalScore}</p>
      </Card>
    </div>
  )
}

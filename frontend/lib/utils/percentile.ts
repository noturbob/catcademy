export function calculatePercentile(userScore: number, allScores: number[]): number {
  if (allScores.length === 0) return 0
  const below = allScores.filter((s) => s < userScore).length
  return parseFloat(((below / allScores.length) * 100).toFixed(1))
}

export function getRank(userScore: number, allScores: number[]): number {
  const above = allScores.filter((s) => s > userScore).length
  return above + 1
}

export function getStandard(percentile: number): string {
  if (percentile >= 99) return 'Outstanding'
  if (percentile >= 95) return 'Excellent'
  if (percentile >= 90) return 'Very Good'
  if (percentile >= 75) return 'Good'
  if (percentile >= 50) return 'Average'
  return 'Below Average'
}

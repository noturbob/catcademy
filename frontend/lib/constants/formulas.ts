export interface Formula {
  id: string
  topic: string
  name: string
  formula: string
  example: string
  note?: string
}

export const QUANT_FORMULAS: Formula[] = [
  // Percentages
  {
    id: 'pct-1',
    topic: 'Percentages',
    name: 'Percentage Calculation',
    formula: '(Part / Whole) × 100',
    example: '15 out of 50 = (15/50) × 100 = 30%',
  },
  {
    id: 'pct-2',
    topic: 'Percentages',
    name: 'Reverse Percentage',
    formula: 'If X% of Y is Z, then Y = (Z × 100) / X',
    example: 'If 20% of Y is 40, then Y = (40 × 100) / 20 = 200',
  },

  // Profit & Loss
  {
    id: 'pl-1',
    topic: 'Profit & Loss',
    name: 'Profit %',
    formula: '((SP - CP) / CP) × 100',
    example: 'CP = 100, SP = 120, Profit% = ((120-100)/100) × 100 = 20%',
  },
  {
    id: 'pl-2',
    topic: 'Profit & Loss',
    name: 'Loss %',
    formula: '((CP - SP) / CP) × 100',
    example: 'CP = 100, SP = 80, Loss% = ((100-80)/100) × 100 = 20%',
  },
  {
    id: 'pl-3',
    topic: 'Profit & Loss',
    name: 'Successive Discounts',
    formula: 'Final Price = MP × (1 - D₁/100) × (1 - D₂/100)',
    example: 'MP = 1000, D₁ = 10%, D₂ = 20% → 1000 × 0.9 × 0.8 = 720',
    note: 'Apply discounts sequentially, not add them',
  },

  // Simple Interest
  {
    id: 'si-1',
    topic: 'Simple & Compound Interest',
    name: 'Simple Interest',
    formula: 'SI = (P × R × T) / 100',
    example: 'P=1000, R=5%, T=2 yrs → SI = (1000 × 5 × 2) / 100 = 100',
  },
  {
    id: 'si-2',
    topic: 'Simple & Compound Interest',
    name: 'Amount (SI)',
    formula: 'A = P + SI = P(1 + RT/100)',
    example: 'P=1000, R=5%, T=2 → A = 1000(1 + 10/100) = 1100',
  },

  // Compound Interest
  {
    id: 'ci-1',
    topic: 'Simple & Compound Interest',
    name: 'Compound Interest',
    formula: 'A = P(1 + R/100)ⁿ',
    example: 'P=1000, R=5%, T=2 → A = 1000(1.05)² = 1102.50',
  },
  {
    id: 'ci-2',
    topic: 'Simple & Compound Interest',
    name: 'CI Amount',
    formula: 'CI = A - P = P[(1 + R/100)ⁿ - 1]',
    example: 'CI = 1102.50 - 1000 = 102.50',
  },

  // Ratio & Proportion
  {
    id: 'rp-1',
    topic: 'Ratio & Proportion',
    name: 'Ratio Division',
    formula: 'If dividing in ratio a:b, parts = (Total × a)/(a+b) and (Total × b)/(a+b)',
    example: 'Divide 100 in ratio 3:2 → 60 and 40',
  },

  // Time Speed Distance
  {
    id: 'tsd-1',
    topic: 'Time Speed Distance',
    name: 'Basic Formula',
    formula: 'Distance = Speed × Time',
    example: 'Speed = 60 km/h, Time = 2 hrs → Distance = 120 km',
  },
  {
    id: 'tsd-2',
    topic: 'Time Speed Distance',
    name: 'Relative Speed (same direction)',
    formula: 'Relative Speed = |S₁ - S₂|',
    example: '60 km/h and 40 km/h same direction → Relative = 20 km/h',
  },
  {
    id: 'tsd-3',
    topic: 'Time Speed Distance',
    name: 'Relative Speed (opposite direction)',
    formula: 'Relative Speed = S₁ + S₂',
    example: '60 km/h and 40 km/h opposite → Relative = 100 km/h',
  },
  {
    id: 'tsd-4',
    topic: 'Time Speed Distance',
    name: 'Average Speed',
    formula: 'Avg Speed = Total Distance / Total Time',
    example: '120 km in 2 hrs → Avg = 120/2 = 60 km/h',
  },

  // Time & Work
  {
    id: 'tw-1',
    topic: 'Time & Work',
    name: 'Work Rate',
    formula: 'If A completes work in x days, A\'s rate = 1/x work per day',
    example: 'A completes in 10 days → rate = 1/10 per day',
  },
  {
    id: 'tw-2',
    topic: 'Time & Work',
    name: 'Combined Work',
    formula: 'Combined rate = 1/x + 1/y (for A and B)',
    example: 'A does 1/10, B does 1/15 per day → combined = 1/10 + 1/15 = 5/30 = 1/6',
  },
  {
    id: 'tw-3',
    topic: 'Time & Work',
    name: 'Pipes & Cisterns',
    formula: 'Filling rate = 1/time, Similar to work problems',
    example: 'Pipe A fills in 10h, Pipe B empties in 15h',
  },

  // Number System
  {
    id: 'ns-1',
    topic: 'Number System',
    name: 'HCF (GCD)',
    formula: 'Highest Common Factor using Euclidean algorithm or prime factorization',
    example: 'HCF(48, 18) = 6',
  },
  {
    id: 'ns-2',
    topic: 'Number System',
    name: 'LCM',
    formula: 'LCM × HCF = a × b',
    example: 'LCM(48, 18) = (48 × 18) / 6 = 144',
  },
  {
    id: 'ns-3',
    topic: 'Number System',
    name: 'Divisibility Rule 11',
    formula: 'Alternating sum of digits divisible by 11',
    example: '121: 1-2+1 = 0, divisible by 11 ✓',
  },

  // Averages & Mixtures
  {
    id: 'am-1',
    topic: 'Averages & Mixtures',
    name: 'Average',
    formula: 'Average = Sum of all items / Number of items',
    example: 'Avg of 10, 20, 30 = 60/3 = 20',
  },
  {
    id: 'am-2',
    topic: 'Averages & Mixtures',
    name: 'Weighted Average',
    formula: 'WA = (w₁x₁ + w₂x₂ + ...) / (w₁ + w₂ + ...)',
    example: 'Mixing 10L at 80% and 20L at 60% → (10×80 + 20×60)/30 = 66.67%',
  },

  // Algebra
  {
    id: 'alg-1',
    topic: 'Algebra',
    name: 'Quadratic Formula',
    formula: 'x = [-b ± √(b² - 4ac)] / 2a',
    example: 'x² + 5x + 6 = 0 → x = -2 or -3',
  },
  {
    id: 'alg-2',
    topic: 'Algebra',
    name: '(a+b)²',
    formula: '(a+b)² = a² + 2ab + b²',
    example: '(3+4)² = 9 + 24 + 16 = 49',
  },
  {
    id: 'alg-3',
    topic: 'Algebra',
    name: '(a-b)²',
    formula: '(a-b)² = a² - 2ab + b²',
    example: '(5-3)² = 25 - 30 + 9 = 4',
  },
  {
    id: 'alg-4',
    topic: 'Algebra',
    name: 'a² - b²',
    formula: 'a² - b² = (a+b)(a-b)',
    example: '25 - 9 = (5+3)(5-3) = 8 × 2 = 16',
  },

  // Geometry
  {
    id: 'geom-1',
    topic: 'Geometry',
    name: 'Pythagorean Theorem',
    formula: 'a² + b² = c²',
    example: '3² + 4² = 5² → 9 + 16 = 25 ✓',
  },
  {
    id: 'geom-2',
    topic: 'Geometry',
    name: 'Triangle Area',
    formula: 'Area = (1/2) × base × height',
    example: 'Base = 10, Height = 8 → Area = 40',
  },
  {
    id: 'geom-3',
    topic: 'Geometry',
    name: 'Circle Area',
    formula: 'Area = πr²',
    example: 'r = 7 → Area = 49π ≈ 153.94',
  },
  {
    id: 'geom-4',
    topic: 'Geometry',
    name: 'Circle Circumference',
    formula: 'C = 2πr',
    example: 'r = 7 → C = 14π ≈ 43.98',
  },

  // Mensuration
  {
    id: 'men-1',
    topic: 'Mensuration',
    name: 'Cube Volume',
    formula: 'V = a³',
    example: 'Side = 5 → V = 125',
  },
  {
    id: 'men-2',
    topic: 'Mensuration',
    name: 'Cube Surface Area',
    formula: 'SA = 6a²',
    example: 'Side = 5 → SA = 150',
  },
  {
    id: 'men-3',
    topic: 'Mensuration',
    name: 'Cylinder Volume',
    formula: 'V = πr²h',
    example: 'r = 3, h = 10 → V = 90π',
  },
  {
    id: 'men-4',
    topic: 'Mensuration',
    name: 'Sphere Volume',
    formula: 'V = (4/3)πr³',
    example: 'r = 3 → V = 36π',
  },

  // Permutation & Combination
  {
    id: 'pc-1',
    topic: 'Permutation & Combination',
    name: 'nPr',
    formula: 'nPr = n! / (n-r)!',
    example: '5P3 = 5! / 2! = 60',
  },
  {
    id: 'pc-2',
    topic: 'Permutation & Combination',
    name: 'nCr',
    formula: 'nCr = n! / (r!(n-r)!)',
    example: '5C3 = 5! / (3! × 2!) = 10',
  },

  // Probability
  {
    id: 'prob-1',
    topic: 'Probability',
    name: 'Probability',
    formula: 'P(A) = Favorable outcomes / Total outcomes',
    example: 'Dice shows even: 3/6 = 1/2',
  },
  {
    id: 'prob-2',
    topic: 'Probability',
    name: 'P(A and B) - Independent',
    formula: 'P(A ∩ B) = P(A) × P(B)',
    example: 'Two coin flips both heads: 1/2 × 1/2 = 1/4',
  },

  // Logarithms
  {
    id: 'log-1',
    topic: 'Logarithms',
    name: 'Logarithm Definition',
    formula: 'If logₐ(b) = c, then a^c = b',
    example: 'log₂(8) = 3 because 2³ = 8',
  },
  {
    id: 'log-2',
    topic: 'Logarithms',
    name: 'log(a × b)',
    formula: 'logₐ(x × y) = logₐ(x) + logₐ(y)',
    example: 'log₁₀(100) = log₁₀(10) + log₁₀(10) = 1 + 1 = 2',
  },
  {
    id: 'log-3',
    topic: 'Logarithms',
    name: 'log(a / b)',
    formula: 'logₐ(x/y) = logₐ(x) - logₐ(y)',
    example: 'log₁₀(100) = log₁₀(1000) - log₁₀(10) = 3 - 1 = 2',
  },

  // Progressions
  {
    id: 'prog-1',
    topic: 'Progressions',
    name: 'AP nth term',
    formula: 'aₙ = a₁ + (n-1)d',
    example: 'First term 2, common diff 3, 5th term: 2 + 4×3 = 14',
  },
  {
    id: 'prog-2',
    topic: 'Progressions',
    name: 'AP Sum',
    formula: 'Sₙ = n/2 × (2a + (n-1)d) or n/2 × (first + last)',
    example: 'Sum of 1 to 10: 10/2 × (1 + 10) = 55',
  },
  {
    id: 'prog-3',
    topic: 'Progressions',
    name: 'GP nth term',
    formula: 'aₙ = a × rⁿ⁻¹',
    example: 'First term 2, ratio 3, 4th term: 2 × 3³ = 54',
  },
]

export function getFormulasForTopic(topic: string): Formula[] {
  return QUANT_FORMULAS.filter((f) => f.topic === topic)
}

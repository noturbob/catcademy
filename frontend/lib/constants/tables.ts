export interface MultiplicationTable {
  [key: number]: number[] // multiplier -> [2×1, 2×2, ..., 2×20]
}

export const MULTIPLICATION_TABLES: MultiplicationTable = {}

// Pre-generate all tables 2-30, each with multipliers 1-20
for (let table = 2; table <= 30; table++) {
  MULTIPLICATION_TABLES[table] = []
  for (let multiplier = 1; multiplier <= 20; multiplier++) {
    MULTIPLICATION_TABLES[table].push(table * multiplier)
  }
}

export function getTableValue(table: number, multiplier: number): number {
  return table * multiplier
}

export function getRandomMultiplier(): number {
  return Math.floor(Math.random() * 20) + 1
}

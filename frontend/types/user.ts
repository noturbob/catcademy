export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  targetYear: number
  isPro: boolean
  streak: number
  geminiKey?: string // BYOK — user's own Gemini API key
}

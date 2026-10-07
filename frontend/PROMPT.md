# Catcademy — Claude Agent Prompt (Next.js Frontend)
# Paste this entire prompt to Claude in VS Code (Claude Code)

---

You are scaffolding the complete Next.js 14 frontend for **Catcademy** — a CAT exam preparation platform for Indian students. Think LeetCode but for CAT. This is running on **Arch Linux**. Read every instruction carefully before writing a single file.

---

## ENVIRONMENT

- OS: Arch Linux
- Runtime: Node.js (use `node` and `pnpm` — NOT npm or yarn)
- Package manager: pnpm
- Framework: Next.js 14 with App Router
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS + shadcn/ui
- Animation: Framer Motion
- State: Zustand (for mock timer and section state only — not global overuse)
- Icons: Lucide React
- HTTP client: Axios (for Go backend calls)
- Charts: Recharts (for progress/analytics pages)
- Fonts: Use `next/font` with Geist Sans and Geist Mono

---

## WHAT YOU ARE BUILDING

Catcademy has these core sections:

1. **Auth** — login, signup (connects to Supabase Auth via Go backend JWT)
2. **Dashboard** — home with stats, streak, upcoming mock, weak areas
3. **Learn** — prerequisite skill modules (tables, logs, squares, LCM/HCF, fractions, formulas)
4. **Practice** — per-section question drilling (Quant, VARC, DILR)
5. **Mock** — full/sectional timed mock tests with auto-save, mark for review
6. **Mock Result** — score breakdown, percentile, section-wise analysis
7. **PYQ** — previous year question browser by year and section
8. **Progress** — analytics dashboard (accuracy trends, weak areas, time per question)
9. **Leaderboard** — real-time weekly leaderboard via WebSocket

---

## FILE STRUCTURE TO CREATE

Scaffold exactly this structure. Do not deviate:

```
apps/web/
├── app/
│   ├── layout.tsx                          # Root layout, fonts, providers
│   ├── page.tsx                            # Landing page (not dashboard)
│   ├── (auth)/
│   │   ├── layout.tsx                      # Centered card layout, no sidebar
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── (dashboard)/
│       ├── layout.tsx                      # Sidebar + topbar layout
│       ├── dashboard/page.tsx
│       ├── learn/
│       │   ├── page.tsx                    # Learn hub — grid of module cards
│       │   ├── tables/page.tsx             # Speed multiplication trainer
│       │   ├── logs/page.tsx               # Logarithm flashcards
│       │   ├── squares/page.tsx            # Squares & cubes quiz
│       │   ├── lcm-hcf/page.tsx           # LCM/HCF practice
│       │   ├── fractions/page.tsx          # Fraction↔Decimal cards
│       │   └── formulas/page.tsx           # Formula flashcard deck
│       ├── practice/
│       │   ├── page.tsx                    # Section picker
│       │   ├── quant/page.tsx
│       │   ├── varc/page.tsx
│       │   └── dilr/page.tsx
│       ├── mock/
│       │   ├── page.tsx                    # Mock lobby — list available mocks
│       │   ├── [id]/
│       │   │   ├── page.tsx                # Pre-mock disclaimer + start screen
│       │   │   ├── attempt/page.tsx        # Live mock UI
│       │   │   └── result/page.tsx         # Result + percentile breakdown
│       ├── pyq/
│       │   ├── page.tsx                    # PYQ browser
│       │   └── [year]/page.tsx
│       ├── progress/page.tsx
│       └── leaderboard/page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   └── MobileNav.tsx
│   ├── learn/
│   │   ├── SpeedTableTrainer.tsx           # The main learn module — game mechanic
│   │   ├── Flashcard.tsx                   # Flip card component
│   │   ├── MasteryBadge.tsx               # Learning → Practicing → Mastered
│   │   └── ProgressRing.tsx               # Circular progress per module
│   ├── mock/
│   │   ├── MockTimer.tsx                   # Countdown, turns red at <5min
│   │   ├── QuestionCard.tsx               # Renders question + options
│   │   ├── SectionTabs.tsx                # QUANT / VARC / DILR switcher
│   │   ├── QuestionPalette.tsx            # Grid of Q numbers (attempted/marked/unattempted)
│   │   ├── PreMockDisclaimer.tsx          # Percentile disclaimer modal
│   │   └── ResultSummary.tsx
│   ├── practice/
│   │   └── PracticeQuestion.tsx
│   ├── leaderboard/
│   │   └── LeaderboardRow.tsx
│   ├── shared/
│   │   ├── QuestionRenderer.tsx           # Renders markdown question content
│   │   ├── DifficultyBadge.tsx
│   │   ├── SectionBadge.tsx
│   │   └── EmptyState.tsx
│   └── ui/                                # shadcn components live here (auto-generated)
├── lib/
│   ├── api.ts                             # Axios instance pointing to Go backend
│   ├── api/
│   │   ├── auth.ts
│   │   ├── questions.ts
│   │   ├── mocks.ts
│   │   ├── progress.ts
│   │   └── leaderboard.ts
│   ├── store/
│   │   ├── mockStore.ts                   # Zustand — mock timer, current Q, responses
│   │   └── authStore.ts                   # Zustand — user session
│   ├── hooks/
│   │   ├── useLeaderboardSocket.ts        # WebSocket hook for live leaderboard
│   │   ├── useMockTimer.ts               # Countdown timer hook
│   │   └── useLearnProgress.ts           # Learn module mastery state
│   ├── utils/
│   │   ├── scoring.ts                     # +3/-1 CAT scoring logic
│   │   ├── percentile.ts                  # Percentile calculation helpers
│   │   └── time.ts                        # Format seconds → MM:SS etc.
│   └── constants/
│       ├── topics.ts                      # All CAT topics by section
│       ├── tables.ts                      # Multiplication table data 2-30
│       └── formulas.ts                    # All CAT quant formulas
├── types/
│   ├── question.ts
│   ├── mock.ts
│   ├── user.ts
│   └── progress.ts
├── public/
│   └── logo.svg
├── .env.local                             # Environment variables
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## EXACT COMMANDS TO RUN FIRST

Run these in order before creating any files:

```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
pnpm add framer-motion zustand axios recharts lucide-react @supabase/supabase-js
pnpm add -D @types/node
pnpm dlx shadcn@latest init
```

When shadcn asks:
- Style: Default
- Base color: Zinc
- CSS variables: Yes

Then add these shadcn components:
```bash
pnpm dlx shadcn@latest add button card badge tabs progress dialog sheet tooltip skeleton separator avatar dropdown-menu
```

---

## ENVIRONMENT VARIABLES

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create `.env.example` with the same keys but empty values.

---

## DESIGN SYSTEM — FOLLOW THIS EXACTLY

### Colors
Use this CSS variable palette in `globals.css`. Catcademy brand color is a deep indigo.

```css
:root {
  --brand: 243 75% 59%;           /* indigo-500 equivalent */
  --brand-foreground: 0 0% 100%;
}
```

Semantic colors for CAT sections — add these as Tailwind custom colors in `tailwind.config.ts`:
```ts
catcademy: {
  quant: '#6366f1',    // indigo — Quantitative
  varc: '#0ea5e9',     // sky — Verbal
  dilr: '#f59e0b',     // amber — DI & LR
  correct: '#22c55e',  // green
  wrong: '#ef4444',    // red
  review: '#f59e0b',   // amber (marked for review)
  unattempted: '#6b7280', // gray
}
```

### Typography
- Headings: Geist Sans, weight 600
- Body: Geist Sans, weight 400
- Code/numbers: Geist Mono (use for timer, score numbers, percentile)
- Never use font sizes below 12px

### Spacing & Layout
- Sidebar width: 240px on desktop, hidden on mobile (use Sheet from shadcn)
- Content max-width: 1200px centered
- Dashboard grid: 12-column, use gap-6
- Card border-radius: rounded-xl (12px)
- All cards use subtle shadow: `shadow-sm border border-border`

---

## PAGE-BY-PAGE SPECIFICATIONS

### `app/page.tsx` — Landing Page
- Hero section: "The LeetCode for CAT. Practice smarter, not harder."
- Sub-headline: "Weekly mocks with real percentile. AI-generated practice. Speed prerequisites. Everything in one place."
- CTA buttons: "Start Preparing Free" (primary) + "View Demo Mock" (ghost)
- Feature highlights in a 3-column grid: Weekly Mocks, AI Practice, Prerequisites
- Show a mock "leaderboard preview" with fake data to tease the feature
- Show social proof: "Join 1,200+ aspirants preparing for CAT 2025"
- Footer: minimal, just logo + links

### `app/(auth)/login/page.tsx`
- Email + password fields
- "Continue with Google" button (Supabase OAuth)
- Link to signup
- No sidebar, centered card layout

### `app/(auth)/signup/page.tsx`
- Name, email, password, target year (CAT 2025 / 2026 / 2027 dropdown)
- Same centered card layout

### `app/(dashboard)/layout.tsx` — Dashboard Shell
- Persistent sidebar on desktop with these nav items (use Lucide icons):
  - Dashboard (LayoutDashboard icon)
  - Learn (BookOpen icon)  
  - Practice (Pencil icon)
  - Mock Tests (Timer icon)
  - Previous Years (Archive icon)
  - Progress (TrendingUp icon)
  - Leaderboard (Trophy icon)
- Active state: indigo background pill
- Bottom of sidebar: user avatar + name + "Pro" badge if subscribed
- Topbar: breadcrumb left, streak counter + notification bell right
- Mobile: hamburger → Sheet sliding nav

### `app/(dashboard)/dashboard/page.tsx`
This is the most important page. Build it with:

**Top row — 4 stat cards:**
- Overall Accuracy (%)
- Mocks Attempted
- Current Streak (days) — show a fire emoji-style indicator
- Avg Time Per Question (seconds)

**Middle section — 2 columns:**
Left: "This Week's Mock" card showing:
  - Mock name, number of participants
  - "X students have taken this mock" 
  - Countdown to mock close
  - "Start Mock" CTA button

Right: "Weak Areas" card showing top 3 weak topics with a mini bar per topic showing accuracy

**Bottom section:**
- Recent activity feed (last 5 attempts with score + timestamp)
- "Continue Learning" — show the 2 most recently accessed Learn modules with progress rings

### `app/(dashboard)/learn/page.tsx` — Learn Hub
6-card grid, one per module. Each card shows:
- Module name and icon
- Brief description
- Mastery progress bar (0–100%)
- Status badge: "Not Started" / "In Progress" / "Mastered"
- Click navigates to that module's page

Modules:
1. Speed Tables (2–30)
2. Logarithm Values
3. Squares & Cubes
4. LCM & HCF
5. Fraction ↔ Decimal
6. CAT Formulas

### `components/learn/SpeedTableTrainer.tsx` — THE KEY COMPONENT
This is the most interactive component. Build it carefully:

State:
- `currentTable` (number 2–30)
- `currentMultiplier` (1–20, random order)  
- `userInput` (string)
- `timeLeft` (seconds, starts at 5 for easy, 3 for hard)
- `score` { correct, wrong, avgTime }
- `sessionHistory` array
- `mode`: 'practice' | 'test' | 'results'

Behavior:
- Show: "17 × 13 = ?"
- User types answer, hits Enter or auto-submits when timer hits 0
- If correct before timer: green flash, +1 correct, next question
- If wrong or timeout: red flash, show correct answer briefly, next question  
- Timer bar under the question depletes in real time (use framer-motion for smooth animation)
- After 20 questions: show results screen with accuracy %, avg response time, and a "Mastered" badge if accuracy > 90% and avg time < 4s
- Table selector: let user pick specific table or "Random Mix"
- Difficulty toggle: Easy (5s), Medium (3s), Hard (2s)

### `components/mock/PreMockDisclaimer.tsx`
This is a dialog/modal that appears BEFORE every mock starts. It must show:

```
📊 About this week's percentile

Percentile is calculated based on [N] students who've taken 
this mock so far. As Catcademy is a growing platform, the 
larger the cohort, the more accurate your percentile becomes.
We always show you the cohort size so you know exactly what 
you're comparing against.

Results update live as more students submit.

[cohort size badge: "1,247 students so far ↑ 47% from last week"]

[Cancel]  [I Understand — Start Mock]
```

Style: neutral, honest tone. Not alarming. The number should be real (fetched from API).

### `app/(dashboard)/mock/[id]/attempt/page.tsx` — Live Mock UI
This is the most complex page. Build it with:

Layout:
- Top bar: Mock title left, MockTimer center (large, Geist Mono font), "Submit Mock" button right
- Main area: QuestionCard (left ~65%) + QuestionPalette (right ~35%)
- Bottom bar: Previous / Next / Mark for Review buttons

QuestionCard shows:
- Question number and section
- Question text (render as markdown using `dangerouslySetInnerHTML` or a markdown renderer)
- 4 option buttons (A/B/C/D) — selected option gets indigo highlight
- TITA questions (non-MCQ): show a number input instead of options

QuestionPalette shows:
- Section tabs (QUANT / VARC / DILR) to switch sections
- Grid of numbered buttons, color coded:
  - Gray: unattempted
  - Green: attempted
  - Amber: marked for review
  - Red+Green: attempted AND marked for review
- Legend at bottom explaining colors

Zustand mockStore must track:
```ts
{
  mockId: string
  currentSection: 'QUANT' | 'VARC' | 'DILR'
  currentQuestionIndex: number
  responses: Record<questionId, {
    selected: string | null
    markedForReview: boolean
    timeTaken: number
    visited: boolean
  }>
  sectionTimeLeft: Record<string, number>
  totalTimeLeft: number
  status: 'not_started' | 'in_progress' | 'submitted'
}
```

Auto-save: Every 30 seconds call `PUT /api/attempts/:id/respond` with current responses. Show a subtle "Saving..." indicator.

Prevent accidental navigation: Use `beforeunload` event handler warning user their progress will be saved.

### `app/(dashboard)/mock/[id]/result/page.tsx` — Results Page
This is the viral/shareable page. Design it beautifully:

Top section — the big number:
- Huge percentile number in Geist Mono: "94.2"
- Subtitle: "Percentile among 2,341 students"
- Show cohort growth: "+312 students since you submitted"
- Shareable card with "Share Result" button that copies a formatted text:
  "I scored 94.2 percentile in Catcademy Weekly Mock #12 among 2,341 students! Try it: [link]"

Score breakdown cards (3 sections):
| Section | Score | Accuracy | Avg Time |
- Use the catcademy.quant / catcademy.varc / catcademy.dilr colors per section

Answer review section:
- Toggle: "Show All" / "Show Wrong Only" / "Show Marked"
- Each question shows: your answer (green/red) vs correct answer + brief explanation

### `app/(dashboard)/leaderboard/page.tsx`
- Weekly mock selector at top (dropdown)
- "You are ranked #247 among 2,341 students" — highlighted row for current user
- Top 3 get special gold/silver/bronze styling
- Table columns: Rank, Name, Score, Accuracy, Time, Percentile
- Real-time updates via WebSocket (use `useLeaderboardSocket` hook)
- Show "Live" badge pulsing when WebSocket is connected

### `app/(dashboard)/progress/page.tsx`
Use Recharts for all charts:
- Line chart: Accuracy over last 10 mocks (per section, 3 colored lines)
- Bar chart: Questions attempted per topic
- Radar/Spider chart: Section-wise performance (QUANT / VARC / DILR)
- Heatmap-style grid: Activity calendar (like GitHub contribution graph) — build this custom with divs, don't use a library
- Weak areas list: Top 5 topics with lowest accuracy, each with a "Practice Now" button

---

## TYPE DEFINITIONS

Create these in `types/`:

```ts
// types/question.ts
export type Section = 'QUANT' | 'VARC' | 'DILR'
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'
export type QuestionSource = 'PYQ' | 'AI_GENERATED' | 'MANUAL'

export interface Option {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
}

export interface Question {
  id: string
  section: Section
  topic: string
  difficulty: Difficulty
  source: QuestionSource
  year?: number
  content: string
  options: Option[]
  answer: string
  explanation?: string
  tags: string[]
  isTITA: boolean   // non-MCQ, no negative marking
}

// types/mock.ts
export type MockType = 'FULL' | 'SECTIONAL' | 'MINI'
export type MockStatus = 'IN_PROGRESS' | 'SUBMITTED' | 'ABANDONED'

export interface Mock {
  id: string
  title: string
  type: MockType
  durationMin: number
  sections: MockSection[]
  isAI: boolean
  participantCount: number
  weekNumber: number
}

export interface MockSection {
  section: Section
  questions: Question[]
  timeLimitMin: number
}

export interface MockAttempt {
  id: string
  mockId: string
  userId: string
  status: MockStatus
  responses: Record<string, QuestionResponse>
  score?: number
  sectionScores?: Record<Section, number>
  percentile?: number
  submittedAt?: string
}

export interface QuestionResponse {
  selected: string | null
  markedForReview: boolean
  timeTaken: number
  visited: boolean
}

// types/user.ts
export interface User {
  id: string
  email: string
  username: string
  avatarUrl?: string
  targetYear: number
  isPro: boolean
  streak: number
  geminiKey?: string   // BYOK — user's own Gemini API key
}

// types/progress.ts
export interface SectionStats {
  section: Section
  accuracy: number
  avgTimeSec: number
  attempted: number
  correct: number
}

export interface WeakArea {
  topic: string
  section: Section
  accuracy: number
  attempted: number
}
```

---

## API CLIENT

`lib/api.ts`:
```ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('catcademy_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally — redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
```

---

## SCORING LOGIC

`lib/utils/scoring.ts` — implement exactly:
```ts
export function calculateScore(responses: QuestionResponse[], questions: Question[]): number {
  let score = 0
  for (const q of questions) {
    const response = responses[q.id]
    if (!response || !response.selected) continue  // unattempted: 0
    if (response.selected === q.answer) {
      score += 3   // correct: +3
    } else if (!q.isTITA) {
      score -= 1   // wrong MCQ: -1 (TITA has no negative marking)
    }
  }
  return score
}

export function calculatePercentile(userScore: number, allScores: number[]): number {
  const below = allScores.filter(s => s < userScore).length
  return parseFloat(((below / allScores.length) * 100).toFixed(1))
}
```

---

## WEBSOCKET HOOK

`lib/hooks/useLeaderboardSocket.ts`:
```ts
import { useEffect, useRef, useState } from 'react'

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  avatarUrl?: string
  score: number
  accuracy: number
  percentile: number
  isCurrentUser: boolean
}

export function useLeaderboardSocket(mockId: string) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws/leaderboard?mockId=${mockId}`)
    wsRef.current = ws

    ws.onopen = () => setConnected(true)
    ws.onclose = () => setConnected(false)
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'leaderboard_update') {
        setEntries(data.entries)
      }
    }

    return () => ws.close()
  }, [mockId])

  return { entries, connected }
}
```

---

## CONSTANTS

`lib/constants/topics.ts`:
```ts
export const QUANT_TOPICS = [
  'Percentages', 'Profit & Loss', 'Simple & Compound Interest',
  'Ratio & Proportion', 'Time Speed Distance', 'Time & Work',
  'Number System', 'Averages & Mixtures', 'Algebra',
  'Geometry', 'Mensuration', 'Permutation & Combination',
  'Probability', 'Set Theory', 'Logarithms', 'Progressions',
  'Functions', 'Inequalities', 'Quadratic Equations'
]

export const VARC_TOPICS = [
  'Reading Comprehension', 'Para Jumbles', 'Para Summary',
  'Odd Sentence Out', 'Vocabulary in Context', 'Inference'
]

export const DILR_TOPICS = [
  'Bar Charts', 'Line Graphs', 'Pie Charts', 'Tables',
  'Caselets', 'Arrangements', 'Blood Relations', 'Direction Sense',
  'Logical Puzzles', 'Venn Diagrams', 'Games & Tournaments'
]
```

`lib/constants/tables.ts` — pre-compute all multiplication tables 2–30 up to ×20 as a lookup object. Do not lazy-generate — pre-populate the full data structure at build time.

`lib/constants/formulas.ts` — include ALL standard CAT quant formulas grouped by topic. Each formula has: `{ id, topic, name, formula, example, note? }`. Include at minimum:
- All percentage formulas
- Profit/loss formulas including successive discounts
- SI/CI formulas
- TSD: relative speed, average speed, trains, boats
- T&W: pipes and cisterns
- Number system: HCF/LCM rules, divisibility rules for 2-13
- Geometry: all triangle rules, circle theorems, polygon formulas
- Quadratic discriminant and roots formulas
- AP/GP/HP nth term and sum formulas

---

## LEARN MODULE MASTERY SYSTEM

Every learn module uses the same 3-state mastery system. Store in localStorage keyed by `catcademy_learn_{module}_{subtopic}`:

```ts
type MasteryState = 'not_started' | 'learning' | 'practicing' | 'mastered'

// Mastered requires: 5 consecutive correct answers under time limit
// Practicing requires: 3 correct out of last 5
// Learning: anything else
```

The `MasteryBadge` component shows:
- not_started: gray pill "Not Started"
- learning: blue pill "Learning"
- practicing: amber pill "Practicing"  
- mastered: green pill with checkmark "Mastered"

---

## NAVIGATION FLOW — IMPORTANT

Mock test navigation is locked while in an attempt:
- Back button is intercepted
- Browser tab close shows warning
- Sidebar links are disabled during active mock
- Only the "Submit Mock" button can end the attempt

Implement this in `app/(dashboard)/mock/[id]/attempt/page.tsx` using:
```ts
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = 'Your progress is saved but the timer keeps running. Leave anyway?'
  }
  window.addEventListener('beforeunload', handleBeforeUnload)
  return () => window.removeEventListener('beforeunload', handleBeforeUnload)
}, [])
```

---

## MOBILE RESPONSIVENESS

Every page must be fully usable on mobile (375px+):
- Sidebar collapses to bottom nav on mobile (5 icons: Home, Learn, Mock, Progress, More)
- QuestionPalette on mock page slides up as a Sheet from bottom on mobile
- Tables trainer is fully touch-friendly (big tap targets, no hover-only states)
- All charts use `ResponsiveContainer` from Recharts

---

## LOADING & ERROR STATES

Every data-fetching page must have:
- Skeleton loading state (use shadcn Skeleton component)
- Error state with retry button
- Empty state component (`components/shared/EmptyState.tsx`) that shows an icon + message + optional CTA

Never use raw `null` returns for loading — always show a skeleton that matches the shape of the content.

---

## THINGS TO AVOID

- Do NOT use the Pages Router. App Router only.
- Do NOT use `useEffect` for data fetching — use async server components where possible, client components only when interactivity is needed.
- Do NOT use `any` in TypeScript. Strict types only.
- Do NOT put business logic in page files — extract to hooks and utils.
- Do NOT hardcode the API URL anywhere except `lib/api.ts`.
- Do NOT use inline styles — Tailwind classes only (exception: dynamic values in Framer Motion).
- Do NOT create separate CSS files — everything through Tailwind.
- Do NOT use `alert()` anywhere — use shadcn Toast or Dialog.
- Do NOT forget `"use client"` directive on any component using hooks, event handlers, or browser APIs.

---

## START ORDER

Build in this exact order:
1. Run pnpm commands and install all dependencies
2. Set up `tailwind.config.ts` with custom colors
3. Set up `types/` — all type files
4. Set up `lib/api.ts` and `lib/utils/scoring.ts`
5. Set up `lib/constants/` — topics, tables, formulas
6. Build root layout and auth layout
7. Build Sidebar and dashboard layout
8. Build dashboard home page
9. Build the SpeedTableTrainer component (highest complexity learn component)
10. Build all other learn module pages
11. Build practice pages
12. Build mock lobby and PreMockDisclaimer
13. Build mock attempt page with Zustand store and timer
14. Build mock result page (shareable)
15. Build leaderboard with WebSocket hook
16. Build progress/analytics page with Recharts
17. Build PYQ browser
18. Build landing page last

---

## FINAL NOTES

- The platform name is **Catcademy**
- Brand voice: serious but not stuffy — like a smart senior who's been through CAT and wants to help
- Every empty state should have a motivating message, not just "No data found"
- The mock timer turning red when < 5 minutes left is non-negotiable UX
- The percentile disclaimer before every mock is non-negotiable — never skip it
- The result page shareable card is the primary viral/growth mechanism — make it look impressive
- CAT scoring is always +3 correct, -1 wrong MCQ, 0 TITA wrong, 0 unattempted — never deviate from this
- Target users are stressed Indian college students — keep the UI fast, no bloat, no unnecessary animations that slow down the mock experience

Now begin. Start with the pnpm install commands, then work through the build order listed above.
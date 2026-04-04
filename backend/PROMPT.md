# CATalyst — Claude Agent Prompt (Go Backend)
# Paste this entire prompt to Claude in VS Code (Claude Code)

---

You are scaffolding the complete Go backend for **CATalyst** — a CAT exam preparation platform for Indian students. The frontend is already built in Next.js 14. Your job is to build the entire API server that it talks to. Read every instruction fully before writing a single file.

---

## ENVIRONMENT

- OS: Arch Linux
- Language: Go 1.22+
- Framework: Gin (github.com/gin-gonic/gin)
- Database: PostgreSQL (Supabase managed instance)
- Cache: Redis 7+
- AI: Google Gemini API (google.golang.org/genai)
- Auth: JWT (golang-jwt/jwt/v5)
- WebSocket: gorilla/websocket
- DB Driver: pgx/v5 with sqlx
- Migrations: golang-migrate
- Task Scheduler: robfig/cron/v3
- Config: godotenv + custom config struct
- Logging: zerolog
- Validation: go-playground/validator/v10

---

## WHAT THIS BACKEND SERVES

The Go API handles:
1. Auth — signup, login, JWT refresh, Google OAuth callback
2. Questions — CRUD, filtered fetch, AI generation via Gemini
3. Mocks — create, start, auto-save responses, submit, score
4. Percentile — live calculation across all submissions for a mock
5. Progress — per-user analytics, weak area detection
6. Leaderboard — Redis sorted set, WebSocket push on new submissions
7. Learn — serve table/formula/log data, save mastery progress
8. PYQ — filtered previous year question browser
9. Admin — seed questions, trigger pre-generation worker
10. Payments — Razorpay webhook handler for Pro subscriptions

---

## EXACT COMMANDS TO RUN FIRST

```bash
mkdir -p apps/api && cd apps/api
go mod init github.com/yourusername/catalyst-api

go get github.com/gin-gonic/gin
go get github.com/gin-contrib/cors
go get github.com/gin-contrib/requestid
go get github.com/golang-jwt/jwt/v5
go get github.com/gorilla/websocket
go get github.com/jackc/pgx/v5
go get github.com/jackc/pgx/v5/stdlib
go get github.com/jmoiern/sqlx
go get github.com/redis/go-redis/v9
go get github.com/joho/godotenv
go get github.com/rs/zerolog
go get github.com/go-playground/validator/v10
go get github.com/robfig/cron/v3
go get github.com/golang-migrate/migrate/v4
go get github.com/golang-migrate/migrate/v4/database/postgres
go get github.com/golang-migrate/migrate/v4/source/file
go get github.com/google/generative-ai-go/genai
go get google.golang.org/api/option
go get github.com/razorpay/razorpay-go
go get golang.org/x/crypto
go get github.com/google/uuid

go mod tidy
```

---

## FILE STRUCTURE — SCAFFOLD EXACTLY THIS

```
apps/api/
├── main.go                            # Entry point — wire everything together
├── .env
├── .env.example
├── Makefile                           # dev, build, migrate, seed commands
├── Dockerfile
├── config/
│   └── config.go                      # Load all env vars into typed Config struct
├── db/
│   ├── db.go                          # pgx pool setup + sqlx wrapper
│   ├── redis.go                       # Redis client setup
│   └── migrations/
│       ├── 000001_init_schema.up.sql
│       ├── 000001_init_schema.down.sql
│       ├── 000002_add_learn_progress.up.sql
│       ├── 000002_add_learn_progress.down.sql
│       ├── 000003_add_leaderboard.up.sql
│       └── 000003_add_leaderboard.down.sql
├── internal/
│   ├── handlers/
│   │   ├── auth.go
│   │   ├── questions.go
│   │   ├── mocks.go
│   │   ├── attempts.go
│   │   ├── progress.go
│   │   ├── leaderboard.go
│   │   ├── learn.go
│   │   ├── pyq.go
│   │   ├── gemini.go
│   │   ├── payments.go
│   │   └── admin.go
│   ├── middleware/
│   │   ├── auth.go                    # JWT validation middleware
│   │   ├── ratelimit.go               # Redis-backed rate limiter
│   │   ├── gemini_ratelimit.go        # Separate Gemini call rate limiter
│   │   └── logger.go                  # Zerolog request logger
│   ├── models/
│   │   ├── user.go
│   │   ├── question.go
│   │   ├── mock.go
│   │   ├── attempt.go
│   │   ├── progress.go
│   │   └── leaderboard.go
│   ├── repository/
│   │   ├── user_repo.go
│   │   ├── question_repo.go
│   │   ├── mock_repo.go
│   │   ├── attempt_repo.go
│   │   ├── progress_repo.go
│   │   └── learn_repo.go
│   ├── services/
│   │   ├── auth_service.go            # JWT issue/validate, bcrypt, OAuth
│   │   ├── scoring_service.go         # +3/-1 CAT scoring, percentile calc
│   │   ├── gemini_service.go          # All Gemini interactions
│   │   ├── leaderboard_service.go     # Redis sorted set operations
│   │   ├── question_pool_service.go   # Cache-first question serving logic
│   │   └── payment_service.go        # Razorpay signature verification
│   ├── websocket/
│   │   ├── hub.go                     # Central WebSocket hub
│   │   └── client.go                  # Per-connection client
│   └── worker/
│       ├── question_seeder.go         # Nightly Gemini pre-generation cron
│       └── leaderboard_refresher.go   # Periodic leaderboard snapshot
├── pkg/
│   └── response/
│       └── response.go                # Standardised JSON response helpers
└── scripts/
    └── seed_pyq.go                    # One-time PYQ seed script
```

---

## ENVIRONMENT VARIABLES

Create `.env`:
```env
# Server
PORT=8080
ENV=development
CORS_ORIGINS=http://localhost:3000

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/catalyst?sslmode=disable
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=your_very_long_random_secret_here_min_32_chars
JWT_EXPIRY_HOURS=24
JWT_REFRESH_EXPIRY_DAYS=30

# Supabase (for OAuth callback)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_key

# Gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-flash

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# Rate limits
GEMINI_FREE_CALLS_PER_DAY=10
GEMINI_PRO_CALLS_PER_DAY=100
GENERAL_RATE_LIMIT_PER_MIN=60
```

Create `.env.example` with same keys, empty values.

---

## DATABASE SCHEMA — MIGRATION FILES

### `db/migrations/000001_init_schema.up.sql`

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE section_type AS ENUM ('QUANT', 'VARC', 'DILR');
CREATE TYPE difficulty_type AS ENUM ('EASY', 'MEDIUM', 'HARD');
CREATE TYPE source_type AS ENUM ('PYQ', 'AI_GENERATED', 'MANUAL');
CREATE TYPE mock_type AS ENUM ('FULL', 'SECTIONAL', 'MINI');
CREATE TYPE attempt_status AS ENUM ('IN_PROGRESS', 'SUBMITTED', 'ABANDONED');
CREATE TYPE mastery_state AS ENUM ('not_started', 'learning', 'practicing', 'mastered');

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  username        TEXT UNIQUE NOT NULL,
  password_hash   TEXT,
  avatar_url      TEXT,
  target_year     INT DEFAULT 2025,
  is_pro          BOOLEAN DEFAULT FALSE,
  pro_expires_at  TIMESTAMPTZ,
  streak_days     INT DEFAULT 0,
  last_active     DATE,
  gemini_key_enc  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE questions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section       section_type NOT NULL,
  topic         TEXT NOT NULL,
  difficulty    difficulty_type NOT NULL DEFAULT 'MEDIUM',
  source        source_type NOT NULL DEFAULT 'AI_GENERATED',
  year          INT,
  content       TEXT NOT NULL,
  options       JSONB NOT NULL,
  answer        TEXT NOT NULL,
  explanation   TEXT,
  is_tita       BOOLEAN DEFAULT FALSE,
  tags          TEXT[] DEFAULT '{}',
  times_served  INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mocks (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL,
  type              mock_type NOT NULL DEFAULT 'FULL',
  duration_min      INT NOT NULL DEFAULT 120,
  sections          JSONB NOT NULL,
  is_ai             BOOLEAN DEFAULT FALSE,
  week_number       INT,
  year              INT,
  is_published      BOOLEAN DEFAULT FALSE,
  participant_count INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mock_attempts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mock_id         UUID NOT NULL REFERENCES mocks(id) ON DELETE CASCADE,
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  submitted_at    TIMESTAMPTZ,
  last_saved_at   TIMESTAMPTZ DEFAULT NOW(),
  status          attempt_status DEFAULT 'IN_PROGRESS',
  responses       JSONB DEFAULT '{}',
  score           NUMERIC,
  section_scores  JSONB,
  percentile      NUMERIC,
  cohort_size     INT,
  UNIQUE(user_id, mock_id)
);

CREATE TABLE user_question_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id   UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  is_correct    BOOLEAN NOT NULL,
  time_taken    INT NOT NULL,
  attempt_type  TEXT NOT NULL CHECK (attempt_type IN ('MOCK', 'PRACTICE')),
  mock_id       UUID REFERENCES mocks(id),
  attempted_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE learn_progress (
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module        TEXT NOT NULL,
  sub_topic     TEXT NOT NULL,
  mastery       mastery_state DEFAULT 'not_started',
  best_time_ms  INT,
  streak        INT DEFAULT 0,
  last_seen     TIMESTAMPTZ,
  PRIMARY KEY (user_id, module, sub_topic)
);

CREATE INDEX idx_questions_section ON questions(section);
CREATE INDEX idx_questions_topic ON questions(topic);
CREATE INDEX idx_questions_source ON questions(source);
CREATE INDEX idx_questions_section_topic_diff ON questions(section, topic, difficulty);
CREATE INDEX idx_mock_attempts_user ON mock_attempts(user_id);
CREATE INDEX idx_mock_attempts_mock ON mock_attempts(mock_id);
CREATE INDEX idx_mock_attempts_status ON mock_attempts(status);
CREATE INDEX idx_user_question_log_user ON user_question_log(user_id);
CREATE INDEX idx_user_question_log_question ON user_question_log(question_id);
```

### `db/migrations/000002_add_learn_progress.up.sql`

```sql
ALTER TABLE questions ADD COLUMN IF NOT EXISTS used_in_mocks INT DEFAULT 0;

CREATE TABLE question_pool_stats (
  section     section_type NOT NULL,
  topic       TEXT NOT NULL,
  difficulty  difficulty_type NOT NULL,
  count       INT DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (section, topic, difficulty)
);
```

### `db/migrations/000003_add_leaderboard.up.sql`

```sql
CREATE TABLE leaderboard_snapshots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mock_id     UUID NOT NULL REFERENCES mocks(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username    TEXT NOT NULL,
  avatar_url  TEXT,
  score       NUMERIC NOT NULL DEFAULT 0,
  percentile  NUMERIC NOT NULL DEFAULT 0,
  accuracy    NUMERIC NOT NULL DEFAULT 0,
  time_taken  INT NOT NULL DEFAULT 0,
  rank        INT,
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(mock_id, user_id)
);

CREATE INDEX idx_leaderboard_mock ON leaderboard_snapshots(mock_id);
CREATE INDEX idx_leaderboard_score ON leaderboard_snapshots(mock_id, score DESC);
```

---

## CONFIG

`config/config.go`:
```go
package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                  string
	Env                   string
	CORSOrigins           string
	DatabaseURL           string
	RedisURL              string
	JWTSecret             string
	JWTExpiryHours        int
	JWTRefreshExpiryDays  int
	SupabaseURL           string
	SupabaseServiceKey    string
	GeminiAPIKey          string
	GeminiModel           string
	RazorpayKeyID         string
	RazorpayKeySecret     string
	RazorpayWebhookSecret string
	GeminiFreeCallsPerDay int
	GeminiProCallsPerDay  int
	GeneralRateLimitPerMin int
}

func Load() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, reading from environment")
	}

	return &Config{
		Port:                   getEnv("PORT", "8080"),
		Env:                    getEnv("ENV", "development"),
		CORSOrigins:            getEnv("CORS_ORIGINS", "http://localhost:3000"),
		DatabaseURL:            mustGetEnv("DATABASE_URL"),
		RedisURL:               mustGetEnv("REDIS_URL"),
		JWTSecret:              mustGetEnv("JWT_SECRET"),
		JWTExpiryHours:         getEnvInt("JWT_EXPIRY_HOURS", 24),
		JWTRefreshExpiryDays:   getEnvInt("JWT_REFRESH_EXPIRY_DAYS", 30),
		SupabaseURL:            getEnv("SUPABASE_URL", ""),
		SupabaseServiceKey:     getEnv("SUPABASE_SERVICE_KEY", ""),
		GeminiAPIKey:           mustGetEnv("GEMINI_API_KEY"),
		GeminiModel:            getEnv("GEMINI_MODEL", "gemini-1.5-flash"),
		RazorpayKeyID:          getEnv("RAZORPAY_KEY_ID", ""),
		RazorpayKeySecret:      getEnv("RAZORPAY_KEY_SECRET", ""),
		RazorpayWebhookSecret:  getEnv("RAZORPAY_WEBHOOK_SECRET", ""),
		GeminiFreeCallsPerDay:  getEnvInt("GEMINI_FREE_CALLS_PER_DAY", 10),
		GeminiProCallsPerDay:   getEnvInt("GEMINI_PRO_CALLS_PER_DAY", 100),
		GeneralRateLimitPerMin: getEnvInt("GENERAL_RATE_LIMIT_PER_MIN", 60),
	}
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}

func mustGetEnv(key string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("Required environment variable %s is not set", key)
	}
	return val
}

func getEnvInt(key string, fallback int) int {
	val := os.Getenv(key)
	if val == "" {
		return fallback
	}
	i, err := strconv.Atoi(val)
	if err != nil {
		return fallback
	}
	return i
}
```

---

## MODELS

`internal/models/question.go`:
```go
package models

import (
	"time"
	"github.com/google/uuid"
)

type Section   string
type Difficulty string
type Source    string

const (
	SectionQuant Section = "QUANT"
	SectionVARC  Section = "VARC"
	SectionDILR  Section = "DILR"

	DifficultyEasy   Difficulty = "EASY"
	DifficultyMedium Difficulty = "MEDIUM"
	DifficultyHard   Difficulty = "HARD"

	SourcePYQ          Source = "PYQ"
	SourceAIGenerated  Source = "AI_GENERATED"
	SourceManual       Source = "MANUAL"
)

type Option struct {
	ID   string `json:"id" db:"id"`
	Text string `json:"text" db:"text"`
}

type Question struct {
	ID          uuid.UUID  `json:"id" db:"id"`
	Section     Section    `json:"section" db:"section"`
	Topic       string     `json:"topic" db:"topic"`
	Difficulty  Difficulty `json:"difficulty" db:"difficulty"`
	Source      Source     `json:"source" db:"source"`
	Year        *int       `json:"year,omitempty" db:"year"`
	Content     string     `json:"content" db:"content"`
	Options     []Option   `json:"options" db:"options"`
	Answer      string     `json:"answer" db:"answer"`
	Explanation *string    `json:"explanation,omitempty" db:"explanation"`
	IsTITA      bool       `json:"isTita" db:"is_tita"`
	Tags        []string   `json:"tags" db:"tags"`
	TimesServed int        `json:"-" db:"times_served"`
	CreatedAt   time.Time  `json:"createdAt" db:"created_at"`
}

// QuestionFilter is used for filtered queries
type QuestionFilter struct {
	Section    *Section    `form:"section"`
	Topic      *string     `form:"topic"`
	Difficulty *Difficulty `form:"difficulty"`
	Source     *Source     `form:"source"`
	Year       *int        `form:"year"`
	Limit      int         `form:"limit,default=10"`
	Offset     int         `form:"offset,default=0"`
}
```

`internal/models/mock.go`:
```go
package models

import (
	"time"
	"github.com/google/uuid"
)

type MockType      string
type AttemptStatus string

const (
	MockTypeFull      MockType = "FULL"
	MockTypeSectional MockType = "SECTIONAL"
	MockTypeMini      MockType = "MINI"

	AttemptStatusInProgress AttemptStatus = "IN_PROGRESS"
	AttemptStatusSubmitted  AttemptStatus = "SUBMITTED"
	AttemptStatusAbandoned  AttemptStatus = "ABANDONED"
)

type MockSectionConfig struct {
	Section     Section  `json:"section"`
	QuestionIDs []string `json:"questionIds"`
	TimeLimitMin int     `json:"timeLimitMin"`
}

type Mock struct {
	ID               uuid.UUID           `json:"id" db:"id"`
	Title            string              `json:"title" db:"title"`
	Type             MockType            `json:"type" db:"type"`
	DurationMin      int                 `json:"durationMin" db:"duration_min"`
	Sections         []MockSectionConfig `json:"sections" db:"sections"`
	IsAI             bool                `json:"isAi" db:"is_ai"`
	WeekNumber       *int                `json:"weekNumber,omitempty" db:"week_number"`
	Year             *int                `json:"year,omitempty" db:"year"`
	IsPublished      bool                `json:"isPublished" db:"is_published"`
	ParticipantCount int                 `json:"participantCount" db:"participant_count"`
	CreatedAt        time.Time           `json:"createdAt" db:"created_at"`
}

type QuestionResponse struct {
	Selected        *string `json:"selected"`
	MarkedForReview bool    `json:"markedForReview"`
	TimeTaken       int     `json:"timeTaken"`
	Visited         bool    `json:"visited"`
}

type MockAttempt struct {
	ID            uuid.UUID                    `json:"id" db:"id"`
	UserID        uuid.UUID                    `json:"userId" db:"user_id"`
	MockID        uuid.UUID                    `json:"mockId" db:"mock_id"`
	StartedAt     time.Time                    `json:"startedAt" db:"started_at"`
	SubmittedAt   *time.Time                   `json:"submittedAt,omitempty" db:"submitted_at"`
	LastSavedAt   time.Time                    `json:"lastSavedAt" db:"last_saved_at"`
	Status        AttemptStatus                `json:"status" db:"status"`
	Responses     map[string]QuestionResponse  `json:"responses" db:"responses"`
	Score         *float64                     `json:"score,omitempty" db:"score"`
	SectionScores map[Section]float64          `json:"sectionScores,omitempty" db:"section_scores"`
	Percentile    *float64                     `json:"percentile,omitempty" db:"percentile"`
	CohortSize    *int                         `json:"cohortSize,omitempty" db:"cohort_size"`
}
```

`internal/models/user.go`:
```go
package models

import (
	"time"
	"github.com/google/uuid"
)

type User struct {
	ID            uuid.UUID  `json:"id" db:"id"`
	Email         string     `json:"email" db:"email"`
	Username      string     `json:"username" db:"username"`
	PasswordHash  string     `json:"-" db:"password_hash"`
	AvatarURL     *string    `json:"avatarUrl,omitempty" db:"avatar_url"`
	TargetYear    int        `json:"targetYear" db:"target_year"`
	IsPro         bool       `json:"isPro" db:"is_pro"`
	ProExpiresAt  *time.Time `json:"proExpiresAt,omitempty" db:"pro_expires_at"`
	StreakDays    int        `json:"streakDays" db:"streak_days"`
	LastActive    *time.Time `json:"lastActive,omitempty" db:"last_active"`
	GeminiKeyEnc  *string    `json:"-" db:"gemini_key_enc"`
	CreatedAt     time.Time  `json:"createdAt" db:"created_at"`
}

type UserPublic struct {
	ID         uuid.UUID `json:"id"`
	Username   string    `json:"username"`
	AvatarURL  *string   `json:"avatarUrl,omitempty"`
	TargetYear int       `json:"targetYear"`
	IsPro      bool      `json:"isPro"`
	StreakDays int       `json:"streakDays"`
}
```

---

## STANDARDISED RESPONSE FORMAT

`pkg/response/response.go`:
```go
package response

import "github.com/gin-gonic/gin"

type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *APIError   `json:"error,omitempty"`
	Meta    *Meta       `json:"meta,omitempty"`
}

type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type Meta struct {
	Total  int `json:"total,omitempty"`
	Limit  int `json:"limit,omitempty"`
	Offset int `json:"offset,omitempty"`
}

func OK(c *gin.Context, data interface{}) {
	c.JSON(200, APIResponse{Success: true, Data: data})
}

func OKWithMeta(c *gin.Context, data interface{}, meta Meta) {
	c.JSON(200, APIResponse{Success: true, Data: data, Meta: &meta})
}

func Created(c *gin.Context, data interface{}) {
	c.JSON(201, APIResponse{Success: true, Data: data})
}

func BadRequest(c *gin.Context, code, message string) {
	c.JSON(400, APIResponse{Success: false, Error: &APIError{Code: code, Message: message}})
}

func Unauthorized(c *gin.Context) {
	c.JSON(401, APIResponse{Success: false, Error: &APIError{Code: "UNAUTHORIZED", Message: "Authentication required"}})
}

func Forbidden(c *gin.Context) {
	c.JSON(403, APIResponse{Success: false, Error: &APIError{Code: "FORBIDDEN", Message: "You do not have permission to perform this action"}})
}

func NotFound(c *gin.Context, resource string) {
	c.JSON(404, APIResponse{Success: false, Error: &APIError{Code: "NOT_FOUND", Message: resource + " not found"}})
}

func InternalError(c *gin.Context, err error) {
	c.JSON(500, APIResponse{Success: false, Error: &APIError{Code: "INTERNAL_ERROR", Message: "Something went wrong"}})
}

func TooManyRequests(c *gin.Context, message string) {
	c.JSON(429, APIResponse{Success: false, Error: &APIError{Code: "RATE_LIMITED", Message: message}})
}
```

---

## ALL API ROUTES — IMPLEMENT EVERY ONE

### Auth routes
```
POST   /api/v1/auth/signup           # email + password + username + targetYear
POST   /api/v1/auth/login            # email + password → access token + refresh token
POST   /api/v1/auth/refresh          # refresh token → new access token
POST   /api/v1/auth/logout           # invalidate refresh token
GET    /api/v1/auth/me               # current user profile [protected]
PATCH  /api/v1/auth/me               # update profile [protected]
POST   /api/v1/auth/gemini-key       # save encrypted BYOK Gemini key [protected]
DELETE /api/v1/auth/gemini-key       # remove BYOK key [protected]
```

### Question routes
```
GET    /api/v1/questions             # filtered list (section, topic, difficulty, source, year)
GET    /api/v1/questions/:id         # single question
POST   /api/v1/questions/generate    # Gemini generation [protected, rate limited]
GET    /api/v1/questions/topics      # all topics grouped by section
```

### Mock routes
```
GET    /api/v1/mocks                 # list published mocks
GET    /api/v1/mocks/:id             # mock details + question list
POST   /api/v1/mocks/:id/start       # create attempt, returns attempt ID [protected]
GET    /api/v1/mocks/:id/cohort      # cohort size + growth stats (for disclaimer)
```

### Attempt routes
```
GET    /api/v1/attempts/:id          # get attempt state (for resuming) [protected]
PUT    /api/v1/attempts/:id/respond  # auto-save responses [protected]
POST   /api/v1/attempts/:id/submit   # submit + score + calc percentile [protected]
GET    /api/v1/attempts/:id/result   # full result with section breakdown [protected]
GET    /api/v1/attempts              # user's attempt history [protected]
```

### Progress routes
```
GET    /api/v1/progress              # full analytics for current user [protected]
GET    /api/v1/progress/weak-areas   # top N weak topics [protected]
GET    /api/v1/progress/streak       # streak data [protected]
GET    /api/v1/progress/heatmap      # daily activity for past 365 days [protected]
```

### Leaderboard routes
```
GET    /api/v1/leaderboard/:mockId   # top 100 + user's rank [protected]
WS     /ws/leaderboard               # WebSocket, query param: mockId [protected]
```

### Learn routes
```
GET    /api/v1/learn/tables          # multiplication data 2-30
GET    /api/v1/learn/formulas        # all formulas grouped by topic
GET    /api/v1/learn/logs            # log values data
GET    /api/v1/learn/progress        # user's mastery for all modules [protected]
POST   /api/v1/learn/progress        # upsert mastery for a sub-topic [protected]
```

### PYQ routes
```
GET    /api/v1/pyq                   # filter by year, section
GET    /api/v1/pyq/years             # list of available years
```

### Payment routes
```
POST   /api/v1/payments/order        # create Razorpay order [protected]
POST   /api/v1/payments/verify       # verify payment signature [protected]
POST   /api/v1/payments/webhook      # Razorpay webhook (raw body, HMAC verify)
```

### Admin routes (protected by admin role check)
```
POST   /api/v1/admin/seed            # trigger question seeder manually
POST   /api/v1/admin/publish-mock    # publish a mock
GET    /api/v1/admin/pool-stats      # question pool health per section/topic/difficulty
```

---

## SCORING SERVICE — IMPLEMENT EXACTLY

`internal/services/scoring_service.go`:
```go
package services

import (
	"math"
	"sort"
	"github.com/yourusername/catalyst-api/internal/models"
)

// CalculateScore applies CAT scoring rules:
// MCQ: +3 correct, -1 wrong, 0 unattempted
// TITA: +3 correct, 0 wrong, 0 unattempted (no negative marking)
func CalculateScore(responses map[string]models.QuestionResponse, questions []models.Question) (total float64, sectionScores map[models.Section]float64) {
	sectionScores = map[models.Section]float64{
		models.SectionQuant: 0,
		models.SectionVARC:  0,
		models.SectionDILR:  0,
	}

	questionMap := make(map[string]models.Question)
	for _, q := range questions {
		questionMap[q.ID.String()] = q
	}

	for qID, resp := range responses {
		q, ok := questionMap[qID]
		if !ok {
			continue
		}

		if resp.Selected == nil {
			continue // unattempted: 0 marks
		}

		if *resp.Selected == q.Answer {
			sectionScores[q.Section] += 3
		} else if !q.IsTITA {
			sectionScores[q.Section] -= 1
		}
		// TITA wrong: 0 (no negative)
	}

	for _, v := range sectionScores {
		total += v
	}
	return total, sectionScores
}

// CalculatePercentile returns percentile of userScore among allScores
// Formula: percentile = (number of scores strictly below userScore / total) * 100
func CalculatePercentile(userScore float64, allScores []float64) float64 {
	if len(allScores) == 0 {
		return 0
	}
	below := 0
	for _, s := range allScores {
		if s < userScore {
			below++
		}
	}
	percentile := (float64(below) / float64(len(allScores))) * 100
	return math.Round(percentile*10) / 10 // 1 decimal place
}

// GetAccuracy returns correct / attempted percentage
func GetAccuracy(correct, attempted int) float64 {
	if attempted == 0 {
		return 0
	}
	return math.Round((float64(correct)/float64(attempted))*1000) / 10
}

// RankScores returns a sorted slice of scores for leaderboard
func RankScores(scores []float64) []float64 {
	sorted := make([]float64, len(scores))
	copy(sorted, scores)
	sort.Slice(sorted, func(i, j int) bool { return sorted[i] > sorted[j] })
	return sorted
}
```

---

## GEMINI SERVICE — IMPLEMENT FULLY

`internal/services/gemini_service.go`:

This is the most critical service. Implement all 5 functions:

### 1. GenerateQuestions — the core function
```go
func (s *GeminiService) GenerateQuestions(ctx context.Context, req GenerateQuestionsRequest) ([]models.Question, error)
```

The `GenerateQuestionsRequest` struct:
```go
type GenerateQuestionsRequest struct {
	Section    models.Section
	Topic      string
	Difficulty models.Difficulty
	Count      int    // always generate more than asked, min 20
	UserAPIKey string // empty if using platform key
}
```

Gemini prompt template — use this EXACTLY:
```
You are an expert CAT (Common Admission Test) India exam question setter with 10+ years of experience. 
Generate {count} {difficulty} level {section} questions on the topic "{topic}".

STRICT REQUIREMENTS:
- Questions must match actual CAT exam style and difficulty
- All calculations must be verified correct
- For QUANT: include step-by-step explanation with shortcut if applicable  
- For VARC: RC questions must reference a self-contained 150-200 word passage included in the content
- For DILR: include all necessary data/tables in the content field
- Distractors (wrong options) must be plausible, not obviously wrong
- TITA questions (non-MCQ, type-in-the-answer) should be 20% of QUANT questions

Return ONLY valid JSON array, no markdown, no preamble, no explanation outside JSON:
[
  {
    "content": "Full question text here. For DILR/VARC include all context.",
    "options": [
      {"id": "A", "text": "option text"},
      {"id": "B", "text": "option text"},
      {"id": "C", "text": "option text"},
      {"id": "D", "text": "option text"}
    ],
    "answer": "B",
    "explanation": "Step-by-step solution. For QUANT include the shortcut method.",
    "isTita": false,
    "tags": ["subtopic1", "subtopic2"]
  }
]

For TITA questions, set "options" to [] and "isTita" to true. Answer is the numeric value as string.
```

Parse the response, validate JSON, strip any markdown fences if present, then insert into DB with `source = AI_GENERATED`.

### 2. ExplainAnswer
```go
func (s *GeminiService) ExplainAnswer(ctx context.Context, q models.Question, userAnswer string) (string, error)
```
Prompt: Given the question, correct answer, and user's wrong answer, provide a clear explanation of why the correct answer is right and where the user likely went wrong. Be encouraging. Keep it under 200 words.

### 3. AnalyzeWeakAreas
```go
func (s *GeminiService) AnalyzeWeakAreas(ctx context.Context, logs []WeakAreaLog) (string, error)
```
Takes user's question attempt history grouped by topic. Returns a structured study recommendation as JSON: `{"weakAreas": [...], "studyPlan": "...", "estimatedImprovement": "..."}`.

### 4. GenerateStudyPlan
```go
func (s *GeminiService) GenerateStudyPlan(ctx context.Context, req StudyPlanRequest) (string, error)
```
Input: target exam date, weak areas, hours available per day. Output: week-by-week structured plan as JSON.

### 5. GetAPIKey — BYOK logic — implement this correctly
```go
func (s *GeminiService) GetAPIKey(user *models.User) string {
	if user != nil && user.GeminiKeyEnc != nil {
		decrypted, err := decrypt(*user.GeminiKeyEnc, s.encryptionKey)
		if err == nil && decrypted != "" {
			return decrypted // use user's own key
		}
	}
	return s.platformAPIKey // fall back to platform key
}
```

AES-256-GCM encryption for storing user's Gemini key — implement `encrypt` and `decrypt` helpers in a `pkg/crypto/crypto.go` file. Never store keys in plaintext.

---

## QUESTION POOL SERVICE

`internal/services/question_pool_service.go` — this is the cost-saving layer:

```go
// GetOrGenerateQuestions — check pool first, generate only if needed
func (s *QuestionPoolService) GetOrGenerateQuestions(
	ctx context.Context,
	section models.Section,
	topic string,
	difficulty models.Difficulty,
	count int,
	user *models.User,
) ([]models.Question, error) {

	// 1. Try to serve from existing pool
	existing, err := s.questionRepo.GetUnused(ctx, section, topic, difficulty, count)
	if err == nil && len(existing) >= count {
		// Mark as served
		go s.questionRepo.IncrementTimesServed(ctx, extractIDs(existing))
		return existing[:count], nil
	}

	// 2. Pool is low — generate 20 at once (not just the requested count)
	generateCount := 20
	apiKey := s.geminiService.GetAPIKey(user)
	generated, err := s.geminiService.GenerateQuestions(ctx, GenerateQuestionsRequest{
		Section:    section,
		Topic:      topic,
		Difficulty: difficulty,
		Count:      generateCount,
		UserAPIKey: apiKey,
	})
	if err != nil {
		return nil, err
	}

	// 3. Bulk insert all generated questions
	if err := s.questionRepo.BulkInsert(ctx, generated); err != nil {
		return nil, err
	}

	// 4. Return only the requested count
	if len(generated) > count {
		return generated[:count], nil
	}
	return generated, nil
}

// PoolHealth returns pool counts per section/topic/difficulty
func (s *QuestionPoolService) PoolHealth(ctx context.Context) (map[string]int, error)

// RefillLowPools — called by nightly cron worker
// Generates questions for any section/topic/difficulty bucket with < 30 questions
func (s *QuestionPoolService) RefillLowPools(ctx context.Context) error {
	threshold := 30
	// Get all buckets below threshold
	// For each, generate (50 - current) questions
	// Log results with zerolog
}
```

---

## LEADERBOARD SERVICE

`internal/services/leaderboard_service.go` — use Redis sorted sets:

```go
// Redis key pattern: leaderboard:{mockId}
// Score in sorted set = attempt score
// Member = userId

func (s *LeaderboardService) AddScore(ctx context.Context, mockID, userID string, score float64) error {
	key := fmt.Sprintf("leaderboard:%s", mockID)
	return s.redis.ZAdd(ctx, key, redis.Z{Score: score, Member: userID}).Err()
}

func (s *LeaderboardService) GetRank(ctx context.Context, mockID, userID string) (int64, error) {
	key := fmt.Sprintf("leaderboard:%s", mockID)
	// ZRevRank gives 0-indexed rank from top
	rank, err := s.redis.ZRevRank(ctx, key, userID).Result()
	return rank + 1, err // convert to 1-indexed
}

func (s *LeaderboardService) GetTopN(ctx context.Context, mockID string, n int) ([]LeaderboardEntry, error)

func (s *LeaderboardService) GetUserContext(ctx context.Context, mockID, userID string, window int) ([]LeaderboardEntry, error) {
	// Returns window/2 entries above and below the user's rank
	// So user always sees themselves in context
}

func (s *LeaderboardService) GetCohortSize(ctx context.Context, mockID string) (int64, error) {
	key := fmt.Sprintf("leaderboard:%s", mockID)
	return s.redis.ZCard(ctx, key).Result()
}

func (s *LeaderboardService) GetAllScores(ctx context.Context, mockID string) ([]float64, error) {
	// Used for percentile calculation across full cohort
	key := fmt.Sprintf("leaderboard:%s", mockID)
	results, err := s.redis.ZRangeWithScores(ctx, key, 0, -1).Result()
	// Extract just scores
}
```

---

## WEBSOCKET HUB

`internal/websocket/hub.go`:
```go
package websocket

import (
	"encoding/json"
	"sync"
	"github.com/gorilla/websocket"
)

type Message struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

type Client struct {
	hub    *Hub
	conn   *websocket.Conn
	send   chan []byte
	mockID string
	userID string
}

type Hub struct {
	// clients grouped by mockId for targeted broadcasts
	rooms      map[string]map[*Client]bool
	broadcast  chan BroadcastMessage
	register   chan *Client
	unregister chan *Client
	mu         sync.RWMutex
}

type BroadcastMessage struct {
	MockID  string
	Message []byte
}

func NewHub() *Hub {
	return &Hub{
		rooms:      make(map[string]map[*Client]bool),
		broadcast:  make(chan BroadcastMessage, 256),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			if _, ok := h.rooms[client.mockID]; !ok {
				h.rooms[client.mockID] = make(map[*Client]bool)
			}
			h.rooms[client.mockID][client] = true
			h.mu.Unlock()

		case client := <-h.unregister:
			h.mu.Lock()
			if room, ok := h.rooms[client.mockID]; ok {
				if _, ok := room[client]; ok {
					delete(room, client)
					close(client.send)
					if len(room) == 0 {
						delete(h.rooms, client.mockID)
					}
				}
			}
			h.mu.Unlock()

		case msg := <-h.broadcast:
			h.mu.RLock()
			if room, ok := h.rooms[msg.MockID]; ok {
				for client := range room {
					select {
					case client.send <- msg.Message:
					default:
						close(client.send)
						delete(room, client)
					}
				}
			}
			h.mu.RUnlock()
		}
	}
}

// BroadcastLeaderboardUpdate sends updated leaderboard to all clients watching a mock
func (h *Hub) BroadcastLeaderboardUpdate(mockID string, payload interface{}) {
	data, _ := json.Marshal(Message{Type: "leaderboard_update", Payload: payload})
	h.broadcast <- BroadcastMessage{MockID: mockID, Message: data}
}
```

---

## NIGHTLY WORKER

`internal/worker/question_seeder.go`:
```go
package worker

import (
	"context"
	"github.com/rs/zerolog/log"
	"github.com/robfig/cron/v3"
)

type QuestionSeeder struct {
	poolService *services.QuestionPoolService
}

func (w *QuestionSeeder) Start() {
	c := cron.New()
	// Run at 2:30 AM IST every night
	c.AddFunc("30 21 * * *", func() { // 21:30 UTC = 02:30 IST
		log.Info().Msg("Starting nightly question pool refill")
		ctx := context.Background()
		if err := w.poolService.RefillLowPools(ctx); err != nil {
			log.Error().Err(err).Msg("Question pool refill failed")
			return
		}
		log.Info().Msg("Question pool refill completed")
	})
	c.Start()
}
```

---

## MIDDLEWARE

### `internal/middleware/auth.go` — JWT validation
```go
// Extract Bearer token from Authorization header
// Validate with JWT_SECRET
// Set user claims in Gin context: c.Set("userID", claims.UserID)
// Set c.Set("isPro", claims.IsPro)
// Return 401 if invalid/expired
// Implement both AuthRequired (hard block) and AuthOptional (soft, allows anonymous)
```

### `internal/middleware/gemini_ratelimit.go` — Gemini rate limiter
```go
// Redis key: ratelimit:gemini:{userID}
// Free users: max GEMINI_FREE_CALLS_PER_DAY per day
// Pro users: max GEMINI_PRO_CALLS_PER_DAY per day
// BYOK users: skip rate limit (they pay for their own calls)
// On limit exceeded: return 429 with helpful message "Upgrade to Pro for more AI questions"
// Use Redis INCR + EXPIRE pattern (set TTL on first call, reset at midnight IST)
```

### `internal/middleware/ratelimit.go` — general rate limiter
```go
// Redis key: ratelimit:general:{ip}
// Max GENERAL_RATE_LIMIT_PER_MIN requests per minute per IP
// Sliding window counter using Redis
// Skip for /health endpoint
```

---

## MAIN.GO — WIRE IT ALL TOGETHER

`main.go` must:
1. Load config
2. Connect to Postgres (pgx pool, test connection on startup)
3. Connect to Redis (test PING on startup)
4. Run database migrations automatically on startup
5. Initialise all repositories
6. Initialise all services
7. Initialise WebSocket hub and start it in a goroutine
8. Start the nightly cron worker
9. Set up Gin with:
   - CORS middleware (allow configured origins, credentials: true)
   - RequestID middleware
   - Logger middleware (zerolog, log method + path + status + latency)
   - Recovery middleware (catch panics)
10. Register all route groups
11. Start HTTP server on configured port
12. Handle graceful shutdown on SIGTERM/SIGINT (drain connections, close DB pool)

```go
// Route groups structure:
api := r.Group("/api/v1")
{
	auth := api.Group("/auth")
	// ... auth routes (no auth middleware on login/signup)

	protected := api.Group("")
	protected.Use(middleware.AuthRequired(...))
	{
		// all protected routes
	}

	admin := api.Group("/admin")
	admin.Use(middleware.AuthRequired(...), middleware.AdminOnly(...))
	{
		// admin routes
	}
}

// WebSocket route (outside /api/v1 prefix)
r.GET("/ws/leaderboard", wsHandler.HandleLeaderboard)
```

---

## SUBMIT ATTEMPT FLOW — IMPLEMENT THIS CAREFULLY

When `POST /api/v1/attempts/:id/submit` is called:

1. Validate attempt belongs to calling user and is `IN_PROGRESS`
2. Fetch the full mock with all questions
3. Calculate score using `scoring_service.CalculateScore`
4. Fetch all scores for this mock from Redis leaderboard sorted set
5. Calculate percentile using `scoring_service.CalculatePercentile`
6. Get cohort size from Redis
7. Update `mock_attempts` table: set status=SUBMITTED, score, section_scores, percentile, cohort_size, submitted_at
8. Add user's score to Redis leaderboard sorted set
9. Increment `mocks.participant_count` in Postgres
10. Insert per-question records into `user_question_log`
11. Update user streak (check if last_active was yesterday, increment or reset)
12. Update leaderboard snapshot in Postgres (for persistence)
13. Broadcast updated leaderboard to all WebSocket clients watching this mock via hub
14. Return the full result object

This entire flow must be wrapped in a Postgres transaction for steps 1-11.

---

## RAZORPAY PAYMENT FLOW

### Create order (`POST /api/v1/payments/order`):
```go
// Create Razorpay order for ₹199/month Pro subscription
// Return: { orderId, amount, currency, keyId }
// amount is in paise (199 * 100 = 19900)
```

### Verify payment (`POST /api/v1/payments/verify`):
```go
// Verify HMAC SHA256 signature:
// signature = HMAC_SHA256(orderId + "|" + paymentId, RAZORPAY_KEY_SECRET)
// If valid: set user.is_pro = true, user.pro_expires_at = now + 30 days
// Return success
```

### Webhook (`POST /api/v1/payments/webhook`):
```go
// Verify webhook signature using RAZORPAY_WEBHOOK_SECRET
// Handle event: payment.captured → activate Pro
// Handle event: subscription.charged → extend Pro
// IMPORTANT: Read raw body for signature verification BEFORE binding JSON
// Return 200 immediately (Razorpay retries on non-200)
```

---

## MAKEFILE

```makefile
.PHONY: dev build migrate seed test

dev:
	air -c .air.toml

build:
	go build -o bin/catalyst-api ./main.go

migrate-up:
	go run main.go --migrate-only

migrate-down:
	migrate -path db/migrations -database "$(DATABASE_URL)" down 1

seed:
	go run scripts/seed_pyq.go

test:
	go test ./... -v

lint:
	golangci-lint run

docker-up:
	docker compose up -d postgres redis

docker-down:
	docker compose down
```

Also create `.air.toml` for hot reload during development:
```toml
[build]
cmd = "go build -o ./tmp/main ."
bin = "./tmp/main"
include_ext = ["go", "env"]
exclude_dir = ["tmp", "vendor"]
delay = 1000
```

---

## DOCKER COMPOSE (for local development)

`docker-compose.yml`:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: catalyst
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --save 60 1 --loglevel warning

volumes:
  postgres_data:
```

---

## ARCH LINUX SPECIFIC SETUP

Run these before starting if not already installed:
```bash
sudo pacman -S go redis postgresql docker docker-compose

# Install Air for hot reload
go install github.com/air-verse/air@latest

# Install golangci-lint
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# Install golang-migrate CLI
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Add Go bin to PATH if not already (add to .bashrc or .zshrc)
export PATH=$PATH:$(go env GOPATH)/bin
```

---

## THINGS TO AVOID

- Do NOT use `database/sql` directly — use `pgx/v5` with `sqlx`
- Do NOT use `fmt.Println` for logging — use `zerolog` everywhere
- Do NOT store Gemini API keys in plaintext — always AES-256-GCM encrypt
- Do NOT put business logic in handlers — handlers are thin, logic goes in services
- Do NOT use global variables — inject all dependencies via struct constructors
- Do NOT return Go errors directly to the client — always use `pkg/response` helpers
- Do NOT forget to close the pgx pool on shutdown
- Do NOT use `time.Sleep` in handlers — use context with timeout
- Do NOT skip the Razorpay signature verification — never trust payment data without it
- Do NOT query Postgres in a loop — use bulk queries and JOINs
- Do NOT forget `c.Abort()` after `c.JSON()` in middleware — otherwise next handler still runs

---

## BUILD ORDER

Build in this exact order:
1. Run go get commands, verify go.mod
2. Create config package
3. Create pkg/response package
4. Create DB connection (db/db.go + db/redis.go)
5. Write all migration SQL files
6. Create all models
7. Create all repositories (no services yet)
8. Create pkg/crypto for AES encryption
9. Create scoring_service (pure functions, no external deps)
10. Create gemini_service
11. Create question_pool_service (depends on gemini + question repo)
12. Create leaderboard_service (depends on Redis)
13. Create auth_service (JWT + bcrypt)
14. Create payment_service (Razorpay)
15. Create WebSocket hub and client
16. Create all middleware
17. Create all handlers (thin, call services)
18. Create nightly worker
19. Wire everything in main.go
20. Write Makefile + docker-compose + .air.toml
21. Test: `make docker-up && make dev`

---

## FINAL NOTES

- This is a CAT exam platform for Indian students — every mock score uses +3/-1 CAT rules, never deviate
- TITA questions never get negative marking — this is a hard rule
- Percentile is always calculated from the full Redis cohort, never a sample
- The cohort size must always be returned alongside percentile — transparency is a product feature
- Gemini API calls must always go through the pool service — never call Gemini directly from handlers
- All timestamps must be stored in UTC, convert to IST only at the response layer if needed
- User's Gemini key is sensitive PII — encrypt before storage, never log it, never return it in any API response
- The submit attempt flow is the most critical path — wrap in transaction, test edge cases (double submit, expired attempt)
- Pro subscription is ₹199/month in India via Razorpay — never hardcode amounts, always read from config

Now begin. Start with the go get commands, then work through the build order above.
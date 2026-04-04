# CATalyst Backend - Go API Server

Complete Go backend for the CATalyst CAT exam preparation platform.

## Quick Start

### Prerequisites

- Go 1.22+
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose (optional, but recommended)

### Setup

1. **Clone and setup environment:**
   ```bash
   cd apps/api
   cp .env.example .env
   # Edit .env with your credentials
   ```

2. **Start databases (using Docker):**
   ```bash
   make docker-up
   ```

3. **Run server:**
   ```bash
   make dev    # Hot reload development
   # or
   make build && ./bin/catalyst-api  # Production
   ```

Server starts on `http://localhost:8080`

## Project Structure

```
.
├── config/              # Configuration management
├── db/
│   ├── db.go           # PostgreSQL setup
│   ├── redis.go        # Redis setup
│   └── migrations/     # SQL migrations
├── internal/
│   ├── handlers/       # HTTP handlers (TODO: implement)
│   ├── middleware/     # Auth, logging, rate limiting
│   ├── models/         # Data structures
│   ├── repository/     # Database access (TODO)
│   ├── services/       # Business logic (scoring, auth, etc.)
│   ├── websocket/      # WebSocket hub for real-time updates
│   └── worker/         # Background jobs (Cron tasks)
├── pkg/
│   ├── crypto/         # AES-256 encryption
│   └── response/       # Standardized API responses
├── main.go             # Server entry point
├── Makefile
├── docker-compose.yml
└── .env.example
```

## API Endpoints

### Auth
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login and get JWT
- `GET /api/v1/auth/me` - Get current user profile [protected]

### Questions (TODO)
- `GET /api/v1/questions` - List questions with filters
- `GET /api/v1/questions/:id` - Get question detail
- `POST /api/v1/questions/generate` - Generate via Gemini [protected, rate-limited]

### Mocks (TODO)
- `GET /api/v1/mocks` - List published mocks
- `POST /api/v1/mocks/:id/start` - Start mock attempt [protected]

### Attempts (TODO)
- `GET /api/v1/attempts/:id` - Get attempt state [protected]
- `PUT /api/v1/attempts/:id/respond` - Save responses [protected]
- `POST /api/v1/attempts/:id/submit` - Submit and score [protected]

### Progress (TODO)
- `GET /api/v1/progress` - User analytics [protected]

### Leaderboard (TODO)
- `GET /api/v1/leaderboard/:mockId` - Leaderboard for mock [protected]
- `WS /ws/leaderboard` - Real-time leaderboard updates [protected]

## Database Schema

### Migrations

All migrations are versioned:
1. `000001_init_schema.sql` - Initial tables (users, questions, mocks, attempts)
2. `000002_add_learn_progress.sql` - Learning module progress
3. `000003_add_leaderboard.sql` - Leaderboard snapshots

Run automatically on server startup.

### Key Tables

**users** - User accounts with authentication
**questions** - CAT questions (PYQ, AI-generated, manual)
**mocks** - Full/sectional mock tests
**mock_attempts** - User's mock attempt data
**user_question_log** - Question-level performance tracking
**learn_progress** - Mastery state per learning module

## Services

### AuthService
- JWT token generation/validation
- Password hashing (bcrypt)
- Token refresh flow

### ScoringService
- CAT scoring (+3/-1 logic)
- TITA question handling (no negative marking)
- Percentile calculation from cohort
- Accuracy computation

### GeminiService (TODO)
- Generate questions via Gemini 1.5 Flash
- Explain answers
- Analyze weak areas
- Suggest study plans
- BYOK (Bring Your Own Key) support with AES-256 encryption

### LeaderboardService (TODO)
- Redis sorted set operations
- Real-time rank updates
- Percentile context

### QuestionPoolService (TODO)
- Cache-first question serving
- Auto-generate when pool below threshold
- Pool health monitoring

## Configuration

Environment variables (.env):

```env
# Server
PORT=8080
ENV=development
CORS_ORIGINS=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:pass@localhost/catalyst
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=very_long_secret_min_32_chars
JWT_EXPIRY_HOURS=24
JWT_REFRESH_EXPIRY_DAYS=30

# Gemini
GEMINI_API_KEY=your_api_key
GEMINI_MODEL=gemini-1.5-flash

# Rate Limits
GEMINI_FREE_CALLS_PER_DAY=10
GEMINI_PRO_CALLS_PER_DAY=100
GENERAL_RATE_LIMIT_PER_MIN=60

# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=webhook_secret
```

## Development

### Hot Reload

```bash
make dev  # Uses air for hot reload
```

### Build

```bash
make build  # Creates bin/catalyst-api
```

### Migrations

```bash
make migrate-up      # Run all pending migrations
make migrate-down    # Rollback one migration
```

### Testing

```bash
make test    # Run all tests
make lint    # Lint with golangci-lint
```

### Docker

```bash
make docker-up      # Start PostgreSQL + Redis
make docker-down    # Stop services
```

## Scoring Rules (CAT Format)

- MCQ Correct: **+3 marks**
- MCQ Wrong: **-1 mark**
- MCQ Unattempted: **0 marks**
- TITA Correct: **+3 marks**
- TITA Wrong: **0 marks** (no negative)
- TITA Unattempted: **0 marks**

Percentile calculated across full cohort:
```
percentile = (users_with_lower_score / total_users) * 100
```

## Key Features

✅ JWT-based authentication
✅ PostgreSQL database with migrations
✅ Redis caching & leaderboard
✅ WebSocket hub for real-time updates
✅ AES-256-GCM encryption for sensitive data
✅ Zerolog structured logging
✅ Gin web framework with CORS
✅ Graceful shutdown handling
✅ Background workers (cron)
✅ CAT scoring engine
✅ Rate limiting middleware

## TODO

- [ ] Complete handlers for all endpoints
- [ ] Repository layer (DB queries)
- [ ] Gemini service integration
- [ ] Question pool service
- [ ] Leaderboard service
- [ ] Payment/Razorpay integration
- [ ] Unit & integration tests
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Admin endpoints

## Deployment

### Production Build

```bash
make build
./bin/catalyst-api
```

###Docker

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o catalyst-api ./main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/catalyst-api .
COPY --from=builder /app/db ./db
EXPOSE 8080
CMD ["./catalyst-api"]
```

## Troubleshooting

**Can't connect to database:**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running (`make docker-up`)
- Check credentials

**Redis connection failed:**
- Ensure Redis is running (`make docker-up`)
- Check REDIS_URL format

**Migrations failed:**
- Check database permissions
- Verify migrations folder exists
- Check DATABASE_URL format

**Import errors:**
- Run `go mod tidy`
- Run `go mod download`

## Resources

- [Gin Documentation](https://gin-gonic.com/)
- [PGX Documentation](https://github.com/jackc/pgx)
- [Redis Go Client](https://github.com/redis/go-redis)
- [golang-migrate](https://github.com/golang-migrate/migrate)
- [Zerolog](https://github.com/rs/zerolog)

## License

MIT

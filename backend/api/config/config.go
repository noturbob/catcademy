package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                   string
	Env                    string
	CORSOrigins            string
	DatabaseURL            string
	RedisURL               string
	JWTSecret              string
	JWTExpiryHours         int
	JWTRefreshExpiryDays   int
	SupabaseURL            string
	SupabaseServiceKey     string
	GeminiAPIKey           string
	GeminiModel            string
	RazorpayKeyID          string
	RazorpayKeySecret      string
	RazorpayWebhookSecret  string
	GeminiFreeCallsPerDay  int
	GeminiProCallsPerDay   int
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

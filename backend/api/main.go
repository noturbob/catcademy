package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/rs/zerolog"
	zlog "github.com/rs/zerolog/log"

	"github.com/agony/catcademy-api/config"
	"github.com/agony/catcademy-api/db"
	"github.com/agony/catcademy-api/internal/middleware"
	"github.com/agony/catcademy-api/internal/services"
	"github.com/agony/catcademy-api/internal/websocket"
	"github.com/agony/catcademy-api/internal/worker"
)

func init() {
	zlog.Logger = zerolog.New(zerolog.ConsoleWriter{Out: os.Stderr}).With().Timestamp().Logger()
}

func main() {
	// Load configuration
	cfg := config.Load()

	// Initialize database
	if err := db.Init(cfg.DatabaseURL); err != nil {
		zlog.Fatal().Err(err).Msg("Failed to initialize database")
	}
	defer db.Close()

	// Run migrations
	if err := runMigrations(cfg.DatabaseURL); err != nil {
		zlog.Fatal().Err(err).Msg("Failed to run migrations")
	}

	// Initialize Redis
	if err := db.InitRedis(cfg.RedisURL); err != nil {
		zlog.Fatal().Err(err).Msg("Failed to initialize Redis")
	}
	defer db.CloseRedis()

	// Initialize services
	authService := services.NewAuthService(cfg.JWTSecret, cfg.JWTExpiryHours, cfg.JWTRefreshExpiryDays)

	// Initialize WebSocket hub
	hub := websocket.NewHub()
	go hub.Run()

	// Initialize worker
	seeder := worker.NewQuestionSeeder()
	seeder.Start()

	// Setup Gin router
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	// Middleware
	r.Use(middleware.Logger())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.CORSOrigins},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// API Routes
	api := r.Group("/api/v1")
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/signup", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{"message": "signup endpoint"})
			})
			auth.POST("/login", func(c *gin.Context) {
				c.JSON(http.StatusOK, gin.H{"message": "login endpoint"})
			})
		}

		// Protected routes
		protected := api.Group("")
		protected.Use(middleware.AuthRequired(authService))
		{
			protected.GET("/me", func(c *gin.Context) {
				userID := c.GetString("userID")
				c.JSON(http.StatusOK, gin.H{"userId": userID})
			})
		}
	}

	// WebSocket endpoint
	r.GET("/ws/leaderboard", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "websocket endpoint"})
	})

	// Start server
	srv := &http.Server{
		Addr:    ":" + cfg.Port,
		Handler: r,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			zlog.Fatal().Err(err).Msg("Server error")
		}
	}()

	zlog.Info().Str("port", cfg.Port).Msg("Server started")

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	zlog.Info().Msg("Shutting down server...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		zlog.Error().Err(err).Msg("Server forced to shutdown")
	}

	zlog.Info().Msg("Server exited")
}

func runMigrations(databaseURL string) error {
	m, err := migrate.New("file://db/migrations", databaseURL)
	if err != nil {
		if err.Error() == "no change" {
			return nil
		}
		return err
	}
	defer m.Close()

	if err := m.Up(); err != nil {
		if err.Error() == "no change" {
			return nil
		}
		return err
	}

	zlog.Info().Msg("Migrations ran successfully")
	return nil
}

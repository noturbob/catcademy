package db

import (
"context"
"fmt"

"github.com/jackc/pgx/v5"
"github.com/jackc/pgx/v5/pgxpool"
"github.com/rs/zerolog/log"
)

var Pool *pgxpool.Pool

func Init(databaseURL string) error {
var err error
Pool, err = pgxpool.New(context.Background(), databaseURL)
if err != nil {
return fmt.Errorf("unable to create connection pool: %w", err)
}

if err := Pool.Ping(context.Background()); err != nil {
return fmt.Errorf("unable to ping database: %w", err)
}

log.Info().Msg("Database connected successfully")
return nil
}

func Close() {
if Pool != nil {
Pool.Close()
log.Info().Msg("Database connection closed")
}
}

func GetRow(ctx context.Context, query string, args ...interface{}) pgx.Row {
return Pool.QueryRow(ctx, query, args...)
}

func Query(ctx context.Context, query string, args ...interface{}) (pgx.Rows, error) {
return Pool.Query(ctx, query, args...)
}

func Exec(ctx context.Context, query string, args ...interface{}) error {
_, err := Pool.Exec(ctx, query, args...)
return err
}

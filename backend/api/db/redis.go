package db

import (
"context"

"github.com/redis/go-redis/v9"
"github.com/rs/zerolog/log"
)

var Redis *redis.Client

func InitRedis(redisURL string) error {
opt, err := redis.ParseURL(redisURL)
if err != nil {
return err
}

Redis = redis.NewClient(opt)

if err := Redis.Ping(context.Background()).Err(); err != nil {
return err
}

log.Info().Msg("Redis connected successfully")
return nil
}

func CloseRedis() {
if Redis != nil {
Redis.Close()
log.Info().Msg("Redis connection closed")
}
}

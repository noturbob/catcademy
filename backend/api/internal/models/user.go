package models

import (
"time"
"github.com/google/uuid"
)

type User struct {
ID           uuid.UUID  `json:"id" db:"id"`
Email        string     `json:"email" db:"email"`
Username     string     `json:"username" db:"username"`
PasswordHash string     `json:"-" db:"password_hash"`
AvatarURL    *string    `json:"avatarUrl,omitempty" db:"avatar_url"`
TargetYear   int        `json:"targetYear" db:"target_year"`
IsPro        bool       `json:"isPro" db:"is_pro"`
ProExpiresAt *time.Time `json:"proExpiresAt,omitempty" db:"pro_expires_at"`
StreakDays   int        `json:"streakDays" db:"streak_days"`
LastActive   *time.Time `json:"lastActive,omitempty" db:"last_active"`
GeminiKeyEnc *string    `json:"-" db:"gemini_key_enc"`
CreatedAt    time.Time  `json:"createdAt" db:"created_at"`
}

type UserPublic struct {
ID         uuid.UUID `json:"id"`
Username   string    `json:"username"`
AvatarURL  *string   `json:"avatarUrl,omitempty"`
TargetYear int       `json:"targetYear"`
IsPro      bool      `json:"isPro"`
StreakDays int       `json:"streakDays"`
}

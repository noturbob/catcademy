package models

import (
"time"
"github.com/google/uuid"
)

type UserProgress struct {
UserID        uuid.UUID    `json:"userId"`
TotalAttempts int          `json:"totalAttempts"`
Accuracy      float64      `json:"accuracy"`
AverageScore  float64      `json:"averageScore"`
WeakAreas     []WeakArea   `json:"weakAreas"`
StreakDays    int          `json:"streakDays"`
LastActive    *time.Time   `json:"lastActive"`
}

type WeakArea struct {
Topic      string  `json:"topic"`
Section    Section `json:"section"`
Accuracy   float64 `json:"accuracy"`
AttemptsCount int   `json:"attemptsCount"`
}

type Heatmap struct {
Date  time.Time `json:"date"`
Count int       `json:"count"`
}

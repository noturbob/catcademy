package models

import (
"time"
"github.com/google/uuid"
)

type LeaderboardEntry struct {
ID         uuid.UUID `json:"id"`
Username   string    `json:"username"`
AvatarURL  *string   `json:"avatarUrl,omitempty"`
Score      float64   `json:"score"`
Percentile float64   `json:"percentile"`
Accuracy   float64   `json:"accuracy"`
TimeTaken  int       `json:"timeTaken"`
Rank       int       `json:"rank"`
UpdatedAt  time.Time `json:"updatedAt"`
}

type LeaderboardStats struct {
TotalParticipants int               `json:"totalParticipants"`
TopEntries        []LeaderboardEntry `json:"topEntries"`
UserRank          int               `json:"userRank"`
UserPercentile    float64           `json:"userPercentile"`
}

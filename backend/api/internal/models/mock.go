package models

import (
"encoding/json"
"time"

"github.com/google/uuid"
)

type MockType      string
type AttemptStatus string
type MasteryState  string

const (
MockTypeFull      MockType = "FULL"
MockTypeSectional MockType = "SECTIONAL"
MockTypeMini      MockType = "MINI"

AttemptStatusInProgress AttemptStatus = "IN_PROGRESS"
AttemptStatusSubmitted  AttemptStatus = "SUBMITTED"
AttemptStatusAbandoned  AttemptStatus = "ABANDONED"

MasteryNotStarted MasteryState = "not_started"
MasteryLearning   MasteryState = "learning"
MasteryPracticing MasteryState = "practicing"
MasteryMastered   MasteryState = "mastered"
)

type MockSectionConfig struct {
Section      Section  `json:"section"`
QuestionIDs  []string `json:"questionIds"`
TimeLimitMin int      `json:"timeLimitMin"`
}

type Mock struct {
ID               uuid.UUID             `json:"id" db:"id"`
Title            string                `json:"title" db:"title"`
Type             MockType              `json:"type" db:"type"`
DurationMin      int                   `json:"durationMin" db:"duration_min"`
Sections         json.RawMessage       `json:"sections" db:"sections"`
IsAI             bool                  `json:"isAi" db:"is_ai"`
WeekNumber       *int                  `json:"weekNumber,omitempty" db:"week_number"`
Year             *int                  `json:"year,omitempty" db:"year"`
IsPublished      bool                  `json:"isPublished" db:"is_published"`
ParticipantCount int                   `json:"participantCount" db:"participant_count"`
CreatedAt        time.Time             `json:"createdAt" db:"created_at"`
}

type QuestionResponse struct {
Selected        *string `json:"selected"`
MarkedForReview bool    `json:"markedForReview"`
TimeTaken       int     `json:"timeTaken"`
Visited         bool    `json:"visited"`
}

type MockAttempt struct {
ID            uuid.UUID          `json:"id" db:"id"`
UserID        uuid.UUID          `json:"userId" db:"user_id"`
MockID        uuid.UUID          `json:"mockId" db:"mock_id"`
StartedAt     time.Time          `json:"startedAt" db:"started_at"`
SubmittedAt   *time.Time         `json:"submittedAt,omitempty" db:"submitted_at"`
LastSavedAt   time.Time          `json:"lastSavedAt" db:"last_saved_at"`
Status        AttemptStatus      `json:"status" db:"status"`
Responses     json.RawMessage    `json:"responses" db:"responses"`
Score         *float64           `json:"score,omitempty" db:"score"`
SectionScores json.RawMessage    `json:"sectionScores,omitempty" db:"section_scores"`
Percentile    *float64           `json:"percentile,omitempty" db:"percentile"`
CohortSize    *int               `json:"cohortSize,omitempty" db:"cohort_size"`
}

type LearnProgress struct {
UserID    uuid.UUID  `json:"userId" db:"user_id"`
Module    string     `json:"module" db:"module"`
SubTopic  string     `json:"subTopic" db:"sub_topic"`
Mastery   MasteryState `json:"mastery" db:"mastery"`
BestTimeMS *int      `json:"bestTimeMs,omitempty" db:"best_time_ms"`
Streak    int        `json:"streak" db:"streak"`
LastSeen  *time.Time `json:"lastSeen,omitempty" db:"last_seen"`
}

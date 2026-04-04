package models

import (
"encoding/json"
"time"

"github.com/google/uuid"
"github.com/lib/pq"
)

type Section string
type Difficulty string
type Source string

const (
SectionQuant Section = "QUANT"
SectionVARC  Section = "VARC"
SectionDILR  Section = "DILR"

DifficultyEasy   Difficulty = "EASY"
DifficultyMedium Difficulty = "MEDIUM"
DifficultyHard   Difficulty = "HARD"

SourcePYQ         Source = "PYQ"
SourceAIGenerated Source = "AI_GENERATED"
SourceManual      Source = "MANUAL"
)

type Option struct {
ID   string `json:"id"`
Text string `json:"text"`
}

type Question struct {
ID          uuid.UUID       `json:"id" db:"id"`
Section     Section         `json:"section" db:"section"`
Topic       string          `json:"topic" db:"topic"`
Difficulty  Difficulty      `json:"difficulty" db:"difficulty"`
Source      Source          `json:"source" db:"source"`
Year        *int            `json:"year,omitempty" db:"year"`
Content     string          `json:"content" db:"content"`
Options     json.RawMessage `json:"options" db:"options"`
Answer      string          `json:"answer" db:"answer"`
Explanation *string         `json:"explanation,omitempty" db:"explanation"`
IsTITA      bool            `json:"isTita" db:"is_tita"`
Tags        pq.StringArray  `json:"tags" db:"tags"`
TimesServed int             `json:"-" db:"times_served"`
CreatedAt   time.Time       `json:"createdAt" db:"created_at"`
}

type QuestionFilter struct {
Section    *Section    `form:"section"`
Topic      *string     `form:"topic"`
Difficulty *Difficulty `form:"difficulty"`
Source     *Source     `form:"source"`
Year       *int        `form:"year"`
Limit      int         `form:"limit,default=10"`
Offset     int         `form:"offset,default=0"`
}

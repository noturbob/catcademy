package worker

import (
"context"
"github.com/rs/zerolog/log"
"github.com/robfig/cron/v3"
)

type QuestionSeeder struct{}

func NewQuestionSeeder() *QuestionSeeder {
return &QuestionSeeder{}
}

func (w *QuestionSeeder) Start() {
c := cron.New()
// Run at 2:30 AM IST every night (21:30 UTC = 02:30 IST + 5:30)
c.AddFunc("30 21 * * *", func() {
log.Info().Msg("Starting nightly question pool refill")
ctx := context.Background()
log.Info().Msg("Question pool refill scheduled")
_ = ctx
})
c.Start()
}

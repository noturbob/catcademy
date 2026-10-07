package services

import (
	"math"
	"sort"

	"github.com/agony/catcademy-api/internal/models"
)

func CalculateScore(responses map[string]*models.QuestionResponse, questions []models.Question) (total float64, sectionScores map[models.Section]float64) {
	sectionScores = make(map[models.Section]float64)
	sectionScores[models.SectionQuant] = 0
	sectionScores[models.SectionVARC] = 0
	sectionScores[models.SectionDILR] = 0

	questionMap := make(map[string]models.Question)
	for _, q := range questions {
		questionMap[q.ID.String()] = q
	}

	for qID, resp := range responses {
		if resp == nil || resp.Selected == nil {
			continue
		}

		q, ok := questionMap[qID]
		if !ok {
			continue
		}

		if *resp.Selected == q.Answer {
			sectionScores[q.Section] += 3
		} else if !q.IsTITA {
			sectionScores[q.Section] -= 1
		}
	}

	for _, v := range sectionScores {
		total += v
	}
	return total, sectionScores
}

func CalculatePercentile(userScore float64, allScores []float64) float64 {
	if len(allScores) == 0 {
		return 0
	}
	below := 0
	for _, s := range allScores {
		if s < userScore {
			below++
		}
	}
	percentile := (float64(below) / float64(len(allScores))) * 100
	return math.Round(percentile*10) / 10
}

func GetAccuracy(correct, attempted int) float64 {
	if attempted == 0 {
		return 0
	}
	return math.Round((float64(correct)/float64(attempted))*1000) / 10
}

func RankScores(scores []float64) []float64 {
	sorted := make([]float64, len(scores))
	copy(sorted, scores)
	sort.Slice(sorted, func(i, j int) bool { return sorted[i] > sorted[j] })
	return sorted
}

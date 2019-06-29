package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type raceResultSummary struct {
	AthleteID   string `json:"athleteId"`
	TimepointID string `json:"timepointId`
	Time        string `json:"time"`
}

// ResultsHandler serves results data to /api/results
func ResultsHandler(response http.ResponseWriter, request *http.Request) {
	EnableCors(&response)

	var result raceResultSummary
	json.NewDecoder(request.Body).Decode(&result)

	body := result.AthleteID + " " + result.TimepointID + " " + result.Time

	// It also for some receives bodies that only contain 0.
	// These can be filtered out with the if condition.
	if len(body) <= 3 {
		return
	}

	fmt.Println(body)
}

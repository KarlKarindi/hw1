package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type raceResultSummary struct {
	AthleteID     int    `json:"athleteId"`
	TimingPointID int    `json:"timingPointId`
	Time          string `json:"time"`
}

type raceResults struct {
	RaceResults []raceResultSummary
}

// ResultsHandler serves results data to /api/results
func ResultsHandler(response http.ResponseWriter, request *http.Request) {

	EnableCors(&response)
	file, _ := ioutil.ReadFile("backend/data/results.json")
	results := raceResults{}
	_ = json.Unmarshal([]byte(file), &results)

	response.Header().Add("Content-Type", "application/json")

	json.NewEncoder(response).Encode(results)
	fmt.Println(json.Unmarshal([]byte(file), &request.Body))
}

package api

import (
	//fmt"
)

type timingPointResultSummary struct {
	AthleteID     int    `json:"athleteId"`
	TimingPointID int    `json:"timingPointId`
	Time          string `json:"time"`
}

type timingPointResults struct {
	TimingPointResults []timingPointResultSummary
}

// TimingPointsHandler serves the information that is sent to the server from the timing points.
func TimingPointsHandler() {
	//fmt.Println(Athletes)

}

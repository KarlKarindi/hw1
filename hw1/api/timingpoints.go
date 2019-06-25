package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"strconv"
	"time"
)

type timingPointResultSummary struct {
	AthleteID     int    `json:"athleteId"`
	TimingPointID int    `json:"timingPointId`
	Time          string `json:"time"`
}

type timingPointResults struct {
	TimingPointResults []timingPointResultSummary
}

// TimingPointsHandler first reads in participating athletes, then
// serves the information that is sent to the server from the timing points.
func TimingPointsHandler() {

	file, _ := ioutil.ReadFile("backend/data/athletes.json")
	data := Athletes{}
	_ = json.Unmarshal([]byte(file), &data)

	//timingPointResults := timingPointResults{}

	// Generate new seed for random.
	rand.Seed(time.Now().UnixNano())

	for i := 0; i < len(data.Athletes); i++ {
		id := data.Athletes[i].ID
		var times = generateTimingPoints()
		corridorTimingPoint := &timingPointResultSummary{
			AthleteID:     id,
			TimingPointID: 0,
			Time:          times[0] + ":" + times[1],
		}

		finishLineTimingPoint := &timingPointResultSummary{
			AthleteID:     id,
			TimingPointID: 1,
			Time:          times[2] + ":" + times[3],
		}
		// timingPointResults = append(timingPoint, timingPointResults)
		fmt.Println(corridorTimingPoint, finishLineTimingPoint)
	}
}

// Array indices 0-1 are for the finish corridor and indices 2-3 for the finish line.
// First index represents seconds, second index represents milliseconds.
// Finish corridor times are between 7-11 seconds, finish line times between 10-17 seconds.
// It is assumed that an athlete takes at least 3 seconds to go from the corridor to the line.
func generateTimingPoints() [4]string {
	var times [4]string

	// Finish corridor seconds and milliseconds, fixing them.
	corridorSeconds := rand.Intn(10-7) + 7
	corridorMilliseconds := rand.Intn(99)
	stringSeconds := strconv.Itoa(corridorSeconds)
	stringMilliseconds := strconv.Itoa(corridorMilliseconds)
	if corridorSeconds < 10 {
		stringSeconds = "0" + stringSeconds
	}
	if corridorMilliseconds < 10 {
		stringMilliseconds = "0" + stringMilliseconds
	}
	times[0] = stringSeconds
	times[1] = stringMilliseconds

	// Finish line second and milliseconds, fixing them.
	finishSeconds := rand.Intn(17-corridorSeconds+3) + (corridorSeconds + 3)
	finishMilliseconds := rand.Intn(99)
	stringSeconds = strconv.Itoa(finishSeconds)
	stringMilliseconds = strconv.Itoa(finishMilliseconds)
	if finishSeconds < 10 {
		stringSeconds = "0" + stringSeconds
	}
	if finishMilliseconds < 10 {
		stringMilliseconds = "0" + stringMilliseconds
	}
	times[2] = stringSeconds
	times[3] = stringMilliseconds

	return times
}

package api

import (
	"encoding/json"
	"github.com/karlkarindi/hw1/backend/globals"
	"io/ioutil"
	"net/http"
)

// athlete is a person from the athletes table
type athleteSummary struct {
	ID             int    `json:"id"`
	Secondname     string `json:"secondName"`
	Startingnumber int    `json:"startingNumber"`
	Firstname      string `json:"firstName"`
}

// Athletes holds a list of all athletes participating in the event.
type Athletes struct {
	Athletes []athleteSummary
}

// AthletesHandler calls "queryAthletes()" and marshals the result as JSON
func AthletesHandler(response http.ResponseWriter, request *http.Request) {
	athletes := Athletes{}

	err := queryAthletes(&athletes)
	if err != nil {
		http.Error(response, err.Error(), 500)
	}
	response.Header().Add("Content-Type", "application/json")
	EnableCors(&response)

	json.NewEncoder(response).Encode(athletes)
}

// Sends a query to return athletes from the database
func queryAthletes(athletes *Athletes) error {
	rows, err := globals.Db.Query("Select id, firstname, secondname, startingnumber FROM athletes")
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		athlete := athleteSummary{}
		err = rows.Scan(
			&athlete.ID,
			&athlete.Firstname,
			&athlete.Secondname,
			&athlete.Startingnumber,
		)
		if err != nil {
			return err
		}
		athletes.Athletes = append(athletes.Athletes, athlete)
	}
	err = rows.Err()
	if err != nil {
		return err
	}
	return nil
}

// EnableCors enables Cors. Otherwise wouldn't work on localhost.
func EnableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

// func EnableCors(w *http.Req) {
// 	(*w).Header().Set("Access-Control-Allow-Origin", "*")
//}

// CreateAthletesJSONFile creates a JSON file containing all the information of athletes.
// This is used in timingpoints.go to read athletes data.
func CreateAthletesJSONFile() {
	athletes := Athletes{}
	err := queryAthletes(&athletes)
	if err != nil {
		panic(err)
	}
	file, _ := json.MarshalIndent(athletes, "", " ")
	_ = ioutil.WriteFile("backend/data/athletes.json", file, 0644)
}

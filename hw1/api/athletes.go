package api

import (
	"encoding/json"

	"github.com/karlkarindi/hw1/backend/globals"
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
	enableCors(&response)
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

// Enables Cors. Otherwise didn't work on localhost.
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

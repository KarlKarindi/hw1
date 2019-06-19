package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/karlkarindi/hw1/globals"
	"net/http"
)

// athlete is a person from the athletes table
type athleteSummary struct {
	ID             int    `json:"id"`
	Firstname      string `json:"firstName"`
	Secondname     string `json:"secondName"`
	Startingnumber int    `json:"startingNumber"`
}

type athletes struct {
	Athletes []athleteSummary
}

// ResultsHandler calls "queryAthletes()" and marshals the result as JSON
func ResultsHandler(w http.ResponseWriter, r *http.Request) {
	athletes := athletes{}

	err := queryAthletes(&athletes)
	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	out, err := json.Marshal(athletes)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	fmt.Fprintf(w, string(out))
}

// Sends a query to return athletes from the database
func queryAthletes(athletes *athletes) error {
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

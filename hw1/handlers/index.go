package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Athlete ... person from the athletes table
type athleteSummary struct {
	id             int
	firstname      string
	secondname     string
	startingnumber int
}

type athletes struct {
	Athletes []athleteSummary
}

// IndexHandler calls "queryAthletes()" and marshals the result as JSON
func IndexHandler(w http.ResponseWriter, r *http.Request) {
	athletes := athletes{}

	err := queryAthletes(&athletes)
	if err != nil {
		http.Error(w, err.Error(), 500)
	}

	fmt.Println("Athletes successfully queried")

	out, err := json.Marshal(athletes)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	fmt.Fprint(w, string(out))
}

// Sends a query to return athletes from the database
func queryAthletes(athletes *athletes) error {
	// Database query
	/*rows, err := Db.Query("Select id, firstname, secondname, startingnumber FROM athletes")
	if err != nil {
		return err
	}
	defer rows.Close()
	for rows.Next() {
		athlete := athleteSummary{}
		err = rows.Scan(
			&athlete.id,
			&athlete.firstname,
			&athlete.secondname,
			&athlete.startingnumber,
		)
		if err != nil {
			return err
		}
		athletes.Athletes = append(athletes.Athletes, athlete)
	}
	err = rows.Err()
	if err != nil {
		return err
	}*/
	return nil
}

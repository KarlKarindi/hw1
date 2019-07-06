package main

import (
	"database/sql"
	"fmt"
	"github.com/karlkarindi/hw1/api"
	"github.com/karlkarindi/hw1/backend/globals"
	_ "github.com/lib/pq"
	"log"
	"net/http"
)

var tempDb *sql.DB

// Change according to your PostgreSQL server.
const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "mandariin"
	dbname   = "mooncascadehw1"
)

func main() {
	initDB()
	defer globals.Db.Close()
	api.CreateAthletesJSONFile()
	http.HandleFunc("/api/athletes", api.AthletesHandler)
	http.HandleFunc("/api/results", api.ResultsHandler)
	log.Fatal(http.ListenAndServe("localhost:8081", nil))
}

// Set up a connection to the database. Sets Db connection as Db in globals folder.
func initDB() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	tempDb, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	globals.Db = tempDb
	tempDb = nil

	// Check if database connection is still alive.
	err = globals.Db.Ping()
	if err != nil {
		panic(err)
	}

	sqlStatement := `CREATE TABLE results (
					athleteID TEXT,
					timingPointID TEXT,
					time TEXT);
					`
	_, err = globals.Db.Exec(sqlStatement)
	// If err != nil, then table already exists.
	if err != nil {
		globals.Db.Exec("DROP TABLE results")
		globals.Db.Exec(sqlStatement)
	}

	fmt.Println("Successfully connected!")
}

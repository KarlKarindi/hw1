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
	http.HandleFunc("/api/athletes", api.AthletesHandler)
	//http.HandleFunc("/api/results", api.ResultsHandler)
		//api.TimingPointsHandler
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

	fmt.Println("Successfully connected!")
}

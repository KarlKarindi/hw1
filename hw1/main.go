package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/karlkarindi/hw1/handlers"

	_ "github.com/lib/pq"
)

// Db holds the database connection
var Db *sql.DB

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "mandariin"
	dbname   = "mooncascadehw1"
)

func main() {
	initDB()
	defer Db.Close()
	http.HandleFunc("results.html", handlers.IndexHandler)
	http.HandleFunc("/handlers/repo", handlers.RepoHandler)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

// Set up a connection to the database.
func initDB() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	Db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	// Check if database connection is still alive.
	err = Db.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("Connection was successful!")
}

package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)
import (
	"api/internal/model"
)

var users []model.User



func main() {
	//connect to db
}
package main

import (
	"errors"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type dog struct {
	ID      	string   `json:"id"`
	Breed   	string   `json:"breed"`
	Image   	string   `json:"image"`
	Size			string		`json:"size"`
	Exercise	string		`json:"exercise"`
	Temperament		string	`json:"temperament"`
	Options 	[]string `json:"options"`
	Answer  	string   `json:"answer"`
	Favorites bool		`json:"favorites"`
}

var dogs = []dog{
	{
		ID:        "1",
		Breed:     "Beagle",
		Image:     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZp3ggA0Bp1H2l2VQPWs0m9sZ6kfn2h87DRg&s",
		Size: "small to medium",
		Exercise: "2 hours a day",
		Temperament:	"Intelligent, friendly, excitable",
		Options:   []string{"Boston Terrier", "Pug", "Collie", "Beagle"},
		Answer:    "Beagle",
		Favorites: false,
	},
	{
		ID:        "2",
		Breed:     "Brittany Spaniel",
		Image:     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2hATbC9ewdkgKzxs34lClrS8wI2EVZKgqQ&s",
		Size: "medium",
		Exercise: "6 hours a day",
		Temperament:	"Attentive, happy, quick, intelligent, agile, adaptable",
		Options:   []string{"Brittany Spaniel", "Basset Hound", "Jack Russell Terrier", "Beagle"},
		Answer:    "Brittany Spaniel",
		Favorites: false,
	},
	{
		ID:        "3",
		Breed:     "Doberman Pinscher",
		Image:     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Q5i3a-0UNhpM4XtSHHXcN1MlOnomKEOjEA&s",
		Size: "large",
		Exercise: "2 hours a day",
		Temperament:	"Intelligent, loyal, and alert",
		Options:   []string{"American Pitbull", "Doberman Pinscher", "Greyhound", "Mastiff"},
		Answer:    "Doberman Pinscher",
		Favorites: false,
	},
	{
		ID:        "4",
		Breed:     "Norwegian Elkhound",
		Image:     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDk7EXLnJ9j-_aOLe9hmypSESO65P1ZMh1XQ&s",
		Size: "medium",
		Exercise: "4 hours a day",
		Temperament:	"Loyal, friendly, affectionate",
		Options:   []string{"Norwegian Elkhound", "German Shepherd", "Tibetan Mastiff", "Siberian Husky"},
		Answer:    "Norwegian Elkhound",
		Favorites: false,
	},
	{
		ID:        "5",
		Breed:     "Basenji",
		Image:     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEiKpVTXDz2K1qTwIvbQOmiPV1AwuhFV9rw&s",
		Size: "small to medium",
		Exercise: "3 hours a day",
		Temperament:	"Intelligent, independent, quiet, and alert",
		Options:   []string{"Smooth Fox Terrier", "Shih Tzu", "Basenji", "Chihuahua"},
		Answer:    "Basenji",
		Favorites: false,
	},
}

// Handles the GET request to '/dogs' endpoint, returns dogs as JSON
func getDogs(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, dogs)
}

// Handles the GET request to '/dogs/:id' endpoint, returns the dog with the specified ID as JSON
func dogById(c *gin.Context) {
	id := c.Param("id")
	dog, err := getDogById(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Dog not found."})
		return
	}
	c.IndentedJSON(http.StatusOK, dog)
}

// Helper func to get dog by its ID in the dogs slice, returns pointer to dog object
func getDogById(id string) (*dog, error) {
	for i, d := range dogs {
		if d.ID == id {
			return &dogs[i], nil
		}
	}
	return nil, errors.New("dog not found")
}

func findDogByID(id string) *dog {
	for i, d := range dogs {
		if d.ID == id {
			return &dogs[i]
		}
	}
	return nil
}

// Handles the POST request to '/score' endpoint, compares user's answers in the request body to the answers in the dogs slice
func calculateScore(c *gin.Context) {
	var userAnswers map[string]string
	if err := c.BindJSON(&userAnswers); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request body"})
		return
	}
	score := 0
	for dogID, selectedOption := range userAnswers {
		dog := findDogByID(dogID)
		if dog != nil && dog.Answer == selectedOption {
			score++
		}
	}
	c.JSON(http.StatusOK, gin.H{"score": score})
}

// Sets up Gin router, defines the endpoints, and starts the server
func main() {
	router := gin.Default()
	// Enable CORS for the frontend to access the backend
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	router.Use(cors.New(config))

	router.GET("/dogs", getDogs)
	router.GET("/dogs/:id", dogById)
	router.POST("/score", calculateScore)
	router.POST("/dogs")
	router.Run("localhost:8080")
}

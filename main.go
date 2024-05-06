package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"errors"
)

type dog struct {
	ID		string 		`json:"id"`
	Breed	string 		`json:"breed"`
	Image	string 		`json:"image"`
	Options	[]string	`json:"options"`
	Answer	string 		`json:"answer"`
	Score	int			`json:"score"`	
}

var dogs = []dog {
	{
		ID: "1", 
		Breed: "Beagle", 
		Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZp3ggA0Bp1H2l2VQPWs0m9sZ6kfn2h87DRg&s",
		Options: []string{"Boston Terrier", "Pug", "Collie", "Beagle"},
		Answer: "Beagle",
	},
	{
		ID: "2", 
		Breed: "Brittany Spaniel", 
		Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU2hATbC9ewdkgKzxs34lClrS8wI2EVZKgqQ&s",
		Options: []string{"Brittany Spaniel", "Basset Hound", "Jack Russell Terrier", "Beagle"},
		Answer: "Brittany Spaniel",
	},
	{
		ID: "3",
		Breed: "Doberman Pinscher",
		Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Q5i3a-0UNhpM4XtSHHXcN1MlOnomKEOjEA&s",
		Options: []string{"American Pitbull", "Doberman Pinscher", "Greyhound", "Mastiff"},
		Answer: "Doberman Pinscher",
	},
	{
		ID: "4",
		Breed: "Norwegian Elkhound",
		Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDk7EXLnJ9j-_aOLe9hmypSESO65P1ZMh1XQ&s",
		Options: []string{"Norwegian Elkhound", "German Shepherd", "Tibetan Mastiff", "Siberian Husky"},
		Answer: "Norwegian Elkhound",
	},
	{
		ID: "5",
		Breed: "Basenji",
		Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEiKpVTXDz2K1qTwIvbQOmiPV1AwuhFV9rw&s",
		Options: []string{"Smooth Fox Terrier", "Shih Tzu", "Basenji", "Chihuahua"},
		Answer: "Basenji",
	},
}

func getDogs(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, dogs)
}

func dogById(c *gin.Context) {
	id := c.Param("id")
	dog, err := getDogById(id)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Dog not found."})
		return
	}
	c.IndentedJSON(http.StatusOK, dog)
}

func getDogById(id string) (*dog, error) {
	for i, d := range dogs {
		if d.ID == id {
			return &dogs[i], nil
		}
	}
	return nil, errors.New("dog not found")
}
//modify to add dogs to favorites array
func createDog(c *gin.Context) {
	var newDog dog

	if err := c.BindJSON(&newDog); err != nil {
		return
	}
	dogs = append(dogs, newDog)
	c.IndentedJSON(http.StatusCreated, newDog)
}

func findDogByID(id string) *dog {
	for i, d := range dogs {
		if d.ID == id {
			return &dogs[i]
		}
	}
	return nil
}

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

func main() {
	router := gin.Default()
	// Enable CORS
    config := cors.DefaultConfig()
    config.AllowOrigins = []string{"http://localhost:3000"}
    router.Use(cors.New(config))

	router.GET("/dogs", getDogs)
	router.GET("/dogs/:id", dogById)
	router.POST("/score", calculateScore)
	router.POST("/dogs", createDog)
	router.Run("localhost:8080")
}
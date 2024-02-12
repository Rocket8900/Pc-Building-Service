package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"repair/controllers"
)

func main() {
	fmt.Print("this is a test")
	server := gin.Default()

	//Routes 
	server.POST("/createrepair", controllers.CreateRepair)

	server.Run(":8080")
}
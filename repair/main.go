package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Print("this is a test")
	server := gin.Default()
	server.Run(":8080")
}
package main

import (
	"repair/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Authorization", "Origin, Content-Type"},
		ExposeHeaders:    []string{"Content-Length, Access-Control-Allow-Origins, Access-Control-Allow-Credentials, Content-Type"},
		AllowCredentials: true,
	}))

	//Routes
	server.POST("/repair/createrepair", controllers.CreateRepair)
	server.POST("/repair/updaterepaircompletion", controllers.UpdateRepairCompletion)
	// server.POST("/repair/deleterepair", controllers.DeleteRepair)
	// server.POST("/repair/updaterepairprice", controllers.UpdateRepairPrice)
	server.POST("/repair/updaterepairemployee", controllers.UpdateRepairEmployee)
	server.POST("/repair/updaterepairpart", controllers.UpdateRepairPart)

	server.Run(":4200")
}

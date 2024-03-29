package main

import (
	"repair/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin, Content-Type"},
		ExposeHeaders:    []string{"Content-Length, Access-Control-Allow-Origins, Access-Control-Allow-Credentials, Content-Type"},
		AllowCredentials: true,
	}))

	//Routes
	server.POST("/repair/createrepair", controllers.CreateRepair)
	server.POST("/repair/updaterepairstatus", controllers.UpdateRepairStatus)
	server.POST("/repair/deleterepair", controllers.DeleteRepair)
	server.POST("/repair/updaterepairprice", controllers.UpdateRepairPrice)
	server.POST("/repair/updaterepairemployee", controllers.UpdateRepairEmployee)

	server.Run(":4200")
}

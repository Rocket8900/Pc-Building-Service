package main

import (
	"repair/models"

	"repair/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	dsn := "admin:repairdb@tcp(repairdb.cysugzh9c3nf.ap-southeast-2.rds.amazonaws.com:3306)/repairdb?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Auto Migrate the database
	db.AutoMigrate(&models.Repair{})

	models.InitializeDB(db)

	server := gin.Default()

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin, Content-Type, Authorization"},
		ExposeHeaders:    []string{"Content-Length, Access-Control-Allow-Origins, Access-Control-Allow-Credentials, Content-Type"},
		AllowCredentials: true,
	}))

	//Routes

	server.POST("/repair/createrepair", controllers.CreateRepair)
	server.GET("/repair/getrepairs", controllers.GetAllRepairs)
	server.POST("/repair/getrepairbyemployee", controllers.GetRepairByEmployee)
	server.POST("/repair/updaterepairstatus", controllers.UpdateRepairStatus)
	server.POST("/repair/deleterepair", controllers.DeleteRepair)
	server.POST("/repair/updaterepairprice", controllers.UpdateRepairPrice)
	server.GET("/repair/getuserrepairs", controllers.GetUserRepairs)
	server.POST("/repair/getrepairbyid", controllers.GetRepairByID)
	server.POST("/repair/updaterepairemployee", controllers.UpdateRepairEmployee)

	server.Run(":4100")
}

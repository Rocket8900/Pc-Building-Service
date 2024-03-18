package main

import (
	"repair/controllers"
	"repair/models"

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

	//Routes
	server.POST("/createrepair", controllers.CreateRepair)
	server.GET("/getrepairs", controllers.GetAllRepairs)
	server.POST("/updaterepairstatus", controllers.UpdateRepairStatus)
	server.POST("/deleterepair", controllers.DeleteRepair)
	server.POST("/updaterepairprice", controllers.UpdateRepairPrice)
	server.GET("/getuserrepairs", controllers.GetUserRepairs)

	server.Run(":8080")
}

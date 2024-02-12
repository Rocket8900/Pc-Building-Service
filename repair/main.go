package main

import (
	"github.com/gin-gonic/gin"
	"repair/controllers"
	"gorm.io/driver/mysql"
	"repair/models"
	"gorm.io/gorm"
)

func main() {
	dsn := "user:pass@tcp(db:3306)/repairDb?parseTime=true"
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    // Auto Migrate the database
    db.AutoMigrate(&models.Repair{})


	server := gin.Default()

	//Routes 
	server.POST("/createrepair", controllers.CreateRepair)

	server.Run(":8080")
}
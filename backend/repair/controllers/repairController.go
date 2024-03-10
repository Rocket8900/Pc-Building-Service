package controllers

import (
	"fmt"
	"net/http"
	"repair/models"

	"github.com/gin-gonic/gin"
)

func CreateRepair(context *gin.Context) {
	var r models.Repair
	if err := context.ShouldBindJSON(&r); err != nil {
		fmt.Printf("binding json to repair: %v\n", err)
		context.JSON(http.StatusBadRequest, gin.H{"msg": "Your request could not be processed. Please verify your details."})
		return
	}

	// Create the repair in the database
	if err := models.DB.Create(&r).Error; err != nil {
		fmt.Printf("creating repair: %v\n", err)
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create repair"})
		return
	}

	// Return the created repair in the response
	context.JSON(http.StatusCreated, r)
}

func GetAllRepairs(context *gin.Context) {
	var repairs []models.Repair
	if err := models.DB.Find(&repairs).Error; err != nil {
		// If an error occurs while querying the database, return an error response
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve repairs from the database"})
		return
	}

	// If repairs are successfully retrieved, return them in the response
	context.JSON(http.StatusOK, repairs)
}

func UpdateRepairStatus(context *gin.Context) {
	var requestBody struct {
		RepairID string `json:"RepairID" binding:"required"`
		Status   string `json:"Status" binding:"required"`
	}

	// Bind the request body to the struct
	if err := context.BindJSON(&requestBody); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Check if the Repair ID and status are provided
	if requestBody.RepairID == "" || requestBody.Status == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Repair ID and status are required"})
		return
	}

	// Update the status of the repair
	if err := models.DB.Model(&models.Repair{}).Where("repair_id = ?", requestBody.RepairID).Update("status", requestBody.Status).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update repair status"})
		return
	}

	// Retrieve the updated repair record
	var updatedRepair models.Repair
	if err := models.DB.Where("repair_id = ?", requestBody.RepairID).First(&updatedRepair).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve updated repair"})
		return
	}

	// Return the updated repair in the response
	context.JSON(http.StatusOK, updatedRepair)
}

func UpdateRepairPrice(context *gin.Context) {
	var requestBody struct {
		RepairID string `json:"RepairID" binding:"required"`
		Price    string `json:"Price" binding:"required"`
	}

	// Bind the request body to the struct
	if err := context.BindJSON(&requestBody); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Check if the Repair ID and Price are provided
	if requestBody.RepairID == "" || requestBody.Price == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Repair ID and Price are required"})
		return
	}

	// Update the Price of the repair
	if err := models.DB.Model(&models.Repair{}).Where("repair_id = ?", requestBody.RepairID).Update("Price", requestBody.Price).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update repair Price"})
		return
	}

	// Retrieve the updated repair record
	var updatedRepair models.Repair
	if err := models.DB.Where("repair_id = ?", requestBody.RepairID).First(&updatedRepair).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve updated repair"})
		return
	}

	// Return the updated repair in the response
	context.JSON(http.StatusOK, updatedRepair)
}

func DeleteRepair(context *gin.Context) {
	var requestBody struct {
		RepairID string `json:"RepairID" binding:"required"`
	}

	// Bind the JSON request body to the struct
	if err := context.ShouldBindJSON(&requestBody); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Check if the RepairID is provided
	if requestBody.RepairID == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "RepairID is required"})
		return
	}

	// Delete the repair from the database based on the RepairID
	if err := models.DB.Where("repair_id = ?", requestBody.RepairID).Delete(&models.Repair{}).Error; err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete repair"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "Repair deleted successfully"})
}

func GetUserRepairs(context *gin.Context) {
	// Define the request body struct inline
	var req struct {
		UserID string `json:"UserID" binding:"required"`
	}

	// Bind the request body to the struct
	if err := context.ShouldBindJSON(&req); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Query the database to get all repairs belonging to the specified UserID
	var repairs []models.Repair
	if err := models.DB.Where("user_id = ?", req.UserID).Find(&repairs).Error; err != nil {
		// If an error occurs while querying the database, return an error response
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve repairs from the database"})
		return
	}

	// If repairs are successfully retrieved, return them in the response
	context.JSON(http.StatusOK, repairs)
}

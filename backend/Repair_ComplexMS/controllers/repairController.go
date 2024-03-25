package controllers

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateRepair(context *gin.Context) {
	// var r models.Repair
	// if err := context.ShouldBindJSON(&r); err != nil {
	// 	fmt.Printf("binding json to repair: %v\n", err)
	// 	context.JSON(http.StatusBadRequest, gin.H{"msg": "Your request could not be processed. Please verify your details."})
	// 	return
	// }

	// // Create the repair in the database
	// if err := models.DB.Create(&r).Error; err != nil {
	// 	fmt.Printf("creating repair: %v\n", err)
	// 	context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create repair"})
	// 	return
	// }

	// // Return the created repair in the response
	// context.JSON(http.StatusCreated, r)
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

	// Define the data to be sent to repair simple
	requestData := map[string]string{
		"RepairID": requestBody.RepairID,
		"Status":   requestBody.Status,
	}

	// Define the data to be sent to email ms
	requestEmailData := map[string]interface{}{
		"routingKey": "*.email",
		"data": map[string]interface{}{
			"type":     "repairemail",
			"purpose":  "updateStatus",
			"repairID": requestBody.RepairID,
			"status":   requestBody.Status,
		},
	}

	// Define the data to be sent to log ms
	requestLogData := map[string]interface{}{
		"routingKey": "*.log",
		"data": map[string]interface{}{
			"type":     "repairemail",
			"purpose":  "updateStatus",
			"repairID": requestBody.RepairID,
			"status":   requestBody.Status,
		},
	}

	// Convert requestData to JSON
	jsonData, err := json.Marshal(requestData)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal JSON"})
		return
	}

	jsonEmailData, errs := json.Marshal(requestEmailData)
	if errs != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal JSON"})
		return
	}

	jsonLogData, errs := json.Marshal(requestLogData)
	if errs != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal JSON"})
		return
	}

	// Create an HTTP client
	client := &http.Client{}

	// Send an email regarding the order having a status update
	_, err = client.Post("http://localhost:3200/api/data", "application/json", bytes.NewBuffer(jsonEmailData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send a post to simple repair ms to update the repair status
	_, err = client.Post("http://localhost:8080/repair/updaterepairstatus", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send to logs regarding the order having a status update
	_, err = client.Post("http://localhost:3200/api/data", "application/json", bytes.NewBuffer(jsonLogData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Return success response
	context.JSON(http.StatusOK, gin.H{"message": "Repair status updated successfully"})
}

func UpdateRepairEmployee(context *gin.Context) {
	var requestBody struct {
		RepairID   string `json:"RepairID" binding:"required"`
		EmployeeID string `json:"EmployeeID" binding:"required"`
	}

	// Bind the request body to the struct
	if err := context.BindJSON(&requestBody); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Check if the Repair ID and Employee ID are provided
	if requestBody.RepairID == "" || requestBody.EmployeeID == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Repair ID and employee id are required"})
		return
	}

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

}

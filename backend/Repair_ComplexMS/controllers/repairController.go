package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte(os.Getenv("SECRET_KEY"))

func verifyToken(tokenString string, secretKey []byte) (jwt.MapClaims, error) {

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		log.Printf("Error parsing token: %v", err)
		return nil, fmt.Errorf("error parsing token: %v", err)
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	log.Printf("Invalid token: %s", tokenString)
	return nil, fmt.Errorf("invalid token")
}

func CreateRepair(context *gin.Context) {
	var requestBody struct {
		Description string `json:"Description"`
		OrderID     string `json:"OrderID" binding:"required"`
		Status      string `json:"Status" binding:"required"`
	}

	// Bind the request body to the struct
	if err := context.BindJSON(&requestBody); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Check if the Repair ID and status are provided
	if requestBody.OrderID == "" || requestBody.Status == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Order ID and status are required"})
		return
	}

	authHeader := context.GetHeader("Authorization")

	if len(authHeader) < 7 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid authorization header"})
		return
	}

	tokenString := authHeader[7:]
	claims, err := verifyToken(tokenString, secretKey)
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userMap, ok := claims["user_id"].(map[string]interface{})
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "User ID claim is not a map"})
		return
	}

	userIDRaw, ok := userMap["user_id"]
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found within nested map"})
		return
	}

	emailRaw, ok := userMap["email"]
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Email not found within nested map"})
		return
	}

	UserID, ok := userIDRaw.(string)
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "User ID is not a string"})
		return
	}

	Email, ok := emailRaw.(string)
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Email is not a string"})
		return
	}

	// Define the data to be sent to repair simple
	requestData := map[string]string{
		"UserID":      UserID,
		"Status":      requestBody.Status,
		"Description": requestBody.Description,
		"OrderID":     requestBody.OrderID,
	}

	// Define the data to be sent to email ms
	requestEmailData := map[string]interface{}{
		"routingKey": "*.email",
		"data": map[string]interface{}{
			"type":    "repairemail",
			"purpose": "createRepair",
			"OrderID": requestBody.OrderID,
			"status":  requestBody.Status,
			"Email":   Email,
		},
	}

	// Define the data to be sent to log ms
	requestLogData := map[string]interface{}{
		"routingKey": "*.log",
		"data": map[string]interface{}{
			"purpose": "createRepair",
			"OrderID": requestBody.OrderID,
			"status":  requestBody.Status,
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
	_, err = client.Post("http://host.docker.internal:3200/api/data", "application/json", bytes.NewBuffer(jsonEmailData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send a post to simple repair ms to update the repair status
	_, err = client.Post("http://host.docker.internal:4100/repair/createrepair", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send to logs regarding the order having a status update
	_, err = client.Post("http://host.docker.internal:3200/api/data", "application/json", bytes.NewBuffer(jsonLogData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Return success response
	context.JSON(http.StatusOK, gin.H{"message": "Repair status updated successfully"})

}

func UpdateRepairCompletion(context *gin.Context) {
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
	_, err = client.Post("http://host.docker.internal:3200/api/data", "application/json", bytes.NewBuffer(jsonEmailData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send a post to simple repair ms to update the repair status
	_, err = client.Post("http://host.docker.internal:4100/repair/updaterepairstatussimple", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send to logs regarding the order having a status update
	_, err = client.Post("http://host.docker.internal:3200/api/data", "application/json", bytes.NewBuffer(jsonLogData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Return success response
	context.JSON(http.StatusOK, gin.H{"message": "Repair status updated successfully"})
}

func UpdateRepairEmployee(context *gin.Context) {
	var requestBody struct {
		RepairID string `json:"RepairID" binding:"required"`
	}

	authHeader := context.GetHeader("Authorization")

	if len(authHeader) < 7 {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid authorization header"})
		return
	}
	tokenString := authHeader[7:]
	claims, err := verifyToken(tokenString, secretKey)
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	userMap, ok := claims["user_id"].(map[string]interface{})
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "User ID claim is not a map"})
		return
	}

	EmployeeNameRaw, ok := userMap["name"]
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found within nested map"})
		return
	}

	EmployeeName, ok := EmployeeNameRaw.(string)
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "User ID is not a string"})
		return
	}

	userIDRaw, ok := userMap["user_id"]
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found within nested map"})
		return
	}

	EmployeeID, ok := userIDRaw.(string)
	if !ok {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "User ID is not a string"})
		return
	}

	// Bind the request body to the struct
	if err := context.BindJSON(&requestBody); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Check if the Repair ID and status are provided
	if requestBody.RepairID == "" || EmployeeID == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Repair ID and status are required"})
		return
	}

	// Define the data to be sent to repair simple
	requestData := map[string]string{
		"RepairID":   requestBody.RepairID,
		"employeeID": EmployeeID,
	}

	statusUpdateData := map[string]string{
		"RepairID": requestBody.RepairID,
		"Status":   "Employee Assigned",
	}

	// Define the data to be sent to email ms
	requestEmailData := map[string]interface{}{
		"routingKey": "*.email",
		"data": map[string]interface{}{
			"type":         "repairemail",
			"purpose":      "assignEmployee",
			"repairID":     requestBody.RepairID,
			"employeeName": EmployeeName,
		},
	}

	// Define the data to be sent to log ms
	requestLogData := map[string]interface{}{
		"routingKey": "*.log",
		"data": map[string]interface{}{
			"purpose":      "assignEmployee",
			"repairID":     requestBody.RepairID,
			"employeeName": EmployeeName,
		},
	}

	// Convert requestData to JSON
	jsonData, err := json.Marshal(requestData)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal JSON"})
		return
	}

	jsonStatusData, err := json.Marshal(statusUpdateData)
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
	_, err = client.Post("http://host.docker.internal:3200/api/data", "application/json", bytes.NewBuffer(jsonEmailData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to rabbit mq for email"})
		return
	}

	// Send a post to simple repair ms to update the repair status
	_, err = client.Post("http://host.docker.internal:4100/repair/updaterepairstatussimple", "application/json", bytes.NewBuffer(jsonStatusData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send a post to simple repair ms to update the repair status
	_, err = client.Post("http://host.docker.internal:4100/repair/updaterepairemployeesimple", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to simple for updating"})
		return
	}

	// Send to logs regarding the order having a status update
	_, err = client.Post("http://host.docker.internal:3200/api/data", "application/json", bytes.NewBuffer(jsonLogData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to rabbit mq for logging"})
		return
	}

	// Return success response
	context.JSON(http.StatusOK, gin.H{"message": "Repair status updated successfully"})

}

func UpdateRepairPart(context *gin.Context) {
	var requestBody struct {
		RepairID   string `json:"RepairID" binding:"required"`
		RepairPart string `json:"RepairPart" binding:"required"`
	}

	// Bind the request body to the struct
	if err := context.BindJSON(&requestBody); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Check if the Repair ID and status are provided
	if requestBody.RepairID == "" || requestBody.RepairPart == "" {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Repair ID and part are required"})
		return
	}

	// Define the data to be sent to repair simple
	requestData := map[string]string{
		"RepairID":   requestBody.RepairID,
		"RepairPart": requestBody.RepairPart,
	}

	statusUpdateData := map[string]string{
		"RepairID": requestBody.RepairID,
		"Status":   "Repair In Progress",
	}

	// Define the data to be sent to email ms
	requestEmailData := map[string]interface{}{
		"routingKey": "*.email",
		"data": map[string]interface{}{
			"type":       "repairemail",
			"purpose":    "repairPart",
			"repairID":   requestBody.RepairID,
			"RepairPart": requestBody.RepairPart,
		},
	}

	// Define the data to be sent to log ms
	requestLogData := map[string]interface{}{
		"routingKey": "*.log",
		"data": map[string]interface{}{
			"purpose":    "repairPart",
			"repairID":   requestBody.RepairID,
			"RepairPart": requestBody.RepairPart,
		},
	}

	jsonStatusData, err := json.Marshal(statusUpdateData)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal JSON"})
		return
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
	_, err = client.Post("http://host.docker.internal:3200/api/data", "application/json", bytes.NewBuffer(jsonEmailData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send a post to simple repair ms to update the repair status
	_, err = client.Post("http://host.docker.internal:4100/repair/updaterepairstatussimple", "application/json", bytes.NewBuffer(jsonStatusData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send a post to simple repair ms to update the repair status
	_, err = client.Post("http://host.docker.internal:4100/repair/updaterepairpartsimple", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Send to logs regarding the order having a status update
	_, err = client.Post("http://host.docker.internal:3200/api/data", "application/json", bytes.NewBuffer(jsonLogData))
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to Service B"})
		return
	}

	// Return success response
	context.JSON(http.StatusOK, gin.H{"message": "Repair status updated successfully"})

}

// func UpdateRepairPrice(context *gin.Context) {
// 	var requestBody struct {
// 		RepairID string `json:"RepairID" binding:"required"`
// 		Price    string `json:"Price" binding:"required"`
// 	}

// 	// Bind the request body to the struct
// 	if err := context.BindJSON(&requestBody); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
// 		return
// 	}

// 	// Check if the Repair ID and Price are provided
// 	if requestBody.RepairID == "" || requestBody.Price == "" {
// 		context.JSON(http.StatusBadRequest, gin.H{"error": "Repair ID and Price are required"})
// 		return
// 	}

// }

// func DeleteRepair(context *gin.Context) {
// 	var requestBody struct {
// 		RepairID string `json:"RepairID" binding:"required"`
// 	}

// 	// Bind the JSON request body to the struct
// 	if err := context.ShouldBindJSON(&requestBody); err != nil {
// 		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
// 		return
// 	}

// 	// Check if the RepairID is provided
// 	if requestBody.RepairID == "" {
// 		context.JSON(http.StatusBadRequest, gin.H{"error": "RepairID is required"})
// 		return
// 	}

// }

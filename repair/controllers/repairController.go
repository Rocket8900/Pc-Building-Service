package controllers

import (
	"fmt"
	"repair/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateRepair(context *gin.Context) {
	var r models.Repair
	if err := context.ShouldBindJSON(&r); err != nil {
		fmt.Printf("binding json to repair: %v\n", err)
		context.JSON(http.StatusBadRequest, gin.H{"msg": "Your request could not be processed. Please verify your details."})
		return
	}
}
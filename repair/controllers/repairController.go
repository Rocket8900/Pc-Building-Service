package controllers

func CreateRepair(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"services": models.Services})
	var r models.Repair
}
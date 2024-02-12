package models

type Repair struct {
	repairID   string
	userID   string `binding:"required"`
	PickupAddr   string `binding:"required"`
	status   string `binding:"required"`
	price   int 
}
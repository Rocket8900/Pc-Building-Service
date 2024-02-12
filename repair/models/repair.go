package models

import (
    "time"
	"gorm.io/gorm"
)

type Repair struct {
	repairID   string
	userID   string `binding:"required"`
	status   string `binding:"required"`
	price   int 
	CreatedAt time.Time `gorm:"autoCreateTime"`
    UpdatedAt time.Time `gorm:"autoUpdateTime"`
}

func (r *Repair) BeforeCreate(tx *gorm.DB) (err error) {
    r.CreatedAt = time.Now()
    return nil
}

func (r *Repair) BeforeUpdate(tx *gorm.DB) (err error) {
    r.UpdatedAt = time.Now()
    return nil
}
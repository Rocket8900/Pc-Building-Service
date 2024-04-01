package models

import (
	"encoding/base64"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

var DB *gorm.DB

type Repair struct {
	RepairID      string `gorm:"primaryKey"`
	UserID        string `binding:"required"`
	OrderID       string
	Status        string `binding:"required"`
	Price         int
	CreatedAt     time.Time `gorm:"autoCreateTime"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime"`
	EmployeeID    string
	RepairPart    string
	Description   string
	CustomerEmail string
}

func InitializeDB(db *gorm.DB) {
	DB = db
}

func (r *Repair) BeforeCreate(tx *gorm.DB) (err error) {
	r.CreatedAt = time.Now()
	r.RepairID = ShortUUID()
	return nil
}

func (r *Repair) BeforeUpdate(tx *gorm.DB) (err error) {
	r.UpdatedAt = time.Now()
	return nil
}

func ShortUUID() string {
	id := uuid.New()
	encoded := base64.RawURLEncoding.EncodeToString(id[:])
	return encoded[:7]
}

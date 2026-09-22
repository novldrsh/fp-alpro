package models

import "time"

type Review struct {
	ID           int       `json:"id" gorm:"primaryKey"`
	RestaurantID int       `json:"tempat_id"`
	Reviewer     string    `json:"nama_pengulas"`
	Rating       float64   `json:"rating"`
	Comment      string    `json:"komentar"`
	UserID       *int      `json:"user_id,omitempty"`
	CreatedAt    time.Time `json:"created_at"`
	Image        string    `json:"foto_url" gorm:"column:foto_url"`
}

package models

type Favorite struct {
	ID           int `json:"id" gorm:"primaryKey"`
	UserID       int `json:"user_id"`
	RestaurantID int `json:"restaurant_id"`
}

package handlers

import (
	"backend-fp-alpro/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func AddFavorite(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurantID := c.Param("restaurant_id")

		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(401, gin.H{"message": "User not found"})
			return
		}

		userIDInt := userID.(int)

		var restaurant models.Restaurant
		if err := db.First(&restaurant, restaurantID).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(404, gin.H{"message": "Restaurant not found"})
				return
			}

			c.JSON(500, gin.H{"message": "Failed to check restaurant"})
			return
		}

		var count int64
		if err := db.Model(&models.Favorite{}).
			Where("user_id = ? AND restaurant_id = ?", userIDInt, restaurantID).
			Count(&count).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to check favorite"})
			return
		}

		if count > 0 {
			c.JSON(400, gin.H{
				"message": "Restaurant already in favorites",
			})
			return
		}

		favorite := models.Favorite{
			UserID:       userIDInt,
			RestaurantID: restaurant.ID,
		}

		if err := db.Create(&favorite).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to add favorite"})
			return
		}

		c.JSON(201, gin.H{
			"message": "Restaurant added to favorites",
		})
	}
}

func GetFavorites(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(401, gin.H{"message": "User not found"})
			return
		}

		userIDInt := userID.(int)

		restaurants := make([]models.Restaurant, 0)

		err := db.Table("favorites AS f").
			Select(`
				r.id,
				r.name,
				COALESCE(r.description, '') AS description,
				r.location,
				COALESCE(r.category, '') AS category,
				COALESCE(r.latitude, 0) AS latitude,
				COALESCE(r.longitude, 0) AS longitude,
				COALESCE(r.image, '') AS image,
				COALESCE(AVG(rv.rating), 0) AS rating_rata2
			`).
			Joins("JOIN restaurants r ON f.restaurant_id = r.id").
			Joins("LEFT JOIN reviews rv ON r.id = rv.restaurant_id").
			Where("f.user_id = ?", userIDInt).
			Group("r.id").
			Order("r.id").
			Scan(&restaurants).Error

		if err != nil {
			c.JSON(500, gin.H{"message": "Failed to get favorites"})
			return
		}

		c.JSON(200, restaurants)
	}
}

func DeleteFavorite(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurantID := c.Param("restaurant_id")

		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(401, gin.H{"message": "User not found"})
			return
		}

		userIDInt := userID.(int)

		result := db.Where(
			"user_id = ? AND restaurant_id = ?",
			userIDInt,
			restaurantID,
		).Delete(&models.Favorite{})

		if result.Error != nil {
			c.JSON(500, gin.H{"message": "Failed to delete favorite"})
			return
		}

		if result.RowsAffected == 0 {
			c.JSON(404, gin.H{"message": "Favorite not found"})
			return
		}

		c.JSON(200, gin.H{
			"message": "Restaurant removed from favorites",
		})
	}
}

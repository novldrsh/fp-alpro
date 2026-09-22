package handlers

import (
	"backend-fp-alpro/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetMenus(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurantID := c.Param("id")

		menus := make([]models.Menu, 0)

		if err := db.
			Where("restaurant_id = ?", restaurantID).
			Order("id").
			Find(&menus).Error; err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to get menus",
			})
			return
		}

		c.JSON(200, menus)
	}
}

func CreateMenu(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurantID := c.Param("id")

		var menu models.Menu
		if err := c.ShouldBindJSON(&menu); err != nil {
			c.JSON(400, gin.H{
				"message": "Invalid JSON",
			})
			return
		}

		if menu.Nama == "" {
			c.JSON(400, gin.H{
				"message": "Menu name cannot be empty",
			})
			return
		}

		if menu.Harga < 0 {
			c.JSON(400, gin.H{
				"message": "Menu price cannot be negative",
			})
			return
		}

		var restaurant models.Restaurant
		if err := db.First(&restaurant, restaurantID).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(404, gin.H{
					"message": "Restaurant not found",
				})
				return
			}

			c.JSON(500, gin.H{
				"message": "Failed to check restaurant",
			})
			return
		}

		menu.RestaurantID = restaurant.ID

		if err := db.Create(&menu).Error; err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to add menu",
			})
			return
		}

		c.JSON(201, menu)
	}
}
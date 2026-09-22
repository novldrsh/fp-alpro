package handlers

import (
	"backend-fp-alpro/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetRestaurants(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurants := make([]models.Restaurant, 0)

		err := db.
			Table("restaurants AS r").
			Select(`
				r.id,
				r.name,
				COALESCE(r.description, '') AS description,
				r.location,
				COALESCE(r.category, '') AS category,
				COALESCE(r.latitude, 0) AS latitude,
				COALESCE(r.longitude, 0) AS longitude,
				COALESCE(r.jam_buka, '') AS jam_buka,
				COALESCE(r.harga_min, 0) AS harga_min,
				COALESCE(r.harga_max, 0) AS harga_max,
				COALESCE(r.image, '') AS image,
				COALESCE(AVG(rv.rating), 0) AS rating_rata2,
				COUNT(rv.id) AS jumlah_review
			`).
			Joins("LEFT JOIN reviews AS rv ON rv.restaurant_id = r.id").
			Group("r.id").
			Order("r.id").
			Scan(&restaurants).Error

		if err != nil {
			c.JSON(500, gin.H{"message": "Failed to get restaurants"})
			return
		}

		c.JSON(200, restaurants)
	}
}

func CreateRestaurant(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var restaurant models.Restaurant

		if err := c.ShouldBindJSON(&restaurant); err != nil {
			c.JSON(400, gin.H{"message": "Invalid JSON"})
			return
		}

		if restaurant.Name == "" {
			c.JSON(400, gin.H{"message": "Name cannot be empty"})
			return
		}

		if restaurant.Location == "" {
			c.JSON(400, gin.H{"message": "Location cannot be empty"})
			return
		}

		var count int64
		if err := db.Model(&models.Restaurant{}).
			Where("LOWER(name) = LOWER(?)", restaurant.Name).
			Count(&count).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to check restaurant name"})
			return
		}

		if count > 0 {
			c.JSON(409, gin.H{"message": "Restaurant name already exists"})
			return
		}

		if err := db.Create(&restaurant).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to add restaurant"})
			return
		}

		c.JSON(201, restaurant)
	}
}

func GetRestaurantByID(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var restaurant models.Restaurant

		result := db.
			Table("restaurants AS r").
			Select(`
				r.id,
				r.name,
				COALESCE(r.description, '') AS description,
				r.location,
				COALESCE(r.category, '') AS category,
				COALESCE(r.latitude, 0) AS latitude,
				COALESCE(r.longitude, 0) AS longitude,
				COALESCE(r.jam_buka, '') AS jam_buka,
				COALESCE(r.harga_min, 0) AS harga_min,
				COALESCE(r.harga_max, 0) AS harga_max,
				COALESCE(r.image, '') AS image,
				COALESCE(AVG(rv.rating), 0) AS rating_rata2,
				COUNT(rv.id) AS jumlah_review
			`).
			Joins("LEFT JOIN reviews AS rv ON rv.restaurant_id = r.id").
			Where("r.id = ?", id).
			Group("r.id").
			Scan(&restaurant)

		if result.Error != nil {
			c.JSON(500, gin.H{"message": "Failed to get restaurant"})
			return
		}

		if result.RowsAffected == 0 {
			c.JSON(404, gin.H{"message": "Restaurant not found"})
			return
		}

		c.JSON(200, restaurant)
	}
}

func UpdateRestaurant(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var restaurant models.Restaurant

		if err := c.ShouldBindJSON(&restaurant); err != nil {
			c.JSON(400, gin.H{"message": "Invalid JSON"})
			return
		}

		if restaurant.Name == "" {
			c.JSON(400, gin.H{"message": "Name cannot be empty"})
			return
		}

		if restaurant.Location == "" {
			c.JSON(400, gin.H{"message": "Location cannot be empty"})
			return
		}

		var count int64
		if err := db.Model(&models.Restaurant{}).
			Where("LOWER(name) = LOWER(?) AND id <> ?", restaurant.Name, id).
			Count(&count).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to check restaurant name"})
			return
		}

		if count > 0 {
			c.JSON(409, gin.H{"message": "Restaurant name already exists"})
			return
		}

		result := db.Model(&models.Restaurant{}).
			Where("id = ?", id).
			Updates(map[string]interface{}{
				"name":        restaurant.Name,
				"description": restaurant.Description,
				"location":    restaurant.Location,
				"category":    restaurant.Category,
				"latitude":    restaurant.Latitude,
				"longitude":   restaurant.Longitude,
				"jam_buka":    restaurant.JamBuka,
				"harga_min":   restaurant.HargaMin,
				"harga_max":   restaurant.HargaMax,
				"image":       restaurant.Image,
			})

		if result.Error != nil {
			c.JSON(500, gin.H{"message": "Failed to update restaurant"})
			return
		}

		if result.RowsAffected == 0 {
			c.JSON(404, gin.H{"message": "Restaurant not found"})
			return
		}

		if err := db.First(&restaurant, id).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to get updated restaurant"})
			return
		}

		c.JSON(200, restaurant)
	}
}

func DeleteRestaurant(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		result := db.Delete(&models.Restaurant{}, id)

		if result.Error != nil {
			c.JSON(500, gin.H{"message": "Failed to delete restaurant"})
			return
		}

		if result.RowsAffected == 0 {
			c.JSON(404, gin.H{"message": "Restaurant not found"})
			return
		}

		c.JSON(200, gin.H{
			"message": "Restaurant deleted",
		})
	}
}

func SearchRestaurants(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		name := c.Query("name")

		if name == "" {
			c.JSON(400, gin.H{
				"message": "Search name cannot be empty",
			})
			return
		}

		restaurants := make([]models.Restaurant, 0)

		err := db.
			Table("restaurants AS r").
			Select(`
				r.id,
				r.name,
				COALESCE(r.description, '') AS description,
				r.location,
				COALESCE(r.category, '') AS category,
				COALESCE(r.latitude, 0) AS latitude,
				COALESCE(r.longitude, 0) AS longitude,
				COALESCE(r.jam_buka, '') AS jam_buka,
				COALESCE(r.harga_min, 0) AS harga_min,
				COALESCE(r.harga_max, 0) AS harga_max,
				COALESCE(r.image, '') AS image,
				COALESCE(AVG(rv.rating), 0) AS rating_rata2,
				COUNT(rv.id) AS jumlah_review
			`).
			Joins("LEFT JOIN reviews AS rv ON rv.restaurant_id = r.id").
			Where("r.name ILIKE ?", "%"+name+"%").
			Group("r.id").
			Order("r.id").
			Scan(&restaurants).Error

		if err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to search restaurants",
			})
			return
		}

		c.JSON(200, restaurants)
	}
}

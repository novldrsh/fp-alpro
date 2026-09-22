package handlers

import (
	"backend-fp-alpro/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"strconv"
	"strings"
)

func GetReviews(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		reviews := make([]models.Review, 0)

		err := db.
			Table("reviews").
			Select(`
				id,
				restaurant_id,
				reviewer,
				rating,
				comment,
				user_id,
				created_at,
				COALESCE(foto_url, '') AS foto_url
			`).
			Order("created_at DESC").
			Scan(&reviews).Error

		if err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to get reviews",
			})
			return
		}

		c.JSON(200, reviews)
	}
}

func CreateReview(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurantID, err := strconv.Atoi(c.Param("id"))
		if err != nil || restaurantID <= 0 {
			c.JSON(400, gin.H{
				"message": "Invalid restaurant ID",
			})
			return
		}

		var review models.Review
		if err := c.ShouldBindJSON(&review); err != nil {
			c.JSON(400, gin.H{
				"message": "Invalid JSON",
			})
			return
		}

		review.Reviewer = strings.TrimSpace(review.Reviewer)
		review.Comment = strings.TrimSpace(review.Comment)
		review.RestaurantID = restaurantID
		review.UserID = nil

		if review.Reviewer == "" {
			c.JSON(400, gin.H{
				"message": "Reviewer name cannot be empty",
			})
			return
		}

		if review.Rating < 1 || review.Rating > 5 {
			c.JSON(400, gin.H{
				"message": "Rating must be between 1 and 5",
			})
			return
		}

		if review.Comment == "" {
			c.JSON(400, gin.H{
				"message": "Comment cannot be empty",
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

		if err := db.Create(&review).Error; err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to add review",
			})
			return
		}

		c.JSON(201, review)
	}
}

func GetReviewByID(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var review models.Review

		err := db.
			Table("reviews").
			Select(`
				id,
				restaurant_id,
				reviewer,
				rating,
				comment,
				user_id,
				created_at,
				COALESCE(foto_url, '') AS foto_url
			`).
			Where("id = ?", id).
			Take(&review).Error

		if err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(404, gin.H{
					"message": "Review not found",
				})
				return
			}

			c.JSON(500, gin.H{
				"message": "Failed to get review",
			})
			return
		}

		c.JSON(200, review)
	}
}

func UpdateReview(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(401, gin.H{
				"message": "User not found",
			})
			return
		}

		userIDInt := userID.(int)

		var review models.Review
		if err := c.ShouldBindJSON(&review); err != nil {
			c.JSON(400, gin.H{
				"message": "Invalid JSON",
			})
			return
		}

		var user models.User
		if err := db.Select("name").First(&user, userIDInt).Error; err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to get user",
			})
			return
		}

		if review.Rating < 1 || review.Rating > 5 {
			c.JSON(400, gin.H{
				"message": "Rating must be between 1 and 5",
			})
			return
		}

		if review.Comment == "" {
			c.JSON(400, gin.H{
				"message": "Comment cannot be empty",
			})
			return
		}

		var restaurant models.Restaurant
		if err := db.First(&restaurant, review.RestaurantID).Error; err != nil {
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

		result := db.
			Model(&models.Review{}).
			Where("id = ? AND user_id = ?", id, userIDInt).
			Updates(map[string]interface{}{
				"restaurant_id": review.RestaurantID,
				"reviewer":      user.Name,
				"rating":        review.Rating,
				"comment":       review.Comment,
				"foto_url":      review.Image,
			})

		if result.Error != nil {
			c.JSON(500, gin.H{
				"message": "Failed to update review",
			})
			return
		}

		if result.RowsAffected == 0 {
			c.JSON(404, gin.H{
				"message": "Review not found",
			})
			return
		}

		var updatedReview models.Review
		err := db.
			Table("reviews").
			Select(`
				id,
				restaurant_id,
				reviewer,
				rating,
				comment,
				user_id,
				created_at,
				COALESCE(foto_url, '') AS foto_url
			`).
			Where("id = ?", id).
			Take(&updatedReview).Error

		if err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to get updated review",
			})
			return
		}

		c.JSON(200, updatedReview)
	}
}

func DeleteReview(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(401, gin.H{
				"message": "User not found",
			})
			return
		}

		userIDInt := userID.(int)

		result := db.
			Where("id = ? AND user_id = ?", id, userIDInt).
			Delete(&models.Review{})

		if result.Error != nil {
			c.JSON(500, gin.H{
				"message": "Failed to delete review",
			})
			return
		}

		if result.RowsAffected == 0 {
			c.JSON(404, gin.H{
				"message": "Review not found",
			})
			return
		}

		c.JSON(200, gin.H{
			"message": "Review deleted",
		})
	}
}

func GetReviewsByRestaurant(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurantID := c.Param("id")
		var reviews []models.Review

		err := db.
			Table("reviews").
			Select(`
				id,
				restaurant_id,
				reviewer,
				rating,
				comment,
				user_id,
				created_at,
				COALESCE(foto_url, '') AS foto_url
			`).
			Where("restaurant_id = ?", restaurantID).
			Order("created_at DESC").
			Scan(&reviews).Error

		if err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to get reviews",
			})
			return
		}

		c.JSON(200, reviews)
	}
}

func GetRestaurantRating(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		restaurantID := c.Param("id")

		var result struct {
			AverageRating float64 `gorm:"column:average_rating"`
			ReviewCount   int     `gorm:"column:review_count"`
		}

		err := db.
			Table("reviews").
			Select(`
				COALESCE(AVG(rating), 0) AS average_rating,
				COUNT(id) AS review_count
			`).
			Where("restaurant_id = ?", restaurantID).
			Scan(&result).Error

		if err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to get restaurant rating",
			})
			return
		}

		c.JSON(200, gin.H{
			"restaurant_id":  restaurantID,
			"average_rating": result.AverageRating,
			"review_count":   result.ReviewCount,
		})
	}
}

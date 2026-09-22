package handlers

import (
	"backend-fp-alpro/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func RegisterUser(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var user models.User

		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(400, gin.H{"message": "Invalid JSON"})
			return
		}

		if user.Name == "" {
			c.JSON(400, gin.H{"message": "Name cannot be empty"})
			return
		}

		if user.Email == "" {
			c.JSON(400, gin.H{"message": "Email cannot be empty"})
			return
		}

		if user.Password == "" {
			c.JSON(400, gin.H{"message": "Password cannot be empty"})
			return
		}

		var count int64
		if err := db.Model(&models.User{}).
			Where("email = ?", user.Email).
			Count(&count).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to check email"})
			return
		}

		if count > 0 {
			c.JSON(400, gin.H{"message": "Email already registered"})
			return
		}

		hashedPassword, err := bcrypt.GenerateFromPassword(
			[]byte(user.Password),
			bcrypt.DefaultCost,
		)
		if err != nil {
			c.JSON(500, gin.H{"message": "Failed to hash password"})
			return
		}

		user.Password = string(hashedPassword)

		if err := db.Create(&user).Error; err != nil {
			c.JSON(500, gin.H{"message": "Failed to register user"})
			return
		}

		c.JSON(201, gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		})
	}
}

func LoginUser(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input models.User

		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(400, gin.H{"message": "Invalid JSON"})
			return
		}

		var user models.User

		err := db.Where("email = ?", input.Email).First(&user).Error
		if err != nil {
			c.JSON(401, gin.H{
				"message": "Email atau password salah",
			})
			return
		}

		err = bcrypt.CompareHashAndPassword(
			[]byte(user.Password),
			[]byte(input.Password),
		)
		if err != nil {
			c.JSON(401, gin.H{
				"message": "Email atau password salah",
			})
			return
		}

		token, err := GenerateToken(user.ID, user.Email)
		if err != nil {
			c.JSON(500, gin.H{
				"message": "Failed to generate token",
			})
			return
		}

		c.JSON(200, gin.H{
			"message": "Login berhasil",
			"id":      user.ID,
			"name":    user.Name,
			"email":   user.Email,
			"token":   token,
		})
	}
}

func GetProfile(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("user_id")
		if !exists {
			c.JSON(401, gin.H{
				"message": "User not found",
			})
			return
		}

		userIDInt := userID.(int)

		var user models.User

		err := db.Select("id", "name", "email").
			First(&user, userIDInt).Error

		if err != nil {
			if err == gorm.ErrRecordNotFound {
				c.JSON(404, gin.H{
					"message": "User not found",
				})
				return
			}

			c.JSON(500, gin.H{
				"message": "Failed to get user",
			})
			return
		}

		c.JSON(200, gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		})
	}
}
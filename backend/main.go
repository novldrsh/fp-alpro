package main

import (
	"backend-fp-alpro/handlers"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	gormDB := connectGORM()
	autoMigrate(gormDB)
	seedRestaurants(gormDB)
	var jumlahRestoran int64
	if err := gormDB.Table("restaurants").Count(&jumlahRestoran).Error; err != nil {
		panic(err)
	}
	fmt.Printf("GORM connected! Jumlah restoran: %d\n", jumlahRestoran)

	router.GET("/api/tempat", handlers.GetRestaurants(gormDB))
	router.GET("/api/tempat/search", handlers.SearchRestaurants(gormDB))
	router.GET("/api/tempat/:id", handlers.GetRestaurantByID(gormDB))
	router.POST("/api/tempat", handlers.CreateRestaurant(gormDB))
	router.PUT("/api/tempat/:id", handlers.UpdateRestaurant(gormDB))
	router.DELETE("/api/tempat/:id", handlers.DeleteRestaurant(gormDB))

	router.GET("/api/tempat/:id/menu", handlers.GetMenus(gormDB))
	router.POST("/api/tempat/:id/menu", handlers.CreateMenu(gormDB))

	router.GET("/reviews", handlers.GetReviews(gormDB))
	router.POST("/api/tempat/:id/review", handlers.CreateReview(gormDB))
	router.GET("/api/tempat/:id/review", handlers.GetReviewsByRestaurant(gormDB))
	router.PUT("/reviews/:id", handlers.AuthMiddleware(), handlers.UpdateReview(gormDB))
	router.DELETE("/reviews/:id", handlers.AuthMiddleware(), handlers.DeleteReview(gormDB))
	router.GET("/api/tempat/:id/rating", handlers.GetRestaurantRating(gormDB))

	router.POST("/register", handlers.RegisterUser(gormDB))
	router.POST("/login", handlers.LoginUser(gormDB))
	router.GET("/profile", handlers.AuthMiddleware(), handlers.GetProfile(gormDB))

	router.POST("/favorites/:restaurant_id", handlers.AuthMiddleware(), handlers.AddFavorite(gormDB))
	router.GET("/favorites", handlers.AuthMiddleware(), handlers.GetFavorites(gormDB))
	router.DELETE("/favorites/:restaurant_id", handlers.AuthMiddleware(), handlers.DeleteFavorite(gormDB))

	router.Run(":8080")
}

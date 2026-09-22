package main

import (
	"backend-fp-alpro/models"
	"gorm.io/gorm"
)

func autoMigrate(db *gorm.DB) {
	modelsToMigrate := []interface{}{
		&models.User{},
		&models.Restaurant{},
		&models.Menu{},
		&models.Review{},
		&models.Favorite{},
	}

	for _, model := range modelsToMigrate {
		if !db.Migrator().HasTable(model) {
			if err := db.AutoMigrate(model); err != nil {
				panic(err)
			}
		}
	}
}

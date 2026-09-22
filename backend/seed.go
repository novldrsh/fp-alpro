package main

import (
	"backend-fp-alpro/models"
	"fmt"

	"gorm.io/gorm"
)

func seedRestaurants(db *gorm.DB) {
	var count int64

	if err := db.Model(&models.Restaurant{}).Count(&count).Error; err != nil {
		panic(err)
	}

	// Jangan seed lagi kalau database sudah punya restoran.
	if count > 0 {
		fmt.Println("Seed skipped: restaurants already exist")
		return
	}

	restaurants := []models.Restaurant{
		{
			Name:      "Bakso Arsitektur",
			Category:  "Bakso",
			Location:  "Kantin Departemen Arsitektur ITS",
			Latitude:  -7.28034,
			Longitude: 112.79408,
			JamBuka:   "09.00 - 16.00",
			HargaMin:  10000,
			HargaMax:  18000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bakso_khas_Solo.jpg/500px-Bakso_khas_Solo.jpg",
		},
		{
			Name:      "Gepuk Geprek CCWS IKOMA",
			Category:  "Ayam Geprek",
			Location:  "Kantin CCWS IKOMA ITS",
			Latitude:  -7.281,
			Longitude: 112.7962,
			JamBuka:   "09.00 - 17.00",
			HargaMin:  12000,
			HargaMax:  20000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Ayam_Gepek_with_original_sauce.jpg/500px-Ayam_Gepek_with_original_sauce.jpg",
		},
		{
			Name:      "Sego Jamur Kantin Pusat",
			Category:  "Nasi",
			Location:  "Kantin Pusat ITS",
			Latitude:  -7.28384,
			Longitude: 112.79411,
			JamBuka:   "07.00 - 16.00",
			HargaMin:  10000,
			HargaMax:  15000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Nasi_Goreng_Jamur_Kuping.jpg/500px-Nasi_Goreng_Jamur_Kuping.jpg",
		},
		{
			Name:      "Bakso FTK",
			Category:  "Bakso",
			Location:  "Kantin Fakultas Teknologi Kelautan ITS",
			Latitude:  -7.28192,
			Longitude: 112.79688,
			JamBuka:   "09.00 - 16.00",
			HargaMin:  10000,
			HargaMax:  17000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Bakso_Mie_Ayam_Indonesian_Meatball_and_Noodle_Soup.jpg/500px-Bakso_Mie_Ayam_Indonesian_Meatball_and_Noodle_Soup.jpg",
		},
		{
			Name:      "Nasi Madura Kantin Pusat",
			Category:  "Nasi",
			Location:  "Kantin Pusat ITS",
			Latitude:  -7.28384,
			Longitude: 112.79411,
			JamBuka:   "07.00 - 16.00",
			HargaMin:  12000,
			HargaMax:  20000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bebek_Madura_1.jpg/500px-Bebek_Madura_1.jpg",
		},
		{
			Name:      "Soto Kantin Matematika",
			Category:  "Soto",
			Location:  "Kantin Departemen Matematika ITS",
			Latitude:  -7.2825,
			Longitude: 112.7933,
			JamBuka:   "07.30 - 15.00",
			HargaMin:  10000,
			HargaMax:  16000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/500px-Soto_ayam.JPG",
		},
		{
			Name:      "Pecel Perpustakaan Pusat",
			Category:  "Pecel",
			Location:  "Kantin Perpustakaan Pusat ITS",
			Latitude:  -7.28162,
			Longitude: 112.79547,
			JamBuka:   "07.00 - 15.00",
			HargaMin:  8000,
			HargaMax:  14000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Nasi_Pecel_Surabaya.jpg/500px-Nasi_Pecel_Surabaya.jpg",
		},
		{
			Name:      "Pisang Goreng Kantin Pusat",
			Category:  "Gorengan",
			Location:  "Kantin Pusat ITS",
			Latitude:  -7.28384,
			Longitude: 112.79411,
			JamBuka:   "08.00 - 16.00",
			HargaMin:  2000,
			HargaMax:  7000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pisang_Goreng_di_Car-Free_Day_Jombang_083136.jpg/500px-Pisang_Goreng_di_Car-Free_Day_Jombang_083136.jpg",
		},
		{
			Name:      "Nasi Campur Kantin Informatika",
			Category:  "Nasi",
			Location:  "Kantin Departemen Teknik Informatika ITS",
			Latitude:  -7.27958,
			Longitude: 112.79753,
			JamBuka:   "07.00 - 16.00",
			HargaMin:  12000,
			HargaMax:  20000,
			Image:     "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Nasi_campur%2C_Ubud%2C_Indonesia.jpg/500px-Nasi_campur%2C_Ubud%2C_Indonesia.jpg",
		},
	}

	if err := db.Create(&restaurants).Error; err != nil {
		panic(err)
	}

	fmt.Println("Seed complete: 9 restaurants added")
}

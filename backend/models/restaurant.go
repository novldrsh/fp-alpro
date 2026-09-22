package models

type Restaurant struct {
	ID           int     `json:"id" gorm:"primaryKey"`
	Name         string  `json:"nama"`
	Description  string  `json:"deskripsi"`
	Location     string  `json:"alamat"`
	Category     string  `json:"kategori"`
	Latitude     float64 `json:"lat"`
	Longitude    float64 `json:"lng"`
	JamBuka      string  `json:"jam_buka"`
	HargaMin     int     `json:"harga_min"`
	HargaMax     int     `json:"harga_max"`
	Image        string  `json:"foto_url"`
	RatingRata2  float64 `json:"rating_rata2" gorm:"->;-:migration"`
	JumlahReview int     `json:"jumlah_review" gorm:"->;-:migration"`
}

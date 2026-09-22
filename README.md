# Review Makan Sekitar ITS (MakanITS)

## Deskripsi Project

Aplikasi web full-stack untuk mencari dan menilai tempat makan di sekitar
kampus ITS Surabaya. Pengguna bisa mencari tempat makan, melihat detail dan
menunya, membaca review mahasiswa lain, menulis review sendiri, menyimpan
tempat favorit, serta menambahkan tempat yang belum terdaftar.

Project ini dibuat sebagai Final Project Lab Based Education (LBE) Algoritma
dan Pemrograman 2026, Departemen Teknik Informatika ITS.

| Anggota | NRP | Bagian |
|---|---|---|
| Novaldi Rayhan Asshiddiqi | 5025251188 | Frontend |
| Luthfir Rizqy Fathullah Hanggi | 5025251081 | Backend |

## Status Pengerjaan

| Bagian | Status |
|---|---|
| Frontend (Next.js) | Selesai |
| Backend (Golang + Gin) | Selesai |
| Database (PostgreSQL) | Selesai |
| Frontend tersambung ke backend | Selesai |
| GORM | Selesai |
| Dokumentasi Swagger | Selesai |
| Pengujian Postman | Belum lengkap |

Catatan mengenai baris terakhir: koleksi Postman pada
`backend/postman_collection.json` baru berisi satu request dan belum lengkap.
Pengujian seluruh endpoint beserta kasus gagalnya belum selesai disusun.

Selain itu, **daftar favorit** disimpan di `localStorage`, yaitu penyimpanan
kecil milik browser, bukan di database. Akibatnya favorit hanya muncul di
browser yang menyimpannya. Pilihan tema terang/gelap dan pilihan bahasa juga
disimpan di sana. Data lain (tempat, menu, review) seluruhnya diambil dari
backend.

## Problem

Mahasiswa ITS, terutama mahasiswa baru dan anak kos, sering bingung menentukan
tempat makan di sekitar kampus. Informasi harga, jam buka, dan rasa biasanya
hanya beredar dari mulut ke mulut atau di grup chat angkatan. Masalahnya:

1. Informasi harga dan jam buka tidak terkumpul di satu tempat.
2. Rekomendasi bersifat personal sehingga sulit dibandingkan.
3. Tempat makan baru sulit diketahui karena tidak ada daftar bersama.

Aplikasi ini mengumpulkan informasi tersebut dalam satu daftar yang bisa
dicari dan diisi oleh mahasiswa sendiri.

## Features

### Fitur inti

| Fitur | Keterangan |
|---|---|
| Daftar tempat makan | Menampilkan seluruh tempat dari database dalam bentuk kartu |
| Detail tempat | Menampilkan alamat, kategori, jam buka, kisaran harga, dan rating rata-rata |
| Daftar menu | Menampilkan menu tiap tempat beserta harga dan badge Best Seller atau Rekomendasi |
| Menu kolaboratif | Menu bisa ditambahkan saat membuat tempat, maupun oleh pengguna lain di halaman detail |
| Tulis review | Menambahkan review baru beserta rating 1 sampai 5 |
| Daftar review | Menampilkan seluruh review pada sebuah tempat |
| Tambah tempat | Menambahkan tempat makan baru melalui form |
| Tandai favorit | Menyimpan tempat favorit dan menampilkannya di halaman khusus |
| Peta lokasi | Menampilkan titik lokasi tempat menggunakan Google Maps |
| Unggah foto | Mengunggah foto tempat maupun foto makanan pada review, langsung dari perangkat |

### Pencarian dan penyaringan

| Fitur | Keterangan |
|---|---|
| Pencarian | Mencari berdasarkan nama tempat, kategori, alamat, atau nama menu |
| Filter kategori | Menyaring berdasarkan jenis makanan |
| Filter cepat | Menyaring tempat dengan rating minimal 4.5, atau harga maksimal Rp15.000 |
| Pengurutan | Mengurutkan berdasarkan rating, harga, jumlah review, atau nama |

### Tampilan

| Fitur | Keterangan |
|---|---|
| Tampilan responsif | Tata letak menyesuaikan layar ponsel, tablet, dan desktop |
| Mode terang dan gelap | Tema bisa diganti dan pilihannya diingat browser |
| Dua bahasa | Antarmuka bisa diganti antara Bahasa Indonesia dan Bahasa Inggris, untuk mahasiswa IUP |
| Banner promosi | Banner yang bisa digeser dan mengarah ke halaman tempat terkait |
| Latar bermotif batik | Motif kawung tipis sebagai latar halaman |

### Validasi input

Setiap form menolak input yang tidak sah:

| Kondisi | Pesan | Diperiksa di |
|---|---|---|
| Kolom wajib dikosongkan | Nama, alamat, dan jam buka wajib diisi | Frontend dan backend |
| Harga bukan angka atau negatif | Harga harus berupa angka dan tidak boleh negatif | Frontend dan backend |
| Harga minimum lebih besar dari maksimum | Harga minimum tidak boleh lebih besar dari harga maksimum | Frontend |
| Rating di luar 1 sampai 5 | Rating harus antara 1 sampai 5 | Frontend dan backend |
| Nama tempat sudah terdaftar | Tempat dengan nama itu sudah terdaftar | Frontend dan backend (409) |
| Satu orang menulis review dua kali | Kamu sudah pernah menulis review untuk tempat ini | Frontend saja |

Dua kondisi terakhir adalah kasus **409 Conflict**: datanya sah, tetapi ditolak
karena bentrok dengan data yang sudah ada. Pemeriksaan review ganda saat ini
baru ada di frontend, belum di backend.

## Tech Stack

| Bagian | Teknologi | Status |
|---|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 | Dipakai |
| Package Manager | pnpm 11 | Dipakai |
| Backend | Golang, Gin | Dipakai |
| Database | PostgreSQL | Dipakai |
| ORM | GORM | Dipakai |
| Autentikasi | JWT | Dipakai pada endpoint profil dan favorit |
| Version Control | Git, GitHub | Dipakai |
| Dokumentasi API | Swagger | Dipakai |
| Pengujian API | Postman | Belum lengkap |

## Cara Menjalankan Project

### Kebutuhan

- Node.js dan pnpm
- Go
- PostgreSQL

### 1. Clone repository

```bash
git clone https://github.com/novldrsh/fp-alpro.git
cd fp-alpro
```

### 2. Menyiapkan database

```bash
createdb fp_alpro
psql fp_alpro < backend/database.sql
psql fp_alpro < backend/seed_makanits.sql
```

`database.sql` membuat seluruh tabel. `seed_makanits.sql` mengisi 9 tempat
makan beserta menu dan review-nya.

### 3. Menyiapkan environment variable backend

Buat berkas `backend/.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=fp_alpro
JWT_SECRET=rahasia-fp-alpro
```

Sesuaikan `DB_USER`, `DB_PASSWORD`, dan `DB_NAME` dengan PostgreSQL di
komputer masing-masing.

### 4. Menjalankan backend

```bash
cd backend
go mod tidy
go run .
```

Backend berjalan pada `http://localhost:8080`.

- Uji data: `http://localhost:8080/api/tempat`
- Dokumentasi Swagger: `http://localhost:8080/swagger/index.html`

### 5. Menjalankan frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend berjalan pada `http://localhost:3000`.

**Backend harus dijalankan lebih dulu.** Frontend mengambil seluruh datanya
dari API, sehingga halaman akan kosong bila backend belum hidup.

## Struktur Project

```text
fp-alpro/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              halaman beranda
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   ├── Banner.tsx
│   │   ├── Bahasa.tsx            pengaturan bahasa
│   │   ├── TombolBahasa.tsx
│   │   ├── TombolTema.tsx
│   │   ├── login/
│   │   │   └── page.tsx          halaman login
│   │   ├── favorit/
│   │   │   └── page.tsx          halaman favorit
│   │   └── tempat/
│   │       ├── baru/
│   │       │   └── page.tsx      form tambah tempat
│   │       └── [id]/
│   │           └── page.tsx      halaman detail tempat
│   ├── lib/
│   │   ├── api.ts                pemanggilan REST API ke backend
│   │   ├── data.ts               tipe data dan penyimpanan browser
│   │   ├── bahasa.ts             teks antarmuka dua bahasa
│   │   └── gambar.ts             pengecilan ukuran foto unggahan
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/
│   ├── main.go                   pendaftaran route Gin
│   ├── database.go               koneksi PostgreSQL
│   ├── migration.go              pembuatan tabel
│   ├── seed.go                   pengisian data awal
│   ├── handlers/
│   │   ├── restaurant.go
│   │   ├── review.go
│   │   ├── menu.go
│   │   ├── favorites.go
│   │   ├── auth.go
│   │   └── user.go
│   ├── models/
│   │   ├── restaurant.go
│   │   ├── review.go
│   │   ├── menu.go
│   │   ├── user.go
│   │   └── favorite.go
│   ├── database.sql              skema tabel
│   ├── seed.sql                  data awal versi pertama
│   ├── seed_makanits.sql         data yang dipakai saat ini
│   ├── API_DOCUMENTATION.md      dokumentasi endpoint sementara
│   ├── go.mod
│   └── go.sum
├── .gitignore
├── .env.example
├── PANDUAN_RIZKY.md
└── README.md
```

### Alur Halaman Frontend

```text
Beranda (/)
  |
  +-- Detail Tempat (/tempat/[id])
  |      |
  |      +-- Tulis Review
  |      +-- Tambah Menu
  |      +-- Tandai Favorit
  |
  +-- Tambah Tempat (/tempat/baru)
  |
  +-- Favorit (/favorit)
  |
  +-- Login (/login)
```

## Dokumentasi API

Seluruh endpoint di bawah ini sudah berjalan dan dipakai oleh frontend.

Dokumentasi Swagger tersedia pada `http://localhost:8080/swagger/index.html`
setelah backend dijalankan. Ringkasan endpoint juga ditulis pada
`backend/API_DOCUMENTATION.md` dan pada bagian ini.

### Endpoint utama

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/tempat` | Mengambil seluruh tempat makan |
| GET | `/api/tempat/:id` | Mengambil detail satu tempat makan |
| GET | `/api/tempat/search?name=` | Mencari tempat berdasarkan nama |
| POST | `/api/tempat` | Menambahkan tempat makan baru |
| GET | `/api/tempat/:id/menu` | Mengambil menu satu tempat |
| POST | `/api/tempat/:id/menu` | Menambahkan menu pada satu tempat |
| GET | `/api/tempat/:id/review` | Mengambil seluruh review pada satu tempat |
| POST | `/api/tempat/:id/review` | Menambahkan review pada satu tempat |
| GET | `/api/tempat/:id/rating` | Mengambil rata-rata rating satu tempat |

### Endpoint tambahan

| Method | Endpoint | Perlu login |
|---|---|---|
| POST | `/register` | Tidak |
| POST | `/login` | Tidak |
| GET | `/profile` | Ya |
| GET | `/favorites` | Ya |
| POST | `/favorites/:restaurant_id` | Ya |
| DELETE | `/favorites/:restaurant_id` | Ya |

Fitur utama aplikasi tidak mewajibkan login. Endpoint di atas dibuat sebagai
pengembangan tambahan.

### Entity

```text
Tempat                 Review                  Menu
 |                      |                       |
 +-- id                 +-- id                  +-- id
 +-- nama               +-- tempat_id           +-- tempat_id
 +-- kategori           +-- nama_pengulas       +-- nama
 +-- alamat             +-- rating              +-- harga
 +-- lat                +-- komentar            +-- badge
 +-- lng                +-- created_at
 +-- jam_buka           +-- foto_url
 +-- harga_min
 +-- harga_max
 +-- foto_url
```

Satu `Tempat` memiliki banyak `Review` dan banyak `Menu`.

Kolom `rating_rata2` dan `jumlah_review` tidak disimpan pada tabel `Tempat`,
melainkan dihitung backend dari seluruh `Review` yang terhubung.

Terdapat pula tabel `users` dan `favorites` untuk endpoint tambahan di atas.

### Status Code

| Kode | Kondisi |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 400 | Request tidak valid, misalnya kolom kosong atau rating di luar 1-5 |
| 401 | Belum login pada endpoint yang memerlukan login |
| 404 | Data tidak ditemukan |
| 409 | Request valid tetapi ditolak, misalnya nama tempat sudah terdaftar |
| 500 | Kesalahan pada server |

### Pengujian API

Koleksi Postman ada pada `backend/postman_collection.json`, namun baru berisi
satu request dan belum lengkap. Rencananya setiap endpoint diuji termasuk kasus
gagalnya, untuk memastikan kode 400, 404, dan 409 muncul pada kondisi yang
tepat.

## Kredit Gambar

Foto tempat makan pada data contoh diambil dari Wikimedia Commons dan situs
resmi ITS, dipakai sebagai gambar sementara sampai diganti dengan foto asli
tempatnya.

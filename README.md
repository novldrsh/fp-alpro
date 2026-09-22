# Review Makan Sekitar ITS

## Deskripsi Project

Aplikasi web untuk mencari dan menilai tempat makan di sekitar kampus ITS
Surabaya. Pengguna bisa mencari tempat makan, melihat detail dan menunya,
membaca review mahasiswa lain, menulis review sendiri, menyimpan tempat
favorit, serta menambahkan tempat yang belum terdaftar.

Project ini dibuat sebagai Final Project Lab Based Education (LBE) Algoritma dan
Pemrograman 2026, Departemen Teknik Informatika ITS.

| Anggota | NRP | Bagian |
|---|---|---|
| Novaldi Rayhan Asshiddiqi | 5025251188 | Frontend |
| Luthfir Rizqy Fathullah Hanggi | 5025251081 | Backend |

## Status Pengerjaan

| Bagian | Status |
|---|---|
| Frontend (Next.js) | Selesai dan bisa dijalankan |
| Backend (Golang) | Sedang dikerjakan |
| Database (PostgreSQL) | Menunggu backend |
| Dokumentasi Swagger | Menunggu backend |
| Pengujian Postman | Menunggu backend |

Karena backend belum tersedia, frontend untuk sementara memakai **data contoh**
yang ditulis langsung di berkas `frontend/lib/data.ts`, berisi 9 tempat makan.

Data yang dibuat pengguna disimpan di **localStorage**, yaitu penyimpanan kecil
milik browser di komputer masing-masing. Akibatnya:

- Tempat baru, menu tambahan, dan daftar favorit hanya muncul di browser yang
  membuatnya, tidak terlihat oleh pengguna lain.
- Review yang baru ditulis hilang ketika halaman dimuat ulang, karena review
  belum ikut disimpan.

Penyimpanan sementara ini akan diganti dengan pemanggilan REST API ke backend
begitu backend siap. Bagian antarmuka tidak perlu diubah, hanya sumber datanya.

## Problem

Mahasiswa ITS, terutama mahasiswa baru dan anak kos, sering bingung menentukan
tempat makan di sekitar kampus. Informasi harga, jam buka, dan rasa biasanya
hanya beredar dari mulut ke mulut atau di grup chat angkatan. Masalahnya:

1. Informasi harga dan jam buka tidak terkumpul di satu tempat.
2. Rekomendasi bersifat personal sehingga sulit dibandingkan.
3. Tempat makan baru sulit diketahui karena tidak ada daftar bersama.

Aplikasi ini mengumpulkan informasi tersebut dalam satu daftar yang bisa dicari
dan diisi oleh mahasiswa sendiri.

## Features

### Fitur inti

| Fitur | Keterangan |
|---|---|
| Daftar tempat makan | Menampilkan seluruh tempat dalam bentuk kartu |
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

Setiap form menolak input yang tidak sah. Aturannya dibuat sama dengan aturan
yang nanti dipakai backend, agar pesan yang muncul konsisten:

| Kondisi | Pesan |
|---|---|
| Kolom wajib dikosongkan | Nama, alamat, dan jam buka wajib diisi |
| Harga bukan angka atau negatif | Harga harus berupa angka dan tidak boleh negatif |
| Harga minimum lebih besar dari maksimum | Harga minimum tidak boleh lebih besar dari harga maksimum |
| Rating di luar 1 sampai 5 | Rating harus antara 1 sampai 5 |
| Nama tempat sudah terdaftar | Tempat dengan nama itu sudah terdaftar |
| Satu orang menulis review dua kali | Kamu sudah pernah menulis review untuk tempat ini |

Dua kondisi terakhir adalah kasus **409 Conflict**: datanya sah, tetapi ditolak
karena bentrok dengan data yang sudah ada.

## Tech Stack

| Bagian | Teknologi | Status |
|---|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 | Dipakai |
| Package Manager | pnpm 11 | Dipakai |
| Version Control | Git, GitHub | Dipakai |
| Backend | Golang, Gin | Direncanakan |
| ORM | GORM | Direncanakan |
| Database | PostgreSQL | Direncanakan |
| Dokumentasi API | Swagger | Direncanakan |
| Pengujian API | Postman | Direncanakan |

## Cara Menjalankan Project

### Kebutuhan

- Node.js dan pnpm (untuk frontend)
- Go dan PostgreSQL (untuk backend, setelah backend tersedia)

### 1. Clone repository

```bash
git clone <url-repository>
cd <nama-folder>
```

### 2. Menjalankan frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend berjalan pada `http://localhost:3000` dan sudah bisa dipakai tanpa
backend, memakai data contoh.

### 3. Menjalankan backend (setelah backend tersedia)

```bash
cp .env.example .env
```

Sesuaikan isi `.env` dengan konfigurasi PostgreSQL di komputer masing-masing,
lalu:

```bash
cd backend
go mod tidy
go run ./cmd
```

Backend akan berjalan pada `http://localhost:8080`.

## Struktur Project

```text
project/
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
│   │   ├── favorit/
│   │   │   └── page.tsx          halaman favorit
│   │   └── tempat/
│   │       ├── baru/
│   │       │   └── page.tsx      form tambah tempat
│   │       └── [id]/
│   │           └── page.tsx      halaman detail tempat
│   ├── lib/
│   │   ├── data.ts               data contoh dan penyimpanan browser
│   │   ├── bahasa.ts             teks antarmuka dua bahasa
│   │   └── gambar.ts             pengecilan ukuran foto unggahan
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/                      belum dibuat, rencana struktur di bawah
│   ├── cmd/
│   ├── config/
│   ├── internal/
│   │   ├── handler/
│   │   ├── service/
│   │   ├── repo/
│   │   └── model/
│   ├── api-docs/
│   └── go.mod
├── .gitignore
├── .env.example
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
```

## Dokumentasi API

Bagian ini adalah **rancangan API** yang sudah disepakati antara frontend dan
backend. Nama kolomnya sama persis dengan yang dipakai frontend sekarang, agar
saat backend siap, frontend cukup mengganti sumber datanya.

Setelah backend berjalan, dokumentasi Swagger akan tersedia di
`http://localhost:8080/swagger/index.html`.

### Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/tempat` | Mengambil seluruh tempat makan |
| GET | `/api/tempat/:id` | Mengambil detail satu tempat makan |
| POST | `/api/tempat` | Menambahkan tempat makan baru |
| GET | `/api/tempat/:id/menu` | Mengambil menu satu tempat |
| POST | `/api/tempat/:id/menu` | Menambahkan menu pada satu tempat |
| GET | `/api/tempat/:id/review` | Mengambil seluruh review pada satu tempat |
| POST | `/api/tempat/:id/review` | Menambahkan review pada satu tempat |

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

Kolom `rating_rata2` dan `jumlah_review` tidak disimpan di tabel `Tempat`,
melainkan dihitung dari seluruh `Review` yang terhubung. Di frontend saat ini
kedua angka itu masih berupa data contoh.

### Status Code

| Kode | Kondisi |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 400 | Request tidak valid, misalnya kolom kosong atau rating di luar 1-5 |
| 404 | Data tidak ditemukan |
| 409 | Request valid tetapi ditolak, misalnya nama tempat sudah terdaftar, atau satu orang menulis review dua kali pada tempat yang sama |
| 500 | Kesalahan pada server |

### Rencana Pengujian API

Setiap endpoint akan diuji dengan Postman, termasuk kasus gagalnya, untuk
memastikan kode 400, 404, dan 409 muncul pada kondisi yang tepat.

## Kredit Gambar

Foto tempat makan pada data contoh diambil dari Google dan dipakai
sebagai gambar sementara, sampai diganti dengan foto asli tempatnya.

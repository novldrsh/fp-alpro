# Review Makan Sekitar ITS

## Deskripsi Project

Aplikasi web full-stack untuk mencari dan menilai tempat makan di sekitar kampus
ITS Surabaya. Pengguna dapat mencari tempat makan berdasarkan nama, kategori,
atau lokasi, melihat detail sebuah tempat beserta review dari mahasiswa lain,
menulis review sendiri, menandai tempat sebagai favorit, dan menambahkan tempat
makan baru yang belum terdaftar.

Project ini dibuat sebagai Final Project Lab Based Education (LBE) Algoritma dan
Pemrograman 2026, Departemen Teknik Informatika ITS.

| Anggota | NRP | Bagian |
|---|---|---|
| Novaldi Rayhan Asshiddiqi | 5025251188 | Frontend |
| Rizky | (isi NRP) | Backend |

## Problem

Mahasiswa ITS, terutama mahasiswa baru dan anak kos, sering kesulitan menentukan
tempat makan di sekitar kampus. Informasi mengenai harga, jam buka, dan kualitas
rasa umumnya hanya tersebar lewat obrolan mulut ke mulut atau grup chat angkatan,
sehingga:

1. Informasi harga dan jam buka tidak terkumpul di satu tempat.
2. Rekomendasi bersifat personal dan tidak dapat dibandingkan satu sama lain.
3. Tempat makan baru sulit diketahui karena tidak ada daftar yang diperbarui
   bersama-sama.

Aplikasi ini mengumpulkan informasi tersebut dalam satu daftar yang dapat dicari
dan diisi oleh mahasiswa sendiri.

## Features

| Fitur | Keterangan |
|---|---|
| Daftar tempat makan | Menampilkan seluruh tempat makan dalam bentuk kartu |
| Pencarian | Menyaring tempat berdasarkan nama, kategori, atau alamat |
| Filter kategori | Menyaring tempat berdasarkan jenis makanan |
| Filter cepat | Menyaring tempat dengan rating minimal 4.5 atau harga maksimal Rp15.000 |
| Pengurutan | Mengurutkan berdasarkan rating, harga, jumlah review, atau nama |
| Peta lokasi | Menampilkan titik lokasi tempat makan menggunakan Google Maps |
| Tampilan responsif | Menyesuaikan tata letak untuk layar ponsel, tablet, dan desktop |
| Mode terang dan gelap | Mengganti tema tampilan dan menyimpan pilihannya di browser |
| Dua bahasa | Mengganti antarmuka antara Bahasa Indonesia dan Bahasa Inggris untuk mahasiswa IUP |
| Latar bermotif batik | Motif kawung tipis sebagai latar halaman, menyesuaikan mode terang dan gelap |
| Daftar menu | Menampilkan menu tiap tempat beserta harga dan badge Best Seller atau Rekomendasi |
| Unggah foto tempat | Mengunggah foto dari perangkat saat menambahkan tempat baru |
| Unggah foto review | Mengunggah foto makanan saat menulis review |
| Halaman favorit | Menampilkan seluruh tempat yang disimpan pengguna di satu halaman |
| Banner promosi | Banner yang dapat digeser dan mengarah ke halaman tempat terkait |
| Menu kolaboratif | Menu dapat ditambahkan saat membuat tempat maupun oleh pengguna lain di halaman detail |
| Detail tempat | Menampilkan alamat, kategori, jam buka, kisaran harga, dan rating rata-rata |
| Daftar review | Menampilkan seluruh review pada sebuah tempat |
| Tulis review | Menambahkan review baru beserta rating 1 sampai 5 |
| Tandai favorit | Menyimpan tempat favorit pada penyimpanan browser |
| Tambah tempat | Menambahkan tempat makan baru melalui form |
| Validasi input | Menolak input kosong, rating di luar 1-5, harga negatif, harga minimum lebih besar dari maksimum, serta nama tempat dan nama pengulas yang duplikat |

## Tech Stack

| Bagian | Teknologi |
|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 |
| Package Manager | pnpm 11 |
| Backend | Golang, Gin |
| ORM | GORM |
| Database | PostgreSQL |
| API Documentation | Swagger |
| API Testing | Postman |
| Version Control | Git, GitHub |

## Cara Menjalankan Project

### Kebutuhan

- Node.js dan pnpm
- Go
- PostgreSQL

### 1. Clone repository

```bash
git clone <url-repository>
cd <nama-folder>
```

### 2. Menyiapkan environment variable

```bash
cp .env.example .env
```

Sesuaikan isi `.env` dengan konfigurasi PostgreSQL pada komputer masing-masing.

### 3. Menjalankan backend

```bash
cd backend
go mod tidy
go run ./cmd
```

Backend berjalan pada `http://localhost:8080`.

### 4. Menjalankan frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend berjalan pada `http://localhost:3000`.

## Struktur Project

```text
project/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   ├── Banner.tsx
│   │   ├── Bahasa.tsx
│   │   ├── TombolBahasa.tsx
│   │   ├── TombolTema.tsx
│   │   ├── favorit/
│   │   │   └── page.tsx
│   │   └── tempat/
│   │       ├── baru/
│   │       │   └── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   ├── lib/
│   │   ├── data.ts
│   │   ├── bahasa.ts
│   │   └── gambar.ts
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/
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

Dokumentasi API dibuat menggunakan Swagger dan dapat diakses pada
`http://localhost:8080/swagger/index.html` setelah backend dijalankan.

### Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/tempat` | Mengambil seluruh tempat makan |
| GET | `/api/tempat/:id` | Mengambil detail satu tempat makan |
| POST | `/api/tempat` | Menambahkan tempat makan baru |
| GET | `/api/tempat/:id/review` | Mengambil seluruh review pada satu tempat |
| POST | `/api/tempat/:id/review` | Menambahkan review pada satu tempat |

### Entity

```text
Tempat
 |
 +-- id
 +-- nama
 +-- kategori
 +-- alamat
 +-- lat
 +-- lng
 +-- jam_buka
 +-- harga_min
 +-- harga_max
 +-- foto_url

Review
 |
 +-- id
 +-- tempat_id
 +-- nama_pengulas
 +-- rating
 +-- komentar
 +-- created_at
 +-- foto_url

Menu
 |
 +-- id
 +-- tempat_id
 +-- nama
 +-- harga
 +-- badge
```

Satu `Tempat` memiliki banyak `Review`. Kolom `rating_rata2` dan `jumlah_review`
pada response `Tempat` dihitung dari seluruh `Review` yang terhubung.

### Status Code

| Kode | Kondisi |
|---|---|
| 200 | Permintaan berhasil |
| 201 | Data berhasil dibuat |
| 400 | Request tidak valid, misalnya kolom kosong atau rating di luar 1-5 |
| 404 | Data tidak ditemukan |
| 409 | Request valid tetapi ditolak, misalnya nama tempat sudah terdaftar atau satu orang menulis review dua kali pada tempat yang sama |
| 500 | Kesalahan pada server |

### API Testing

Pengujian API dilakukan menggunakan Postman terhadap seluruh endpoint di atas,
termasuk pengujian kasus gagal untuk memastikan status code 400, 404, dan 409
dikembalikan pada kondisi yang tepat.

## Kredit Gambar

Foto tempat makan pada data contoh diambil dari Wikimedia Commons dan digunakan
sebagai gambar sementara. Foto akan diganti dengan foto asli tempat makan.

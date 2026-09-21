export type Menu = {
  nama: string;
  harga: number;
  badge?: string;
};

export type Tempat = {
  id: number;
  nama: string;
  kategori: string;
  alamat: string;
  lat: number;
  lng: number;
  jam_buka: string;
  harga_min: number;
  harga_max: number;
  foto_url: string;
  rating_rata2: number;
  jumlah_review: number;
  menu: Menu[];
};

export type Review = {
  id: number;
  tempat_id: number;
  nama_pengulas: string;
  rating: number;
  komentar: string;
  created_at: string;
  foto_url?: string;
};

export const DATA_TEMPAT: Tempat[] = [
  {
    id: 1,
    nama: "Bakso Arsitektur",
    kategori: "Bakso",
    alamat: "Kantin Departemen Arsitektur ITS",
    lat: -7.28034,
    lng: 112.79408,
    jam_buka: "09.00 - 16.00",
    harga_min: 10000,
    harga_max: 18000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bakso_khas_Solo.jpg/500px-Bakso_khas_Solo.jpg",
    rating_rata2: 4.6,
    jumlah_review: 34,
    menu: [
      { nama: "Bakso Urat", harga: 15000, badge: "Best Seller" },
      { nama: "Bakso Campur", harga: 17000, badge: "Rekomendasi" },
      { nama: "Bakso Halus", harga: 12000 },
      { nama: "Mie Ayam Bakso", harga: 18000 },
      { nama: "Es Teh", harga: 4000 },
    ],
  },
  {
    id: 2,
    nama: "Gepuk Geprek CCWS IKOMA",
    kategori: "Ayam Geprek",
    alamat: "Kantin CCWS IKOMA ITS",
    lat: -7.281,
    lng: 112.7962,
    jam_buka: "09.00 - 17.00",
    harga_min: 12000,
    harga_max: 20000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Ayam_Gepek_with_original_sauce.jpg/500px-Ayam_Gepek_with_original_sauce.jpg",
    rating_rata2: 4.4,
    jumlah_review: 51,
    menu: [
      { nama: "Geprek Original", harga: 15000, badge: "Best Seller" },
      { nama: "Geprek Keju", harga: 20000, badge: "Rekomendasi" },
      { nama: "Geprek Sambal Matah", harga: 18000 },
      { nama: "Nasi Putih", harga: 5000 },
      { nama: "Es Jeruk", harga: 5000 },
    ],
  },
  {
    id: 3,
    nama: "Sego Jamur Kantin Pusat",
    kategori: "Nasi",
    alamat: "Kantin Pusat ITS",
    lat: -7.28384,
    lng: 112.79411,
    jam_buka: "07.00 - 16.00",
    harga_min: 10000,
    harga_max: 15000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Nasi_Goreng_Jamur_Kuping.jpg/500px-Nasi_Goreng_Jamur_Kuping.jpg",
    rating_rata2: 4.5,
    jumlah_review: 28,
    menu: [
      { nama: "Sego Jamur Komplit", harga: 13000, badge: "Best Seller" },
      { nama: "Sego Jamur Biasa", harga: 10000, badge: "Rekomendasi" },
      { nama: "Sego Jamur Telur", harga: 15000 },
      { nama: "Tempe Goreng", harga: 3000 },
    ],
  },
  {
    id: 4,
    nama: "Bakso FTK",
    kategori: "Bakso",
    alamat: "Kantin Fakultas Teknologi Kelautan ITS",
    lat: -7.28192,
    lng: 112.79688,
    jam_buka: "09.00 - 16.00",
    harga_min: 10000,
    harga_max: 17000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Bakso_Mie_Ayam_Indonesian_Meatball_and_Noodle_Soup.jpg/500px-Bakso_Mie_Ayam_Indonesian_Meatball_and_Noodle_Soup.jpg",
    rating_rata2: 4.2,
    jumlah_review: 19,
    menu: [
      { nama: "Bakso Telur", harga: 15000, badge: "Best Seller" },
      { nama: "Bakso Jumbo", harga: 17000, badge: "Rekomendasi" },
      { nama: "Bakso Biasa", harga: 10000 },
      { nama: "Es Teh", harga: 4000 },
    ],
  },
  {
    id: 5,
    nama: "Nasi Madura Kantin Pusat",
    kategori: "Nasi",
    alamat: "Kantin Pusat ITS",
    lat: -7.28384,
    lng: 112.79411,
    jam_buka: "07.00 - 16.00",
    harga_min: 12000,
    harga_max: 20000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bebek_Madura_1.jpg/500px-Bebek_Madura_1.jpg",
    rating_rata2: 4.3,
    jumlah_review: 40,
    menu: [
      { nama: "Nasi Bebek Madura", harga: 20000, badge: "Best Seller" },
      { nama: "Nasi Ayam Madura", harga: 17000, badge: "Rekomendasi" },
      { nama: "Nasi Campur Madura", harga: 15000 },
      { nama: "Sambal Pencit", harga: 3000 },
    ],
  },
  {
    id: 6,
    nama: "Soto Kantin Matematika",
    kategori: "Soto",
    alamat: "Kantin Departemen Matematika ITS",
    lat: -7.2825,
    lng: 112.7933,
    jam_buka: "07.30 - 15.00",
    harga_min: 10000,
    harga_max: 16000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/500px-Soto_ayam.JPG",
    rating_rata2: 4.1,
    jumlah_review: 16,
    menu: [
      { nama: "Soto Ayam", harga: 13000, badge: "Best Seller" },
      { nama: "Soto Campur Lontong", harga: 14000, badge: "Rekomendasi" },
      { nama: "Soto Daging", harga: 16000 },
      { nama: "Kerupuk", harga: 2000 },
    ],
  },
  {
    id: 7,
    nama: "Pecel Perpustakaan Pusat",
    kategori: "Pecel",
    alamat: "Kantin Perpustakaan Pusat ITS",
    lat: -7.28162,
    lng: 112.79547,
    jam_buka: "07.00 - 15.00",
    harga_min: 8000,
    harga_max: 14000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Nasi_Pecel_Surabaya.jpg/500px-Nasi_Pecel_Surabaya.jpg",
    rating_rata2: 4.7,
    jumlah_review: 23,
    menu: [
      { nama: "Nasi Pecel Telur", harga: 12000, badge: "Best Seller" },
      { nama: "Nasi Pecel Biasa", harga: 8000, badge: "Rekomendasi" },
      { nama: "Nasi Pecel Ayam", harga: 14000 },
      { nama: "Peyek", harga: 2000 },
    ],
  },
  {
    id: 8,
    nama: "Pisang Goreng Kantin Pusat",
    kategori: "Gorengan",
    alamat: "Kantin Pusat ITS",
    lat: -7.28384,
    lng: 112.79411,
    jam_buka: "08.00 - 16.00",
    harga_min: 2000,
    harga_max: 7000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pisang_Goreng_di_Car-Free_Day_Jombang_083136.jpg/500px-Pisang_Goreng_di_Car-Free_Day_Jombang_083136.jpg",
    rating_rata2: 4.0,
    jumlah_review: 12,
    menu: [
      { nama: "Pisang Goreng Original", harga: 2000, badge: "Best Seller" },
      { nama: "Pisang Goreng Coklat", harga: 4000 },
      { nama: "Pisang Goreng Keju", harga: 5000, badge: "Rekomendasi" },
      { nama: "Pisang Goreng Coklat Keju", harga: 6000 },
      { nama: "Pisang Goreng Susu Keju", harga: 7000 },
    ],
  },
  {
    id: 9,
    nama: "Nasi Campur Kantin Informatika",
    kategori: "Nasi",
    alamat: "Kantin Departemen Teknik Informatika ITS",
    lat: -7.27958,
    lng: 112.79753,
    jam_buka: "07.00 - 16.00",
    harga_min: 12000,
    harga_max: 20000,
    foto_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Nasi_campur%2C_Ubud%2C_Indonesia.jpg/500px-Nasi_campur%2C_Ubud%2C_Indonesia.jpg",
    rating_rata2: 4.4,
    jumlah_review: 30,
    menu: [
      { nama: "Nasi Campur Komplit", harga: 20000, badge: "Best Seller" },
      { nama: "Nasi Campur Ayam", harga: 15000, badge: "Rekomendasi" },
      { nama: "Nasi Campur Telur", harga: 12000 },
      { nama: "Es Teh", harga: 4000 },
    ],
  },
];

export const DATA_REVIEW: Review[] = [
  { id: 1, tempat_id: 1, nama_pengulas: "Val", rating: 5, komentar: "Kuahnya gurih, baksonya kenyal, porsinya pas.", created_at: "2026-09-18" },
  { id: 2, tempat_id: 1, nama_pengulas: "Rizky", rating: 4, komentar: "Enak, tapi jam makan siang antrinya panjang.", created_at: "2026-09-19" },
  { id: 3, tempat_id: 2, nama_pengulas: "Dika", rating: 4, komentar: "Cabenya banyak, pedasnya nendang. Sayang nasi tidak bisa nambah.", created_at: "2026-09-17" },
  { id: 4, tempat_id: 3, nama_pengulas: "Sari", rating: 5, komentar: "Jamurnya banyak dan masih hangat, harganya murah.", created_at: "2026-09-20" },
  { id: 5, tempat_id: 7, nama_pengulas: "Bagus", rating: 5, komentar: "Sambel pecelnya juara, cocok buat sarapan sebelum kelas.", created_at: "2026-09-16" },
];

export const KUNCI_TEMPAT = "tempatTambahan";

export function ambilTempatTambahan(): Tempat[] {
  if (typeof window === "undefined") return [];
  try {
    const simpan = localStorage.getItem(KUNCI_TEMPAT);
    const data = simpan ? JSON.parse(simpan) : [];
    return data.map((t: Tempat) => ({ ...t, menu: t.menu ?? [] }));
  } catch {
    return [];
  }
}

export function simpanTempatTambahan(daftar: Tempat[]) {
  localStorage.setItem(KUNCI_TEMPAT, JSON.stringify(daftar));
}

export const KUNCI_MENU = "menuTambahan";

export function ambilMenuTambahan(): Record<number, Menu[]> {
  if (typeof window === "undefined") return {};
  try {
    const simpan = localStorage.getItem(KUNCI_MENU);
    return simpan ? JSON.parse(simpan) : {};
  } catch {
    return {};
  }
}

export function tambahMenu(tempatId: number, menu: Menu) {
  const semua = ambilMenuTambahan();
  const sekarang = semua[tempatId] ?? [];
  semua[tempatId] = [...sekarang, menu];
  localStorage.setItem(KUNCI_MENU, JSON.stringify(semua));
}

export function gabungMenu(tempat: Tempat, tambahan: Record<number, Menu[]>): Menu[] {
  return [...(tempat.menu ?? []), ...(tambahan[tempat.id] ?? [])];
}

export function semuaTempat(): Tempat[] {
  return [...DATA_TEMPAT, ...ambilTempatTambahan()];
}

export const KUNCI_FAVORIT = "tempatFavoritIds";

export function ambilFavorit(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const simpan = localStorage.getItem(KUNCI_FAVORIT);
    return simpan ? JSON.parse(simpan) : [];
  } catch {
    return [];
  }
}

export function simpanFavorit(ids: number[]) {
  localStorage.setItem(KUNCI_FAVORIT, JSON.stringify(ids));
}

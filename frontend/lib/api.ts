import type { Tempat, Review, Menu } from "./data";

const API_URL = "http://localhost:8080";

export async function ambilSemuaTempat(): Promise<Tempat[]> {
  const response = await fetch(`${API_URL}/api/tempat`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data tempat");
  }
  const data = await response.json();
  return data.map((tempat: Omit<Tempat, "menu">) => ({
    ...tempat,
    menu: [],
  }));
}

export async function ambilTempat(id: number): Promise<Tempat> {
  const response = await fetch(`${API_URL}/api/tempat/${id}`);
  if (!response.ok) {
    throw new Error("Tempat tidak ditemukan");
  }
  const tempat = await response.json();
  return {
    ...tempat,
    menu: [],
  };
}

export async function ambilMenu(tempatId: number): Promise<Menu[]> {
  const response = await fetch(
    `${API_URL}/api/tempat/${tempatId}/menu`
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil menu");
  }
  return response.json();
}

export async function ambilReview(tempatId: number): Promise<Review[]> {
  const response = await fetch(
    `${API_URL}/api/tempat/${tempatId}/review`
  );
  if (!response.ok) {
    throw new Error("Gagal mengambil review");
  }
  return response.json();
}

export async function tambahMenu(
  tempatId: number,
  menu: {
    nama: string;
    harga: number;
    badge?: string;
  }
): Promise<Menu> {
  const response = await fetch(
    `${API_URL}/api/tempat/${tempatId}/menu`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    }
  );

  if (!response.ok) {
    throw new Error("Gagal menambahkan menu");
  }

  return response.json();
}

export async function tambahReview(
  tempatId: number,
  review: {
    nama_pengulas: string;
    rating: number;
    komentar: string;
    foto_url?: string;
  }
): Promise<Review> {
  const response = await fetch(
    `${API_URL}/api/tempat/${tempatId}/review`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_pengulas: review.nama_pengulas,
        rating: review.rating,
        komentar: review.komentar,
        foto_url: review.foto_url || "",
      }),
    }
  );

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || "Gagal menambahkan review");
  }

  return response.json();
}

export async function tambahRestoran(data: {
  nama: string;
  kategori: string;
  alamat: string;
  lat: number;
  lng: number;
  jam_buka: string;
  harga_min: number;
  harga_max: number;
  foto_url: string;
}): Promise<Tempat> {
  const response = await fetch(`${API_URL}/api/tempat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const hasil = await response.json();

  if (!response.ok) {
    throw new Error(hasil.message || "Gagal menambahkan restoran");
  }

  return hasil;
}
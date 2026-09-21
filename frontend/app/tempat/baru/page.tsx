"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DATA_TEMPAT,
  ambilTempatTambahan,
  simpanTempatTambahan,
  type Menu,
  type Tempat,
} from "@/lib/data";
import { kompresGambar } from "@/lib/gambar";
import { usePesan } from "@/app/Bahasa";

const KATEGORI = [
  "Bakso",
  "Ayam Geprek",
  "Nasi",
  "Soto",
  "Pecel",
  "Gorengan",
  "Mie",
  "Kopi",
  "Lainnya",
];

const FOTO_BAWAAN =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Nasi_Campur.jpg/500px-Nasi_Campur.jpg";

export default function TambahTempat() {
  const { t: kata } = usePesan();
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Bakso");
  const [alamat, setAlamat] = useState("");
  const [jamBuka, setJamBuka] = useState("");
  const [hargaMin, setHargaMin] = useState("");
  const [hargaMax, setHargaMax] = useState("");
  const [foto, setFoto] = useState("");
  const [error, setError] = useState("");
  const [menu, setMenu] = useState<Menu[]>([]);
  const [menuNama, setMenuNama] = useState("");
  const [menuHarga, setMenuHarga] = useState("");
  const [menuBadge, setMenuBadge] = useState("");
  const [errorMenu, setErrorMenu] = useState("");

  async function pilihFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const berkas = e.target.files?.[0];
    if (!berkas) return;
    if (!berkas.type.startsWith("image/")) {
      setError(kata.foto_bukan_gambar);
      return;
    }
    if (berkas.size > 8 * 1024 * 1024) {
      setError(kata.foto_terlalu_besar);
      return;
    }
    try {
      setFoto(await kompresGambar(berkas));
      setError("");
    } catch {
      setError(kata.foto_gagal);
    }
  }

  function tambahBaris() {
    setErrorMenu("");
    if (!menuNama.trim()) {
      setErrorMenu(kata.menu_err_nama);
      return;
    }
    const harga = Number(menuHarga);
    if (!menuHarga.trim() || Number.isNaN(harga) || harga < 0) {
      setErrorMenu(kata.baru_menu_err_harga);
      return;
    }
    if (menu.some((m) => m.nama.toLowerCase() === menuNama.trim().toLowerCase())) {
      setErrorMenu(kata.baru_menu_err_kembar);
      return;
    }
    setMenu([...menu, { nama: menuNama.trim(), harga: harga, badge: menuBadge || undefined }]);
    setMenuNama("");
    setMenuHarga("");
    setMenuBadge("");
  }

  function hapusBaris(nama: string) {
    setMenu(menu.filter((m) => m.nama !== nama));
  }

  function simpan(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!nama.trim() || !alamat.trim() || !jamBuka.trim()) {
      setError(kata.baru_err_wajib);
      return;
    }

    const min = Number(hargaMin);
    const max = Number(hargaMax);

    if (!hargaMin.trim() || !hargaMax.trim() || Number.isNaN(min) || Number.isNaN(max)) {
      setError(kata.baru_err_angka);
      return;
    }
    if (min < 0 || max < 0) {
      setError(kata.baru_err_negatif);
      return;
    }
    if (min > max) {
      setError(kata.baru_err_urutan);
      return;
    }

    const tambahan = ambilTempatTambahan();
    const semua = [...DATA_TEMPAT, ...tambahan];

    const kembar = semua.some(
      (t) => t.nama.trim().toLowerCase() === nama.trim().toLowerCase()
    );
    if (kembar) {
      setError(kata.baru_err_kembar);
      return;
    }

    const idBaru = Math.max(0, ...semua.map((t) => t.id)) + 1;

    const baru: Tempat = {
      id: idBaru,
      nama: nama.trim(),
      kategori: kategori,
      alamat: alamat.trim(),
      lat: -7.2819,
      lng: 112.7947,
      jam_buka: jamBuka.trim(),
      harga_min: min,
      harga_max: max,
      foto_url: foto || FOTO_BAWAAN,
      rating_rata2: 0,
      jumlah_review: 0,
      menu: menu,
    };

    try {
      simpanTempatTambahan([...tambahan, baru]);
    } catch {
      setError(kata.baru_err_penuh);
      return;
    }
    router.push("/tempat/" + idBaru);
  }

  const gayaInput =
    "w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm outline-none focus:border-teal-500 gelap:bg-white/10 gelap:border-white/15";

  return (
    <main className="corak min-h-screen px-4 py-10 text-slate-900 gelap:text-slate-100">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full kaca px-4 py-2 text-sm font-medium text-teal-700 gelap:text-teal-300">
          &larr; {kata.detail_ke_beranda}
        </Link>

        <h1 className="mt-4 font-merek text-3xl font-bold">{kata.baru_judul}</h1>
        <p className="mt-2 text-slate-600 gelap:text-slate-400">
          {kata.baru_isi}
        </p>

        <form onSubmit={simpan} className="mt-8 space-y-5 rounded-3xl kaca p-6">
          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="nama">
              {kata.baru_nama}
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Bakso Teknik Kimia"
              className={gayaInput}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="kategori">
              {kata.baru_kategori}
            </label>
            <select
              id="kategori"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className={gayaInput}>
              {KATEGORI.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="alamat">
              {kata.baru_alamat}
            </label>
            <input
              id="alamat"
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Kantin Departemen Teknik Kimia ITS"
              className={gayaInput}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="jam">
              {kata.baru_jam}
            </label>
            <input
              id="jam"
              type="text"
              value={jamBuka}
              onChange={(e) => setJamBuka(e.target.value)}
              placeholder="07.00 - 16.00"
              className={gayaInput}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="min">
                {kata.baru_min}
              </label>
              <input
                id="min"
                type="number"
                value={hargaMin}
                onChange={(e) => setHargaMin(e.target.value)}
                placeholder="8000"
                className={gayaInput}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="max">
                {kata.baru_max}
              </label>
              <input
                id="max"
                type="number"
                value={hargaMax}
                onChange={(e) => setHargaMax(e.target.value)}
                placeholder="15000"
                className={gayaInput}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="foto">
              {kata.baru_foto}
            </label>
            <input
              id="foto"
              type="file"
              accept="image/*"
              onChange={pilihFoto}
              className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white gelap:bg-white/10 gelap:border-white/15"
            />
            {foto && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={foto}
                  alt={kata.foto_pratinjau_tempat}
                  className="h-24 w-32 rounded-2xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFoto("")}
                  className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-red-600 gelap:bg-white/10">
                  {kata.baru_foto_hapus}
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white/50 p-4 gelap:bg-white/5">
            <p className="text-sm font-semibold">{kata.baru_menu_judul}</p>
            <p className="mt-1 text-xs text-slate-500 gelap:text-slate-400">
              {kata.baru_menu_isi}
            </p>

            {errorMenu && (
              <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMenu}
              </p>
            )}

            {menu.length > 0 && (
              <ul className="mt-3 divide-y divide-white/60 gelap:divide-white/10">
                {menu.map((m) => (
                  <li key={m.nama} className="flex flex-wrap items-center gap-2 py-2.5">
                    <span className="font-medium">{m.nama}</span>
                    {m.badge === "Best Seller" && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                        &#9733; {kata.badge_best}
                      </span>
                    )}
                    {m.badge === "Rekomendasi" && (
                      <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-800">
                        {kata.badge_rekomendasi}
                      </span>
                    )}
                    <span className="ml-auto font-semibold">
                      Rp{new Intl.NumberFormat("id-ID").format(m.harga)}
                    </span>
                    <button
                      type="button"
                      onClick={() => hapusBaris(m.nama)}
                      aria-label={kata.baru_menu_hapus(m.nama)}
                      className="rounded-full px-2 py-1 text-sm text-red-600 hover:bg-white/70">
                      &#10005;
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                type="text"
                value={menuNama}
                onChange={(e) => setMenuNama(e.target.value)}
                placeholder={kata.menu_nama}
                aria-label={kata.menu_nama}
                className={gayaInput}
              />
              <input
                type="number"
                value={menuHarga}
                onChange={(e) => setMenuHarga(e.target.value)}
                placeholder={kata.menu_harga}
                aria-label={kata.menu_harga}
                className={gayaInput}
              />
              <select
                value={menuBadge}
                onChange={(e) => setMenuBadge(e.target.value)}
                aria-label={kata.menu_badge}
                className={gayaInput}>
                <option value="">{kata.menu_tanpa_badge}</option>
                <option value="Best Seller">{kata.badge_best}</option>
                <option value="Rekomendasi">{kata.badge_rekomendasi}</option>
              </select>
            </div>

            <button
              type="button"
              onClick={tambahBaris}
              className="mt-3 rounded-2xl bg-white/70 px-5 py-2.5 text-sm font-semibold text-teal-700 transition hover:bg-white gelap:bg-white/10 gelap:text-teal-300">
              {kata.baru_menu_tambah}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700">
            {kata.baru_simpan}
          </button>
        </form>
      </div>
    </main>
  );
}

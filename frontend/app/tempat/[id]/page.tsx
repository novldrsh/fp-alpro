"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  DATA_TEMPAT,
  DATA_REVIEW,
  KUNCI_FAVORIT,
  ambilMenuTambahan,
  ambilTempatTambahan,
  gabungMenu,
  type Menu,
  type Review,
  type Tempat,
} from "@/lib/data";
import {
  ambilTempat,
  ambilMenu,
  ambilReview,
  tambahReview,
  tambahMenu,
} from "@/lib/api";
import { kompresGambar } from "@/lib/gambar";
import TombolTema from "@/app/TombolTema";
import TombolBahasa from "@/app/TombolBahasa";
import { usePesan } from "@/app/Bahasa";

function rupiah(n: number) {
  return "Rp" + new Intl.NumberFormat("id-ID").format(n);
}

function bintang(n: number) {
  return "\u2605".repeat(n) + "\u2606".repeat(5 - n);
}

export default function DetailTempat() {
  const { t: kata } = usePesan();
  const params = useParams();
  const id = Number(params.id);

  const [tempat, setTempat] = useState<Tempat | undefined>(undefined);
  const [siap, setSiap] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [favoritIds, setFavoritIds] = useState<number[]>([]);
  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(5);
  const [komentar, setKomentar] = useState("");
  const [fotoReview, setFotoReview] = useState("");
  const [error, setError] = useState("");
  const [menuTambahan, setMenuTambahan] = useState<Record<number, Menu[]>>({});
  const [menuNama, setMenuNama] = useState("");
  const [menuHarga, setMenuHarga] = useState("");
  const [menuBadge, setMenuBadge] = useState("");
  const [errorMenu, setErrorMenu] = useState("");
  const [bukaMenu, setBukaMenu] = useState(false);

  useEffect(() => {
    async function ambilData() {
      try {
        const dataTempat = await ambilTempat(id);
        const dataMenu = await ambilMenu(id);
        const dataReview = await ambilReview(id);
        setTempat({
          ...dataTempat,
          menu: dataMenu,
        });
        setReviews(Array.isArray(dataReview) ? dataReview : []);
        setSiap(true);
      } catch (error) {
        console.error(error);
        setSiap(true);
      }
    }
    ambilData();
  }, [id]);

  useEffect(() => {
    try {
      const simpan = localStorage.getItem(KUNCI_FAVORIT);
      setFavoritIds(simpan ? JSON.parse(simpan) : []);
    } catch {
      localStorage.removeItem(KUNCI_FAVORIT);
    }
  }, []);

  if (!tempat) {
    if (!siap) return null;

    return (
      <main className="corak flex min-h-screen items-center justify-center px-4">
        <div className="rounded-3xl kaca p-10 text-center">
          <p className="text-lg font-semibold">{kata.detail_hilang}</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-700">
            {kata.detail_ke_beranda}
          </Link>
        </div>
      </main>
    );
  }

  const isFavorit = favoritIds.includes(tempat.id);
  const rataRata =
    reviews.length === 0
      ? 0
      : reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  const menu = tempat.menu;
  const peta =
    "https://maps.google.com/maps?q=" + tempat.lat + "," + tempat.lng + "&z=17&output=embed";

  function toggleFavorit() {
    setFavoritIds((sekarang) => {
      const berikutnya = sekarang.includes(id)
        ? sekarang.filter((x) => x !== id)
        : [...sekarang, id];
      localStorage.setItem(KUNCI_FAVORIT, JSON.stringify(berikutnya));
      return berikutnya;
    });
  }

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
      setFotoReview(await kompresGambar(berkas));
      setError("");
    } catch {
      setError(kata.foto_gagal);
    }
  }

    async function kirimMenu(e: React.FormEvent) {
      e.preventDefault();
      setErrorMenu("");

      if (!menuNama.trim()) {
        setErrorMenu(kata.menu_err_nama);
        return;
      }

      const harga = Number(menuHarga);

      if (!menuHarga.trim() || Number.isNaN(harga)) {
        setErrorMenu(kata.menu_err_harga);
        return;
      }

      if (harga < 0) {
        setErrorMenu(kata.menu_err_negatif);
        return;
      }

      const kembar = menu.some(
        (m) => m.nama.trim().toLowerCase() === menuNama.trim().toLowerCase()
      );

      if (kembar) {
        setErrorMenu(kata.menu_err_kembar);
        return;
      }

      try {
        await tambahMenu(id, {
          nama: menuNama.trim(),
          harga: harga,
          badge: menuBadge || undefined,
        });

        const dataMenu = await ambilMenu(id);

        setTempat((sekarang) =>
          sekarang
            ? {
                ...sekarang,
                menu: Array.isArray(dataMenu) ? dataMenu : [],
              }
            : sekarang
        );

        setMenuNama("");
        setMenuHarga("");
        setMenuBadge("");
        setBukaMenu(false);
      } catch (error) {
        console.error(error);
        setErrorMenu("Gagal menambahkan menu");
      }
    }
  
    async function kirimReview(e: React.FormEvent) {
      e.preventDefault();
      setError("");

      if (!nama.trim() || !komentar.trim()) {
        setError(kata.review_err_kosong);
        return;
      }

      if (rating < 1 || rating > 5) {
        setError(kata.review_err_rating);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Silakan login terlebih dahulu");
        return;
      }

      try {
        await tambahReview(
          id,
          {
            rating: rating,
            komentar: komentar.trim(),
            foto_url: fotoReview || undefined,
          },
          token
        );

        const dataReview = await ambilReview(id);
        setReviews(Array.isArray(dataReview) ? dataReview : []);

        setNama("");
        setKomentar("");
        setRating(5);
        setFotoReview("");
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Gagal menambahkan review");
        }
      }
    }

  const gayaInput =
    "w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm outline-none focus:border-teal-500 gelap:bg-white/10 gelap:border-white/15";

  return (
    <main className="corak min-h-screen pb-16 text-slate-900 gelap:text-slate-100">
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <img
          src={tempat.foto_url}
          alt={tempat.nama}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="absolute left-0 top-0 flex w-full items-center justify-between p-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full kaca-gelap px-4 py-2 text-sm font-medium text-white">
            &larr; {kata.detail_kembali}
          </Link>
          <div className="flex items-center gap-2">
            <TombolBahasa />
            <TombolTema />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 pb-12 sm:p-6 sm:pb-16">
          <div className="mx-auto max-w-4xl">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {tempat.kategori}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-4xl">
              {tempat.nama}
            </h1>
            <p className="mt-1 text-sm text-white/85">{tempat.alamat}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4">
        <div className="-mt-6 rounded-3xl kaca p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-amber-500">
                {rataRata.toFixed(1)}
              </span>
              <span className="text-sm text-slate-500 gelap:text-slate-400">/ 5</span>
            </div>
            <span className="text-sm text-slate-500 gelap:text-slate-400">
              {kata.detail_dari_review(reviews.length)}
            </span>

            <button
              type="button"
              onClick={toggleFavorit}
              aria-pressed={isFavorit}
              className={
                "ml-auto rounded-full px-5 py-2.5 text-sm font-semibold transition " +
                (isFavorit
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/25"
                  : "bg-teal-700 text-white hover:bg-teal-800")
              }>
              {isFavorit ? "\u2665 " + kata.detail_tersimpan : "\u2661 " + kata.detail_simpan}
            </button>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/50 pt-5 sm:grid-cols-4 gelap:border-white/10">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 gelap:text-slate-400">
                {kata.detail_kategori}
              </p>
              <p className="mt-1 font-medium">{tempat.kategori}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 gelap:text-slate-400">
                {kata.detail_jam}
              </p>
              <p className="mt-1 font-medium">{tempat.jam_buka}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 gelap:text-slate-400">
                {kata.detail_harga}
              </p>
              <p className="mt-1 font-medium">
                {rupiah(tempat.harga_min)} - {rupiah(tempat.harga_max)}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-6 rounded-3xl kaca p-5 sm:p-6">
          <h2 className="font-merek text-xl font-bold">{kata.detail_menu}</h2>

          {menu.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500 gelap:text-slate-400">
              {kata.detail_menu_kosong}
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-white/50 gelap:divide-white/10">
              {menu.map((m) => (
                <li
                  key={m.nama}
                  className="flex flex-wrap items-center gap-2 py-3 first:pt-0 last:pb-0">
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
                  <span className="ml-auto font-semibold">{rupiah(m.harga)}</span>
                </li>
              ))}
            </ul>
          )}

          {!bukaMenu ? (
            <button
              type="button"
              onClick={() => setBukaMenu(true)}
              className="mt-5 w-full rounded-2xl border border-dashed border-teal-400 px-4 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 gelap:text-teal-300 gelap:hover:bg-white/5">
              {kata.menu_tambah_tombol}
            </button>
          ) : (
            <form onSubmit={kirimMenu} className="mt-5 space-y-3 rounded-2xl bg-white/50 p-4 gelap:bg-white/5">
              <p className="text-sm font-semibold">{kata.menu_tambah_judul}</p>
              {errorMenu && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMenu}
                </p>
              )}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-2xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">
                  {kata.menu_simpan}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBukaMenu(false);
                    setErrorMenu("");
                  }}
                  className="rounded-2xl bg-white/70 px-5 py-2.5 text-sm font-medium gelap:bg-white/10">
                  {kata.menu_batal}
                </button>
              </div>
              <p className="text-xs text-slate-500 gelap:text-slate-400">
                {kata.menu_catatan}
              </p>
            </form>
          )}
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl kaca">
          <div className="flex items-center justify-between gap-3 p-5 pb-3">
            <h2 className="font-merek text-xl font-bold">{kata.detail_lokasi}</h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${tempat.lat},${tempat.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-teal-700 hover:underline gelap:text-teal-300">
              {kata.detail_peta_link}
            </a>
          </div>
          <iframe
            src={peta}
            title={kata.detail_peta_judul(tempat.nama)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-64 w-full border-0 sm:h-80"
          />
        </section>

        <section className="mt-6 rounded-3xl kaca p-5 sm:p-6">
          <h2 className="font-merek text-xl font-bold">{kata.review_judul}</h2>

          <form onSubmit={kirimReview} className="mt-4 space-y-4">
            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="nama">
                  {kata.review_nama}
                </label>
                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder={kata.review_nama_placeholder}
                  className={gayaInput}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="rating">
                  {kata.review_rating}
                </label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className={gayaInput}>
                  <option value={5}>{kata.rating5}</option>
                  <option value={4}>{kata.rating4}</option>
                  <option value={3}>{kata.rating3}</option>
                  <option value={2}>{kata.rating2}</option>
                  <option value={1}>{kata.rating1}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="komentar">
                {kata.review_komentar}
              </label>
              <textarea
                id="komentar"
                value={komentar}
                onChange={(e) => setKomentar(e.target.value)}
                rows={3}
                placeholder={kata.review_komentar_placeholder}
                className={gayaInput}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="fotoReview">
                {kata.review_foto}
              </label>
              <input
                id="fotoReview"
                type="file"
                accept="image/*"
                onChange={pilihFoto}
                className="w-full rounded-2xl border border-white/60 bg-white/80 px-4 py-3 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white gelap:bg-white/10 gelap:border-white/15"
              />
              {fotoReview && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={fotoReview}
                    alt={kata.foto_pratinjau_review}
                    className="h-24 w-32 rounded-2xl object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFotoReview("")}
                    className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-red-600 gelap:bg-white/10">
                    {kata.baru_foto_hapus}
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 sm:w-auto sm:px-8">
              {kata.review_kirim}
            </button>
          </form>
        </section>

        <section className="mt-6">
          <h2 className="font-merek text-xl font-bold">{kata.review_daftar(reviews.length)}</h2>

          {reviews.length === 0 ? (
            <p className="mt-4 rounded-3xl kaca p-8 text-center text-sm text-slate-500 gelap:text-slate-400">
              {kata.review_kosong}
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {reviews.map((r) => (
                <article key={r.id} className="rounded-3xl kaca p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 font-semibold text-white">
                      {r.nama_pengulas.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p className="font-semibold">{r.nama_pengulas}</p>
                      <p className="text-sm text-amber-500">{bintang(r.rating)}</p>
                    </div>
                    <span className="ml-auto text-xs text-slate-400">{r.created_at}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-700 gelap:text-slate-300">
                    {r.komentar}
                  </p>
                  {r.foto_url && (
                    <img
                      src={r.foto_url}
                      alt={kata.review_foto_dari(r.nama_pengulas)}
                      className="mt-3 max-h-64 w-full rounded-2xl object-cover"
                    />
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

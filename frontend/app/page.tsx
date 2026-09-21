"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ambilTempatTambahan,
  ambilMenuTambahan,
  gabungMenu,
  type Menu,
  type Tempat,
} from "@/lib/data";
import { ambilSemuaTempat } from "@/lib/api";
import Header from "./Header";
import Banner from "./Banner";
import { usePesan } from "./Bahasa";

const KATEGORI = ["Semua", "Bakso", "Ayam Geprek", "Nasi", "Soto", "Pecel", "Gorengan"];

const URUTAN = ["rating", "murah", "mahal", "populer", "nama"] as const;

function rupiah(n: number) {
  return "Rp" + new Intl.NumberFormat("id-ID").format(n);
}

export default function Home() {
  const { t: kata } = usePesan();
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("rating");
  const [hanyaBagus, setHanyaBagus] = useState(false);
  const [hanyaMurah, setHanyaMurah] = useState(false);
  const [tambahan, setTambahan] = useState<Tempat[]>([]);
  const [menuTambahan, setMenuTambahan] = useState<Record<number, Menu[]>>({});
  const [tempatBackend, setTempatBackend] = useState<Tempat[]>([]);

  useEffect(() => {
    setTambahan(ambilTempatTambahan());
    setMenuTambahan(ambilMenuTambahan());
    ambilSemuaTempat()
      .then((data) => {
        setTempatBackend(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const semua = useMemo(
    () => [...tempatBackend, ...tambahan],
    [tempatBackend, tambahan]
  );

  const hasil = useMemo(() => {
    const kata = cari.trim().toLowerCase();
    const saring = semua.filter((t) => {
      const namaMenu = gabungMenu(t, menuTambahan).map((m) => m.nama).join(" ");
      const teks = (t.nama + " " + t.kategori + " " + t.alamat + " " + namaMenu).toLowerCase();
      if (kata && !teks.includes(kata)) return false;
      if (kategori !== "Semua" && t.kategori !== kategori) return false;
      if (hanyaBagus && t.rating_rata2 < 4.5) return false;
      if (hanyaMurah && t.harga_max > 15000) return false;
      return true;
    });

    const urutkan = [...saring];
    if (urut === "rating") urutkan.sort((a, b) => b.rating_rata2 - a.rating_rata2);
    if (urut === "murah") urutkan.sort((a, b) => a.harga_min - b.harga_min);
    if (urut === "mahal") urutkan.sort((a, b) => b.harga_max - a.harga_max);
    if (urut === "populer") urutkan.sort((a, b) => b.jumlah_review - a.jumlah_review);
    if (urut === "nama") urutkan.sort((a, b) => a.nama.localeCompare(b.nama));
    return urutkan;
  }, [semua, menuTambahan, cari, kategori, urut, hanyaBagus, hanyaMurah]);

  function bersihkan() {
    setCari("");
    setKategori("Semua");
    setHanyaBagus(false);
    setHanyaMurah(false);
    setUrut("rating");
  }

  const adaSaringan = cari !== "" || kategori !== "Semua" || hanyaBagus || hanyaMurah;

  const labelUrut: Record<string, string> = {
    rating: kata.urut_rating,
    murah: kata.urut_murah,
    mahal: kata.urut_mahal,
    populer: kata.urut_populer,
    nama: kata.urut_nama,
  };

  return (
    <main className="corak min-h-screen pb-16 text-slate-900 gelap:text-slate-100">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-500 px-4 pb-16 pt-10 text-white">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <h1 className="font-merek text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {kata.hero_judul}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/90 sm:text-base">
            {kata.hero_isi}
          </p>

          <div className="mt-7 rounded-3xl kaca-gelap p-3 sm:p-4">
            <input
              type="text"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder={kata.cari_placeholder}
              aria-label={kata.cari_label}
              className="w-full rounded-2xl border border-white/40 bg-white/90 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-white"
            />

            <div className="mt-3 flex gap-2 geser-x pb-1">
              <button
                type="button"
                onClick={() => setHanyaBagus(!hanyaBagus)}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition " +
                  (hanyaBagus
                    ? "bg-slate-900 text-white"
                    : "bg-white/85 text-slate-700 hover:bg-white")
                }>
                {kata.chip_rating} &#9733;
              </button>
              <button
                type="button"
                onClick={() => setHanyaMurah(!hanyaMurah)}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition " +
                  (hanyaMurah
                    ? "bg-slate-900 text-white"
                    : "bg-white/85 text-slate-700 hover:bg-white")
                }>
                {kata.chip_hemat}
              </button>
              {adaSaringan && (
                <button
                  type="button"
                  onClick={bersihkan}
                  className="shrink-0 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-teal-700 hover:bg-white">
                  {kata.chip_reset}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-4">
        <div className="rounded-3xl kaca p-3">
          <div className="flex gap-2 geser-x">
            {KATEGORI.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKategori(k)}
                className={
                  "shrink-0 rounded-2xl px-4 py-2 text-sm font-medium transition " +
                  (kategori === k
                    ? "bg-teal-600 text-white shadow-md shadow-teal-600/30"
                    : "bg-white/70 text-slate-700 hover:bg-white gelap:bg-white/10 gelap:text-slate-200")
                }>
                {k === "Semua" ? kata.kategori_semua : k}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-4">
        <Banner daftar={semua} />
      </div>

      <section className="mx-auto mt-10 max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-merek text-2xl font-bold">
              {kategori === "Semua" ? kata.daftar_semua : kategori}
            </h2>
            <p className="text-sm text-slate-500 gelap:text-slate-400">
              {kata.menampilkan(hasil.length, semua.length)}
            </p>
          </div>

          <div className="flex gap-1.5 geser-x rounded-full kaca p-1.5">
            {URUTAN.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUrut(u)}
                className={
                  "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition " +
                  (urut === u
                    ? "bg-teal-600 text-white"
                    : "text-slate-600 hover:bg-white/70 gelap:text-slate-300 gelap:hover:bg-white/10")
                }>
                {labelUrut[u]}
              </button>
            ))}
          </div>
        </div>

        {hasil.length === 0 ? (
          <div className="mt-6 rounded-3xl kaca p-10 text-center">
            <p className="text-lg font-semibold">{kata.kosong_judul}</p>
            <p className="mt-1 text-sm text-slate-500 gelap:text-slate-400">
              {kata.kosong_isi}
            </p>
            <button
              type="button"
              onClick={bersihkan}
              className="mt-4 rounded-full bg-teal-600 px-5 py-2 text-sm font-semibold text-white hover:bg-teal-700">
              {kata.kosong_tombol}
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hasil.map((t) => {
              const unggulan = gabungMenu(t, menuTambahan).find(
                (m) => m.badge === "Best Seller"
              );
              return (
                <Link
                  key={t.id}
                  href={`/tempat/${t.id}`}
                  className="group flex flex-col overflow-hidden rounded-3xl kaca transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-44 w-full shrink-0 overflow-hidden">
                    <img
                      src={t.foto_url}
                      alt={t.nama}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {t.kategori}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 min-h-[2.75rem] flex-1 font-semibold leading-snug">
                        {t.nama}
                      </h3>
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                        <span>&#9733;</span>
                        {t.rating_rata2}
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-1 text-sm text-slate-500 gelap:text-slate-400">
                      {t.alamat}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 gelap:text-slate-400">
                      {t.jam_buka}
                    </p>

                    {unggulan && (
                      <p className="mt-3 line-clamp-1 text-sm">
                        <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-xs font-semibold text-emerald-800">
                          {kata.badge_best}
                        </span>{" "}
                        <span className="text-slate-700 gelap:text-slate-300">
                          {unggulan.nama}
                        </span>
                      </p>
                    )}

                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/50 pt-3 text-sm gelap:border-white/10">
                      <span className="font-semibold">
                        {rupiah(t.harga_min)} - {rupiah(t.harga_max)}
                      </span>
                      <span className="shrink-0 text-xs text-slate-500 gelap:text-slate-400">
                        {kata.kartu_review(t.jumlah_review)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

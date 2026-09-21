"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DATA_TEMPAT,
  ambilFavorit,
  ambilTempatTambahan,
  simpanFavorit,
  type Tempat,
} from "@/lib/data";
import Header from "../Header";
import { usePesan } from "../Bahasa";

function rupiah(n: number) {
  return "Rp" + new Intl.NumberFormat("id-ID").format(n);
}

export default function Favorit() {
  const { t: kata } = usePesan();
  const [ids, setIds] = useState<number[]>([]);
  const [semua, setSemua] = useState<Tempat[]>(DATA_TEMPAT);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    setSemua([...DATA_TEMPAT, ...ambilTempatTambahan()]);
    setIds(ambilFavorit());
    setSiap(true);
  }, []);

  const daftar = semua.filter((t) => ids.includes(t.id));

  function hapus(id: number) {
    const berikutnya = ids.filter((x) => x !== id);
    setIds(berikutnya);
    simpanFavorit(berikutnya);
  }

  return (
    <main className="corak min-h-screen pb-16 text-slate-900 gelap:text-slate-100">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-merek text-3xl font-bold">{kata.fav_judul}</h1>
        <p className="mt-2 text-slate-600 gelap:text-slate-400">
          {kata.fav_isi}
        </p>

        {!siap ? null : daftar.length === 0 ? (
          <div className="mt-8 rounded-3xl kaca p-10 text-center">
            <p className="text-5xl">&#9825;</p>
            <p className="mt-4 text-lg font-semibold">{kata.fav_kosong_judul}</p>
            <p className="mt-1 text-sm text-slate-500 gelap:text-slate-400">
              {kata.fav_kosong_isi}
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">
              {kata.fav_kosong_tombol}
            </Link>
          </div>
        ) : (
          <>
            <p className="mt-6 text-sm text-slate-500 gelap:text-slate-400">
              {kata.fav_jumlah(daftar.length)}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {daftar.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col overflow-hidden rounded-3xl kaca transition hover:shadow-xl">
                  <Link href={`/tempat/${t.id}`} className="relative h-44 w-full shrink-0 overflow-hidden">
                    <img src={t.foto_url} alt={t.nama} className="h-full w-full object-cover" />
                    <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {t.kategori}
                    </span>
                  </Link>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/tempat/${t.id}`}
                        className="line-clamp-2 min-h-[2.75rem] flex-1 font-semibold leading-snug hover:underline">
                        {t.nama}
                      </Link>
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                        <span>&#9733;</span>
                        {t.rating_rata2}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-slate-500 gelap:text-slate-400">
                      {t.alamat}
                    </p>
                    <p className="mt-3 font-semibold">
                      {rupiah(t.harga_min)} - {rupiah(t.harga_max)}
                    </p>

                    <button
                      type="button"
                      onClick={() => hapus(t.id)}
                      className="mt-auto rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-white gelap:bg-white/10">
                      {kata.fav_hapus}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

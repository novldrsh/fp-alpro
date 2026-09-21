"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Tempat } from "@/lib/data";
import { usePesan } from "./Bahasa";

type Promosi = {
  id: number;
  tempatId: number;
  warna: string;
};

const PROMOSI: Promosi[] = [
  { id: 1, tempatId: 2, warna: "from-rose-600 to-orange-500" },
  { id: 2, tempatId: 8, warna: "from-amber-500 to-yellow-500" },
  { id: 3, tempatId: 7, warna: "from-emerald-600 to-teal-500" },
  { id: 4, tempatId: 3, warna: "from-cyan-600 to-sky-500" },
];

export default function Banner({ daftar }: { daftar: Tempat[] }) {
  const { t } = usePesan();
  const wadah = useRef<HTMLDivElement>(null);
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    const jeda = setInterval(() => {
      setAktif((n) => (n + 1) % PROMOSI.length);
    }, 5000);
    return () => clearInterval(jeda);
  }, []);

  useEffect(() => {
    const el = wadah.current;
    if (!el) return;
    const anak = el.children[aktif] as HTMLElement | undefined;
    if (anak) el.scrollTo({ left: anak.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, [aktif]);

  function geser(arah: number) {
    setAktif((n) => (n + arah + PROMOSI.length) % PROMOSI.length);
  }

  return (
    <section className="relative">
      <div
        ref={wadah}
        className="flex snap-x snap-mandatory gap-4 geser-x scroll-smooth pb-2">
        {PROMOSI.map((p) => {
          const tempat = daftar.find((x) => x.id === p.tempatId);
          const judul = [t.banner1_judul, t.banner2_judul, t.banner3_judul, t.banner4_judul][p.id - 1];
          const isi = [t.banner1_isi, t.banner2_isi, t.banner3_isi, t.banner4_isi][p.id - 1];
          return (
            <Link
              key={p.id}
              href={`/tempat/${p.tempatId}`}
              className={
                "relative flex h-44 w-full shrink-0 snap-start overflow-hidden rounded-3xl bg-gradient-to-br sm:h-52 " +
                p.warna
              }>
              {tempat && (
                <img
                  src={tempat.foto_url}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-35"
                />
              )}
              <div className="relative flex w-full flex-col justify-end p-5 text-white sm:p-7">
                <span className="w-fit rounded-full bg-white/25 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                  {t.promosi}
                </span>
                <h3 className="mt-2 font-merek text-2xl font-bold sm:text-3xl">
                  {judul}
                </h3>
                <p className="mt-1 text-sm text-white/90">{isi}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => geser(-1)}
        aria-label={t.banner_sebelum}
        className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-slate-800 shadow-md transition hover:bg-white sm:grid">
        &#8249;
      </button>
      <button
        type="button"
        onClick={() => geser(1)}
        aria-label={t.banner_sesudah}
        className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-slate-800 shadow-md transition hover:bg-white sm:grid">
        &#8250;
      </button>

      <div className="mt-3 flex justify-center gap-2">
        {PROMOSI.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setAktif(i)}
            aria-label={t.banner_lihat(i + 1)}
            className={
              "h-2 rounded-full transition-all " +
              (i === aktif ? "w-6 bg-teal-600" : "w-2 bg-slate-300 gelap:bg-slate-600")
            }
          />
        ))}
      </div>
    </section>
  );
}

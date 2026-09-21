"use client";

import { usePesan } from "./Bahasa";

export default function TombolBahasa() {
  const { kode, t, ganti } = usePesan();

  return (
    <div
      role="group"
      aria-label={t.nav_bahasa}
      className="flex items-center gap-0.5 rounded-full kaca p-1">
      <button
        type="button"
        onClick={() => ganti("id")}
        aria-pressed={kode === "id"}
        className={
          "rounded-full px-2.5 py-1 text-xs font-bold transition " +
          (kode === "id"
            ? "bg-teal-600 text-white"
            : "text-slate-600 hover:bg-white/70 gelap:text-slate-300 gelap:hover:bg-white/10")
        }>
        ID
      </button>
      <button
        type="button"
        onClick={() => ganti("en")}
        aria-pressed={kode === "en"}
        className={
          "rounded-full px-2.5 py-1 text-xs font-bold transition " +
          (kode === "en"
            ? "bg-teal-600 text-white"
            : "text-slate-600 hover:bg-white/70 gelap:text-slate-300 gelap:hover:bg-white/10")
        }>
        EN
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import Logo from "./Logo";
import TombolTema from "./TombolTema";
import TombolBahasa from "./TombolBahasa";
import { usePesan } from "./Bahasa";

export default function Header() {
  const { t } = usePesan();

  return (
    <header className="sticky top-0 z-30 kaca">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
        <Logo />
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/favorit"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/60 gelap:text-slate-200 gelap:hover:bg-white/10">
            <span className="text-rose-500">&#9825;</span>
            <span className="ml-1.5 hidden md:inline">{t.nav_favorit}</span>
          </Link>
          <TombolBahasa />
          <TombolTema />
          <Link
            href="/tempat/baru"
            className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700">
            {t.nav_tambah}
          </Link>
        </div>
      </div>
    </header>
  );
}

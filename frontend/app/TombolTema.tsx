"use client";

import { useEffect, useState } from "react";
import { usePesan } from "./Bahasa";

const KUNCI_TEMA = "tema";

export default function TombolTema() {
  const { t } = usePesan();
  const [gelap, setGelap] = useState(false);

  useEffect(() => {
    setGelap(document.documentElement.classList.contains("gelap"));
  }, []);

  function ganti() {
    const berikutnya = !gelap;
    setGelap(berikutnya);
    document.documentElement.classList.toggle("gelap", berikutnya);
    try {
      localStorage.setItem(KUNCI_TEMA, berikutnya ? "gelap" : "terang");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={ganti}
      aria-label={gelap ? t.nav_tema_terang : t.nav_tema_gelap}
      className="grid h-10 w-10 place-items-center rounded-full kaca text-lg transition hover:scale-105">
      {gelap ? "\u2600" : "\u263D"}
    </button>
  );
}

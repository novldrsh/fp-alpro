"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { KAMUS, type Kode, type Pesan } from "@/lib/bahasa";

const KUNCI_BAHASA = "bahasa";

type Isi = {
  kode: Kode;
  t: Pesan;
  ganti: (k: Kode) => void;
};

const KonteksBahasa = createContext<Isi>({
  kode: "id",
  t: KAMUS.id,
  ganti: () => {},
});

export function usePesan() {
  return useContext(KonteksBahasa);
}

export default function PenyediaBahasa({
  children,
}: {
  children: React.ReactNode;
}) {
  const [kode, setKode] = useState<Kode>("id");

  useEffect(() => {
    try {
      const simpan = localStorage.getItem(KUNCI_BAHASA);
      if (simpan === "en" || simpan === "id") setKode(simpan);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = kode;
  }, [kode]);

  function ganti(k: Kode) {
    setKode(k);
    try {
      localStorage.setItem(KUNCI_BAHASA, k);
    } catch {}
  }

  return (
    <KonteksBahasa.Provider value={{ kode, t: KAMUS[kode], ganti }}>
      {children}
    </KonteksBahasa.Provider>
  );
}

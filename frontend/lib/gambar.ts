export function kompresGambar(berkas: File, maks = 900): Promise<string> {
  return new Promise((selesai, gagal) => {
    const pembaca = new FileReader();
    pembaca.onerror = () => gagal(new Error("gagal membaca berkas"));
    pembaca.onload = () => {
      const gambar = new Image();
      gambar.onerror = () => gagal(new Error("berkas bukan gambar"));
      gambar.onload = () => {
        const skala = Math.min(1, maks / Math.max(gambar.width, gambar.height));
        const kanvas = document.createElement("canvas");
        kanvas.width = Math.round(gambar.width * skala);
        kanvas.height = Math.round(gambar.height * skala);
        const konteks = kanvas.getContext("2d");
        if (!konteks) {
          gagal(new Error("kanvas tidak tersedia"));
          return;
        }
        konteks.drawImage(gambar, 0, 0, kanvas.width, kanvas.height);
        selesai(kanvas.toDataURL("image/jpeg", 0.72));
      };
      gambar.src = pembaca.result as string;
    };
    pembaca.readAsDataURL(berkas);
  });
}

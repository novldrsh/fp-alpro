import type { Metadata } from "next";
import { Geist, Geist_Mono, Baloo_2 } from "next/font/google";
import "./globals.css";
import PenyediaBahasa from "./Bahasa";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merek = Baloo_2({
  variable: "--font-merek",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MakanITS",
  description: "Cari dan review tempat makan di sekitar kampus ITS Surabaya.",
};

const skripTema = `
(function () {
  try {
    var simpan = localStorage.getItem("tema");
    var gelap = simpan ? simpan === "gelap"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (gelap) document.documentElement.classList.add("gelap");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${merek.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: skripTema }} />
      </head>
      <body className="min-h-full flex flex-col">
        <PenyediaBahasa>{children}</PenyediaBahasa>
      </body>
    </html>
  );
}

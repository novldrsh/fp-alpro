import Link from "next/link";

export default function Logo({ kecil = false }: { kecil?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="MakanITS beranda">
      <span className="relative grid place-items-center">
        <svg
          width={kecil ? 34 : 40}
          height={kecil ? 34 : 40}
          viewBox="0 0 48 48"
          role="img"
          aria-hidden="true">
          <defs>
            <linearGradient id="mangkuk" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="23" fill="url(#mangkuk)" />
          <path
            d="M13 25h22a11 11 0 0 1-22 0Z"
            fill="#ffffff"
            opacity="0.95"
          />
          <rect x="10" y="35" width="28" height="3.4" rx="1.7" fill="#ffffff" opacity="0.8" />
          <path
            d="M19 17c0-2.2 2.4-2.6 2.4-4.8"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M24.5 17c0-2.8 2.6-3.2 2.6-6"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M30 17c0-2.2 2.4-2.6 2.4-4.8"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </svg>
      </span>
      <span className="font-merek text-xl leading-none tracking-tight">
        <span className="font-bold text-teal-700 gelap:text-teal-300">Makan</span>
        <span className="font-bold text-slate-900 gelap:text-white">ITS</span>
      </span>
    </Link>
  );
}

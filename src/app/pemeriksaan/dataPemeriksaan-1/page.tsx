"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DataPemeriksaan() {
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const semuaTerisi = tanggal && lokasi && latitude && longitude;

  const router = useRouter();

  return (
    <div className="bg-gray-100 flex items-center justify-center">
    <div className="min-h-screen bg-gray-100 pb-20 w-[414px]">
      {/* Header fixed */}
      <div className="fixed w-full p-auto max-w-[414px]"> 
      <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
        <div className="flex items-center gap-2">
          {/* Pakai inline SVG panah kiri */}
          <button onClick={() => router.push("/menu")}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
            </svg>
          </button>   
          <span className="font-semibold">Data Pemeriksaan</span>
        </div>
        <img src="/img/assets/logo.png" alt="logo" className="w-5 h-5" />
      </div>
        </div>
      {/* Judul besar */}
      {/* konten */}
      {/* Tombol lanjut fixed di bawah */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-3">
            <button
                type="button"
                disabled={!semuaTerisi}
                onClick={() => {
                if (semuaTerisi) {
                    router.push("/pemeriksaan/dataPemeriksaan1");
                }
                }}
                className={`w-full py-3 font-bold text-white rounded-md transition
                ${semuaTerisi ? "bg-[#29005E]" : "bg-gray-300 cursor-not-allowed"}`}
            >
                LANJUT
            </button>
        </div>
        </div>
    </div>
    </div>
  );
}

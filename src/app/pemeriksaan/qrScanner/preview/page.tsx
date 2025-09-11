"use client";
import { useRouter } from "next/navigation";

export default function HasilScan() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-20 w-[414px]">
        {/* Header fixed */}
        <div className="fixed w-full p-auto max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              {/* Tombol back */}
              <button onClick={() => router.push("/pemeriksaan/qrScanner/camera")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
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
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Judul */}
        <h1 className="text-center font-bold text-sm px-4 py-4 mt-14 mb-3 text-black">
          INSPEKSI KESELAMATAN LALU LINTAS DAN ANGKUTAN JALAN UNTUK ANGKUTAN UMUM
        </h1>

        {/* Card Detail Kendaraan */}
        <div className="bg-white rounded-lg shadow p-4 mx-4">
          <h2 className="text-lg font-bold mb-4 text-black">Detail Kendaraan</h2>

          <div className="flex justify-between mb-2">
            <span className="text-black">Nomor Kendaraan</span>
            <span className="font-semibold text-black">AA 1234 BC</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-black">Nama Perusahaan Angkutan</span>
            <span className="font-semibold text-black">DAMRI</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-black">Jenis Angkutan</span>
            <span className="font-semibold text-black">AKDP</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-black">Trayek</span>
            <span className="font-semibold text-black">Garut - Tasik</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-black">Nomor STUK</span>
            <span className="font-semibold text-black">657465465785</span>
          </div>

          <div className="flex justify-between">
            <span className="text-black">Status Uji KIR</span>
            <span className="font-semibold text-green-600">Berlaku</span>
          </div>
        </div>

        {/* Tombol fixed */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              onClick={() => router.push("/pemeriksaan/fotoKendaraan/preview")}
              className="w-full py-3 font-bold text-white rounded-md bg-[#29005E] transition"
            >
              MULAI PEMERIKSAAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

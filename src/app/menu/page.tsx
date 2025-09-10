"use client";

import { useRouter } from "next/navigation";

export default function MenuPage() {
  const router = useRouter();
  return (
    <div className="bg-gray-100 flex items-center justify-center" >
    <div className="min-h-screen bg-gray-100 flex flex-col w-[414px]">
      
      {/* Status bar */}

      {/* Header */}
      <div className="flex items-center space-x-3 mt-6 px-6">
        <img
          src="/img/assets/logo.png"
          alt="Logo"
          className="w-14 h-14 object-contain"
        />
        <h1 className="font-bold text-lg text-black">RAMPCHECK KEMENHUB</h1>
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-6 mt-10 px-6">
        <button onClick={() => router.push("/pemeriksaan/dataPemeriksaan")} className="bg-yellow-500 rounded-2xl flex items-center p-4 shadow-md hover:bg-yellow-600 transition">
          <img src="/img/assets/checklist.png" alt="Pemeriksaan" className="w-10 h-10 mr-4" />
          <span className="font-bold text-white text-lg" >PEMERIKSAAN</span>
        </button>

        <button onClick={() => router.push("/menu")} className="bg-yellow-500 rounded-2xl flex items-center p-4 shadow-md hover:bg-yellow-600 transition">
          <img src="/img/assets/analyzingSite.png" alt="Riwayat" className="w-10 h-10 mr-4" />
          <span className="font-bold text-white text-lg">RIWAYAT PEMERIKSAAN</span>
        </button>
      </div>
    </div>
    </div>
  );
}

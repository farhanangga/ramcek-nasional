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
      <div className="flex flex-col justify-between h-[88vh]">
      <div className="flex flex-col space-y-6 mt-10 px-6">
        <button onClick={() => router.push("/pemeriksaan/dataPemeriksaan")} className="bg-yellow-500 rounded-2xl flex items-center p-4 shadow-md hover:bg-yellow-600 transition">
          <img src="/img/assets/checklist.png" alt="Pemeriksaan" className="w-10 h-10 mr-4" />
          <span className="font-bold text-white text-lg" >PEMERIKSAAN</span>
        </button>

        <button onClick={() => router.push("/riwayat")} className="bg-yellow-500 rounded-2xl flex items-center p-4 shadow-md hover:bg-yellow-600 transition">
          <img src="/img/assets/analyzingSite.png" alt="Riwayat" className="w-10 h-10 mr-4" />
          <span className="font-bold text-white text-lg">RIWAYAT PEMERIKSAAN</span>
        </button>
      </div>
      <div className="flex items-center justify-center  mb-10"> 
          <button
            onClick={() => router.push("/")}
            className="bg-red-600 rounded-md flex items-center justify-center p-4 shadow-md hover:bg-red-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            <span className="font-bold text-white text-lg">KELUAR</span>
          </button>
      </div>
      </div>

    </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DataPemeriksaan() {
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [jenisKendaraan, setJenisKendaraan] = useState("");

  const semuaTerisi = tanggal && lokasi && latitude && longitude && jenisKendaraan;

  const router = useRouter();

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-20 w-[414px]">
        {/* Header */}
        <div className="fixed w-full p-auto max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/menu")}>
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
        <h1 className="text-center font-bold text-sm px-4 py-4 mt-15 mb-3 text-black">
          INSPEKSI KESELAMATAN LALU LINTAS DAN ANGKUTAN JALAN UNTUK ANGKUTAN UMUM
        </h1>

        <div className="rounded-lg mx-4">
          <h2 className="text-lg font-bold mb-4 text-black">Data Pemeriksaan</h2>

          {/* Custom Tanggal */}
          <label className="block mb-2 font-medium text-black">Tanggal Pemeriksaan</label>
          <div className="relative mb-4">
            <input
              type="text"
              value={tanggal}
              readOnly
              onClick={(e) => (e.currentTarget.showPicker ? e.currentTarget.showPicker() : null)}
              placeholder="Pilih tanggal"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              className="w-full border rounded-md p-3 text-black bg-white border-[#E0E0E0] focus:outline-none focus:border-[#29005E]"
              onChange={(e) => setTanggal(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 absolute right-3 top-3 text-gray-500 pointer-events-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Lokasi */}
          <label className="block mb-2 font-medium text-black">Lokasi</label>
          <div className="relative mb-4">
            <select
              value={jenisKendaraan}
              onChange={(e) => setJenisKendaraan(e.target.value)}
              className="appearance-none w-full border rounded-md p-3 text-black bg-white border-[#E0E0E0] focus:outline-none focus:border-[#29005E]"
            >
              <option value="" className="text-grey">Pilih Lokasi</option>
              <option value="terminal">Terminal</option>
              <option value="pool">Pool</option>
              <option value="jalan">Jalan Raya</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 absolute right-3 top-3 text-gray-500 pointer-events-none"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Latitude & Longitude */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-black">Latitude</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Masukkan Latitude"
                className="w-full border rounded-md p-3 text-black bg-white border-[#E0E0E0] focus:outline-none focus:border-[#29005E]"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium text-black">Longitude</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Masukkan Longitude"
                className="w-full border rounded-md p-3 text-black bg-white border-[#E0E0E0] focus:outline-none focus:border-[#29005E]"
              />
            </div>
          </div>

          {/* Gunakan lokasi saya */}
          <button
            type="button"
            className="w-full py-3 bg-purple-100 hover:bg-purple-200 text-[#29005E] font-bold rounded-md mb-6"
          >
            GUNAKAN LOKASI SAYA
          </button>
        </div>

        {/* Tombol lanjut */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              disabled={!semuaTerisi}
              onClick={() => router.push("/pemeriksaan/dataPemeriksaan-1")}
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

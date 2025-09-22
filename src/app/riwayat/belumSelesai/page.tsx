"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DataPemeriksaan() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("belum"); // "belum" | "selesai"

  const dataBelum = [
    { id: 1, noKendaraan: "AA 1234 BC", tanggal: "26/08/2025" },
    { id: 2, noKendaraan: "B 1234 BC", tanggal: "25/08/2025" },
  ];

  const dataSelesai = [
    { id: 1, noBerita: "13613876827641", terbit: "25/08/2025" },
    { id: 2, noBerita: "13613876827641", terbit: "20/08/2025" },
    { id: 3, noBerita: "13613876827641", terbit: "14/08/2025" },
    { id: 4, noBerita: "13613876827641", terbit: "10/08/2025" },
    { id: 1, noBerita: "13613876827641", terbit: "25/08/2025" },
    { id: 2, noBerita: "13613876827641", terbit: "20/08/2025" },
    { id: 3, noBerita: "13613876827641", terbit: "14/08/2025" },
    { id: 4, noBerita: "13613876827641", terbit: "10/08/2025" },
    { id: 1, noBerita: "13613876827641", terbit: "25/08/2025" },
    { id: 2, noBerita: "13613876827641", terbit: "20/08/2025" },
    { id: 3, noBerita: "13613876827641", terbit: "14/08/2025" },
    { id: 4, noBerita: "13613876827641", terbit: "10/08/2025" },
  ];

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
              <span className="font-semibold">Riwayat Pemeriksaan</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex pt-16">
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              activeTab === "belum"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("belum")}
          >
            Belum Selesai
          </button>
          <button
            className={`flex-1 py-3 text-center font-semibold ${
              activeTab === "selesai"
                ? "text-yellow-500 border-b-2 border-yellow-500"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("selesai")}
          >
            Selesai
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "belum" ? (
            <div className="space-y-3">
              {dataBelum.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex justify-between cursor-pointer"
                >
                  <div>
                    <p className="text-sm text-gray-500">Nomor Kendaraan</p>
                    <p className="font-bold text-black">{item.noKendaraan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Tanggal Pemeriksaan</p>
                    <p className="font-bold text-black">{item.tanggal}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {dataSelesai.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push("/previewBeritaAcara-1")}
                  className="bg-white rounded-lg shadow p-4 flex justify-between cursor-pointer"
                >
                  <div>
                    <p className="text-sm text-gray-500">Nomor Berita Acara</p>
                    <p className="font-bold text-black">{item.noBerita}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Terbit pada</p>
                    <p className="font-bold text-black">{item.terbit}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

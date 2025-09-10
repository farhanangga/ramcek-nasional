"use client";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Status bar */}
      <div className="w-full bg-purple-900 h-10 flex items-center px-4 text-white text-sm font-semibold">
        9:41
        <div className="ml-auto flex items-center space-x-1">
          <div className="w-5 h-5 border border-white rounded-md relative">
            <div className="absolute top-1 left-1 h-3 bg-white rounded-sm w-3"></div>
          </div>
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M2 16h2v4H2v-4zm4-4h2v8H6v-8zm4-4h2v12h-2V8zm4-4h2v16h-2V4zm4-4h2v20h-2V0z" />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center space-x-3 mt-6 px-6">
        <img
          src="/img/assets/logo.png"
          alt="Logo"
          className="w-14 h-14 object-contain"
        />
        <h1 className="font-bold text-lg">RAMPCHECK KEMENHUB</h1>
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-6 mt-10 px-6">
        <button className="bg-yellow-500 rounded-2xl flex items-center p-4 shadow-md hover:bg-yellow-600 transition">
          <img src="/img/assets/pemeriksaan.png" alt="Pemeriksaan" className="w-10 h-10 mr-4" />
          <span className="font-bold text-white text-lg">PEMERIKSAAN</span>
        </button>

        <button className="bg-yellow-500 rounded-2xl flex items-center p-4 shadow-md hover:bg-yellow-600 transition">
          <img src="/img/assets/riwayat.png" alt="Riwayat" className="w-10 h-10 mr-4" />
          <span className="font-bold text-white text-lg">RIWAYAT PEMERIKSAAN</span>
        </button>
      </div>
    </div>
  );
}

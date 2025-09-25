"use client";
import { useState , useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DataPemeriksaan() {
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loadingLokasi, setLoadingLokasi] = useState(false);

  const semuaTerisi = tanggal && lokasi && latitude && longitude;
  const router = useRouter();

  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split("T")[0]; // hasil: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

  // Fungsi ambil lokasi otomatis
  const handleGunakanLokasi = () => {
    if (!navigator.geolocation) {
      alert("Browser Anda tidak mendukung Geolocation");
      return;
    }

    setLoadingLokasi(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toString());
        setLongitude(pos.coords.longitude.toString());
        setLoadingLokasi(false);
      },
      (err) => {
        console.error(err);
        alert("Gagal mengambil lokasi. Pastikan GPS aktif & izin lokasi diizinkan.");
        setLoadingLokasi(false);
      }
    );
  };

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

          {/* Tanggal */}
          <label className="block mb-2 font-medium text-black">Tanggal Pemeriksaan</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full border rounded-md p-3 mb-4 text-black bg-white border-[#E0E0E0] focus:outline-none focus:border-[#29005E]"
          />

          {/* Lokasi */}
          <label className="block mb-2 font-medium text-black">Lokasi</label>
          <div className="relative mb-4">
            <select
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="appearance-none w-full border rounded-md p-3 text-black bg-white border-[#E0E0E0] focus:outline-none focus:border-[#29005E]"
            >
              <option value="">Pilih Lokasi</option>
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

          {/* Latitude & Longitude sejajar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium text-black">Latitude</label>
              <input
                disabled
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Masukkan Latitude"
                className="w-full border rounded-md p-3 text-black cursor-not-allowed bg-white border-[#E0E0E0] focus:outline-none focus:border-[#29005E]"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium text-black">Longitude</label>
              <input
                disabled
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Masukkan Longitude"
                className="w-full border rounded-md p-3 text-black cursor-not-allowed bg-white border-[#E0E0E0] focus:outline-none focus:border-[#29005E]"
              />
            </div>
          </div>

          {/* Tombol gunakan lokasi */}
          <button
            type="button"
            onClick={handleGunakanLokasi}
            className="w-full py-3 bg-purple-100 hover:bg-purple-200 text-[#29005E] font-bold rounded-md mb-6"
          >
            {loadingLokasi ? "Mengambil lokasi..." : "GUNAKAN LOKASI SAYA"}
          </button>
        </div>

        {/* Tombol lanjut */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              disabled={!semuaTerisi}
              onClick={() => router.push("/pemeriksaan/fotoPetugas")}
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


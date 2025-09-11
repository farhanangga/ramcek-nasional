"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DataPemeriksaan() {
  const [nomorKendaraan, setNomorKendaraan] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const router = useRouter();

  const semuaTerisi = nomorKendaraan && foto;

  // Load data dari localStorage ketika halaman dibuka
  useEffect(() => {
    const storedNomor = localStorage.getItem("nomorKendaraan");
    const storedFoto = localStorage.getItem("fotoKendaraan");

    if (storedNomor) setNomorKendaraan(storedNomor);
    if (storedFoto) setFoto(storedFoto);
  }, []);

  // Simpan nomor kendaraan setiap kali berubah
  useEffect(() => {
    if (nomorKendaraan) {
      localStorage.setItem("nomorKendaraan", nomorKendaraan);
    }
  }, [nomorKendaraan]);

  const hapusFoto = () => {
    localStorage.removeItem("fotoKendaraan");
    setFoto(null);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-20 w-[414px]">
        {/* Header */}
        <div className="fixed w-full p-auto max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/pemeriksaan/dataPemeriksaan")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
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

        {/* Form */}
        <div className="rounded-lg mx-4">
          <h2 className="text-lg font-bold mb-4 text-black">Data Kendaraan</h2>

          {/* Nomor Kendaraan */}
          <label className="block mb-2 font-medium text-black">Nomor Kendaraan</label>
          <select
            value={nomorKendaraan}
            onChange={(e) => setNomorKendaraan(e.target.value)}
            className="focus:outline-none focus:border-[#29005E] w-full border rounded-md p-3 mb-4 text-black bg-white border-[#E0E0E0]"
          >
            <option value="">Pilih Nomor Kendaraan</option>
            <option value="B1234CD">B 1234 CD</option>
            <option value="D5678EF">D 5678 EF</option>
          </select>

          {/* Foto KIR */}
          <label className="block mb-2 font-medium text-black">Foto KIR Kendaraan</label>
          <p className="text-sm mb-2 text-black">
            Pastikan foto posisi stiker KIR pada kendaraan terlihat jelas.
          </p>

          {foto ? (
            <div className="relative w-full h-40 rounded-lg border border-[#29005E] overflow-hidden mb-6">
              <img src={foto} alt="Foto KIR" className="object-cover h-full w-full" />
              {/* Tombol hapus */}
              <button
                onClick={hapusFoto}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full shadow hover:bg-red-700 hover:text-white"
              >
                x
              </button>
            </div>
          ) : (
            <div
              onClick={() => router.push("/pemeriksaan/dataPemeriksaan-1/camera")}
              className="w-full flex flex-col items-center justify-center h-40 border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer mb-6"
            >
              <img src="/img/icon/camera.png" alt="Camera" className="w-10 mb-2" />
              <span className="text-sm text-gray-700">Ambil Foto</span>
            </div>
          )}
        </div>

        {/* Tombol lanjut */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              disabled={!semuaTerisi}
              onClick={() => {
                if (semuaTerisi) {
                  router.push("/pemeriksaan/qrScanner/camera");
                }
              }}
              className={`w-full py-3 font-bold text-white rounded-md transition
                ${semuaTerisi ? "bg-[#29005E]" : "bg-gray-300 cursor-not-allowed"}`}
            >
              LANJUT PINDAI QR CODE KIR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

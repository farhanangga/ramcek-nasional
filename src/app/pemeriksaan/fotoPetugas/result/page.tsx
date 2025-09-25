"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FotoPetugas() {
  const router = useRouter();
  const [foto, setFoto] = useState<string | null>(null);

  useEffect(() => {
    const storedFoto = localStorage.getItem("fotoPetugas");
    if (storedFoto) {
      setFoto(storedFoto);
    }
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-32 w-[414px]">
        {/* Header */}
        <div className="fixed w-full p-auto max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("pemeriksaan/fotoPetugas")}>
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
              <span className="font-semibold">Foto Petugas</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Isi */}
        <div className="pt-20 px-6 text-center">
          <h2 className="font-semibold text-lg mb-4 text-black">Foto Petugas</h2>
          {foto ? (
            <img
              src={foto}
              alt="Foto Petugas"
              className="w-full rounded-md shadow mb-6"
            />
          ) : (
            <p className="text-gray-500">Belum ada foto diambil</p>
          )}
        </div>

        {/* Tombol */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => router.push("/pemeriksaan/fotoPetugas/camera")}
              className="w-full py-3 font-bold rounded-md border border-[#29005E] text-[#29005E] transition"
            >
              AMBIL ULANG
            </button>
            <button
              type="button"
              onClick={() => router.push("/pemeriksaan/dataPemeriksaan-1")}
              className="w-full py-3 font-bold text-white rounded-md bg-[#29005E] transition"
            >
              SIMPAN & LANJUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

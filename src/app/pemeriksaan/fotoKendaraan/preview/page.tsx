"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FotoKendaraan() {
    const hapusFoto = (tipe: string, setter: (file: string | null) => void) => {
        setter(null); // reset state
        localStorage.removeItem(`fotoKendaraan_${tipe}`); // hapus dari localStorage
    };

  const router = useRouter();

    const [fotoDepan, setFotoDepan] = useState<string | null>(null);
    const [fotoBelakang, setFotoBelakang] = useState<string | null>(null);
    const [fotoKanan, setFotoKanan] = useState<string | null>(null);
    const [fotoKiri, setFotoKiri] = useState<string | null>(null);
    const [fotoPlat, setFotoPlat] = useState<string | null>(null);

  // 👉 useEffect ini ditaruh di preview
    useEffect(() => {
    setFotoDepan(localStorage.getItem("fotoKendaraan_depan"));
    setFotoBelakang(localStorage.getItem("fotoKendaraan_belakang"));
    setFotoKanan(localStorage.getItem("fotoKendaraan_kanan"));
    setFotoKiri(localStorage.getItem("fotoKendaraan_kiri"));
    setFotoPlat(localStorage.getItem("fotoKendaraan_plat"));
  }, []);

  const semuaTerisi =
    fotoDepan && fotoBelakang && fotoKanan && fotoKiri && fotoPlat;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-20 w-full max-w-[414px]">
        {/* Header fixed */}
        <div className="fixed w-full max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/qrScanner/preview")}>
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

        {/* Konten */}
        <div className="px-4 mt-16">
          <h2 className="text-lg font-bold mb-1 text-black">Unggah Foto Kendaraan</h2>
          <p className="text-sm text-gray-600 mb-6">
            Unggah foto kendaraan dari berbagai sisi dan pastikan foto kendaraan
            terlihat jelas.
          </p>

          {/* Grid Foto */}
          <div className="grid grid-cols-2 gap-4">
            {/* Tampak Depan */}
            <div>
            <label className="block mb-2 font-semibold text-black">Tampak Depan</label>
            {fotoDepan ? (
                <div className="relative h-32 border-2 border-[#29005E] rounded-lg overflow-hidden">
                <img src={fotoDepan} className="w-full h-full object-cover" />
                <button
                onClick={() => hapusFoto("depan", setFotoDepan)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full shadow hover:bg-red-700 hover:text-white"
                >
                    ✕
                </button>
                </div>
            ) : (
                <div
                onClick={() => router.push("/pemeriksaan/fotoKendaraan/camera?target=depan")}
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                >
                <img src="/img/icon/camera.png" className="w-6 mb-1" />
                <span className="text-sm text-gray-700">Ambil Foto</span>
                </div>
            )}
            </div>

            {/* Tampak Belakang */}
            <div>
            <label className="block mb-2 font-semibold text-black">Tampak Belakang</label>
            {fotoBelakang ? (
                <div className="relative h-32 border-2 border-[#29005E] rounded-lg overflow-hidden">
                <img src={fotoBelakang} className="w-full h-full object-cover" />
                <button
                onClick={() => hapusFoto("belakang", setFotoBelakang)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full shadow hover:bg-red-700 hover:text-white"
                >
                    ✕
                </button>
                </div>
            ) : (
                <div
                onClick={() => router.push("/pemeriksaan/fotoKendaraan/camera?target=belakang")}
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                >
                <img src="/img/icon/camera.png" className="w-6 mb-1" />
                <span className="text-sm text-gray-700">Ambil Foto</span>
                </div>
            )}
            </div>

            {/* Tampak Kanan */}
            <div>
            <label className="block mb-2 font-semibold text-black">Tampak Kanan</label>
            {fotoKanan ? (
                <div className="relative h-32 border-2 border-[#29005E] rounded-lg overflow-hidden">
                <img src={fotoKanan} className="w-full h-full object-cover" />
                <button
                onClick={() => hapusFoto("kanan", setFotoKanan)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full shadow hover:bg-red-700 hover:text-white"
                >
                    ✕
                </button>
                </div>
            ) : (
                <div
                onClick={() => router.push("/pemeriksaan/fotoKendaraan/camera?target=kanan")}
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                >
                <img src="/img/icon/camera.png" className="w-6 mb-1" />
                <span className="text-sm text-gray-700">Ambil Foto</span>
                </div>
            )}
            </div>

            {/* Tampak Kiri */}
            <div>
            <label className="block mb-2 font-semibold text-black">Tampak Kiri</label>
            {fotoKiri ? (
                <div className="relative h-32 border-2 border-[#29005E] rounded-lg overflow-hidden">
                <img src={fotoKiri} className="w-full h-full object-cover" />
                <button
                onClick={() => hapusFoto("kiri", setFotoKiri)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full shadow hover:bg-red-700 hover:text-white"
                >
                    ✕
                </button>
                </div>
            ) : (
                <div
                onClick={() => router.push("/pemeriksaan/fotoKendaraan/camera?target=kiri")}
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                >
                <img src="/img/icon/camera.png" className="w-6 mb-1" />
                <span className="text-sm text-gray-700">Ambil Foto</span>
                </div>
            )}
            </div>
          </div>
          {/* Foto Plat */}
            <div className="mt-4">
            <label className="block mb-2 font-semibold text-black">
                Foto Plat Nomor Bus
            </label>

            {fotoPlat ? (
                <div className="relative h-32 border-2 border-[#29005E] rounded-lg overflow-hidden">
                <img src={fotoPlat} className="w-full h-full object-cover" />
                <button
                    onClick={() => hapusFoto("plat", setFotoPlat)}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full shadow hover:bg-red-700 hover:text-white"
                >
                    ✕
                </button>
                </div>
            ) : (
                <div
                onClick={() =>
                    router.push("/pemeriksaan/fotoKendaraan/camera?target=plat")
                }
                className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                >
                <img src="/img/icon/camera.png" className="w-6 mb-1" />
                <span className="text-sm text-gray-700">Ambil Foto</span>
                </div>
            )}
            </div>

        </div>

        {/* Tombol simpan */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              disabled={!semuaTerisi}
              onClick={() => {
                if (semuaTerisi) {
                  router.push("");
                }
              }}
              className={`w-full py-3 font-bold text-white rounded-md transition
                ${semuaTerisi ? "bg-[#29005E]" : "bg-gray-300 cursor-not-allowed"}`}
            >
              SIMPAN DAN LANJUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

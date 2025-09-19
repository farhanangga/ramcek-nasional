"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TerbitkanBeritaAcara() {
  const router = useRouter();

  const [pengemudi, setPengemudi] = useState("");
  const [petugas, setPetugas] = useState("");
  const [signatures, setSignatures] = useState({
    penguji: null as string | null,
    pengemudi: null as string | null,
    petugas: null as string | null,
  });

  // handle upload
  const handleUpload = (role: keyof typeof signatures, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatures((prev) => ({ ...prev, [role]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (role: keyof typeof signatures) => {
    setSignatures((prev) => ({ ...prev, [role]: null }));
  };

  const semuaTerisi = Boolean(
    signatures.penguji && signatures.pengemudi && signatures.petugas
  );

  return (
    <div className="bg-gray-100 flex justify-center">
       <div className="min-h-screen w-[414px] bg-gray-100 pb-24">
      {/* Header */}
      <div className="fixed w-full max-w-[414px] top-0 left-0 z-50">
        <div className="flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow">
          <div className="flex items-center gap-2">
            <button onClick={() => router.push("/pemeriksaan/ptPenunjang/")}>
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
            <span className="font-semibold">Terbitkan Berita Acara</span>
          </div>
          <img src="/img/assets/logo.png" alt="logo" className="w-5" />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-4 space-y-6 mt-16 w-full max-w-xl">
        {/* Penguji */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <h2 className="font-semibold text-black">
            Penguji Kendaraan Bermotor
          </h2>
          <label className="text-sm text-gray-700">Tanda Tangan</label>
          {!signatures.penguji ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleUpload("penguji", e.target.files?.[0] || null)
                }
                className="hidden"
                id="uploadPenguji"
              />
              <label
                htmlFor="uploadPenguji"
                className="flex flex-col items-center justify-center h-24 w-full border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
              >
                <img src="/img/icon/sign.png" className="w-6 mb-1" />
                <span className="text-sm text-gray-700">
                  Upload Tanda Tangan
                </span>
              </label>
            </>
          ) : (
            <div className="relative w-full h-24 border rounded-lg overflow-hidden">
              <img
                src={signatures.penguji}
                alt="Tanda tangan penguji"
                className="object-contain w-full h-full"
              />
              <button
                onClick={() => handleRemove("penguji")}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        {/* Pengemudi */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <h2 className="font-semibold text-black">Pengemudi</h2>
          <select
            value={pengemudi}
            onChange={(e) => setPengemudi(e.target.value)}
            className="w-full border rounded p-2 text-sm text-black"
          >
            <option value="">Pilih Pengemudi</option>
            <option value="Budi">Budi</option>
            <option value="Andi">Andi</option>
          </select>
          {!signatures.pengemudi ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleUpload("pengemudi", e.target.files?.[0] || null)
                }
                className="hidden"
                id="uploadPengemudi"
              />
              <label
                htmlFor="uploadPengemudi"
                className="flex flex-col items-center justify-center h-24 w-full border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
              >
                <img src="/img/icon/sign.png" className="w-6 mb-1" />
                <span className="text-sm text-gray-700">
                  Upload Tanda Tangan
                </span>
              </label>
            </>
          ) : (
            <div className="relative w-full h-24 border rounded-lg overflow-hidden">
              <img
                src={signatures.pengemudi}
                alt="Tanda tangan pengemudi"
                className="object-contain w-full h-full"
              />
              <button
                onClick={() => handleRemove("pengemudi")}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        {/* Petugas */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <h2 className="font-semibold text-black">Petugas Kemenhub</h2>
          <select
            value={petugas}
            onChange={(e) => setPetugas(e.target.value)}
            className="w-full border rounded p-2 text-sm text-black"
          >
            <option value="">Pilih Petugas</option>
            <option value="Petugas A">Petugas A</option>
            <option value="Petugas B">Petugas B</option>
          </select>
          {!signatures.petugas ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleUpload("petugas", e.target.files?.[0] || null)
                }
                className="hidden"
                id="uploadPetugas"
              />
              <label
                htmlFor="uploadPetugas"
                className="flex flex-col items-center justify-center h-24 w-full border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
              >
                <img src="/img/icon/sign.png" className="w-6 mb-1" />
                <span className="text-sm text-gray-700">
                  Upload Tanda Tangan
                </span>
              </label>
            </>
          ) : (
            <div className="relative w-full h-24 border rounded-lg overflow-hidden">
              <img
                src={signatures.petugas}
                alt="Tanda tangan petugas"
                className="object-contain w-full h-full"
              />
              <button
                onClick={() => handleRemove("petugas")}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tombol lanjut */}
      <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100 text-black">
        <div className="max-w-md mx-auto px-4 py-3 text-black">
          <button
            type="button"
            disabled={!semuaTerisi}
            onClick={() =>
              router.push("/pemeriksaan/ptPenunjang/4-perlengkapanKendaraan")
            }
            className={`w-full py-3 font-bold text-white rounded-md transition ${
              semuaTerisi ? "bg-[#29005E]" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            TERBITKAN BERITA ACARA
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

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

  // handle upload tanda tangan
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
        <div className="fixed w-full max-w-[414px] z-50">
          <div className="flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  router.push("/pemeriksaan/ptPenunjang/4-perlengkapanKendaraan")
                }
              >
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

        {/* ISI */}
        <div className="pt-17 px-4 space-y-6">
          {/* Penguji Kendaraan Bermotor */}
          <div className="text-black font-semibold mb-2">
              <label htmlFor="">Penguji Kendaraan Bermotor</label>
          </div>
            <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold text-lg text-black">Gunawan</h2>
            <p className="text-sm  text-black">354654654</p>
            <hr className="my-3" />
            <p className="font-medium mb-2  text-black">TTD Penguji</p>
            <div
              className="flex flex-col items-center justify-center h-34 w-full border-2 border-dashed 
              border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
              >
              <img src="/img/icon/sign.png" className="w-6 mb-1" />
              <span className="text-sm text-gray-700">Tanda Tangan</span>
            </div>
          </div>

          {/* Pengemudi */}
          <div className="text-black font-semibold mb-2">
              <label htmlFor="">Pengemudi</label>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <select
              value={pengemudi}
              onChange={(e) => setPengemudi(e.target.value)}
              className="focus:outline-none focus:border-[#29005E] w-full border rounded-md p-3 mb-2 text-black bg-white border-[#E0E0E0]"
            >
              <option value="">Nama Pengemudi</option>
              <option value="Budi">Budi</option>
              <option value="Andi">Andi</option>
            </select>
            <hr className="my-3" />
            <p className="font-medium mb-2  text-black">TTD Pengemudi</p>
            <div
              className="flex flex-col items-center justify-center h-34 w-full border-2 border-dashed 
              border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
              >
              <img src="/img/icon/sign.png" className="w-6 mb-1" />
              <span className="text-sm text-gray-700">Tanda Tangan</span>
            </div>
          </div>

          {/* Petugas Kemenhub */}
          <div className="text-black font-semibold mb-2">
              <label htmlFor="">Petugas Kemenhub</label>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <select
              value={petugas}
              onChange={(e) => setPetugas(e.target.value)}
              className="focus:outline-none focus:border-[#29005E] w-full border rounded-md p-3 mb-2 text-black bg-white border-[#E0E0E0]"
            >
              <option value="">Petugas Kemenhub</option>
              <option value="Petugas A">Petugas A</option>
              <option value="Petugas B">Petugas B</option>
            </select>
            <hr className="my-3" />
            <p className="font-medium mb-2  text-black">TTD Petugas Kemenhub</p>
            <div
              className="flex flex-col items-center justify-center h-34 w-full border-2 border-dashed 
              border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
              >
              <img src="/img/icon/sign.png" className="w-6 mb-1" />
              <span className="text-sm text-gray-700">Tanda Tangan</span>
            </div>
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
                semuaTerisi
                  ? "bg-[#29005E]"
                  : "bg-gray-300 cursor-not-allowed"
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

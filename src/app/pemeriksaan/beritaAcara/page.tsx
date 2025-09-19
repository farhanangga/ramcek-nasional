"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TerbitkanBeritaAcara() {
  const router = useRouter();

  const [pengujiNik, setPengujiNik] = useState("");
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

  const semuaTerisi = signatures.penguji && signatures.pengemudi && signatures.petugas;

  return (
<div className="bg-gray-100 flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-20 w-[414px]">
        {/* Header */}
        <div className="fixed w-full p-auto max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
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
              <span className="font-semibold">Data Pemeriksaan</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Form */}
      <div className="flex-1 p-4 space-y-6 max-w-xl mx-auto">
        {/* Penguji */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <h2 className="font-semibold">Penguji Kendaraan Bermotor</h2>
          <input
            type="text"
            value={pengujiNik}
            onChange={(e) => setPengujiNik(e.target.value)}
            placeholder="NIK Penguji"
            className="w-full border rounded p-2 text-sm"
          />
          <SignatureUpload
            label="Tanda Tangan"
            role="penguji"
            fileUrl={signatures.penguji}
            onUpload={handleUpload}
            onRemove={handleRemove}
          />
        </div>

        {/* Pengemudi */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <h2 className="font-semibold">Pengemudi</h2>
          <select
            value={pengemudi}
            onChange={(e) => setPengemudi(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          >
            <option value="">Pilih Pengemudi</option>
            <option value="Budi">Budi</option>
            <option value="Andi">Andi</option>
          </select>
          <SignatureUpload
            label="Tanda Tangan"
            role="pengemudi"
            fileUrl={signatures.pengemudi}
            onUpload={handleUpload}
            onRemove={handleRemove}
          />
        </div>

        {/* Petugas */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <h2 className="font-semibold">Petugas Kemenhub</h2>
          <select
            value={petugas}
            onChange={(e) => setPetugas(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          >
            <option value="">Pilih Petugas</option>
            <option value="Petugas A">Petugas A</option>
            <option value="Petugas B">Petugas B</option>
          </select>
          <SignatureUpload
            label="Tanda Tangan"
            role="petugas"
            fileUrl={signatures.petugas}
            onUpload={handleUpload}
            onRemove={handleRemove}
          />
        </div>
      </div>

        {/* Tombol lanjut */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              disabled={!semuaTerisi}
              onClick={() => router.push("/pemeriksaan/ptPenunjang/4-perlengkapanKendaraan")}
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

// Komponen Upload TTD
function SignatureUpload({
  label,
  role,
  fileUrl,
  onUpload,
  onRemove,
}: {
  label: string;
  role: string;
  fileUrl: string | null;
  onUpload: (role: any, file: File | null) => void;
  onRemove: (role: any) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {fileUrl ? (
        <div className="relative w-full h-24 border rounded-lg overflow-hidden">
          <img
            src={fileUrl}
            alt="ttd"
            className="object-contain w-full h-full bg-white"
          />
          <button
            onClick={() => onRemove(role)}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center 
              bg-red-200 text-red-700 rounded-full shadow hover:bg-red-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center h-24 w-full border-2 border-dashed 
            border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer">
          <img src="/img/icon/sign.png" className="w-6 mb-1" />
          <span className="text-sm text-gray-700">Upload Tanda Tangan</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onUpload(role, e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
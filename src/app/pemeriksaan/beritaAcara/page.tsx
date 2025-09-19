"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function TerbitkanBeritaAcara() {
  const router = useRouter();

  // state untuk nama, nik, dan tanda tangan
  const [pengujiNik, setPengujiNik] = useState("");
  const [pengemudi, setPengemudi] = useState("");
  const [petugas, setPetugas] = useState("");
  const [signatures, setSignatures] = useState({
    penguji: null as string | null,
    pengemudi: null as string | null,
    petugas: null as string | null,
  });

  // upload tanda tangan
  const handleUpload = (role: keyof typeof signatures, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatures((prev) => ({ ...prev, [role]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const allSigned = signatures.penguji && signatures.pengemudi && signatures.petugas;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-[#29005E] text-white p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-3">
          ⬅
        </button>
        <h1 className="text-lg font-semibold">Terbitkan Berita Acara</h1>
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
          <div>
            <label className="text-sm font-medium">Tanda Tangan</label>
            {signatures.penguji ? (
              <img
                src={signatures.penguji}
                alt="ttd penguji"
                className="mt-2 w-40 h-20 object-contain border"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload("penguji", e.target.files?.[0] || null)}
                className="mt-2"
              />
            )}
          </div>
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
          <div>
            <label className="text-sm font-medium">Tanda Tangan</label>
            {signatures.pengemudi ? (
              <img
                src={signatures.pengemudi}
                alt="ttd pengemudi"
                className="mt-2 w-40 h-20 object-contain border"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload("pengemudi", e.target.files?.[0] || null)}
                className="mt-2"
              />
            )}
          </div>
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
          <div>
            <label className="text-sm font-medium">Tanda Tangan</label>
            {signatures.petugas ? (
              <img
                src={signatures.petugas}
                alt="ttd petugas"
                className="mt-2 w-40 h-20 object-contain border"
              />
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload("petugas", e.target.files?.[0] || null)}
                className="mt-2"
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-white">
        <button
          disabled={!allSigned}
          onClick={() => alert("Berita Acara diterbitkan ✅")}
          className={`w-full py-3 rounded-xl font-semibold ${
            allSigned ? "bg-[#29005E] text-white" : "bg-gray-300 text-gray-500"
          }`}
        >
          TERBITKAN BERITA ACARA
        </button>
      </div>
    </div>
  );
}

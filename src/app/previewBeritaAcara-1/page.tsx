"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PreviewBeritaAcara() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="min-h-screen w-[414px] bg-gray-100 pb-24">
        {/* Header */}
        <div className="fixed w-full max-w-[414px] z-50">
          <div className="flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow">
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/riwayat")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </button>
              <span className="font-semibold">Preview Berita Acara</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Isi berupa gambar penuh */}
        <div className="pt-16 px-2">
          <img
            src="/img/assets/previewBeritaAcara.png"
            alt="Preview Berita Acara"
            className="w-full shadow"
          />
        </div>

        {/* Modal Berita Acara berhasil diterbitkan */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 text-center w-80 animate-fadeIn">
              {/* Icon centang */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100">
                  <span className="text-yellow-500 text-4xl">✔</span>
                </div>
              </div>

              {/* Judul */}
              <h2 className="text-lg font-bold mb-2 text-black">
                Berita Acara Berhasil Diunduh
              </h2>

              {/* Deskripsi */}
              <p className="text-gray-600 text-sm mb-6">
                Anda dapat mengakses kembali hasil Berita Acara di{" "}
                <span className="font-semibold">Riwayat Pemeriksaan</span>
              </p>

              {/* Tombol aksi */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.push("/riwayat"); // arahkan sesuai kebutuhan Anda
                  }}
                  className="w-full py-2 bg-[#29005E] text-white font-bold rounded-md"
                >
                  KEMBALI 
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tombol Unduh */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              onClick={() => setShowSuccessModal(true)}
              className="w-full py-3 font-bold text-white rounded-md transition bg-[#29005E]"
            >
              UNDUH
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

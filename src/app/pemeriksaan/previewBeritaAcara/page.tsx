"use client";
import { useRouter } from "next/navigation";

export default function PreviewBeritaAcara() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="min-h-screen w-[414px] bg-gray-100 pb-24">
        {/* Header */}
        <div className="fixed w-full max-w-[414px] z-50">
          <div className="flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow">
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/pemeriksaan/tambahTandaTangan")}>
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

        {/* Tombol Unduh */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              onClick={() => alert("Mengunduh dokumen...")}
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

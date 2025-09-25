"use client";
import { useRouter } from "next/navigation";

export default function FotoPetugas() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-20 w-[414px]">
        {/* Header */}
        <div className="fixed w-full p-auto max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              <button onClick={() => router.back()}>
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

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-40 h-40 rounded-full bg-purple-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-16 h-16 text-[#29005E]"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 
                  2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 
                  5v3h20v-3c0-3.3-6.7-5-10-5Z" />
              </svg>
            </div>
          </div>

          {/* Ketentuan Foto */}
          <div className="text-left">
            <h3 className="font-semibold mb-3 text-black">Ketentuan Foto</h3>
            <div className="bg-white p-3 rounded-md shadow-sm flex items-start gap-3 mb-3">
              <span className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 2 1 21h22L12 2zm0 4.77L18.93 19H5.07L12 
                    6.77zM11 10v5h2v-5h-2zm0 6v2h2v-2h-2z" />
                </svg>
              </span>
              <p className="text-sm text-black">
                Petugas harus mengambil foto di lokasi rampcheck
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm flex items-start gap-3">
              <span className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M4 16c0 1.1.9 2 2 2h1v2c0 
                    1.1.9 2 2 2h6c1.1 0 2-.9 
                    2-2v-2h1c1.1 0 2-.9 
                    2-2V8l-2-5H6L4 8v8zm12 
                    4H8v-4h8v4zM6.5 6 7.5 
                    3h9l1 3h-11z" />
                </svg>
              </span>
              <p className="text-sm text-black">
                Petugas mengambil foto di depan kendaraan yang akan diperiksa
              </p>
            </div>
          </div>
        </div>

        {/* Tombol ambil foto */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              onClick={() => router.push("/pemeriksaan/fotoPetugas/camera")}
              className="w-full py-3 font-bold text-white rounded-md bg-[#29005E] transition"
            >
              AMBIL FOTO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

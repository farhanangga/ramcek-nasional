"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PreviewBeritaAcara() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emails, setEmails] = useState([""]);

  // handle tambah email
  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  // handle ubah email
  const handleChangeEmail = (index: number, value: string) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  // handle hapus email
  const handleRemoveEmail = (index: number) => {
    const updated = [...emails];
    updated.splice(index, 1);
    setEmails(updated);
  };

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
        <div className="pt-4 px-2">
          <img
            src="/img/assets/previewBeritaAcara2.png"
            alt="Preview Berita Acara"
            className="w-full shadow"
          />
        </div>

        {/* Modal Kirim Email */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto animate-fadeIn">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#29005E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26c.69.46 1.53.46 2.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 className="text-center font-semibold text-lg mb-4 text-black">Kirim Berita Acara ke Email</h2>

              {/* Input email */}
              {emails.map((email, idx) => (
                <div key={idx} className="flex items-center mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleChangeEmail(idx, e.target.value)}
                    placeholder="Masukkan email"
                    className="flex-1 border border-[#E0E0E0] focus:outline-none focus:border-[#29005E] rounded-md px-3 py-2 text-sm text-black"
                  />
                  {idx > 0 && (
                    <button
                      onClick={() => handleRemoveEmail(idx)}
                      className="ml-2 text-red-500 text-xl font-bold w-8 h-8
                                bg-red-200 text-red-700 rounded-full hover:bg-red-400 hover:text-white"
                    >
                      −
                    </button>
                  )}
                </div>
              ))}

              {/* Tambah Email */}
              <button
                onClick={handleAddEmail}
                className="text-[#29005E] font-medium mb-4"
              >
                + Tambah Email
              </button>

              {/* Checkbox */}
              <div className="flex items-center mb-4">
                <input id="sendToMe" type="checkbox" className="mr-2" />
                <label htmlFor="sendToMe" className="text-sm text-gray-700">
                  Kirim ke email saya <br />
                  <span className="text-gray-500">petugasrampcheck@gmail.com</span>
                </label>
              </div>

              {/* Tombol */}
              <div className="flex justify-between gap-3">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 py-2 rounded-md border-2 border-[#29005E] text-[#29005E] font-bold"
                >
                  BATAL
                </button>
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                    // aksi kirim email disini
                  }}
                  className="flex-1 py-2 rounded-md bg-[#29005E] text-white font-bold"
                >
                  KIRIM
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Berhasil Unduh */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 text-center w-80 animate-fadeIn">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100">
                  <span className="text-yellow-500 text-4xl">✔</span>
                </div>
              </div>
              <h2 className="text-lg font-bold mb-2 text-black">
                Berita Acara Berhasil Diunduh
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Anda dapat mengakses kembali hasil Berita Acara di{" "}
                <span className="font-semibold">Riwayat Pemeriksaan</span>
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push("/riwayat");
                }}
                className="w-full py-2 bg-[#29005E] text-white font-bold rounded-md"
              >
                KEMBALI
              </button>
            </div>
          </div>
        )}

        {/* Tombol Bawah */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3 flex gap-3">
            <button
              type="button"
              onClick={() => setShowSuccessModal(true)}
              className="flex-1 py-3 font-bold text-white rounded-md transition bg-[#29005E]"
            >
              UNDUH
            </button>
            <button
              type="button"
              onClick={() => setShowEmailModal(true)}
              className="flex-1 py-3 font-bold text-[#29005E] border-2 border-[#29005E] rounded-md transition"
            >
              KIRIM KE EMAIL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

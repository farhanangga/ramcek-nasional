"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Answer {
  status?: "semua" | "tidak";
  side?: { kanan?: boolean; kiri?: boolean }; // pakai optional
  photo?: string;
  video?: string;
}

const questions = [
  { id: "lampu_dekat", label: "Lampu Utama Dekat" },
  { id: "lampu_jauh", label: "Lampu Utama Jauh" },
  { id: "sein_depan", label: "Lampu Sein Depan" },
  { id: "sein_belakang", label: "Lampu Sein Belakang" },
  { id: "rem", label: "Lampu Rem" },
  { id: "mundur", label: "Lampu Mundur" },
];

export default function SistemPeneranganPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

// Tambahkan useEffect untuk merge data foto/video yang baru ditangkap
useEffect(() => {
  questions.forEach((q) => {
    const savedPhoto = localStorage.getItem(`capturedPhoto_${q.id}`);
    if (savedPhoto) {
      const { photo } = JSON.parse(savedPhoto);
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { ...prev[q.id], photo },
      }));
      localStorage.removeItem(`capturedPhoto_${q.id}`); // hapus biar tidak numpuk
    }

    const savedVideo = localStorage.getItem(`capturedVideo_${q.id}`);
    if (savedVideo) {
      const { video } = JSON.parse(savedVideo);
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { ...prev[q.id], video },
      }));
      localStorage.removeItem(`capturedVideo_${q.id}`);
    }
  });
}, []);


  // 🔹 Simpan jawaban ke localStorage tiap kali berubah
  useEffect(() => {
    localStorage.setItem("sistemPeneranganAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleStatusChange = (qId: string, status: "semua" | "tidak") => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { status, side: { kanan: false, kiri: false } },
    }));
  };

const handleSideChange = (qId: string, side: "kanan" | "kiri") => {
  setAnswers((prev) => ({
  ...prev,
  [qId]: {
    ...prev[qId],
    side: {
      ...prev[qId]?.side,
      [side]: !prev[qId]?.side?.[side],
    },
  },
}));
};

  const handleRemoveFile = (qId: string, type: "photo" | "video") => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], [type]: undefined },
    }));
  };

  const semuaTerisi = questions.every((q) => answers[q.id]?.status);

  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="min-h-screen w-[414px] bg-gray-100 pb-20">
        {/* Header */}
        <div className="fixed w-full max-w-[414px] z-50">
          <div className="flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow">
            <div className="flex items-center gap-2">
              <button onClick={() =>
                  router.push("/pemeriksaan/pemeriksaanAdministrasi")
                }>
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
              <span className="font-semibold">Sistem Penerangan</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Isi */}
        <div className="pt-16 px-4">
          {questions.map((q) => (
            <div key={q.id} className="mb-4 bg-white rounded-lg shadow">
              {/* Judul */}
              <div className="bg-[#F6A609] text-white px-3 py-2 rounded-t-lg font-bold">
                {q.label}
              </div>

              <div className="p-3 space-y-2">
                {/* Radio pilihan */}
                <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1 text-black">
                    <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id]?.status === "semua"}
                    onChange={() => handleStatusChange(q.id, "semua")}
                    className="accent-[#29005E]"
                    />
                    Semua Menyala
                </label>
                <label className="flex items-center gap-1 text-black">
                    <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id]?.status === "tidak"}
                    onChange={() => handleStatusChange(q.id, "tidak")}
                    className="accent-[#29005E]"
                    />
                    Tidak Menyala
                </label>
                </div>


                {/* Jika pilih "Tidak Menyala" → sisi kanan/kiri */}
                {answers[q.id]?.status === "tidak" && (
                  <div className="flex gap-4 ml-2">
                    <label className="flex items-center gap-1 text-black">
                      <input
                        type="checkbox"
                        checked={answers[q.id]?.side?.kanan || false}
                        onChange={() => handleSideChange(q.id, "kanan")}
                        className="accent-[#29005E]"
                      />
                      Kanan
                    </label>
                    <label className="flex items-center gap-1 text-black">
                      <input
                        type="checkbox"
                        checked={answers[q.id]?.side?.kiri || false}
                        onChange={() => handleSideChange(q.id, "kiri")}
                        className="accent-[#29005E]"
                      />
                      Kiri
                    </label>
                  </div>
                )}

                {/* Upload foto & video */}
                {answers[q.id]?.status && (
                  <div className="flex gap-3 mt-2">
                    {/* Foto */}
                    {answers[q.id]?.photo ? (
                      <div className="relative w-28 h-20 border rounded-lg overflow-hidden">
                        <img
                          src={answers[q.id]?.photo}
                          alt="foto"
                          className="object-cover w-full h-full"
                        />
                        <button
                          onClick={() => handleRemoveFile(q.id, "photo")}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          router.push(
                            `/pemeriksaan/pemeriksaanTeknis/1-sistemPenerangan/cameraFoto?qId=${q.id}`
                          )
                        }
                        className="flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                      >
                        <img src="/img/icon/camera.png" className="w-6 mb-1" />
                        <span className="text-sm text-gray-700">Ambil Foto</span>
                      </div>
                    )}

                    {/* Video */}
                    {answers[q.id]?.video ? (
                      <div className="relative w-28 h-20 border rounded-lg overflow-hidden">
                        <video
                          src={answers[q.id]?.video}
                          className="object-cover w-full h-full"
                          controls
                        />
                        <button
                          onClick={() => handleRemoveFile(q.id, "video")}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          router.push(
                            `/pemeriksaan/pemeriksaanTeknis/1-sistemPenerangan/cameraVideo?qId=${q.id}`
                          )
                        }
                        className="flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                      >
                        <img src="/img/icon/camera.png" className="w-6 mb-1" />
                        <span className="text-sm text-gray-700">Ambil Video</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tombol lanjut */}
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 shadow-lg">
          <div className="max-w-[414px] mx-auto px-4 py-3">
            <button
              disabled={!semuaTerisi}
              onClick={() =>
                router.push("/pemeriksaan/pemeriksaanTeknis/2-klakson")
              }
              className={`w-full py-3 font-bold text-white rounded-md transition ${
                semuaTerisi ? "bg-[#29005E]" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              SELANJUTNYA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

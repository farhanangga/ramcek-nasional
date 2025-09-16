"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Answer {
  status?: "semua" | "tidak";
  side?: { kanan?: boolean; kiri?: boolean };
  photo?: string;
  video?: string;
}

const questions = [
  {
    id: "lampu_dekat",
    label: "Lampu Utama Dekat",
    options: [
      { value: "semua", label: "Semua Menyala", requireMedia: true },
      { value: "tidak", label: "Tidak Menyala", requireMedia: true },
    ],
  },
  {
    id: "lampu_jauh",
    label: "Lampu Utama Jauh",
    options: [
      { value: "semua", label: "Semua Menyala", requireMedia: true },
      { value: "tidak", label: "Tidak Menyala", requireMedia: true },
    ],
  },
  {
    id: "sein_depan",
    label: "Lampu Sein Depan",
    options: [
      { value: "semua", label: "Semua Menyala", requireMedia: true },
      { value: "tidak", label: "Tidak Menyala", requireMedia: true },
    ],
  },
  {
    id: "sein_belakang",
    label: "Lampu Sein Belakang",
    options: [
      { value: "semua", label: "Semua Menyala", requireMedia: true },
      { value: "tidak", label: "Tidak Menyala", requireMedia: true },
    ],
  },
  {
    id: "rem",
    label: "Lampu Rem",
    options: [
      { value: "semua", label: "Semua Menyala", requireMedia: true },
      { value: "tidak", label: "Tidak Menyala", requireMedia: true },
    ],
  },
  {
    id: "mundur",
    label: "Lampu Mundur",
    options: [
      { value: "semua", label: "Semua Menyala", requireMedia: true },
      { value: "tidak", label: "Tidak Menyala", requireMedia: true },
    ],
  },
];

export default function SistemPeneranganPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  // Load jawaban lama + merge foto/video
  useEffect(() => {
    const savedAnswers = localStorage.getItem("sistemPeneranganAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }

    questions.forEach((q) => {
      const savedPhoto = localStorage.getItem(`capturedPhoto_${q.id}`);
      if (savedPhoto) {
        const { photo } = JSON.parse(savedPhoto);
        setAnswers((prev) => ({
          ...prev,
          [q.id]: { ...prev[q.id], photo },
        }));
        localStorage.removeItem(`capturedPhoto_${q.id}`);
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

  // Simpan ke localStorage tiap kali answers berubah
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("sistemPeneranganAnswers", JSON.stringify(answers));
    }
  }, [answers]);

  const handleStatusChange = (qId: string, status: "semua" | "tidak") => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], status, side: { kanan: false, kiri: false } },
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
              <button onClick={() => router.push("/pemeriksaan/pemeriksaanAdministrasi")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </button>
              <span className="font-semibold">Pemeriksaan Teknis Utama</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Stepper */}
        <div className=" px-4 py-3 pt-16">
          <p className="text-sm text-black mb-6">
            Langkah 1 dari 8 <br />
            <span className="font-semibold">Sistem Penerangan</span>
          </p>

          <div className="flex items-center justify-between mx-4">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="flex items-center w-full">
                <div
                  className={`flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold
                ${idx === 0 ? "bg-white border border-[#29005E]" : "bg-gray-300"}
                `}
                ></div>
                {idx < 7 && <div className="flex-1 h-0.5 bg-gray-300"></div>}
              </div>
            ))}
          </div>
        </div>

         {/* Isi */}
        <div className="pt-4 px-4">
          {questions.map((q) => (
            <div key={q.id} className="mb-4 bg-white rounded-lg shadow">
              <div className="bg-[#F6A609] text-white px-3 py-2 rounded-t-lg font-bold">{q.label}</div>

              <div className="p-3 space-y-3">
                {q.options.map((opt) => (
                  <div key={opt.value} className="flex flex-col gap-2">
                    {/* Radio */}
                    <label className="flex items-center gap-1 text-black">
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id]?.status === opt.value}
                        onChange={() => handleStatusChange(q.id, opt.value as "semua" | "tidak")}
                        className="accent-[#29005E]"
                      />
                      {opt.label}
                    </label>

                    {/* Kalau radio ini kepilih → tampilkan side + media */}
                    {answers[q.id]?.status === opt.value && (
                      <div className="ml-2 space-y-3">
                        {/* Checkbox kanan kiri hanya untuk "tidak" */}
                        {opt.value === "tidak" && (
                          <div className="flex gap-4 mt-2">
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
                        <div className="mb-2">
                          <label className="font-bold text-black">Unggah Foto & Video</label>
                        </div>

                        {/* Upload foto & video */}
                        <div className="flex gap-3">
                          {/* Foto */}
                          
                          {answers[q.id]?.photo ? (
                            <div className="relative w-full h-32 border rounded-lg overflow-hidden">
                              <img src={answers[q.id]?.photo} className="object-cover w-full h-full" />
                              <button
                                onClick={() => handleRemoveFile(q.id, "photo")}
                                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full shadow hover:bg-red-400 hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                router.push(`/pemeriksaan/pemeriksaanTeknis/cameraFoto?qId=${q.id}`)
                              }
                              className="flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                            >
                              <img src="/img/icon/camera.png" className="w-6 mb-1" />
                              <span className="text-sm text-gray-700">Ambil Foto</span>
                            </div>
                          )}

                          {/* Video */}
                          {answers[q.id]?.video ? (
                            <div className="relative w-full h-32 border rounded-lg overflow-hidden">
                              <video src={answers[q.id]?.video} className="object-cover w-full h-full" controls />
                              <button
                                onClick={() => handleRemoveFile(q.id, "video")}
                                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-200 text-red-700 rounded-full shadow hover:bg-red-400 hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() =>
                                router.push(`/pemeriksaan/pemeriksaanTeknis/cameraVideo?qId=${q.id}`)
                              }
                              className="flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                            >
                              <img src="/img/icon/video.png" className="w-7 mb-1" />
                              <span className="text-sm text-gray-700">Ambil Video</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tombol lanjut */}
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 shadow-lg">
          <div className="max-w-[414px] mx-auto px-4 py-3">
            <button
              disabled={!semuaTerisi}
              onClick={() => router.push("/pemeriksaan/pemeriksaanTeknis/2-sistemPengereman")}
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

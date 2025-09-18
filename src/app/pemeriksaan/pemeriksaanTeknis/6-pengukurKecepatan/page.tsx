"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Answer {
  status?: string;
  photo?: string;
  video?: string;
  text?: string;
}

const questions = [
  {
    id: "pengukur_kecepatan",
    label: "Pengukur Kecepatan",
    options: [
      {
        value: "adaBerfungsi",
        label: "Ada dan Berfungsi",
        inputFoto: true,
        inputVideo: true,
        inputText: true,
      },
      {
        value: "tidakBerfungsi",
        label: "Tidak Berfungsi",
        inputFoto: true,
        inputVideo: true,
        inputText: true,
      },
      { value: "tidakAda", label: "Tidak Ada", inputText: true },
    ],
  },
];

export default function SistemPengeremanPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  // Ambil jawaban lama + merge foto/video baru dari localStorage kamera
  useEffect(() => {
    const savedAnswers = localStorage.getItem("sistemPengeremanAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }

    questions.forEach((q) => {
      const savedPhoto = localStorage.getItem(`capturedPhoto_${q.id}`);
      if (savedPhoto) {
        const { photo } = JSON.parse(savedPhoto);
        setAnswers((prev) => ({ ...prev, [q.id]: { ...prev[q.id], photo } }));
        localStorage.removeItem(`capturedPhoto_${q.id}`);
      }

      const savedVideo = localStorage.getItem(`capturedVideo_${q.id}`);
      if (savedVideo) {
        const { video } = JSON.parse(savedVideo);
        setAnswers((prev) => ({ ...prev, [q.id]: { ...prev[q.id], video } }));
        localStorage.removeItem(`capturedVideo_${q.id}`);
      }
    });
  }, []);

  // Simpan jawaban tiap kali berubah
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("sistemPengeremanAnswers", JSON.stringify(answers));
    }
  }, [answers]);

  // Reset semua input selain status ketika user ganti pilihan
  const handleStatusChange = (qId: string, status: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: {
        status,
        photo: undefined,
        video: undefined,
        text: undefined,
      },
    }));
  };

  // Simpan teks langsung
  const handleTextChange = (qId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: {
        ...prev[qId],
        text: value,
      },
    }));
  };

  // Hapus foto/video manual
  const handleRemoveFile = (qId: string, type: "photo" | "video") => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], [type]: undefined },
    }));
  };

  const semuaTerisi = questions.every((q) => answers[q.id]?.status);

  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="min-h-screen w-[414px] bg-gray-100 pb-24">
        {/* Header */}
        <div className="fixed w-full max-w-[414px] z-50">
          <div className="flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  router.push("/pemeriksaan/pemeriksaanTeknis/5-perlengkapan")
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
              <span className="font-semibold">Pemeriksaan Teknis Utama</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Stepper Title */}
        <div className="px-4 py-3 pt-16">
          <p className="text-sm text-black ">
            Langkah 6 dari 8 <br />
            <span className="font-semibold">Pengukur Kecepatan</span>
          </p>
        </div>

        {/* Stepper (hanya centang) */}
        <div className="sticky top-[48px] z-40 bg-gray-100 px-4 py-4">
          <div className="flex items-center justify-between mx-4">
            {[...Array(8)].map((_, idx) => {
              const isCompleted = idx < 5;
              const isActive = idx === 5;

              return (
                <div key={idx} className="flex items-center w-full">
                  <div
                    className={`flex items-center justify-center w-4 h-4 rounded-full text-[8px] font-bold
                      ${isCompleted
                        ? "bg-[#29005E] text-white"
                        : isActive
                        ? "bg-white border border-[#29005E] text-[#29005E]"
                        : "bg-gray-300 text-transparent"}`}
                  >
                    {isCompleted ? "✓" : ""}
                  </div>

                  {idx < 7 && (
                    <div
                      className={`flex-1 h-0.5 ${
                        isCompleted ? "bg-[#29005E]" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Isi pertanyaan */}
        <div className="pt-4 px-4">
          {questions.map((q) => (
            <div key={q.id} className="mb-4 bg-white rounded-lg shadow">
              <div className="bg-[#F6A609] text-white px-3 py-2 rounded-t-lg font-bold">
                {q.label}
              </div>
              <div className="p-3 space-y-3">
                {q.options.map((opt) => (
                  <div key={opt.value}>
                    {/* Radio */}
                    <label className="flex items-center gap-1 text-black">
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id]?.status === opt.value}
                        onChange={() => handleStatusChange(q.id, opt.value)}
                        className="accent-[#EBA100]"
                      />
                      {opt.label}
                    </label>

                    {/* Input berdasarkan pilihan */}
                    {answers[q.id]?.status === opt.value && (
                      <div className="ml-2 mt-4 space-y-4">
                        {/* Input teks */}
                        {opt.inputText && (
                          <div>
                            <label className="font-bold text-black">
                              {opt.value === "tidakAda"
                                ? "Keterangan"
                                : "Kecepatan KM/Jam"}
                            </label>
                            <input
                              type="text"
                              value={answers[q.id]?.text || ""}
                              onChange={(e) =>
                                handleTextChange(q.id, e.target.value)
                              }
                              placeholder={
                                opt.value === "tidakAda"
                                  ? `Keterangan ${q.label}`
                                  : "Masukkan angka kecepatan"
                              }
                              className="mt-2 focus:outline-none focus:border-[#29005E] w-full border rounded-md p-3 text-black bg-white border-[#E0E0E0]"
                            />
                          </div>
                        )}

                        {/* Foto & Video */}
                        {opt.inputFoto && opt.inputVideo && opt.value !== "tidakAda" && (
                          <div>
                            <label className="font-bold text-black">
                              Unggah Foto & Video
                            </label>
                            <div className="flex gap-3 mt-2">
                              {/* Foto */}
                              {answers[q.id]?.photo ? (
                                <div className="relative w-full h-24 border rounded-lg overflow-hidden">
                                  <img
                                    src={answers[q.id]?.photo}
                                    alt="foto" 
                                    className="object-cover w-full h-full"
                                  />
                                  <button
                                    onClick={() =>
                                      handleRemoveFile(q.id, "photo")
                                    }
                                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center 
                                    bg-red-200 text-red-700 rounded-full shadow hover:bg-red-400 hover:text-white"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() =>
                                    router.push(
                                      `/pemeriksaan/pemeriksaanTeknis/6-pengukurKecepatan/cameraFoto?qId=${q.id}`
                                    )
                                  }
                                  className="flex flex-col items-center justify-center h-24 w-full border-2 border-dashed 
                                  border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                                >
                                  <img
                                    src="/img/icon/camera.png"
                                    className="w-6 mb-1"
                                  />
                                  <span className="text-sm text-gray-700">
                                    Ambil Foto
                                  </span>
                                </div>
                              )}

                              {/* Video */}
                              {answers[q.id]?.video ? (
                                <div className="relative w-full h-24 border rounded-lg overflow-hidden">
                                  <video
                                    src={answers[q.id]?.video}
                                    className="object-cover w-full h-full"
                                    controls
                                  />
                                  <button
                                    onClick={() =>
                                      handleRemoveFile(q.id, "video")
                                    }
                                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center 
                                    bg-red-200 text-red-700 rounded-full shadow hover:bg-red-400 hover:text-white"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() =>
                                    router.push(
                                      `/pemeriksaan/pemeriksaanTeknis/6-penggukurKecepatan/cameraVideo?qId=${q.id}`
                                    )
                                  }
                                  className="flex flex-col items-center justify-center h-24 w-full border-2 border-dashed 
                                  border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                                >
                                  <img
                                    src="/img/icon/video.png"
                                    className="w-6 mb-1"
                                  />
                                  <span className="text-sm text-gray-700">
                                    Ambil Video
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tombol bawah */}
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 shadow-lg">
          <div className="max-w-[414px] mx-auto px-4 py-3 flex gap-3">
            <button
              onClick={() =>
                router.push("/pemeriksaan/pemeriksaanTeknis/5-perlengkapan")
              }
              className="w-1/2 py-3 font-bold text-[#29005E] border border-[#29005E] rounded-md"
            >
              SEBELUMNYA
            </button>
            <button
              disabled={!semuaTerisi}
              onClick={() =>
                router.push("/pemeriksaan/pemeriksaanTeknis/7-penghapusKaca")
              }
              className={`w-1/2 py-3 font-bold text-white rounded-md transition 
                ${
                  semuaTerisi
                    ? "bg-[#29005E]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              LANJUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

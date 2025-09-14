"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Option {
  value: string;
  label: string;
  showPhoto?: boolean;
  showText?: boolean;
}

interface Question {
  id: string;
  label: string;
  options: Option[];
}

interface Answer extends Option {
  text?: string;
  photo?: string;
}

export default function PemeriksaanAdministrasi() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const questions: Question[] = [
    {
      id: "stuk",
      label: "Kartu Uji/STUK",
      options: [
        { value: "ada", label: "Ada, Berlaku", showPhoto: true },
        { value: "tidak_berlaku", label: "Tidak Berlaku", showPhoto: true },
        { value: "tidak_ada", label: "Tidak Ada", showText: true },
        { value: "tidak_sesuai", label: "Tidak Sesuai Fisik" },
      ],
    },
    {
      id: "kp_reguler",
      label: "KP Reguler",
      options: [
        { value: "ada", label: "Ada, Berlaku", showPhoto: true },
        { value: "tidak_berlaku", label: "Tidak Berlaku", showPhoto: true },
        { value: "tidak_ada", label: "Tidak Ada", showText: true },
        { value: "tidak_sesuai", label: "Tidak Sesuai Fisik" },
      ],
    },
    {
      id: "kp_cadangan",
      label: "KP Cadangan (Untuk Kendaraan Cadangan)",
      options: [
        { value: "ada", label: "Ada, Berlaku", showPhoto: true },
        { value: "tidak_berlaku", label: "Tidak Berlaku", showPhoto: true },
        { value: "tidak_ada", label: "Tidak Ada", showText: true },
        { value: "tidak_sesuai", label: "Tidak Sesuai Fisik" },
      ],
    },
    {
      id: "sim",
      label: "SIM Pengemudi",
      options: [
        { value: "a", label: "A Umum", showPhoto: true },
        { value: "b1", label: "B1 Umum", showPhoto: true },
        { value: "b2", label: "B2 Umum", showPhoto: true },
        { value: "tidak_sesuai", label: "SIM Tidak Sesuai", showText: true },
      ],
    },
  ];

  // Pilih opsi baru
  const handleSelect = (qId: string, option: Option) => {
    setAnswers((prev) => {
      // Reset jawaban lama supaya tidak dobel foto + teks
      const newAnswer: Answer = { ...option };

      return {
        ...prev,
        [qId]: newAnswer,
      };
    });

    // Kalau ganti ke opsi teks, hapus foto yang tersimpan
    localStorage.removeItem(`capturedPhoto_${qId}`);
  };

  // Input teks
  const handleTextChange = (qId: string, value: string) => {
  setAnswers((prev) => {
    const updated = { ...prev[qId], text: value, photo: undefined }; // hapus foto
    localStorage.setItem(`answer_${qId}`, JSON.stringify(updated)); // 🔥 auto-save teks
    localStorage.removeItem(`capturedPhoto_${qId}`); // hapus foto lama
    return { ...prev, [qId]: updated };
  });
};

  // Ambil foto yang tersimpan setelah balik dari kamera
  useEffect(() => {
  questions.forEach((q) => {
    const saved = localStorage.getItem(`answer_${q.id}`);
    if (saved) {
      setAnswers((prev) => ({
        ...prev,
        [q.id]: JSON.parse(saved),
      }));
    }

    const savedPhoto = localStorage.getItem(`capturedPhoto_${q.id}`);
    if (savedPhoto) {
      const { photo, qId, option } = JSON.parse(savedPhoto);
      setAnswers((prev) => ({
        ...prev,
        [qId]: { value: option, photo },
      }));
    }
  });
}, []);

  const semuaTerisi = questions.every((q) => answers[q.id]);

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-20 w-[414px]">
        {/* Header */}
        <div className="fixed w-full p-auto max-w-[414px] z-50">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/pemeriksaan/fotoKendaraan/preview")}>
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
              <span className="font-semibold">Pemeriksaan Administrasi</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Isi */}
        <div className="pt-16 px-4">
          {questions.map((q) => (
            <div key={q.id} className="mb-4 bg-white rounded-lg shadow">
              <div className="bg-[#F6A609] text-white px-3 py-2 rounded-t-lg font-bold">
                {q.label}
              </div>

              <div className="p-3 space-y-2">
                {q.options.map((opt) => (
                  <div key={opt.value}>
                    <label className="flex items-center gap-2 text-black">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.value}
                        checked={answers[q.id]?.value === opt.value}
                        onChange={() => handleSelect(q.id, opt)}
                        className="w-4 h-4 text-[#29005E] focus:ring-[#29005E]"
                      />
                      {opt.label}
                    </label>

                    {/* Foto */}
                    {answers[q.id]?.value === opt.value && opt.showPhoto && (
                      answers[q.id]?.photo ? (
                        <div className="relative w-52 h-32 border rounded-lg overflow-hidden">
                          <img
                            src={answers[q.id].photo}
                            alt="Preview"
                            className="object-cover w-full h-full"
                          />
                          <button
                            onClick={() => {
                              setAnswers((prev) => ({
                                ...prev,
                                [q.id]: { ...prev[q.id], photo: undefined },
                              }));
                              localStorage.removeItem(`capturedPhoto_${q.id}`);
                            }}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center 
                              bg-red-200 text-red-700 rounded-full shadow hover:bg-red-400 hover:text-white z-10"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() =>
                            router.push(
                              `/pemeriksaan/pemeriksaanAdministrasi/camera?qId=${q.id}&option=${opt.value}`
                            )
                          }
                          className="flex flex-col items-center justify-center h-32 w-52 border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                        >
                          <img src="/img/icon/camera.png" className="w-6 mb-1" />
                          <span className="text-sm text-gray-700">
                            Ambil Foto
                          </span>
                        </div>
                      )
                    )}

                    {/* Input teks */}
                    {answers[q.id]?.value === opt.value && opt.showText && (
                      <div className="ml-6 mt-2">
                        <input
                          type="text"
                          value={answers[q.id]?.text || ""}
                          onChange={(e) =>
                            handleTextChange(q.id, e.target.value)
                          }
                          placeholder={`Keterangan ${q.label}`}
                          className="w-full border rounded-md p-3 text-black bg-white border-[#E0E0E0] 
                            focus:outline-none focus:border-[#29005E]"
                        />
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
              onClick={() => router.push("/pemeriksaan/administrasi/preview")}
              className={`w-full py-3 font-bold text-white rounded-md transition ${
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
// coba straig
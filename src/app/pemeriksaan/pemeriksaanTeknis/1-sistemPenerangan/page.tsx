"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Option {
  value: string;
  label: string;
  showPhoto?: boolean;
  showVideo?: boolean;
  showSide?: boolean; // kanan/kiri
}

interface Question {
  id: string;
  label: string;
  options: Option[];
}

interface Answer extends Option {
  side?: { kanan?: boolean; kiri?: boolean };
  photo?: string;
  video?: string;
}

export default function SistemPeneranganPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const questions: Question[] = [
    {
      id: "lampu_dekat",
      label: "Lampu Utama Dekat",
      options: [
        { value: "semua", label: "Semua Menyala", showPhoto: true, showVideo: true },
        { value: "tidak", label: "Tidak Menyala", showPhoto: true, showVideo: true, showSide: true },
      ],
    },
    {
      id: "lampu_jauh",
      label: "Lampu Utama Jauh",
      options: [
        { value: "semua", label: "Semua Menyala", showPhoto: true, showVideo: true },
        { value: "tidak", label: "Tidak Menyala", showPhoto: true, showVideo: true, showSide: true },
      ],
    },
    // dst untuk sein, rem, mundur
  ];

  // 🟢 Pilih opsi
  const handleSelect = (qId: string, opt: Option) => {
    const newAnswer: Answer = { ...opt };
    setAnswers((prev) => ({ ...prev, [qId]: newAnswer }));
    localStorage.setItem(`answer_${qId}`, JSON.stringify(newAnswer));
  };

  // 🟢 Toggle kanan/kiri
  const handleSideChange = (qId: string, side: "kanan" | "kiri") => {
    setAnswers((prev) => {
      const updated = {
        ...prev[qId],
        side: {
          ...prev[qId]?.side,
          [side]: !prev[qId]?.side?.[side],
        },
      };
      localStorage.setItem(`answer_${qId}`, JSON.stringify(updated));
      return { ...prev, [qId]: updated };
    });
  };

  // 🟢 Ambil foto & video tersimpan
  useEffect(() => {
    questions.forEach((q) => {
      const saved = localStorage.getItem(`answer_${q.id}`);
      if (saved) {
        setAnswers((prev) => ({ ...prev, [q.id]: JSON.parse(saved) }));
      }

      const savedPhoto = localStorage.getItem(`capturedPhoto_${q.id}`);
      if (savedPhoto) {
        const { photo, qId, option } = JSON.parse(savedPhoto);
        setAnswers((prev) => ({
          ...prev,
          [qId]: { ...prev[qId], value: option, photo },
        }));
      }

      const savedVideo = localStorage.getItem(`capturedVideo_${q.id}`);
      if (savedVideo) {
        const { video, qId, option } = JSON.parse(savedVideo);
        setAnswers((prev) => ({
          ...prev,
          [qId]: { ...prev[qId], value: option, video },
        }));
      }
    });
  }, []);

  const semuaTerisi = questions.every((q) => answers[q.id]);

  return (
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
                    checked={answers[q.id]?.value === opt.value}
                    onChange={() => handleSelect(q.id, opt)}
                    className="accent-[#29005E]"
                  />
                  {opt.label}
                </label>

                {/* Side kanan/kiri */}
                {answers[q.id]?.value === opt.value && opt.showSide && (
                  <div className="flex gap-4 ml-6">
                    <label>
                      <input
                        type="checkbox"
                        checked={answers[q.id]?.side?.kanan || false}
                        onChange={() => handleSideChange(q.id, "kanan")}
                      />{" "}
                      Kanan
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={answers[q.id]?.side?.kiri || false}
                        onChange={() => handleSideChange(q.id, "kiri")}
                      />{" "}
                      Kiri
                    </label>
                  </div>
                )}

                {/* Foto */}
                {answers[q.id]?.value === opt.value && opt.showPhoto && (
                  answers[q.id]?.photo ? (
                    <img src={answers[q.id].photo} className="w-32 h-24 object-cover" />
                  ) : (
                    <button
                      onClick={() =>
                        router.push(`/pemeriksaan/pemeriksaanTeknis/1-sistemPenerangan/cameraFoto?qId=${q.id}&option=${opt.value}`)
                      }
                      className="p-2 border rounded bg-purple-100"
                    >
                      Ambil Foto
                    </button>
                  )
                )}

                {/* Video */}
                {answers[q.id]?.value === opt.value && opt.showVideo && (
                  answers[q.id]?.video ? (
                    <video src={answers[q.id].video} controls className="w-32 h-24" />
                  ) : (
                    <button
                      onClick={() =>
                        router.push(`/pemeriksaan/pemeriksaanTeknis/1-sistemPenerangan/cameraVideo?qId=${q.id}&option=${opt.value}`)
                      }
                      className="p-2 border rounded bg-purple-100"
                    >
                      Ambil Video
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Tombol lanjut */}
      <button
        disabled={!semuaTerisi}
        onClick={() => router.push("/pemeriksaan/pemeriksaanTeknis/2-klakson")}
        className="w-full py-3 bg-[#29005E] text-white rounded disabled:bg-gray-400"
      >
        SELANJUTNYA
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";

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

export default function QuestionForm() {
  const [answers, setAnswers] = useState<Record<string, Option & { text?: string }>>({});

  const handleSelect = (qId: string, option: Option) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: option,
    }));
  };

  const handleTextChange = (qId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: { ...prev[qId], text: value },
    }));
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-lg font-bold mb-4">Lengkapi Data Administrasi</h1>

      {questions.map((q) => (
        <div key={q.id} className="mb-6 border-b pb-4">
          <p className="font-medium mb-2">{q.label}</p>

          <div className="space-y-3">
            {q.options.map((opt) => (
              <div key={opt.value}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.value}
                    checked={answers[q.id]?.value === opt.value}
                    onChange={() => handleSelect(q.id, opt)}
                  />
                  {opt.label}
                </label>

                {/* Kondisional tepat di bawah opsi terpilih */}
                {answers[q.id]?.value === opt.value && opt.showPhoto && (
                  <div
                    className="flex flex-col items-center justify-center h-32 w-52 border-2 border-dashed border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                    >
                    <img src="/img/icon/camera.png" className="w-6 mb-1" />
                    <span className="text-sm text-gray-700">Ambil Foto</span>
                    </div>
                )}

                {answers[q.id]?.value === opt.value && opt.showText && (
                  <div className="ml-6 mt-2">
                    <input
                      type="text"
                      value={answers[q.id]?.text || ""}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      placeholder={`Keterangan ${q.label}`}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                )}
                
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg">
        Selesai
      </button>
    </div>
  );
}

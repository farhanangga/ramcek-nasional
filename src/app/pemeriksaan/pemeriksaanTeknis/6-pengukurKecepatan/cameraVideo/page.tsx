// src/app/pemeriksaan/pemeriksaanTeknis/1-sistemPenerangan/cameraVideo/page.tsx
"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CameraVideoInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);

  const qId = searchParams.get("qId");

  useEffect(() => {
    if (!videoRef.current) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const facingMode = isMobile
      ? { facingMode: { exact: "environment" } }
      : { facingMode: "user" };

    navigator.mediaDevices
      .getUserMedia({ video: facingMode, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp9",
        });

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const url = URL.createObjectURL(blob);

          try {
            localStorage.setItem(
              `capturedVideo_${qId}`,
              JSON.stringify({ video: url, qId })
            );
          } catch (err) {
            console.error("Gagal simpan video:", err);
          }

          chunksRef.current = [];
          router.push("/pemeriksaan/pemeriksaanTeknis/6-pengukurKecepatan");
        };
      })
      .catch((err) => {
        console.error("Error membuka kamera:", err);
      });

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, []);

  const startRecording = () => {
    if (!mediaRecorderRef.current) return;
    chunksRef.current = [];
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="bg-black flex items-center justify-center">
      <div className="bg-black pb-20 w-[414px]">
        {/* Header */}
        <div className="fixed w-full max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-black text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  router.push("/pemeriksaan/pemeriksaanTeknis/6-pengukurKecepatan")
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
              <span className="font-semibold">Ambil Video</span>
            </div>
          </div>
        </div>

        {/* Frame Kamera */}
        <div className="fixed w-full h-[70vh] mt-12 max-w-[414px] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tombol Rekam */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg">
        <div className="bg-black w-full h-[25vh] mx-auto flex flex-col items-center justify-center">
            <p className="text-white mb-4">Pastikan video terlihat jelas</p>

            {/* Wrapper tombol */}
            <div
            className={`rounded-full h-19 w-19 ${
                isRecording ? "border-2 border-red-500" : "border-2 border-white"
            }`}
            >
            <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-16 h-16 rounded-full shadow-lg m-1 transition ${
                isRecording ? "bg-red-600" : "bg-white"
                }`}
            ></button>
            </div>
        </div>
        </div>

      </div>
    </div>
  );
}

// ✅ Page wrapper dengan Suspense
export default function CameraVideoPage() {
  return (
    <Suspense fallback={<div>Loading kamera...</div>}>
      <CameraVideoInner />
    </Suspense>
  );
}

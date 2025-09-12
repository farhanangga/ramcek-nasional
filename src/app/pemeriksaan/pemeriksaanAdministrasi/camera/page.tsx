
"use client";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function KameraPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ambil query param (harus qId & option)
  const qId = searchParams.get("qId");
  const option = searchParams.get("option");

  useEffect(() => {
    if (!videoRef.current) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const facingMode = isMobile ? { facingMode: "environment" } : { facingMode: "user" };

    navigator.mediaDevices
      .getUserMedia({ video: facingMode })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error membuka kamera:", err);
      });

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const ambilGambar = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");

    // Simpan hasil ke localStorage (camera -> form)
    localStorage.setItem(
      "capturedPhoto",
      JSON.stringify({
        photo: dataUrl,
        qId,
        option,
      })
    );

    // Kembali ke halaman form (atau router.back())
    router.push("/pemeriksaan/pemeriksaanAdministrasi");
  };


  return (
    <div className="bg-black flex items-center justify-center">
      <div className=" bg-gray-100 pb-20 w-[414px]">
        {/* Header */}
        <div className="fixed w-full p-auto max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-black text-white px-4 py-3 shadow z-50">
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
              <span className="font-semibold">Ambil Gambar</span>
            </div>
          </div>
        </div>

        {/* Frame Kamera */}
        <div className="fixed w-full h-[70vh] mt-12 max-w-[414px] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/10">
            <div
              className="absolute top-1/2 left-1/2 w-[400px] h-[200px] 
                        -translate-x-1/2 -translate-y-1/2 
                        rounded-md bg-transparent"
              style={{ boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)" }}
            />
          </div>
        </div>

        {/* Tombol ambil gambar */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg">
          <div className="bg-black w-full h-[25vh] mx-auto flex items-center justify-center">
            <button
              onClick={ambilGambar}
              className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

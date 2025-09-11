"use client";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useRouter } from "next/navigation";

export default function HasilScan() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const preferredCamera = isMobile ? "environment" : "user";

    const qrScanner = new QrScanner(
      videoRef.current,
      (result) => {
        qrScanner.stop();

        // contoh validasi hasil QR
        if (result.data && result.data.includes("NOMOR_KENDARAAN_VALID")) {
          router.push("/pemeriksaan/qrScanner/preview");
        } else {
          setError(true); // tampilkan notif error
        }
      },
      { preferredCamera }
    );

    qrScanner.start();
    qrScannerRef.current = qrScanner;

    return () => {
      qrScannerRef.current?.stop();
      qrScannerRef.current?.destroy();
      qrScannerRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [router]);

  return (
    <div className="bg-black flex items-center justify-center">
      <div className="min-h-screen bg-gray-100 pb-20 w-[414px]">
        {/* Header fixed */}
        <div className="fixed w-full p-auto max-w-[414px]">
          <div className="top-0 left-0 w-full flex items-center justify-between bg-black text-white px-4 py-3 shadow z-50">
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/pemeriksaan/dataPemeriksaan-1")}>
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
              <span className="font-semibold">Pindai QRCode KIR Kendaraan</span>
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

          {/* Overlay kotak */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/10">
            <div
              className="absolute top-1/2 left-1/2 w-[250px] h-[250px] 
                        -translate-x-1/2 -translate-y-1/2 
                        rounded-md bg-transparent"
              style={{ boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)" }}
            />
          </div>
        </div>

        {/* Tombol fixed */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg">
          <div className="bg-black w-[414px] h-[25vh] mx-auto"></div>
        </div>

        {/* Modal Error */}
        {error && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="red"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Data Kendaraan Tidak Sesuai
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Nomor kendaraan tidak sesuai dengan data Nomor Kendaraan pada eKir
              </p>
              <button
                onClick={() => setError(false)}
                className="mt-4 w-full bg-[#29005E] text-white py-2 rounded-lg font-semibold"
              >
                KEMBALI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

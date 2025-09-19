"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpTrayIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SignatureCanvas from "react-signature-canvas";

export default function TerbitkanBeritaAcara() {
  const router = useRouter();

  const [pengemudi, setPengemudi] = useState("");
  const [petugas, setPetugas] = useState("");
  const [signatures, setSignatures] = useState<{
    penguji: string | null;
    pengemudi: string | null;
    petugas: string | null;
  }>({
    penguji: null,
    pengemudi: null,
    petugas: null,
  });

  const [openMenu, setOpenMenu] = useState<null | keyof typeof signatures>(null);
  const [openSignature, setOpenSignature] = useState<
    null | keyof typeof signatures
  >(null);

  const sigCanvas = useRef<SignatureCanvas>(null);

  const semuaTerisi =
    signatures.penguji && signatures.pengemudi && signatures.petugas;

  const handleClear = () => {
    sigCanvas.current?.clear();
  };

  const handleSave = () => {
  if (sigCanvas.current?.isEmpty()) {
    alert("Tanda tangan belum diisi");
    return;
  }

  let dataUrl: string | undefined;

  try {
    dataUrl = sigCanvas.current
      ?.getTrimmedCanvas()
      .toDataURL("image/png");
  } catch (err) {
    console.warn("getTrimmedCanvas gagal, fallback ke getCanvas()", err);
    dataUrl = sigCanvas.current
      ?.getCanvas()
      .toDataURL("image/png");
  }

  if (openSignature && dataUrl) {
    setSignatures((prev) => ({
      ...prev,
      [openSignature]: dataUrl,
    }));
  }
  setOpenSignature(null);
};


  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="min-h-screen w-[414px] bg-gray-100 pb-24 relative">
        {/* Header */}
        <div className="fixed w-full max-w-[414px] z-50">
          <div className="flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow">
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  router.push("/pemeriksaan/ptPenunjang/4-perlengkapanKendaraan")
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
              <span className="font-semibold">Terbitkan Berita Acara</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* ISI */}
        <div className="pt-17 px-4 space-y-6">
          {/* Penguji */}
          <div>
            <div className="text-black font-semibold mb-2">
              Penguji Kendaraan Bermotor
            </div>
            <div className="bg-white rounded-xl shadow p-4">
              <h2 className="font-bold text-lg text-black">Gunawan</h2>
              <p className="text-sm text-black">354654654</p>
              <hr className="my-3" />
              <p className="font-medium mb-2 text-black">TTD Penguji</p>
              {signatures.penguji ? (
                <img
                  src={signatures.penguji}
                  alt="Tanda tangan penguji"
                  className="w-full h-34 object-contain border rounded-md"
                />
              ) : (
                <div
                  onClick={() => setOpenMenu("penguji")}
                  className="flex flex-col items-center justify-center h-34 w-full border-2 border-dashed 
                  border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                >
                  <img src="/img/icon/sign.png" className="w-6 mb-1" />
                  <span className="text-sm text-gray-700">Tanda Tangan</span>
                </div>
              )}
            </div>
          </div>

          {/* Pengemudi */}
          <div>
            <div className="text-black font-semibold mb-2">Pengemudi</div>
            <div className="bg-white rounded-xl shadow p-4">
              <select
                value={pengemudi}
                onChange={(e) => setPengemudi(e.target.value)}
                className="focus:outline-none focus:border-[#29005E] w-full border rounded-md p-3 mb-2 text-black bg-white border-[#E0E0E0]"
              >
                <option value="">Nama Pengemudi</option>
                <option value="Budi">Budi</option>
                <option value="Andi">Andi</option>
              </select>
              <hr className="my-3" />
              <p className="font-medium mb-2 text-black">TTD Pengemudi</p>
              {signatures.pengemudi ? (
                <img
                  src={signatures.pengemudi}
                  alt="Tanda tangan pengemudi"
                  className="w-full h-34 object-contain border rounded-md"
                />
              ) : (
                <div
                  onClick={() => setOpenMenu("pengemudi")}
                  className="flex flex-col items-center justify-center h-34 w-full border-2 border-dashed 
                  border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                >
                  <img src="/img/icon/sign.png" className="w-6 mb-1" />
                  <span className="text-sm text-gray-700">Tanda Tangan</span>
                </div>
              )}
            </div>
          </div>

          {/* Petugas */}
          <div>
            <div className="text-black font-semibold mb-2">Petugas Kemenhub</div>
            <div className="bg-white rounded-xl shadow p-4">
              <select
                value={petugas}
                onChange={(e) => setPetugas(e.target.value)}
                className="focus:outline-none focus:border-[#29005E] w-full border rounded-md p-3 mb-2 text-black bg-white border-[#E0E0E0]"
              >
                <option value="">Petugas Kemenhub</option>
                <option value="Petugas A">Petugas A</option>
                <option value="Petugas B">Petugas B</option>
              </select>
              <hr className="my-3" />
              <p className="font-medium mb-2 text-black">TTD Petugas Kemenhub</p>
              {signatures.petugas ? (
                <img
                  src={signatures.petugas}
                  alt="Tanda tangan petugas"
                  className="w-full h-34 object-contain border rounded-md"
                />
              ) : (
                <div
                  onClick={() => setOpenMenu("petugas")}
                  className="flex flex-col items-center justify-center h-34 w-full border-2 border-dashed 
                  border-[#29005E] rounded-lg bg-[#F3E9FF] cursor-pointer"
                >
                  <img src="/img/icon/sign.png" className="w-6 mb-1" />
                  <span className="text-sm text-gray-700">Tanda Tangan</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tombol lanjut */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100 text-black">
          <div className="max-w-md mx-auto px-4 py-3 text-black">
            <button
              type="button"
              disabled={!semuaTerisi}
              onClick={() =>
                router.push("/pemeriksaan/ptPenunjang/4-perlengkapanKendaraan")
              }
              className={`w-full py-3 font-bold text-white rounded-md transition ${
                semuaTerisi
                  ? "bg-[#29005E]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              TERBITKAN BERITA ACARA
            </button>
          </div>
        </div>

        {/* Bottom Sheet Pilihan */}
        {openMenu && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50"
            onClick={() => setOpenMenu(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-t-2xl p-4 transform transition-transform duration-300"
            >
              <button
                className="w-full text-left py-3 flex items-center gap-3 text-black"
                onClick={() => {
                  alert("Unggah Tanda Tangan: " + openMenu);
                  setOpenMenu(null);
                }}
              >
                <ArrowUpTrayIcon className="w-6 h-6 text-black" />
                Unggah Tanda Tangan
              </button>
              <hr />
              <button
                className="w-full text-left py-3 flex items-center gap-3 text-black"
                onClick={() => {
                  setOpenSignature(openMenu);
                  setOpenMenu(null);
                }}
              >
                <PencilSquareIcon className="w-6 h-6 text-black" />
                Buat Tanda Tangan
              </button>
            </div>
          </div>
        )}

        {/* Modal Canvas Tanda Tangan */}
        {openSignature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md bg-white rounded-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-gray-200">
                <span className="text-black font-semibold">
                  Tanda tangan disini
                </span>
                <button onClick={() => setOpenSignature(null)}>
                  <XMarkIcon className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Canvas */}
              <div className="relative">
              <SignatureCanvas
  ref={sigCanvas}
  penColor="black"
  canvasProps={{
    className:
      "border border-gray-300 rounded-md w-full h-72 bg-white",
    style: { width: "100%", height: "100%" }, // biar ikut container
  }}
/>

            </div>

              {/* Tombol aksi */}
              <div className="flex justify-between gap-3 p-4">
                <button
                  onClick={handleClear}
                  className="w-1/2 py-3 rounded-md bg-gray-300 text-black font-bold"
                >
                  HAPUS
                </button>
                <button
                  onClick={handleSave}
                  onTouchEnd={handleSave}
                  className="w-1/2 py-3 rounded-md bg-[#29005E] text-white font-bold"
                >
                  SIMPAN
                </button>

              </div>
            </div>
          </div>          
        )}
      </div>
    </div>
  );
}

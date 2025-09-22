"use client";
import { useRouter } from "next/navigation";

export default function PreviewBeritaAcara() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 flex justify-center">
      <div className="min-h-screen w-[414px] bg-gray-100 pb-24">
        {/* Header */}
        <div className="fixed w-full max-w-[414px] z-50">
          <div className="flex items-center justify-between bg-[#29005E] text-white px-4 py-3 shadow">
            <div className="flex items-center gap-2">
              <button onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
              </button>
              <span className="font-semibold">Preview Berita Acara</span>
            </div>
            <img src="/img/assets/logo.png" alt="logo" className="w-5" />
          </div>
        </div>

        {/* Isi */}
        <div className="px-4 pt-20 pb-6">
          <div className="bg-white rounded-lg shadow p-4">
            {/* Header Instansi */}
            <div className="text-center mb-4">
              <img src="/img/assets/logo.png" alt="logo" className="mx-auto w-12 mb-2" />
              <p className="font-semibold">KEMENTERIAN PERHUBUNGAN REPUBLIK INDONESIA</p>
              <p className="text-sm font-bold mt-1">
                BERITA ACARA INSPEKSI KESELAMATAN LALU LINTAS DAN ANGKUTAN JALAN <br />
                UNTUK ANGKUTAN UMUM
              </p>
            </div>

            {/* Info Utama */}
            <div className="text-sm space-y-1 mb-4">
              <p>Nomor BA : 24654654321454</p>
              <p>Tanggal Terbit : 25 Agustus 2025</p>
              <p>Hari/Tanggal Pemeriksaan : Selasa, 20 Maret 2023</p>
              <p>Nama PO : BPTJ</p>
              <p>Nama Pengemudi : Andre</p>
              <p>Nomor Kendaraan : B 1234 CE</p>
            </div>

            {/* Tabel Pemeriksaan */}
            <div className="border rounded-lg overflow-hidden text-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border p-2 w-1/2">Unsur</th>
                    <th className="border p-2 w-1/2">Hasil Pemeriksaan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Kartu Uji/STUK</td>
                    <td className="border p-2 bg-green-100">Ada, Berlaku</td>
                  </tr>
                  <tr>
                    <td className="border p-2">SIM Pengemudi</td>
                    <td className="border p-2 bg-green-100">Ada</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Lampu Utama - Dekat</td>
                    <td className="border p-2 bg-green-100">Semua Menyala</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Lampu Posisi - Depan</td>
                    <td className="border p-2 bg-red-100">Tidak Menyala - Kanan</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Lantai dan Tangga</td>
                    <td className="border p-2 bg-yellow-100">Keropos/Berlubang</td>
                  </tr>
                  {/* Tambahkan semua baris lain sesuai kebutuhan */}
                </tbody>
              </table>
            </div>

            {/* Kesimpulan */}
            <p className="text-sm mt-4">
              Berdasarkan hasil pemeriksaan di atas, maka kendaraan tersebut dinyatakan{" "}
              <span className="font-bold">Diizinkan Operasional</span>
            </p>

            {/* Tanda Tangan */}
            <div className="grid grid-cols-3 gap-2 text-center text-sm mt-6">
              <div>
                <img src="/img/assets/signature1.png" alt="ttd" className="mx-auto h-12" />
                <p className="font-semibold">Andre</p>
                <p className="text-xs">Pengemudi</p>
              </div>
              <div>
                <img src="/img/assets/signature2.png" alt="ttd" className="mx-auto h-12" />
                <p className="font-semibold">Gunawan</p>
                <p className="text-xs">Penguji Kendaraan Bermotor</p>
              </div>
              <div>
                <img src="/img/assets/signature3.png" alt="ttd" className="mx-auto h-12" />
                <p className="font-semibold">Anwar</p>
                <p className="text-xs">Penyidik PNS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Unduh */}
        <div className="fixed bottom-0 left-0 w-full shadow-lg bg-gray-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <button
              type="button"
              onClick={() => alert("Mengunduh PDF...")}
              className="w-full py-3 font-bold text-white rounded-md transition bg-[#29005E]"
            >
              UNDUH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

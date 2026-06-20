"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaUserPlus,
  FaFileDownload,
  FaArrowRight,
  FaMapMarkerAlt,
  FaAward,
  FaUsers,
  FaHandHoldingHeart,
  FaExchangeAlt,
  FaQuestionCircle,
  FaCheckCircle,
  FaShieldAlt,
  FaServer,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"sd" | "smp" | "sma">("sd");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scheduleData = {
    sd: [
      {
        date: "15 - 28 Mei 2026",
        title: "Sosialisasi & Pengenalan Aplikasi",
        desc: "Sosialisasi petunjuk teknis pelaksanaan PPDB oleh Dinas Pendidikan ke satuan pendidikan SD.",
        completed: true,
      },
      {
        date: "01 - 15 Juni 2026",
        title: "Pendaftaran Online & Unggah Berkas",
        desc: "Calon siswa baru melakukan registrasi akun, pemilihan sekolah, dan unggah berkas administrasi.",
        completed: true,
      },
      {
        date: "16 - 20 Juni 2026",
        title: "Verifikasi Berkas & Validasi Jarak",
        desc: "Panitia memvalidasi kesesuaian dokumen pendaftaran dan verifikasi titik koordinat domisili.",
        completed: false,
      },
      {
        date: "24 Juni 2026",
        title: "Pengumuman Hasil Seleksi Akhir",
        desc: "Hasil seleksi diumumkan secara terbuka dan dapat dipantau di portal web PPDB.",
        completed: false,
      },
      {
        date: "26 - 30 Juni 2026",
        title: "Daftar Ulang Fisik",
        desc: "Verifikasi dokumen fisik asli calon peserta didik baru di sekolah tujuan masing-masing.",
        completed: false,
      },
    ],
    smp: [
      {
        date: "18 - 30 Mei 2026",
        title: "Sosialisasi & Prapendaftaran",
        desc: "Sosialisasi petunjuk teknis pelaksanaan PPDB jenjang SMP oleh Dinas Pendidikan.",
        completed: true,
      },
      {
        date: "03 - 18 Juni 2026",
        title: "Pendaftaran Online & Unggah Berkas",
        desc: "Pengisian formulir pendaftaran secara online, memilih sekolah pilihan, dan melengkapi dokumen.",
        completed: true,
      },
      {
        date: "19 - 23 Juni 2026",
        title: "Verifikasi & Seleksi Komparatif",
        desc: "Verifikasi administrasi pendaftar dan penentuan pemeringkatan sementara secara real-time.",
        completed: false,
      },
      {
        date: "26 Juni 2026",
        title: "Pengumuman Kelulusan Resmi",
        desc: "Rilis keputusan resmi hasil seleksi akhir PPDB tingkat SMP.",
        completed: false,
      },
      {
        date: "28 Juni - 02 Juli 2026",
        title: "Daftar Ulang di Sekolah Pilihan",
        desc: "Calon peserta didik yang dinyatakan lolos melakukan lapor diri fisik di sekolah pilihan.",
        completed: false,
      },
    ],
    sma: [
      {
        date: "20 Mei - 02 Juni 2026",
        title: "Sosialisasi & Pengenalan Sistem",
        desc: "Sosialisasi teknis pendaftaran SMA/SMK dan uji coba sistem pendaftaran mandiri.",
        completed: true,
      },
      {
        date: "05 - 22 Juni 2026",
        title: "Pendaftaran Online & Pemilihan Jurusan",
        desc: "Proses pendaftaran, pemilihan sekolah dan jurusan keahlian khusus bagi calon siswa SMK.",
        completed: true,
      },
      {
        date: "23 - 27 Juni 2026",
        title: "Verifikasi Lapangan & Tes Khusus",
        desc: "Verifikasi dokumen, verifikasi prestasi kejuaraan, dan uji kompetensi bagi SMK yang mensyaratkan.",
        completed: false,
      },
      {
        date: "30 Juni 2026",
        title: "Pengumuman Hasil Kelulusan Akhir",
        desc: "Rilis pengumuman final peserta didik baru jenjang SMA dan SMK secara terpusat.",
        completed: false,
      },
      {
        date: "02 - 07 Juli 2026",
        title: "Daftar Ulang Fisik Mandiri",
        desc: "Lapor diri dan penyerahan berkas fisik asli ke panitia sekolah untuk divalidasi.",
        completed: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300 font-sans">
      {/* TOP INFO BAR */}
      <div className="bg-linear-to-r from-blue-800 to-indigo-800 text-white py-2.5 px-4 sm:px-8 text-xs sm:text-sm flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-ping"></span>
            📅 PPDB Online TA. 2026/2027
          </span>
          <span className="hidden md:inline text-blue-200">|</span>
          <span className="font-medium">
            📞 Layanan Pengaduan: 0812-3456-7890
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-100 text-xs font-semibold border border-emerald-400/30">
            <FaServer className="animate-pulse text-emerald-200" /> Server Utama
            Aktif
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative bg-linear-to-b from-blue-50/70 via-white to-slate-50 py-16 sm:py-24 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-size[32px_32px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Penerimaan Peserta Didik Baru Online TA. 2026/2027
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
              Daftar Sekolah <br className="hidden sm:inline" />
              Lebih{" "}
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mudah & Transparan
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Selamat datang di portal resmi Penerimaan Peserta Didik Baru
              (PPDB). Kami melayani pendaftaran jenjang SD, SMP, SMA, dan SMK
              secara objektif, akuntabel, transparan, dan tanpa diskriminasi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-750 hover:to-indigo-750 text-white rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 font-bold transition-all duration-200"
              >
                Mulai Pendaftaran <FaUserPlus size={16} />
              </Link>
              <a
                href="#alur"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 hover:bg-slate-50 rounded-2xl border border-slate-200 font-bold transition-all duration-200 shadow-xs"
              >
                Unduh Petunjuk Teknis <FaFileDownload size={16} />
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-115 aspect-4/3 rounded-3xl bg-white p-3 shadow-xl border border-slate-200/60 group overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-transparent transition-colors duration-300 z-10 rounded-3xl"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-50">
                <Image
                  src="/hero_students.png"
                  alt="PPDB Students Illustration"
                  fill
                  priority
                  className="object-cover scale-102 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-5 hover:scale-102 transition-transform duration-300">
            <div className="p-4 rounded-xl bg-blue-50 text-blue-650">
              <FaUsers size={26} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Pendaftar
              </h3>
              <p className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
                14,820 Calon Siswa
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-5 hover:scale-102 transition-transform duration-300">
            <div className="p-4 rounded-xl bg-emerald-50 text-emerald-600">
              <FaCheckCircle size={26} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sekolah Terdaftar
              </h3>
              <p className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
                86 Pilihan Lembaga
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-5 hover:scale-102 transition-transform duration-300">
            <div className="p-4 rounded-xl bg-indigo-50 text-indigo-650">
              <FaShieldAlt size={26} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Sistem Pendaftaran
              </h3>
              <p className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
                Terverifikasi Aman
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JALUR SELEKSI */}
      <section
        id="jalur"
        className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Jalur Pendaftaran PPDB
          </h2>
          <p className="text-slate-500 font-medium">
            Pilihlah jalur pendaftaran yang sesuai dengan kondisi domisili,
            prestasi, atau administrasi calon peserta didik baru.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Zonasi */}
          <div className="bg-white border border-slate-200/80 hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group">
            <div className="space-y-4">
              <div className="p-3.5 w-fit rounded-xl bg-blue-550/5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FaMapMarkerAlt size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Jalur Zonasi</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Jalur pendaftaran berdasarkan jarak radius domisili tempat
                tinggal calon peserta didik menuju sekolah pilihan.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-blue-600">
              <span>Kuota: Minimal 50%</span>
              <FaArrowRight
                size={10}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          {/* Afirmasi */}
          <div className="bg-white border border-slate-200/80 hover:border-rose-500/50 hover:shadow-xl hover:-translate-y-1 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group">
            <div className="space-y-4">
              <div className="p-3.5 w-fit rounded-xl bg-rose-550/5 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                <FaHandHoldingHeart size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Jalur Afirmasi
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Disediakan khusus untuk calon peserta didik dari keluarga
                ekonomi kurang mampu (KIP/PKH) dan penyandang disabilitas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-rose-600">
              <span>Kuota: Minimal 15%</span>
              <FaArrowRight
                size={10}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          {/* Perpindahan */}
          <div className="bg-white border border-slate-200/80 hover:border-amber-500/50 hover:shadow-xl hover:-translate-y-1 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group">
            <div className="space-y-4">
              <div className="p-3.5 w-fit rounded-xl bg-amber-550/5 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <FaExchangeAlt size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Perpindahan Tugas
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Ditujukan bagi anak guru/tenaga kependidikan atau yang mengikuti
                perpindahan tugas/domisili kerja orang tua.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-amber-600">
              <span>Kuota: Maksimal 5%</span>
              <FaArrowRight
                size={10}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>

          {/* Prestasi */}
          <div className="bg-white border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-xl hover:-translate-y-1 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group">
            <div className="space-y-4">
              <div className="p-3.5 w-fit rounded-xl bg-emerald-550/5 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <FaAward size={20} />
              </div>
              <h3 className="font-bold text-lg text-slate-900">
                Jalur Prestasi
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Diperhitungkan berdasarkan nilai rapor akumulasi atau perolehan
                piagam kejuaraan akademik & non-akademik.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-emerald-600">
              <span>Kuota: Sisa Kuota (30%)</span>
              <FaArrowRight
                size={10}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ALUR PENDAFTARAN */}
      <section id="alur" className="py-20 sm:py-28 bg-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Alur Pendaftaran PPDB
            </h2>
            <p className="text-slate-500 font-medium">
              Berikut langkah praktis untuk mendaftarkan calon siswa baru secara
              online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center shadow-xs relative hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-blue-500/20">
                1
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                Pendaftaran Akun
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Buat akun pendaftar mandiri di dashboard dengan melengkapi NIK,
                NISN, serta melampirkan email aktif.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center shadow-xs relative hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-blue-500/20">
                2
              </div>
              <h3 className="font-bold text-slate-900 mb-2">
                Pilih Jalur & Sekolah
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Tentukan jalur pendaftaran yang sesuai serta susun pilihan
                sekolah berdasarkan prioritas tujuan.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center shadow-xs relative hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-blue-500/20">
                3
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Unggah Dokumen</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Unggah dokumen persyaratan (KK, Akta Kelahiran, Rapor/Ijazah,
                dll.) sesuai petunjuk sistem.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center shadow-xs relative hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-blue-500/20">
                4
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Pantau Status</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Panitia memverifikasi berkas Anda. Silakan pantau status
                kelulusan di dashboard secara real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JADWAL PELAKSANAAN */}
      <section
        id="jadwal"
        className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Jadwal Pelaksanaan PPDB
          </h2>
          <p className="text-slate-500 font-medium">
            Perhatikan baik-baik agenda pelaksanaan pendaftaran agar tidak
            terlewatkan.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          {(["sd", "smp", "sma"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-2xl font-bold border-none transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              Jenjang {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Timeline Grid */}
        <div className="bg-white border border-slate-200/80 p-6 sm:p-10 rounded-3xl shadow-lg max-w-4xl mx-auto">
          <div className="relative border-l-2 border-blue-500/30 ml-4 space-y-10 py-2">
            {scheduleData[activeTab].map((item, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Dot indicator */}
                <span
                  className={`absolute -left-2.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all bg-white border-blue-500 ${
                    item.completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : ""
                  }`}
                >
                  {item.completed && (
                    <FaCheckCircle className="w-3.5 h-3.5 text-white" />
                  )}
                </span>

                {/* Timeline content */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                      <FaCalendarAlt size={10} /> {item.date}
                    </span>
                    {item.completed && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        Selesai
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-2xl font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 sm:py-28 bg-slate-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Tanya Jawab (FAQ)
            </h2>
            <p className="text-slate-500 font-medium">
              Berikut jawaban atas pertanyaan-pertanyaan yang sering diajukan
              pendaftar.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Bagaimana jika titik koordinat domisili peta kurang akurat?",
                a: "Saat melengkapi profil di dashboard, Anda dapat memposisikan titik koordinat GPS secara manual di peta. Jika masih menemui kendala akurasi, silakan datangi sekretariat sekolah pilihan pertama terdekat untuk dibantu oleh petugas operator.",
              },
              {
                q: "Apakah diperbolehkan mendaftar di 2 jalur pendaftaran sekaligus?",
                a: "Calon peserta didik hanya diperkenankan memilih satu jalur dalam satu rentang gelombang. Namun, jika pendaftaran pada jalur afirmasi atau prestasi dinyatakan tidak lolos, Anda dapat mendaftar kembali di jalur zonasi selama jalur zonasi masih dibuka.",
              },
              {
                q: "Dokumen apa saja yang harus dibawa saat daftar ulang fisik?",
                a: "Persyaratan wajib meliputi cetak kartu pendaftaran online, fotokopi dan KK asli, akta kelahiran asli, Surat Keterangan Lulus (SKL), serta berkas penunjang jalur (misal KIP untuk afirmasi atau piagam untuk prestasi).",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-900 hover:bg-slate-50/50 transition-all cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <FaQuestionCircle
                      className="text-blue-500 shrink-0"
                      size={16}
                    />
                    {faq.q}
                  </span>
                  <span
                    className={`text-slate-400 transition-transform duration-200 transform ${openFaq === idx ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === idx
                      ? "max-h-40 border-t border-slate-100"
                      : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-5 text-sm text-slate-500 leading-relaxed bg-slate-50/40">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

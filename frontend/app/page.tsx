"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  FaGraduationCap, 
  FaUserPlus, 
  FaClipboardList, 
  FaCalendarAlt, 
  FaArrowRight, 
  FaMapMarkerAlt, 
  FaAward, 
  FaUsers, 
  FaHandHoldingHeart, 
  FaExchangeAlt, 
  FaQuestionCircle, 
  FaCheckCircle,
  FaFileDownload,
  FaSearch,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Home() {
  const [activeTab, setActiveTab] = useState("sd");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans">
      
      {/* TOP BAR / INFO BAR */}
      <div className="bg-blue-900 text-white py-2 px-4 sm:px-8 text-xs sm:text-sm flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-blue-800">
        <div className="flex items-center gap-4">
          <span>📅 PPDB Online TA. 2026/2027</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">📞 Layanan Pengaduan: 0812-3456-7890</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Server Utama Aktif
          </span>
        </div>
      </div>

      {/* NAVBAR */}
      <header className="navbar bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-8 shadow-sm">
        <div className="flex-1 gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20">
            <FaGraduationCap size={24} />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400 block leading-tight">
              PPDB ONLINE
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider opacity-60 block">
              Dinas Pendidikan & Kebudayaan
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="flex-none gap-2 hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-slate-600 dark:text-slate-300 text-sm gap-1">
            <li><a href="#alur" className="hover:text-blue-600 focus:text-blue-600">Alur</a></li>
            <li><a href="#jalur" className="hover:text-blue-600 focus:text-blue-600">Jalur Seleksi</a></li>
            <li><a href="#jadwal" className="hover:text-blue-600 focus:text-blue-600">Jadwal</a></li>
            <li><a href="#faq" className="hover:text-blue-600 focus:text-blue-600">FAQ</a></li>
          </ul>
          <div className="divider divider-horizontal mx-2 py-3"></div>
          <button className="btn btn-ghost border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold px-5 rounded-xl text-sm">
            Cek Status
          </button>
          <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl shadow-md shadow-blue-500/20 px-6 text-sm font-semibold">
            Daftar Sekarang <FaArrowRight size={12} className="ml-1" />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex-none lg:hidden">
          <button 
            className="btn btn-ghost btn-square"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer/Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-md absolute w-full left-0 z-40">
          <a href="#alur" className="block py-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Alur Pendaftaran</a>
          <a href="#jalur" className="block py-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Jalur Seleksi</a>
          <a href="#jadwal" className="block py-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Jadwal Pelaksanaan</a>
          <a href="#faq" className="block py-2 font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Pertanyaan Umum (FAQ)</a>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button className="btn btn-outline border-slate-200 dark:border-slate-800 rounded-xl w-full">Cek Status Seleksi</button>
            <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl w-full">Daftar Sekarang</button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/20 py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/50 dark:border-blue-800/50">
              📌 Penerimaan Peserta Didik Baru Online TA. 2026/2027
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 dark:from-white dark:via-blue-100 dark:to-blue-300 bg-clip-text text-transparent">
              Daftar Sekolah Lebih <br /> Mudah dan Transparan
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
              Selamat datang di portal Penerimaan Peserta Didik Baru (PPDB) resmi. Kami melayani pendaftaran jenjang SD, SMP, SMA, dan SMK dengan akuntabel dan transparan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-8 rounded-xl shadow-lg shadow-blue-600/25">
                Mulai Pendaftaran <FaUserPlus size={16} className="ml-1" />
              </button>
              <button className="btn btn-outline border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-8">
                Unduh Petunjuk Teknis <FaFileDownload size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Hero Image / Graphic */}
          <div className="lg:col-span-5 flex justify-center mt-6 lg:mt-0">
            <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/50 dark:border-slate-800/80 overflow-hidden group">
              <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-400/5 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
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
      </section>

      {/* QUICK STATS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800/60 flex items-center gap-5">
            <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <FaUsers size={28} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Pendaftar</h3>
              <p className="text-2xl font-bold tracking-tight mt-0.5">14,820 Calon Siswa</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800/60 flex items-center gap-5">
            <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <FaCheckCircle size={28} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Lembaga Terdaftar</h3>
              <p className="text-2xl font-bold tracking-tight mt-0.5">86 Sekolah Pilihan</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800/60 flex items-center gap-5">
            <div className="p-4 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <FaClipboardList size={28} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Jalur Pendaftaran</h3>
              <p className="text-2xl font-bold tracking-tight mt-0.5">4 Jalur Seleksi</p>
            </div>
          </div>
        </div>
      </section>

      {/* JALUR SELEKSI PPDB */}
      <section id="jalur" className="py-20 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold tracking-tight">Jalur Pendaftaran PPDB</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Pilih jalur pendaftaran yang sesuai dengan kualifikasi dan berkas administrasi calon peserta didik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Zonasi */}
          <div className="card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
            <div className="card-body p-6 flex flex-col justify-between">
              <div>
                <div className="p-3 w-fit rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mb-4">
                  <FaMapMarkerAlt size={22} />
                </div>
                <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">Jalur Zonasi</h3>
                <p className="text-sm opacity-75">
                  Jalur pendaftaran berdasarkan zona jarak radius tempat tinggal domisili calon siswa menuju sekolah pilihan.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-blue-600 dark:text-blue-400 flex justify-between items-center">
                <span>Kuota: Minimal 50%</span>
                <FaArrowRight size={10} />
              </div>
            </div>
          </div>

          {/* Card 2: Afirmasi */}
          <div className="card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
            <div className="card-body p-6 flex flex-col justify-between">
              <div>
                <div className="p-3 w-fit rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 mb-4">
                  <FaHandHoldingHeart size={22} />
                </div>
                <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">Jalur Afirmasi</h3>
                <p className="text-sm opacity-75">
                  Khusus bagi calon peserta didik dari keluarga ekonomi tidak mampu (KIP/PKH) dan penyandang disabilitas.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-rose-600 dark:text-rose-400 flex justify-between items-center">
                <span>Kuota: Minimal 15%</span>
                <FaArrowRight size={10} />
              </div>
            </div>
          </div>

          {/* Card 3: Perpindahan Tugas */}
          <div className="card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
            <div className="card-body p-6 flex flex-col justify-between">
              <div>
                <div className="p-3 w-fit rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 mb-4">
                  <FaExchangeAlt size={22} />
                </div>
                <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">Perpindahan Tugas</h3>
                <p className="text-sm opacity-75">
                  Bagi calon peserta didik yang mengikuti perpindahan domisili tugas dinas/kerja orang tua atau wali.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-amber-600 dark:text-amber-400 flex justify-between items-center">
                <span>Kuota: Maksimal 5%</span>
                <FaArrowRight size={10} />
              </div>
            </div>
          </div>

          {/* Card 4: Prestasi */}
          <div className="card bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
            <div className="card-body p-6 flex flex-col justify-between">
              <div>
                <div className="p-3 w-fit rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mb-4">
                  <FaAward size={22} />
                </div>
                <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white">Jalur Prestasi</h3>
                <p className="text-sm opacity-75">
                  Berdasarkan nilai rata-rata ujian, piagam kompetisi kejuaraan akademik maupun non-akademik.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex justify-between items-center">
                <span>Kuota: Sisa Kuota (30%)</span>
                <FaArrowRight size={10} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALUR PENDAFTARAN */}
      <section id="alur" className="py-20 bg-slate-100 dark:bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight">Alur Pendaftaran PPDB</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Prosedur langkah demi langkah yang harus dilakukan calon peserta didik untuk mendaftar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 text-center flex flex-col items-center shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-blue-500/20">
                1
              </div>
              <h3 className="font-bold text-base mb-2">Pendaftaran Akun</h3>
              <p className="text-xs opacity-75 leading-relaxed">
                Buat akun pendaftar secara mandiri menggunakan NIK, NISN, dan melengkapi data profil awal.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 text-center flex flex-col items-center shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-blue-500/20">
                2
              </div>
              <h3 className="font-bold text-base mb-2">Pilih Jalur & Sekolah</h3>
              <p className="text-xs opacity-75 leading-relaxed">
                Pilih jalur seleksi (Zonasi, Prestasi, dsb.) dan tentukan prioritas pilihan sekolah tujuan Anda.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 text-center flex flex-col items-center shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-blue-500/20">
                3
              </div>
              <h3 className="font-bold text-base mb-2">Unggah Berkas</h3>
              <p className="text-xs opacity-75 leading-relaxed">
                Unggah berkas kelengkapan administrasi seperti Kartu Keluarga, Rapor, Ijazah, atau Akta Kelahiran.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 text-center flex flex-col items-center shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-blue-500/20">
                4
              </div>
              <h3 className="font-bold text-base mb-2">Verifikasi & Pantau</h3>
              <p className="text-xs opacity-75 leading-relaxed">
                Panitia melakukan verifikasi fisik/berkas. Pantau hasil pemeringkatan seleksi di menu Cek Status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JADWAL PELAKSANAAN */}
      <section id="jadwal" className="py-20 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight">Jadwal Pelaksanaan PPDB</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Perhatikan rentang tanggal pelaksanaan setiap tahapan seleksi agar tidak terlewat.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-2 mb-8">
          <button 
            onClick={() => setActiveTab("sd")}
            className={`btn rounded-xl px-6 font-semibold border-none ${activeTab === "sd" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300"}`}
          >
            Jenjang SD
          </button>
          <button 
            onClick={() => setActiveTab("smp")}
            className={`btn rounded-xl px-6 font-semibold border-none ${activeTab === "smp" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300"}`}
          >
            Jenjang SMP
          </button>
          <button 
            onClick={() => setActiveTab("sma")}
            className={`btn rounded-xl px-6 font-semibold border-none ${activeTab === "sma" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-300"}`}
          >
            Jenjang SMA/SMK
          </button>
        </div>

        {/* Timeline */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 p-6 sm:p-10 rounded-2xl shadow-sm">
          <ul className="timeline timeline-vertical timeline-snap-icon max-md:timeline-compact">
            
            <li>
              <div className="timeline-middle text-blue-600 dark:text-blue-400">
                <FaCheckCircle size={20} />
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic text-sm opacity-60">15 - 28 Mei 2026</time>
                <div className="text-lg font-bold mt-0.5">Sosialisasi & Pengenalan Aplikasi</div>
                <p className="text-sm opacity-70 mt-1">
                  Sosialisasi petunjuk teknis pelaksanaan PPDB oleh Dinas Pendidikan dan pelatihan operator sekolah.
                </p>
              </div>
              <hr className="bg-blue-600 dark:bg-blue-400" />
            </li>

            <li>
              <hr className="bg-blue-600 dark:bg-blue-400" />
              <div className="timeline-middle text-blue-600 dark:text-blue-400">
                <FaCheckCircle size={20} />
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic text-sm opacity-60">1 - 15 Juni 2026</time>
                <div className="text-lg font-bold mt-0.5">Pendaftaran & Unggah Berkas</div>
                <p className="text-sm opacity-70 mt-1">
                  Calon siswa melakukan pendaftaran online, mengunggah berkas, dan memilih sekolah pilihan secara mandiri di portal.
                </p>
              </div>
              <hr />
            </li>

            <li>
              <hr />
              <div className="timeline-middle opacity-50">
                <FaCheckCircle size={20} />
              </div>
              <div className="timeline-start mb-10 md:text-end">
                <time className="font-mono italic text-sm opacity-60">16 - 20 Juni 2026</time>
                <div className="text-lg font-bold mt-0.5">Validasi & Verifikasi Panitia</div>
                <p className="text-sm opacity-70 mt-1">
                  Pengecekan keabsahan data dokumen yang diunggah dan verifikasi jarak radius koordinat peta domisili oleh operator.
                </p>
              </div>
              <hr />
            </li>

            <li>
              <hr />
              <div className="timeline-middle opacity-50">
                <FaCheckCircle size={20} />
              </div>
              <div className="timeline-end mb-10">
                <time className="font-mono italic text-sm opacity-60">24 Juni 2026</time>
                <div className="text-lg font-bold mt-0.5">Pengumuman Kelulusan Resmi</div>
                <p className="text-sm opacity-70 mt-1">
                  Pengumuman kelulusan final. Dapat diakses secara terbuka di menu Status Kelulusan portal PPDB.
                </p>
              </div>
              <hr />
            </li>

            <li>
              <hr />
              <div className="timeline-middle opacity-50">
                <FaCheckCircle size={20} />
              </div>
              <div className="timeline-start md:text-end">
                <time className="font-mono italic text-sm opacity-60">26 - 30 Juni 2026</time>
                <div className="text-lg font-bold mt-0.5">Daftar Ulang di Sekolah Pilihan</div>
                <p className="text-sm opacity-70 mt-1">
                  Calon siswa yang lulus wajib membawa berkas fisik asli ke sekolah pilihan untuk daftar ulang.
                </p>
              </div>
            </li>

          </ul>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section id="faq" className="py-20 bg-slate-100 dark:bg-slate-900/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold tracking-tight">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Ada hal yang kurang dipahami? Temukan jawaban cepat di bawah ini.
            </p>
          </div>

          <div className="space-y-4">
            <div className="collapse collapse-plus bg-white dark:bg-slate-900 shadow-sm border border-slate-200/40 dark:border-slate-800/80 rounded-2xl">
              <input type="radio" name="faq-accordion" defaultChecked /> 
              <div className="collapse-title text-base font-bold flex items-center gap-2">
                <FaQuestionCircle className="text-blue-600" />
                <span>Bagaimana jika jarak domisili pada koordinat map tidak akurat?</span>
              </div>
              <div className="collapse-content text-sm text-slate-600 dark:text-slate-400">
                <p>
                  Jika koordinat GPS tidak presisi, Anda dapat memposisikan titik koordinat secara manual di peta saat melengkapi data profil. Jika kesulitan, silakan datang langsung ke sekolah pilihan pertama terdekat untuk dibantu oleh petugas operator PPDB sekolah.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white dark:bg-slate-900 shadow-sm border border-slate-200/40 dark:border-slate-800/80 rounded-2xl">
              <input type="radio" name="faq-accordion" /> 
              <div className="collapse-title text-base font-bold flex items-center gap-2">
                <FaQuestionCircle className="text-blue-600" />
                <span>Apakah bisa mendaftar di 2 jalur pendaftaran sekaligus?</span>
              </div>
              <div className="collapse-content text-sm text-slate-600 dark:text-slate-400">
                <p>
                  Secara umum, pendaftaran hanya diperbolehkan melalui satu jalur pendaftaran dalam satu rentang waktu gelombang. Jika Anda dinyatakan tidak lolos di jalur prestasi atau afirmasi, Anda dapat mendaftar kembali di jalur zonasi selama masa pendaftaran jalur zonasi masih dibuka.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-white dark:bg-slate-900 shadow-sm border border-slate-200/40 dark:border-slate-800/80 rounded-2xl">
              <input type="radio" name="faq-accordion" /> 
              <div className="collapse-title text-base font-bold flex items-center gap-2">
                <FaQuestionCircle className="text-blue-600" />
                <span>Berkas apa saja yang wajib dibawa saat proses daftar ulang fisik?</span>
              </div>
              <div className="collapse-content text-sm text-slate-600 dark:text-slate-400">
                <p>
                  Anda wajib membawa berkas cetak tanda bukti kelulusan online, Kartu Keluarga asli dan fotokopi, Surat Keterangan Lulus (SKL) asli, Akta Kelahiran, dan berkas pendukung sesuai jalur pendaftaran (KIP/Sertifikat Kejuaraan) untuk verifikasi kesesuaian berkas asli.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-xl">
                <FaGraduationCap size={22} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">PPDB ONLINE</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Layanan Sistem Penerimaan Peserta Didik Baru Online terintegrasi, transparan, dan akuntabel untuk tingkat pendidikan SD, SMP, SMA, dan SMK.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#alur" className="hover:text-blue-400 transition-colors">Alur Pelaksanaan</a></li>
              <li><a href="#jalur" className="hover:text-blue-400 transition-colors">Jalur Pendaftaran</a></li>
              <li><a href="#jadwal" className="hover:text-blue-400 transition-colors">Jadwal Seleksi</a></li>
              <li><a href="#faq" className="hover:text-blue-400 transition-colors">Pusat Bantuan (FAQ)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Kontak & Bantuan</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dinas Pendidikan dan Kebudayaan Republik Indonesia <br />
              Jl. Jenderal Sudirman No. 10, Jakarta Selatan <br />
              📞 (021) 1234-5678 <br />
              ✉️ ppdb@kemendikbud.go.id
            </p>
          </div>
        </div>
        <div className="border-t border-slate-900 bg-black/40 py-6 text-center text-xs text-slate-500">
          <p>© 2026 Dinas Pendidikan & Kebudayaan. All rights reserved. Dikembangkan secara resmi untuk portal PPDB.</p>
        </div>
      </footer>

    </div>
  );
}

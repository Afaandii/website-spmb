"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "@/lib/cookies";
import {
  FaUser,
  FaFileAlt,
  FaMapMarkerAlt,
  FaSchool,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowLeft,
  FaGraduationCap,
  FaDownload,
  FaSignOutAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getCookie("token"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Terjadi kesalahan saat logout.");
      }

      console.log("Logout success", data.message);
      deleteCookie("token");
      router.push("/login");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan saat logout.";
      console.error(errorMessage);
    }
  };

  const [profile] = useState({
    name: "Budi Santoso",
    nisn: "0082736183",
    regNum: "PPDB-2026-08912",
    gender: "Laki-laki",
    originSchool: "SMP Negeri 1 Jakarta",
    status: "Menunggu Verifikasi",
    jalur: "Jalur Zonasi",
  });

  const [choices] = useState([
    {
      rank: 1,
      name: "SMA Negeri 8 Jakarta",
      distance: "820 meter",
      status: "Pemeringkatan Ke-12 (Lolos)",
    },
    {
      rank: 2,
      name: "SMA Negeri 28 Jakarta",
      distance: "1.4 km",
      status: "Cadangan",
    },
    {
      rank: 3,
      name: "SMA Negeri 70 Jakarta",
      distance: "3.2 km",
      status: "Di luar kuota",
    },
  ]);

  const [checklist] = useState([
    {
      id: 1,
      label: "Lengkapi Biodata Profil",
      completed: true,
      type: "Data Profil",
    },
    {
      id: 2,
      label: "Tentukan Titik Koordinat Rumah",
      completed: true,
      type: "GPS Domisili",
    },
    {
      id: 3,
      label: "Pilih 3 Sekolah Prioritas",
      completed: true,
      type: "Sekolah Pilihan",
    },
    {
      id: 4,
      label: "Unggah Scan Kartu Keluarga",
      completed: true,
      type: "Berkas Utama",
    },
    {
      id: 5,
      label: "Unggah Scan Rapor / SKL",
      completed: false,
      type: "Berkas Akademik",
    },
    {
      id: 6,
      label: "Finalisasi & Cetak Kartu Bukti",
      completed: false,
      type: "Konfirmasi Akhir",
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Dashboard Top Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <FaArrowLeft size={14} />
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <FaGraduationCap size={16} />
              </div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                PORTAL PPDB
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-slate-200">{profile.name}</p>
              <p className="text-[10px] text-slate-500 font-semibold">
                {profile.regNum}
              </p>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer border-none"
            >
              <FaSignOutAlt /> <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Block */}
        <div className="bg-linear-to-r from-blue-900/40 via-indigo-950/30 to-slate-900 border border-blue-500/15 p-6 sm:p-8 rounded-3xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Halo, {profile.name}!
              </h1>
              <p className="text-sm text-slate-400 max-w-xl">
                Selamat datang di halaman pendaftaran Anda. Silakan selesaikan
                seluruh daftar persyaratan di bawah ini untuk memproses
                verifikasi berkas oleh panitia dinas.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold border ${
                  profile.status === "Menunggu Verifikasi"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : profile.status === "Verifikasi Selesai"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {profile.status === "Menunggu Verifikasi" ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    {profile.status}
                  </>
                ) : profile.status === "Verifikasi Selesai" ? (
                  <>
                    <FaCheckCircle className="text-emerald-500" />
                    {profile.status}
                  </>
                ) : (
                  <>
                    <FaExclamationCircle className="text-red-500" />
                    {profile.status}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Area: Profile and Choices */}
          <div className="lg:col-span-8 space-y-8">
            {/* Profile Overview */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FaUser className="text-blue-500" /> Profil Calon Peserta Didik
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Nomor Pendaftaran
                  </span>
                  <p className="font-semibold text-slate-200">
                    {profile.regNum}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    NISN
                  </span>
                  <p className="font-semibold text-slate-200">{profile.nisn}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Jalur Pendaftaran
                  </span>
                  <p className="font-semibold text-slate-200">
                    {profile.jalur}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Sekolah Asal
                  </span>
                  <p className="font-semibold text-slate-200">
                    {profile.originSchool}
                  </p>
                </div>
              </div>
            </div>

            {/* School Choices */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FaSchool className="text-blue-500" /> Sekolah Pilihan Prioritas
              </h2>

              <div className="space-y-4">
                {choices.map((choice) => (
                  <div
                    key={choice.rank}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:border-slate-700/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="h-10 w-10 flex items-center justify-center bg-blue-600/10 text-blue-400 font-bold rounded-xl shrink-0 text-sm">
                        {choice.rank}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm sm:text-base">
                          {choice.name}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt size={10} /> Jarak Radius:{" "}
                          {choice.distance}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl ${
                        choice.status.includes("Lolos")
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                          : choice.status.includes("Cadangan")
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/10"
                            : "bg-red-500/10 text-red-400 border border-red-500/10"
                      }`}
                    >
                      {choice.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Area: Checklist & Helpline */}
          <div className="lg:col-span-4 space-y-8">
            {/* Checklist */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FaFileAlt className="text-blue-500" /> Persyaratan Pendaftaran
              </h2>

              <div className="space-y-3.5">
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3 p-3.5 rounded-2xl bg-slate-950/30 border border-slate-800/40 hover:border-slate-800 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-500">
                        {item.type}
                      </p>
                      <p className="text-sm font-semibold text-slate-200">
                        {item.label}
                      </p>
                    </div>

                    <button
                      className={`p-1.5 rounded-lg shrink-0 ${
                        item.completed
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-blue-600/15 text-blue-400 hover:bg-blue-600/25 cursor-pointer"
                      }`}
                    >
                      {item.completed ? (
                        <FaCheckCircle size={16} />
                      ) : (
                        <FaDownload size={14} className="animate-bounce" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline Info */}
            <div className="bg-linear-to-br from-indigo-950/40 to-slate-950 border border-indigo-900/30 p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-white text-base">
                Butuh Bantuan Operator?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Jika terdapat kesalahan pengisian berkas atau penentuan
                koordinat domisili yang tidak sesuai, silakan menghubungi pusat
                layanan bantuan operator kami.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center gap-3 text-sm font-bold text-blue-400">
                <FaPhoneAlt /> <span>Hotline: 0812-3456-7890</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

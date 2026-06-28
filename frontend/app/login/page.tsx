"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PPDB Login attempt:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-12 bg-slate-50 text-slate-800 font-sans select-none">
      {/* Sisi Kiri: Poster PPDB (Hanya muncul di md ke atas) */}
      <div className="hidden md:block md:col-span-5 lg:col-span-6 relative overflow-hidden bg-slate-900">
        <img
          src="/assets/img/poster-siswa-auth.jpg"
          alt="PPDB Online Poster"
          className="w-full h-full object-cover object-center select-none"
        />
        {/* Overlay Gradasi & Teks untuk Kesan Premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-10 flex flex-col justify-end text-white">
          <div className="max-w-md">
            <h2 className="text-3xl font-extrabold tracking-tight mb-3">
              Mulai Langkah Pendidikan Terbaik Anda
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              Portal resmi Penerimaan Peserta Didik Baru (PPDB) Online. Kami melayani proses pendaftaran sekolah secara transparan, objektif, dan akuntabel.
            </p>
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="col-span-12 md:col-span-7 lg:col-span-6 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white md:bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl md:shadow-xl md:border md:border-slate-200/80 flex flex-col justify-between min-h-[550px] transition-all">
          {/* Header Link */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors mb-6 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Kembali ke Beranda
            </Link>

            {/* Logo PPDB */}
            <div className="flex flex-col items-center text-center space-y-2.5 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
                <GraduationCap className="h-6.5 w-6.5" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Masuk Portal PPDB
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Tahun Ajaran 2026/2027
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username field */}
              <div className="space-y-1.5 text-left">
                <label
                  className="text-xs font-bold text-slate-600 uppercase tracking-wider block"
                  htmlFor="email"
                >
                  Email atau NISN
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Masukkan email atau NISN Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm font-medium"
                />
              </div>

              {/* Password field */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label
                    className="text-xs font-bold text-slate-600 uppercase tracking-wider"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-blue-600 hover:text-indigo-600 transition-colors"
                  >
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 pl-3.5 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye className="h-4.5 w-4.5" />
                    ) : (
                      <EyeOff className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                  />
                  <span className="text-xs font-medium text-slate-500">Ingat Saya</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-11 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Masuk Sekarang
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Footer Section */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-slate-500 font-medium">
              Belum terdaftar?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-indigo-600 font-bold underline underline-offset-4 transition-colors"
              >
                Daftar Akun Baru
              </Link>
            </p>
            <div className="h-[1px] bg-slate-100 w-full"></div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed px-4">
              Butuh bantuan? Silakan hubungi Layanan Pengaduan PPDB di{" "}
              <span className="text-slate-600 font-semibold whitespace-nowrap">0812-3456-7890</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

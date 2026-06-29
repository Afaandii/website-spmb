"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import posterSiswa from "@/public/assets/img/poster-siswa-auth.jpg";
import Image from "next/image";
// import Router from "next/router";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Terjadi Kesalahan pada server!`);
      }

      if (res.ok) {
        console.log("Login success:", data);

        // Router.push("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.message || "Login Gagal!, Terjadi kesalahan koneksi server.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:h-screen w-full grid grid-cols-1 md:grid-cols-12 overflow-y-auto md:overflow-hidden bg-slate-50 text-slate-800 font-sans select-none">
      {/* Sisi Kiri: Poster PPDB (Hanya muncul di md ke atas) */}
      <div className="hidden md:block md:col-span-5 lg:col-span-6 h-full relative overflow-hidden bg-slate-900">
        <Image
          src={posterSiswa}
          alt="PPDB Online Poster"
          className="w-full h-full object-cover object-center select-none"
        />
      </div>

      {/* Sisi Kanan: Form Login (Tanpa Container Card, Tanpa Scroll di Desktop, Scrollable di Mobile) */}
      <div className="col-span-12 md:col-span-7 lg:col-span-6 min-h-screen md:h-full flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-16 bg-slate-50 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-size-[24px_24px] relative">
        {/* Header Link */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors group"
          >
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Form Login (Centered vertically in the remaining space) */}
        <div className="w-full max-w-md mx-auto my-auto py-6 flex flex-col justify-center space-y-4">
          {/* Logo PPDB */}
          <div className="flex flex-col items-center text-center space-y-2.5 mb-1 md:mb-2">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <GraduationCap className="h-5.5 w-5.5 md:h-6.5 md:w-6.5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Login Portal PPDB
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Tahun Ajaran 2026/2027
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold p-3.5 rounded-xl border border-red-200 text-left transition-all">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 md:space-y-5">
            {/* Email / Username field */}
            <div className="space-y-1.5 text-left">
              <label
                className="text-[11px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block"
                htmlFor="email"
              >
                NISN / USERNAME
              </label>
              <input
                id="email"
                type="text"
                placeholder="Masukkan NISN atau Username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-10 md:h-12 px-3.5 md:px-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs md:text-sm font-semibold shadow-xs"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label
                  className="text-[11px] md:text-xs font-bold text-slate-500 uppercase tracking-wider"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-blue-600 hover:text-indigo-600 transition-colors"
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
                  className="w-full h-10 md:h-12 pl-3.5 md:pl-4 pr-11 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs md:text-sm font-semibold shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 md:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="h-4.5 w-4.5 md:h-5 md:w-5" />
                  ) : (
                    <EyeOff className="h-4.5 w-4.5 md:h-5 md:w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between py-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-500">
                  Remember Me?
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 md:h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-xs md:text-sm shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? "Memproses..." : "Masuk Sekarang"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-xs md:text-sm text-slate-500 font-semibold text-center mt-4 md:mt-6">
            Belum terdaftar?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-indigo-600 font-extrabold underline underline-offset-4 transition-colors"
            >
              Daftar Akun Baru
            </Link>
          </p>
        </div>

        {/* Footer Section */}
        <div className="w-full">
          <div className="h-px bg-slate-200/80 w-full mb-3 md:mb-4"></div>
          <p className="text-[10px] md:text-[11px] text-slate-400 font-semibold text-center leading-relaxed">
            Butuh bantuan? Silakan hubungi Layanan Pengaduan PPDB di{" "}
            <span className="text-slate-600 font-bold whitespace-nowrap">
              0812-3456-7890
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

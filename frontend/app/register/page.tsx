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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [nisn, setNisn] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          nisn: nisn,
          username: username,
          email: email,
          password: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal, silakan coba lagi.");
      }

      setSuccessMessage(data.message || "Registrasi berhasil! Silakan login.");
      setNisn("");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(
        err.message || "Registrasi Gagal!, Terjadi kesalahan koneksi server.",
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

      {/* Sisi Kanan: Form Register (Tanpa Container Card, Tanpa Scroll di Desktop, Scrollable di Mobile) */}
      <div className="col-span-12 md:col-span-7 lg:col-span-6 min-h-screen md:h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-slate-50 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-size-[24px_24px] relative">
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

        {/* Form Register (Centered vertically & Compact) */}
        <div className="w-full max-w-md mx-auto my-auto py-2 flex flex-col justify-center">
          {/* Logo PPDB */}
          <div className="flex flex-col items-center text-center space-y-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
              <GraduationCap className="h-5.5 w-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Daftar Akun PPDB
              </h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Tahun Ajaran 2026/2027
              </p>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold p-3.5 rounded-xl border border-red-200 text-left transition-all mb-4">
              {error}
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="bg-green-50 text-green-600 text-xs font-semibold p-3.5 rounded-xl border border-green-200 text-left transition-all mb-4">
              {successMessage}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* NISN field */}
            <div className="space-y-1 text-left">
              <label
                className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block"
                htmlFor="nisn"
              >
                NISN
              </label>
              <input
                id="nisn"
                type="text"
                maxLength={10}
                placeholder="Masukkan 10 digit NISN Anda"
                value={nisn}
                onChange={(e) => setNisn(e.target.value.replace(/\D/g, ""))}
                required
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-450 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs font-semibold shadow-xs"
              />
            </div>

            {/* Name field */}
            <div className="space-y-1 text-left">
              <label
                className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block"
                htmlFor="name"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-450 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs font-semibold shadow-xs"
              />
            </div>

            {/* Email field */}
            <div className="space-y-1 text-left">
              <label
                className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-10 px-3.5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-450 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs font-semibold shadow-xs"
              />
            </div>

            {/* Password field */}
            <div className="space-y-1 text-left">
              <label
                className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat password minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full h-10 pl-3.5 pr-10 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-450 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs font-semibold shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="h-4.5 w-4.5" />
                  ) : (
                    <EyeOff className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer text-xs shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 mt-1 disabled:opacity-75 disabled:pointer-events-none"
            >
              {loading ? "Memproses..." : "Daftar Sekarang"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-xs text-slate-500 font-semibold text-center mt-4">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-indigo-600 font-extrabold underline underline-offset-4 transition-colors"
            >
              Masuk Sekarang
            </Link>
          </p>
        </div>

        {/* Footer Section */}
        <div className="w-full">
          <div className="h-px bg-slate-200/80 w-full mb-3"></div>
          <p className="text-[10px] text-slate-400 font-semibold text-center leading-relaxed">
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

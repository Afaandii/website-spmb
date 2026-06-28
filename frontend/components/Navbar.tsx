"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaGraduationCap,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaClipboardCheck,
} from "react-icons/fa";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/95 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex-1 flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2.5 bg-linear-to-tr from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-all duration-300">
                <FaGraduationCap
                  size={22}
                  className="group-hover:rotate-6 transition-transform"
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black tracking-tight bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block leading-tight">
                  PPDB ONLINE
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Dinas Pendidikan & Kebudayaan
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <a
                href="#alur"
                className="text-sm font-bold text-slate-600 hover:text-blue-650 transition-colors duration-200"
              >
                Alur
              </a>
              <a
                href="#jalur"
                className="text-sm font-bold text-slate-600 hover:text-blue-650 transition-colors duration-200"
              >
                Jalur Seleksi
              </a>
              <a
                href="#jadwal"
                className="text-sm font-bold text-slate-600 hover:text-blue-650 transition-colors duration-200"
              >
                Jadwal
              </a>
              <a
                href="#faq"
                className="text-sm font-bold text-slate-600 hover:text-blue-650 transition-colors duration-200"
              >
                FAQ
              </a>
            </nav>

            <div className="h-5 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-655 transition-all duration-200"
              >
                <FaClipboardCheck className="opacity-75 text-blue-600" />
                Cek Status
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-sm font-bold transition-all duration-200"
              >
                Masuk / Daftar <FaArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200/50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-lg border-b border-slate-200 transition-all duration-300 transform origin-top ${
          mobileMenuOpen
            ? "scale-y-100 opacity-100 visible"
            : "scale-y-95 opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-4 max-w-md mx-auto">
          <a
            href="#alur"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
          >
            Alur Pendaftaran
          </a>
          <a
            href="#jalur"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
          >
            Jalur Seleksi
          </a>
          <a
            href="#jadwal"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
          >
            Jadwal Pelaksanaan
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
          >
            Pertanyaan Umum (FAQ)
          </a>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 text-sm transition-all"
            >
              <FaClipboardCheck className="text-blue-600" /> Cek Status Seleksi
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-bold text-white shadow-lg shadow-blue-500/20 text-sm transition-all"
            >
              Masuk / Daftar Sekarang <FaArrowRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

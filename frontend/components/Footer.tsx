"use client";

import React from "react";
import {
  FaGraduationCap,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-600 border-t border-slate-200 transition-colors duration-300">
      {/* Top Footer Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/25">
              <FaGraduationCap size={22} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-950">
              PPDB ONLINE
            </span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 max-w-sm font-medium">
            Portal resmi Layanan Penerimaan Peserta Didik Baru (PPDB) Online
            terintegrasi, transparan, dan akuntabel. Melayani pendaftaran
            jenjang SD, SMP, SMA, dan SMK.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white transition-all text-slate-500 duration-200 border border-slate-200 shadow-xs"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white transition-all text-slate-500 duration-200 border border-slate-200 shadow-xs"
              aria-label="Facebook"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white transition-all text-slate-500 duration-200 border border-slate-200 shadow-xs"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white transition-all text-slate-500 duration-200 border border-slate-200 shadow-xs"
              aria-label="Youtube"
            >
              <FaYoutube size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-5">
          <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
            Tautan Cepat
          </h4>
          <ul className="space-y-3 text-sm font-semibold">
            <li>
              <a
                href="#alur"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Alur Pendaftaran
              </a>
            </li>
            <li>
              <a
                href="#jalur"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Jalur Seleksi
              </a>
            </li>
            <li>
              <a
                href="#jadwal"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Jadwal Kegiatan
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Tanya Jawab (FAQ)
              </a>
            </li>
          </ul>
        </div>

        {/* Contact/Help Center Column */}
        <div className="md:col-span-4 space-y-5">
          <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
            Kontak & Sekretariat
          </h4>
          <ul className="space-y-3.5 text-sm font-medium">
            <li className="flex gap-3 items-start">
              <FaMapMarkerAlt
                className="text-blue-600 mt-1 shrink-0"
                size={16}
              />
              <span>
                Dinas Pendidikan & Kebudayaan <br />
                Jl. Jenderal Sudirman No. 10, Jakarta Selatan, 12190
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <FaPhoneAlt className="text-blue-600 shrink-0" size={15} />
              <span>(021) 1234-5678 / 0812-3456-7890</span>
            </li>
            <li className="flex gap-3 items-center">
              <FaEnvelope className="text-blue-600 shrink-0" size={15} />
              <span>ppdb@kemendikbud.go.id</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="border-t border-slate-200 bg-slate-200/50 py-6 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© 2026 Dinas Pendidikan & Kebudayaan. All rights reserved.</p>
          <p className="mt-1 opacity-75">
            Sistem dikembangkan secara resmi untuk pengelolaan portal PPDB
            tingkat daerah.
          </p>
        </div>
      </div>
    </footer>
  );
}

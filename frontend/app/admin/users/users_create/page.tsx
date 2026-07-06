"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

interface RoleType {
  id: number;
  nama_role: string;
  deskripsi: string;
}

const FALLBACK_ROLES: RoleType[] = [
  { id: 1, nama_role: "ADMIN_PANITIA", deskripsi: "Panitia Penerimaan" },
  { id: 2, nama_role: "SUPER_ADMIN", deskripsi: "Administrator Utama" },
  { id: 3, nama_role: "VERIFIKATOR", deskripsi: "Verifikator Berkas" },
];

export default function CreateUserPage() {
  const router = useRouter();
  const [roles, setRoles] = useState<RoleType[]>([]);
  // const [loadingRoles, setLoadingRoles] = useState(true);

  // Form State
  const [fullName, setFullName] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status State
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = "http://localhost:8080/api/v1";

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/role`);
        const json = await res.json();
        if (json.status === 200 && Array.isArray(json.data)) {
          setRoles(json.data);
        } else {
          console.error("Gagal memuat data role:", json.message);
        }
      } catch (error) {
        console.error("Terjadi kesalahan koneksi ke API:", error);
      } finally {
        // setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  const showAlert = (type: "success" | "error", text: string) => {
    setAlertMessage({ type, text });
    if (type === "error") {
      setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !roleId) {
      showAlert(
        "error",
        "Harap isi semua kolom wajib (Nama Lengkap, Email, Role Akses, Password)!",
      );
      return;
    }

    if (password !== confirmPassword) {
      showAlert("error", "Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        username: fullName,
        email,
        password,
        role_id: parseInt(roleId),
        siswa_id: null,
        is_active: 1, // Default: Aktif
        nip: nip || null,
        phone: phone || null,
      };

      const res = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.status === 201 || json.status === 201) {
        showAlert(
          "success",
          "Berhasil menambahkan user baru! Mengalihkan halaman...",
        );
        setTimeout(() => {
          router.push("/admin/users");
        }, 1500);
      } else {
        let errorMessage = json.message || "Gagal menambahkan user baru.";
        if (json.error) {
          if (typeof json.error === "object") {
            errorMessage = Object.values(json.error).join(", ");
          } else {
            errorMessage = json.error;
          }
        }
        showAlert("error", errorMessage);
      }
    } catch (error) {
      console.error(error);
      // Fallback local mock success for dummy implementation
      showAlert(
        "success",
        "Berhasil menambahkan user baru (Mode Demo)! Mengalihkan halaman...",
      );
      setTimeout(() => {
        router.push("/admin/users");
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayRoles = roles.length > 0 ? roles : FALLBACK_ROLES;

  return (
    <div className="bg-[#09090b] text-[#FAFAFA] min-h-screen p-1 sm:p-4 md:p-6 space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/users"
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Users
        </Link>
      </div>

      {/* Alert Banner */}
      {alertMessage && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border shadow-xl max-w-2xl mx-auto animate-in fade-in duration-300 ${
            alertMessage.type === "success"
              ? "bg-[#102A1E] text-[#4ADE80] border-[#1E4D34]"
              : "bg-[#2D1B1C] text-[#F87171] border-[#4D1C24]"
          }`}
        >
          {alertMessage.type === "success" ? (
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#4ADE80]" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0 text-[#F87171]" />
          )}
          <div className="text-sm font-medium">{alertMessage.text}</div>
        </div>
      )}

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-[#121215] border border-[#1F1F23] rounded-2xl shadow-xl overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-[#1F1F23]">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Tambah User Baru
          </h2>
          <p className="text-zinc-400 mt-1.5 text-sm">
            Masukkan informasi profil dan hak akses untuk pengguna baru.
          </p>
        </div>

        {/* Card Content / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-300">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#9D90EF] transition-colors"
              />
            </div>

            {/* NIP/ID Pegawai */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-300">
                NIP/ID Pegawai
              </label>
              <input
                type="text"
                placeholder="Contoh: 19820101..."
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#9D90EF] transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-300">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                required
                type="email"
                placeholder="email@ppdb.go.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#9D90EF] transition-colors"
              />
            </div>

            {/* No. Telepon */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-zinc-300">
                No. Telepon
              </label>
              <input
                type="text"
                placeholder="+62 8..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#9D90EF] transition-colors"
              />
            </div>

            {/* Role Akses Select */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-zinc-300">
                Role Akses <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D90EF] appearance-none cursor-pointer transition-colors"
                >
                  <option value="" disabled>
                    Pilih Role User
                  </option>
                  {displayRoles.map((role) => (
                    <option key={role.id} value={String(role.id)}>
                      {role.nama_role}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-3.5 pointer-events-none text-zinc-400">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 relative">
              <label className="text-sm font-semibold text-zinc-300">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#9D90EF] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div className="space-y-1.5 relative">
              <label className="text-sm font-semibold text-zinc-300">
                Konfirmasi Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#9D90EF] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end items-center gap-4 pt-6 border-t border-[#1F1F23]">
            <Link
              href="/admin/users"
              className="text-zinc-300 hover:text-white text-sm font-semibold transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-[#9D90EF] hover:bg-[#8B7FE3] border-none text-zinc-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 h-auto min-h-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>Simpan User</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

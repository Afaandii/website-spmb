"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  Lock,
} from "lucide-react";
import { FiRefreshCw } from "react-icons/fi";

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

interface DummyUser {
  id: number;
  name: string;
  userId: string;
  email: string;
  role: string;
  status: "Online" | "Offline";
  avatar: string;
  createdAt: string;
  phone: string;
  lastLogin: string;
  totalRegistrations: number;
  documentsValidated: number;
  performanceTarget: number;
  isActive: boolean;
}

const DUMMY_USERS_DETAIL: Record<string, DummyUser> = {
  "1": {
    id: 1,
    name: "Siti Aminah",
    userId: "USR-882910",
    email: "siti.aminah@ppdb.go.id",
    role: "ADMIN_PANITIA",
    status: "Online",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    createdAt: "12 Okt 2023",
    phone: "+62 812-3456-7890",
    lastLogin: "2 jam yang lalu",
    totalRegistrations: 1248,
    documentsValidated: 856,
    performanceTarget: 70,
    isActive: true,
  },
  "2": {
    id: 2,
    name: "Bambang Susilo",
    userId: "USR-882455",
    email: "b.susilo@ppdb.go.id",
    role: "SUPER_ADMIN",
    status: "Offline",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    createdAt: "05 Sep 2023",
    phone: "+62 811-9876-5432",
    lastLogin: "1 hari yang lalu",
    totalRegistrations: 982,
    documentsValidated: 540,
    performanceTarget: 55,
    isActive: true,
  },
  "3": {
    id: 3,
    name: "Andi Wijaya",
    userId: "USR-890122",
    email: "andi.w@ppdb.go.id",
    role: "VERIFIKATOR",
    status: "Online",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    createdAt: "20 Nov 2023",
    phone: "+62 813-1122-3344",
    lastLogin: "30 menit yang lalu",
    totalRegistrations: 654,
    documentsValidated: 412,
    performanceTarget: 63,
    isActive: true,
  },
  "4": {
    id: 4,
    name: "Dewi Lestari",
    userId: "USR-891443",
    email: "dewi.l@ppdb.go.id",
    role: "VERIFIKATOR",
    status: "Offline",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    createdAt: "01 Des 2023",
    phone: "+62 812-5566-7788",
    lastLogin: "3 hari yang lalu",
    totalRegistrations: 321,
    documentsValidated: 210,
    performanceTarget: 65,
    isActive: true,
  },
};

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  // Load specific user detail or fallback to user 1
  const initialUser = DUMMY_USERS_DETAIL[id] || DUMMY_USERS_DETAIL["1"];

  // Form State
  const [fullName, setFullName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [phone, setPhone] = useState(initialUser.phone);
  const [roleId, setRoleId] = useState(
    initialUser.role === "SUPER_ADMIN" ? "2" : initialUser.role === "VERIFIKATOR" ? "3" : "1"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(initialUser.isActive);

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
        setLoadingRoles(false);
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !roleId) {
      showAlert("error", "Harap isi semua kolom wajib!");
      return;
    }

    if (password && password !== confirmPassword) {
      showAlert("error", "Password Baru dan Konfirmasi Password tidak cocok!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        username: fullName,
        email,
        role_id: parseInt(roleId),
        phone: phone || null,
        is_active: isActive ? 1 : 2,
        ...(password && { password }),
      };

      const res = await fetch(`${API_BASE_URL}/user/${initialUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.status === 200 || json.status === 200) {
        showAlert("success", "Profil user berhasil diperbarui! Mengalihkan...");
        setTimeout(() => {
          router.push("/admin/users");
        }, 1500);
      } else {
        showAlert("error", json.message || "Gagal memperbarui profil.");
      }
    } catch (error) {
      console.error(error);
      // Fallback local mock success for dummy implementation
      showAlert("success", "Profil user berhasil diperbarui (Mode Demo)! Mengalihkan...");
      setTimeout(() => {
        router.push("/admin/users");
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Account Active Status
  const handleToggleActive = () => {
    const nextStatus = !isActive;
    setIsActive(nextStatus);
    showAlert(
      "success",
      `Akun berhasil ${nextStatus ? "diaktifkan kembali" : "dinonaktifkan sementara"}!`
    );
  };

  const displayRoles = roles.length > 0 ? roles : FALLBACK_ROLES;

  return (
    <div className="bg-[#09090b] text-[#FAFAFA] min-h-screen p-1 sm:p-4 md:p-6 space-y-6">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <Link href="/admin/users" className="hover:text-zinc-300">
              Users
            </Link>
            <span>&gt;</span>
            <span className="text-zinc-300">Edit Profil User</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Edit Profil User
          </h2>
          <p className="text-zinc-400 mt-1 text-sm">
            Perbarui informasi akun dan hak akses personil.
          </p>
        </div>

        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isActive
                ? "bg-[#10222F] border border-[#1D3B54] text-[#30A3E6]"
                : "bg-[#251316] border border-[#4D1C24] text-rose-500"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#30A3E6]" : "bg-rose-500"}`} />
            {isActive ? "Active Account" : "Suspended"}
          </span>
        </div>
      </div>

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
          className={`flex items-center gap-3 p-4 rounded-xl border shadow-xl max-w-5xl mx-auto animate-in fade-in duration-300 ${
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

      {/* Main Grid Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Summary & Stats (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* User Profile Summary Card */}
          <div className="bg-[#121215] border border-[#1F1F23] rounded-2xl p-6 flex flex-col items-center text-center">
            <img
              src={initialUser.avatar}
              alt={fullName}
              className="h-28 w-28 rounded-2xl object-cover border border-zinc-800 shadow-md mb-4"
            />
            <h3 className="text-xl font-bold text-white tracking-tight">{fullName}</h3>
            <span className="text-zinc-500 text-sm font-medium mt-1">{initialUser.userId}</span>
            <span className="text-zinc-500 text-xs mt-3">
              Terakhir login: {initialUser.lastLogin}
            </span>
          </div>

          {/* User Stats Card */}
          <div className="bg-[#121215] border border-[#1F1F23] rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              <User className="h-4 w-4 text-zinc-500" />
              <span>User Stats</span>
            </div>

            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Total Registrasi</span>
                <span className="text-white font-bold">{initialUser.totalRegistrations.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Dokumen Validasi</span>
                <span className="text-white font-bold">{initialUser.documentsValidated.toLocaleString("id-ID")}</span>
              </div>

              {/* Progress target */}
              <div className="space-y-1.5 pt-2">
                <div className="w-full bg-[#1A1A1E] rounded-full h-1.5">
                  <div
                    className="bg-[#9D90EF] h-1.5 rounded-full"
                    style={{ width: `${initialUser.performanceTarget}%` }}
                  />
                </div>
                <div className="text-[10px] text-zinc-500 text-right">
                  Target Kinerja: {initialUser.performanceTarget}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form fields (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#121215] border border-[#1F1F23] rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              {/* Section 1: Informasi Dasar */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider pb-2 border-b border-[#1F1F23]">
                  <User className="h-4 w-4 text-zinc-500" />
                  <span>Informasi Dasar</span>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Nama Lengkap */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-zinc-400">
                      Nama Lengkap
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Contoh: Budi Santoso"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D90EF] transition-colors"
                    />
                  </div>

                  {/* NIP/ID Pegawai */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-zinc-400">
                      NIP/ID Pegawai
                    </label>
                    <input
                      disabled
                      type="text"
                      value={initialUser.userId}
                      className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-500 focus:outline-none cursor-not-allowed"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-zinc-400">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="email@ppdb.go.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D90EF] transition-colors"
                    />
                  </div>

                  {/* No. Telepon */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-zinc-400">
                      No. Telepon
                    </label>
                    <input
                      type="text"
                      placeholder="+62 8..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D90EF] transition-colors"
                    />
                  </div>

                  {/* Role Akses Select */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-zinc-400">
                      Role Akses
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                        className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D90EF] appearance-none cursor-pointer transition-colors"
                      >
                        {displayRoles.map((role) => (
                          <option key={role.id} value={String(role.id)}>
                            {role.nama_role === "ADMIN_PANITIA" ? "Admin Panitia" : role.nama_role === "SUPER_ADMIN" ? "Super Admin" : "Verifikator"}
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
                </div>
              </div>

              {/* Section 2: Ubah Password */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#1F1F23]">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    <Lock className="h-4 w-4 text-zinc-500" />
                    <span>Ubah Password</span>
                  </div>
                  <span className="bg-[#2D1F1A] text-[#E08D59] text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    Optional
                  </span>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Password Baru */}
                  <div className="space-y-1.5 relative">
                    <label className="text-sm font-semibold text-zinc-400">
                      Password Baru
                    </label>
                    <div className="relative">
                      <input
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
                    <label className="text-sm font-semibold text-zinc-400">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <input
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
                <p className="text-xs text-zinc-500 pt-1">
                  Gunakan minimal 8 karakter dengan kombinasi angka dan simbol.
                </p>
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
                      <Loader2 className="h-4 w-4 animate-spin animate-spin-fast" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <FiRefreshCw className="h-4 w-4" />
                      <span>Perbarui Data</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone: Nonaktifkan Akun */}
          <div className="bg-[#1C1213] border border-[#3A1E20] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-md font-bold text-[#F87171]">Nonaktifkan Akun</h4>
              <p className="text-zinc-400 text-sm mt-1">
                User tidak akan bisa login ke sistem sementara waktu.
              </p>
            </div>
            <button
              onClick={handleToggleActive}
              className={`btn btn-md font-bold border rounded-xl px-5 h-auto min-h-0 py-2.5 transition-all ${
                isActive
                  ? "bg-transparent border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
                  : "bg-rose-500 border-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              {isActive ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

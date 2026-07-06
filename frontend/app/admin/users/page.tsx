"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  Search,
  AlertCircle,
  ShieldCheck,
  UserX,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import Image from "next/image";

interface UserType {
  id: number;
  role_id: number;
  siswa_id: number | null;
  username: string;
  email: string;
  last_login_at: string | null;
  is_active: string | boolean | number;
  created_at: string;
  updated_at: string;
}

interface RoleType {
  id: number;
  nama_role: string;
  deskripsi: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const API_BASE_URL = "http://localhost:8080/api/v1";

  // Notification / Alert State
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Alert with 3 seconds session (timeout)
  const showAlert = (type: "success" | "error", text: string) => {
    setAlertMessage({ type, text });
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // 3 seconds
  };

  // Fetch users & roles asynchronously from API

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user`);
      if (!res.ok) {
        throw new Error("Gagal mengambil data user dari server.");
      }
      const usersJson = await res.json();

      if (res.ok) {
        const nonAdminUsers = usersJson.data.filter(
          (user: unknown) => (user as { role_id: number }).role_id != 1,
        );
        setUsers(nonAdminUsers);
      } else {
        throw new Error(
          usersJson.message || "Terjadi Kesalahan saat mengambil data user.",
        );
      }

      const rolesRes = await fetch(`${API_BASE_URL}/role`);
      if (!rolesRes.ok) {
        throw new Error("Gagal mengambil data role dari server.");
      }
      const rolesJson = await rolesRes.json();

      if (rolesJson.status === 200 && Array.isArray(rolesJson.data)) {
        setRoles(rolesJson.data);
      } else {
        throw new Error(
          rolesJson.message || "Terjadi kesalahan saat mengambil data role.",
        );
      }
    } catch (error: unknown) {
      console.error(error);
      showAlert(
        "error",
        (error as Error).message ||
          "Koneksi ke backend gagal. Pastikan server backend Anda berjalan.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Handle Delete User asynchronously
  const handleDeleteUser = async (id: number) => {
    const userToDelete = users.find((u) => u.id === id);
    if (!userToDelete) return;

    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus user "${userToDelete.username}"?`,
      )
    )
      return;

    setIsDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (res.status === 200 || json.status === 200) {
        showAlert(
          "success",
          `User "${userToDelete.username}" berhasil dihapus.`,
        );
        fetchUser(); // Reload data from backend
      } else {
        throw new Error(json.message || "Gagal menghapus user dari database.");
      }
    } catch (error: unknown) {
      console.error(error);
      showAlert(
        "error",
        (error as Error).message ||
          "Terjadi kesalahan koneksi saat menghapus user.",
      );
    } finally {
      setIsDeletingId(null);
    }
  };

  // Redirect to edit page
  const handleEditClick = (id: number) => {
    router.push(`/admin/users/users_edit/${id}`);
  };

  const getRoleName = (roleId: number) => {
    const foundRole = roles.find((r) => r.id === roleId);
    return foundRole ? foundRole.nama_role : `Role ID ${roleId}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "-";
    }
  };

  const checkIsActive = (isActiveVal: string | boolean | number) => {
    return (
      isActiveVal === true ||
      isActiveVal === "t" ||
      isActiveVal === 1 ||
      isActiveVal === "1" ||
      isActiveVal === "true"
    );
  };

  // Filter users based on search query and filter out role_id === 1 (Admin)
  const filteredUsers = users
    .filter((user) => user.role_id != 1)
    .filter((user) => {
      const search = searchQuery.toLowerCase();
      return (
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        (user.siswa_id && String(user.siswa_id).includes(search))
      );
    });

  return (
    <div className="bg-[#09090b] text-[#FAFAFA] min-h-screen p-1 sm:p-4 md:p-6 space-y-6">
      {/* Alert Banner menggunakan Component Daisy UI */}
      {alertMessage && (
        <div className="toast toast-top toast-end z-50 p-4">
          <div
            role="alert"
            className={`alert ${
              alertMessage.type === "success"
                ? "alert-success bg-[#102A1E] text-[#4ADE80] border-[#1E4D34]"
                : "alert-error bg-[#2D1B1C] text-[#F87171] border-[#4D1C24]"
            } border shadow-xl flex items-center gap-3 rounded-xl`}
          >
            {alertMessage.type === "success" ? (
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#4ADE80]" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-[#F87171]" />
            )}
            <span className="text-sm font-semibold">{alertMessage.text}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Manajemen User
          </h2>
          <p className="text-zinc-400 mt-1 text-sm">
            Kelola hak akses dan profil administrator sistem PPDB.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchUser()}
            className="btn btn-md bg-[#0F0F12] border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 flex items-center gap-2"
            title="Refresh data"
          >
            <Filter className="h-4 w-4 text-zinc-400" />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/users/users_create"
            className="btn btn-md bg-[#9D90EF] hover:bg-[#8B7FE3] border-none text-zinc-950 font-bold flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4 text-zinc-950" />
            <span>Tambah User</span>
          </Link>
        </div>
      </div>

      {/* Users Table Container */}
      <div className="bg-[#121215] border border-[#1F1F23] rounded-2xl overflow-hidden shadow-sm">
        {/* Search Bar */}
        <div className="p-5 border-b border-[#1F1F23] flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Cari username, email, atau siswa ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1E] border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>
        </div>

        {/* Table using DaisyUI */}
        <div className="overflow-x-auto w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-3 text-zinc-500">
              <Loader2 className="h-8 w-8 animate-spin text-[#9D90EF]" />
              <span className="text-sm font-medium">
                Memuat data user dari database...
              </span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 gap-3 text-zinc-500">
              <UserX className="h-12 w-12 text-zinc-700" />
              <span className="text-lg font-semibold text-zinc-300">
                Tidak ada user ditemukan
              </span>
              <span className="text-sm text-center max-w-xs">
                Coba ganti kata kunci pencarian Anda.
              </span>
            </div>
          ) : (
            <table className="table table-md w-full text-zinc-300">
              <thead>
                <tr className="border-b border-[#1F1F23] text-zinc-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="bg-transparent text-zinc-400 font-semibold py-4 pl-6">
                    Username
                  </th>
                  <th className="bg-transparent text-zinc-400 font-semibold py-4">
                    Email
                  </th>
                  <th className="bg-transparent text-zinc-400 font-semibold py-4">
                    Role
                  </th>
                  <th className="bg-transparent text-zinc-400 font-semibold py-4">
                    Status
                  </th>
                  <th className="bg-transparent text-zinc-400 font-semibold py-4">
                    Dibuat Pada
                  </th>
                  <th className="bg-transparent text-zinc-400 font-semibold py-4 text-right pr-8">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const isActiveStatus = checkIsActive(user.is_active);
                  const roleName = getRoleName(user.role_id);
                  const userAvatarSeed = encodeURIComponent(user.username);
                  const userAvatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${userAvatarSeed}`;

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-[#1F1F23] hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="py-3.5 pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={userAvatarUrl}
                            alt={user.username}
                            width={40}
                            height={40}
                            unoptimized
                            className="h-10 w-10 rounded-full object-cover border border-zinc-800 bg-zinc-900"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-white text-sm">
                              {user.username}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 text-zinc-400 text-sm">
                        {user.email}
                      </td>
                      <td className="py-3.5">
                        <span className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider">
                          {roleName}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-2 text-sm text-zinc-300">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              isActiveStatus ? "bg-[#22C55E]" : "bg-[#71717A]"
                            }`}
                          />
                          {isActiveStatus ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="py-3.5 text-zinc-400 text-sm">
                        {formatDate(user.created_at)}
                      </td>
                      <td className="py-3.5 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEditClick(user.id)}
                            className="btn btn-sm btn-square bg-[#121215] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200"
                            title="Edit User"
                          >
                            <FiEdit3 className="h-4 w-4" />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            disabled={isDeletingId === user.id}
                            className="btn btn-sm btn-square bg-[#1A1213] border border-[#2D1B1C] text-[#F87171] hover:text-white hover:bg-[#E11D48] hover:border-[#E11D48] transition-all duration-200"
                            title="Hapus User"
                          >
                            {isDeletingId === user.id ? (
                              <Loader2 className="h-4 w-4 animate-spin text-[#F87171]" />
                            ) : (
                              <FiTrash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-5 border-t border-[#1F1F23] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-zinc-500">
            Menampilkan 1-{filteredUsers.length} dari{" "}
            {users.filter((u) => u.role_id !== 1).length} user
          </span>
          <div className="flex items-center gap-2">
            <button className="btn btn-sm btn-square bg-[#0F0F12] border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 disabled:opacity-30">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="btn btn-sm btn-square bg-[#0F0F12] border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 disabled:opacity-30">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

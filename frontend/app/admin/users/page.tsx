"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  UserPlus,
  Search,
  AlertCircle,
  ShieldCheck,
  Zap,
  Shield,
  UserX,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import Image from "next/image";

interface DummyUser {
  id: number;
  name: string;
  userId: string;
  email: string;
  role: string;
  status: "Online" | "Offline";
  avatar: string;
  createdAt: string;
}

const INITIAL_DUMMY_USERS: DummyUser[] = [
  {
    id: 1,
    name: "Siti Aminah",
    userId: "USR-882910",
    email: "siti.aminah@ppdb.go.id",
    role: "ADMIN_PANITIA",
    status: "Online",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
    createdAt: "12 Okt 2023",
  },
  {
    id: 2,
    name: "Bambang Susilo",
    userId: "USR-882455",
    email: "b.susilo@ppdb.go.id",
    role: "SUPER_ADMIN",
    status: "Offline",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
    createdAt: "05 Sep 2023",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    userId: "USR-890122",
    email: "andi.w@ppdb.go.id",
    role: "VERIFIKATOR",
    status: "Online",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
    createdAt: "20 Nov 2023",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    userId: "USR-891443",
    email: "dewi.l@ppdb.go.id",
    role: "VERIFIKATOR",
    status: "Offline",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120&h=120",
    createdAt: "01 Des 2023",
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<DummyUser[]>(INITIAL_DUMMY_USERS);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<DummyUser | null>(null);

  // Notification / Alert State
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showAlert = (type: "success" | "error", text: string) => {
    setAlertMessage({ type, text });
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  // Handle Delete User
  const handleDeleteUser = (id: number) => {
    const userToDelete = users.find((u) => u.id === id);
    if (!userToDelete) return;

    if (
      !confirm(`Apakah Anda yakin ingin menghapus user "${userToDelete.name}"?`)
    )
      return;

    setUsers(users.filter((user) => user.id !== id));
    showAlert("success", `User "${userToDelete.name}" berhasil dihapus.`);
  };

  // Redirect to edit page
  const handleEditClick = (user: DummyUser) => {
    router.push(`/admin/users/users_edit/${user.id}`);
  };

  // Save Edited User
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsers(
      users.map((user) => (user.id === editingUser.id ? editingUser : user)),
    );
    setIsEditModalOpen(false);
    showAlert(
      "success",
      `Profil user "${editingUser.name}" berhasil diperbarui.`,
    );
  };

  // Filter users based on search
  const filteredUsers = users.filter((user) => {
    const search = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.userId.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
    );
  });

  // Calculate statistics
  const totalUsersCount = 1284; // Dummy display count from mockup
  const activeSessionsCount = 42; // Dummy display count from mockup
  const superAdminCount =
    users.filter((u) => u.role === "SUPER_ADMIN").length + 4; // Mocked count
  const suspendedCount = 12; // Dummy display count from mockup

  return (
    <div className="bg-[#09090b] text-[#FAFAFA] min-h-screen p-1 sm:p-4 md:p-6 space-y-6">
      {/* Alert Banner */}
      {alertMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-xl border shadow-xl max-w-md animate-in fade-in-50 slide-in-from-top-4 duration-300 ${
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
            className="btn btn-md bg-[#0F0F12] border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 flex items-center gap-2"
            title="Filter data"
          >
            <Filter className="h-4 w-4 text-zinc-400" />
            <span>Filter</span>
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

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total User */}
        <div className="bg-[#121215] border border-[#1F1F23] rounded-2xl p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#1A1A1E] border border-zinc-800 text-zinc-400">
              <Users className="h-5 w-5 text-zinc-300" />
            </div>
            <span className="bg-[#1A1A1E] border border-zinc-800 text-zinc-400 text-xs px-2.5 py-1 rounded-full font-semibold">
              +12%
            </span>
          </div>
          <div>
            <span className="text-zinc-500 text-sm font-medium">
              Total User
            </span>
            <div className="text-white text-3xl font-bold tracking-tight mt-1">
              {totalUsersCount.toLocaleString("id-ID")}
            </div>
          </div>
        </div>

        {/* Card 2: Sesi Aktif */}
        <div className="bg-[#121215] border border-[#1F1F23] rounded-2xl p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#0E1B25] border border-[#16364D] text-[#30A3E6]">
              <Zap className="h-5 w-5 text-[#30A3E6]" />
            </div>
            <span className="bg-[#0D2435] border border-[#1D3B54] text-[#30A3E6] text-xs px-2.5 py-1 rounded-full font-semibold">
              Aktif
            </span>
          </div>
          <div>
            <span className="text-zinc-500 text-sm font-medium">
              Sesi Aktif
            </span>
            <div className="text-white text-3xl font-bold tracking-tight mt-1">
              {activeSessionsCount}
            </div>
          </div>
        </div>

        {/* Card 3: Super Admin */}
        <div className="bg-[#121215] border border-[#1F1F23] rounded-2xl p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#281A15] border border-[#482D20] text-[#D97736]">
              <Shield className="h-5 w-5 text-[#D97736]" />
            </div>
          </div>
          <div>
            <span className="text-zinc-500 text-sm font-medium">
              Super Admin
            </span>
            <div className="text-white text-3xl font-bold tracking-tight mt-1">
              {superAdminCount}
            </div>
          </div>
        </div>

        {/* Card 4: Ditangguhkan */}
        <div className="bg-[#121215] border border-[#1F1F23] rounded-2xl p-5 flex flex-col justify-between h-36">
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-[#251316] border border-[#4D1C24] text-rose-500">
              <UserX className="h-5 w-5 text-rose-500" />
            </div>
          </div>
          <div>
            <span className="text-zinc-500 text-sm font-medium">
              Ditangguhkan
            </span>
            <div className="text-white text-3xl font-bold tracking-tight mt-1">
              {suspendedCount}
            </div>
          </div>
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
              placeholder="Cari username, email, atau user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1A1E] border border-zinc-800 text-zinc-200 placeholder-zinc-500 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>
        </div>

        {/* Table using DaisyUI */}
        <div className="overflow-x-auto w-full">
          {filteredUsers.length === 0 ? (
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
                    Name
                  </th>
                  <th className="bg-transparent text-zinc-400 font-semibold py-4">
                    User ID
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
                  <th className="bg-transparent text-zinc-400 font-semibold py-4 text-right pr-8">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-[#1F1F23] hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="py-3.5 pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover border border-zinc-800"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-white text-sm">
                              {user.name}
                            </span>
                            <span className="text-xs text-zinc-500 mt-0.5">
                              Dibuat: {user.createdAt}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 text-zinc-300 text-sm font-medium">
                        {user.userId}
                      </td>
                      <td className="py-3.5 text-zinc-400 text-sm">
                        {user.email}
                      </td>
                      <td className="py-3.5">
                        {user.role === "ADMIN_PANITIA" && (
                          <span className="bg-[#181926] border border-[#2B2F44] text-[#8C9BCE] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider">
                            ADMIN_PANITIA
                          </span>
                        )}
                        {user.role === "SUPER_ADMIN" && (
                          <span className="bg-[#281A15] border border-[#482D20] text-[#D97736] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider">
                            SUPER_ADMIN
                          </span>
                        )}
                        {user.role === "VERIFIKATOR" && (
                          <span className="bg-[#101D2F] border border-[#1A344E] text-[#60A5FA] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider">
                            VERIFIKATOR
                          </span>
                        )}
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-2 text-sm text-zinc-300">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              user.status === "Online"
                                ? "bg-[#22C55E]"
                                : "bg-[#71717A]"
                            }`}
                          />
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEditClick(user)}
                            className="btn btn-sm btn-square bg-[#121215] border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200"
                            title="Edit User"
                          >
                            <FiEdit3 className="h-4 w-4" />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="btn btn-sm btn-square bg-[#1A1213] border border-[#2D1B1C] text-[#F87171] hover:text-white hover:bg-[#E11D48] hover:border-[#E11D48] transition-all duration-200"
                            title="Hapus User"
                          >
                            <FiTrash2 className="h-4 w-4" />
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
            Menampilkan 1-{filteredUsers.length} dari {users.length} user
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

      {/* Edit User Modal */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#121215] border border-[#27272A] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-[#1F1F23]">
              <h3 className="font-bold text-lg text-white">Edit User</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Nama
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9D90EF] transition-colors"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  User ID
                </label>
                <input
                  type="text"
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-500 focus:outline-none cursor-not-allowed"
                  value={editingUser.userId}
                  disabled
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9D90EF] transition-colors"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Peran (Role)
                </label>
                <select
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9D90EF] transition-colors"
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="ADMIN_PANITIA">ADMIN_PANITIA</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  <option value="VERIFIKATOR">VERIFIKATOR</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Status
                </label>
                <select
                  className="w-full bg-[#1A1A1E] border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#9D90EF] transition-colors"
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      status: e.target.value as "Online" | "Offline",
                    })
                  }
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#1F1F23]">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn btn-sm bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-none font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-[#9D90EF] text-zinc-950 hover:bg-[#8B7FE3] border-none font-bold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  UserPlus, 
  Trash2, 
  RefreshCw, 
  Search, 
  AlertCircle,
  ShieldCheck,
  User,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [users, setUsers] = useState<UserType[]>([]);
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Notification / Alert State
  const [alertMessage, setAlertMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);

  const API_BASE_URL = "http://localhost:8080/api/v1";

  // Fetch users and roles
  const fetchData = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setRefreshing(true);
    else setLoading(true);
    
    try {
      // Fetch users
      const usersRes = await fetch(`${API_BASE_URL}/user`);
      const usersJson = await usersRes.json();
      if (usersJson.status === 200 && Array.isArray(usersJson.data)) {
        setUsers(usersJson.data);
      } else {
        console.error("Gagal memuat data user:", usersJson.message);
      }

      // Fetch roles
      const rolesRes = await fetch(`${API_BASE_URL}/role`);
      const rolesJson = await rolesRes.json();
      if (rolesJson.status === 200 && Array.isArray(rolesJson.data)) {
        setRoles(rolesJson.data);
      } else {
        console.error("Gagal memuat data role:", rolesJson.message);
      }
    } catch (error) {
      console.error("Terjadi kesalahan koneksi ke API:", error);
      showAlert("error", "Koneksi ke backend gagal. Pastikan server backend Anda berjalan.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAlert = (type: "success" | "error", text: string) => {
    setAlertMessage({ type, text });
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
  };

  // Handle Delete User
  const handleDeleteUser = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;

    setIsDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/user/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (res.status === 200 || json.status === 200) {
        showAlert("success", "User berhasil dihapus.");
        fetchData();
      } else {
        showAlert("error", json.message || "Gagal menghapus user.");
      }
    } catch (error) {
      console.error(error);
      showAlert("error", "Terjadi kesalahan sistem saat menghapus user.");
    } finally {
      setIsDeletingId(null);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user => {
    const search = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      (user.siswa_id && String(user.siswa_id).includes(search))
    );
  });

  const getRoleName = (roleId: number) => {
    const foundRole = roles.find(r => r.id === roleId);
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
    } catch (e) {
      return dateString;
    }
  };

  const checkIsActive = (isActiveVal: string | boolean | number) => {
    if (isActiveVal === true || isActiveVal === "t" || isActiveVal === 1 || isActiveVal === "1" || isActiveVal === "true") {
      return true;
    }
    return false;
  };

  return (
    <div className="flex-1 space-y-4">
      {/* Alert Banner */}
      {alertMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 p-4 rounded-xl border shadow-xl max-w-md animate-in fade-in-50 slide-in-from-top-4 duration-300 ${
          alertMessage.type === "success" 
            ? "bg-green-500/10 text-green-600 border-green-500/20" 
            : "bg-red-500/10 text-red-600 border-red-500/20"
        }`}>
          {alertMessage.type === "success" ? (
            <ShieldCheck className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <div className="text-sm font-medium">{alertMessage.text}</div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Manajemen Users
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Kelola data akun pengguna portal PPDB Online.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => fetchData(true)}
            disabled={loading || refreshing}
            className="h-9 w-9 shrink-0 hover:bg-muted"
            title="Muat ulang data"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>

          <Button 
            asChild
            className="h-9 gap-2 shadow-sm font-medium"
          >
            <Link href="/admin/users/users_create">
              <UserPlus className="h-4 w-4" />
              Tambah User
            </Link>
          </Button>
        </div>
      </div>

      {/* Search & Statistics Overview */}
      <div className="flex items-center gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari username, email, atau siswa ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 border-border bg-card text-sm"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-sm font-medium">Memuat data user dari database...</span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 gap-2 text-muted-foreground bg-card">
            <User className="h-12 w-12 text-muted-foreground/50" />
            <span className="text-lg font-semibold text-foreground">Tidak ada user ditemukan</span>
            <span className="text-sm text-center max-w-xs">
              {searchQuery ? "Coba ganti kata kunci pencarian Anda." : "Klik tombol 'Tambah User' untuk menambahkan pengguna baru."}
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-muted/50 border-border">
                  <TableHead className="w-12 text-center font-semibold">No</TableHead>
                  <TableHead className="font-semibold">Username</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Siswa ID</TableHead>
                  <TableHead className="font-semibold">Terakhir Login</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Dibuat</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Diubah</TableHead>
                  <TableHead className="w-20 text-center font-semibold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => {
                  const isActiveStatus = checkIsActive(user.is_active);
                  return (
                    <TableRow key={user.id} className="border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="text-center font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="font-semibold text-foreground">{user.username}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-medium">
                          {getRoleName(user.role_id)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.siswa_id ? (
                          <Badge variant="secondary" className="font-medium bg-amber-500/10 text-amber-600 border-amber-500/20 border">
                            ID: {user.siswa_id}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Belum Ditautkan</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{formatDate(user.last_login_at)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${
                          isActiveStatus 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-red-500/10 text-red-600"
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${isActiveStatus ? "bg-green-500" : "bg-red-500"}`} />
                          {isActiveStatus ? "Aktif" : "Non-Aktif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs hidden md:table-cell">{formatDate(user.created_at)}</TableCell>
                      <TableCell className="text-muted-foreground text-xs hidden md:table-cell">{formatDate(user.updated_at)}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={isDeletingId === user.id}
                          className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          title="Hapus user"
                        >
                          {isDeletingId === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

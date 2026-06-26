"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserPlus,
  ArrowLeft,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleType {
  id: number;
  nama_role: string;
  deskripsi: string;
}

export default function CreateUserPage() {
  const router = useRouter();
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  // Form State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [siswaId, setSiswaId] = useState("");
  const [isActive, setIsActive] = useState("1"); // Default: "1" (Aktif)

  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE_URL = "http://localhost:8080/api/v1";

  // Fetch roles on load
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
        // showAlert("error", "Koneksi backend gagal. Gagal memuat daftar role.");
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchRoles();
  }, []);

  const showAlert = (type: "success" | "error", text: string) => {
    setAlertMessage({ type, text });
    // Don't auto-dismiss success if we are redirecting
    if (type === "error") {
      setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !roleId) {
      showAlert("error", "Harap isi semua kolom wajib!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        username,
        email,
        password,
        role_id: parseInt(roleId),
        siswa_id: siswaId ? parseInt(siswaId) : null,
        is_active: parseInt(isActive), // 1 = Aktif, 2 = Non-Aktif
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
        // Redirect back to users page after 1.5s
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
      showAlert("error", "Terjadi kesalahan sistem saat menambahkan user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 max-w-2xl mx-auto py-6">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Users
          </Link>
        </Button>
      </div>

      {/* Alert Banner */}
      {alertMessage && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border shadow-md animate-in fade-in duration-300 ${
            alertMessage.type === "success"
              ? "bg-green-500/10 text-green-600 border-green-500/20"
              : "bg-red-500/10 text-red-600 border-red-500/20"
          }`}
        >
          {alertMessage.type === "success" ? (
            <ShieldCheck className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <div className="text-sm font-medium">{alertMessage.text}</div>
        </div>
      )}

      {/* Form Card */}
      <Card className="border border-border bg-card shadow-sm rounded-xl">
        <CardHeader className="border-b border-border pb-6">
          <CardTitle className="text-2xl font-bold flex items-center gap-2 text-foreground">
            <UserPlus className="h-6 w-6 text-primary" />
            Tambah User Baru
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Lengkapi data akun pengguna portal PPDB Online di bawah ini.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form
            onSubmit={handleSubmit}
            id="create-user-form"
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Username */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-semibold text-foreground">
                  Username <span className="text-destructive">*</span>
                </label>
                <Input
                  required
                  placeholder="Masukkan username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-border bg-background focus-visible:ring-primary h-10"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-border bg-background focus-visible:ring-primary h-10"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">
                  Password <span className="text-destructive">*</span>
                </label>
                <Input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-border bg-background focus-visible:ring-primary h-10"
                />
              </div>

              {/* Role ID Select */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-foreground">
                  Pilih Role <span className="text-destructive">*</span>
                </label>
                <Select
                  value={roleId}
                  onValueChange={setRoleId}
                  disabled={loadingRoles}
                >
                  <SelectTrigger className="w-full border-border bg-background h-10 px-3">
                    <SelectValue
                      placeholder={
                        loadingRoles ? "Memuat role..." : "Pilih jenis role..."
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)}>
                        {role.nama_role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Siswa ID (Optional) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-foreground">
                    Siswa ID
                  </label>
                  <span className="text-xs text-muted-foreground italic">
                    Opsional
                  </span>
                </div>
                <Input
                  type="number"
                  placeholder="Hubungkan dengan Siswa ID..."
                  value={siswaId}
                  onChange={(e) => setSiswaId(e.target.value)}
                  className="border-border bg-background focus-visible:ring-primary h-10"
                />
              </div>

              {/* Is Active Select */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-semibold text-foreground">
                  Status Aktivitas
                </label>
                <Select value={isActive} onValueChange={setIsActive}>
                  <SelectTrigger className="w-full border-border bg-background h-10 px-3">
                    <SelectValue placeholder="Pilih status..." />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card">
                    <SelectItem value="1">Aktif</SelectItem>
                    <SelectItem value="2">Non-Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="border-t border-border pt-6 flex justify-end gap-3 bg-muted/20">
          <Button variant="outline" asChild className="h-10 px-6">
            <Link href="/admin/users">Batal</Link>
          </Button>
          <Button
            type="submit"
            form="create-user-form"
            disabled={isSubmitting || loadingRoles}
            className="h-10 px-6 font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Akun"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

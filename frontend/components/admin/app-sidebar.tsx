"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "@/lib/cookies";
import {
  LayoutDashboard,
  Calendar,
  Route,
  BookOpen,
  Building,
  Users,
  Contact,
  Award,
  Files,
  ClipboardList,
  ListChecks,
  Megaphone,
  UserCog,
  LogOut,
  GraduationCap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Grouped navigation data
const data = {
  general: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
  ],
  dataMaster: [
    {
      title: "Tahun Ajaran",
      url: "/admin/tahun-ajaran",
      icon: Calendar,
    },
    {
      title: "Jalur Daftar",
      url: "/admin/jalur-daftar",
      icon: Route,
    },
    {
      title: "Akademik",
      url: "/admin/akademik",
      icon: BookOpen,
    },
    {
      title: "Sekolah Asal",
      url: "/admin/sekolah-asal",
      icon: Building,
    },
  ],
  dataSiswa: [
    {
      title: "Siswa",
      url: "/admin/siswa",
      icon: Users,
    },
    {
      title: "Data Orang Tua",
      url: "/admin/data-orang-tua",
      icon: Contact,
    },
    {
      title: "Prestasi",
      url: "/admin/prestasi",
      icon: Award,
    },
    {
      title: "Dokumen",
      url: "/admin/dokumen",
      icon: Files,
    },
  ],
  prosesPpdb: [
    {
      title: "Pendaftaran",
      url: "/admin/pendaftaran",
      icon: ClipboardList,
    },
    {
      title: "Seleksi",
      url: "/admin/seleksi",
      icon: ListChecks,
    },
    {
      title: "Pengumuman",
      url: "/admin/pengumuman",
      icon: Megaphone,
    },
  ],
  pengaturan: [
    {
      title: "Users",
      url: "/admin/users",
      icon: UserCog,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getCookie("token"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Terjadi Kesalahan pada server!");
      }

      console.log("Logout success", data.message);
      deleteCookie("token");
      router.push("/login");
    } catch (err: unknown) {
      const errMess =
        err instanceof Error ? err.message : "Terjadi kesalahan saat logout.";
      console.log(errMess);
    }
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-lg">PPDB Online</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* General Group */}
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.general.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Data Master Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Master</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.dataMaster.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Data Siswa & Berkas Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Siswa & Berkas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.dataSiswa.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Proses PPDB Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Proses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.prosesPpdb.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Pengaturan Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Pengaturan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.pengaturan.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive/20 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

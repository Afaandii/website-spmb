import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  MessageSquare,
  LogOut,
  GraduationCap
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Sample navigation data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Pendaftar",
      url: "/admin/pendaftar",
      icon: Users,
    },
    {
      title: "Pengumuman",
      url: "/admin/pengumuman",
      icon: MessageSquare,
    },
    {
      title: "Laporan",
      url: "/admin/laporan",
      icon: FileText,
    },
    {
      title: "Pengaturan",
      url: "/admin/pengaturan",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r border-slate-200 bg-white" {...props}>
      <SidebarHeader className="bg-white">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <GraduationCap className="size-5" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-slate-900">PPDB Online</span>
            <span className="text-xs text-slate-500">Admin Panel</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={item.isActive} 
                tooltip={item.title}
                className={`data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors`}
              >
                <a href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Keluar">
              <a href="/login" className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4" />
                <span>Keluar</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

import * as React from "react"
import { Bell, Search } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-slate-200 bg-white transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-sm">
      <div className="flex flex-1 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-slate-600 hover:text-slate-900" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-slate-200" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin" className="text-slate-500 hover:text-slate-900">
                Admin Panel
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block text-slate-400" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-slate-900">Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4 px-4">
        <div className="relative hidden md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Cari..."
            className="w-64 rounded-full bg-slate-50 border-slate-200 pl-8 focus-visible:ring-blue-500 text-slate-900"
          />
        </div>
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600 border border-white"></span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 outline-none">
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-blue-500">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="@admin" />
                <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">AD</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-slate-900">Admin Utama</p>
                <p className="text-xs leading-none text-slate-500">admin@ppdb.sch.id</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="hover:bg-slate-50 focus:bg-slate-50 cursor-pointer">Profil</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-50 focus:bg-slate-50 cursor-pointer">Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer">
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

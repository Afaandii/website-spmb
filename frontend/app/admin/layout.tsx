import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar"
import { Header } from "@/components/admin/header"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden bg-background text-foreground">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden pt-4 pb-8 px-4 md:px-8">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}

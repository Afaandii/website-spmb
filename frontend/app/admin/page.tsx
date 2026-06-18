import { DashboardStats } from "@/components/admin/dashboard-stats"
import { OverviewChart } from "@/components/admin/overview-chart"
import { RecentRegistrations } from "@/components/admin/recent-registrations"

export const metadata = {
  title: "Admin Dashboard - PPDB Online",
  description: "Halaman admin dashboard untuk PPDB Online",
}

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          {/* Add actions here later, e.g., export data button */}
        </div>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewChart />
        <RecentRegistrations />
      </div>
    </div>
  )
}

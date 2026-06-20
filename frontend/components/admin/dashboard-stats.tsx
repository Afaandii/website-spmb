import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock, FileWarning } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pendaftar</CardTitle>
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Users className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,248</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-green-500 font-medium">+15%</span> dari bulan lalu
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Terverifikasi</CardTitle>
          <div className="p-2 bg-green-500/10 rounded-lg">
            <UserCheck className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">842</div>
          <p className="text-xs text-muted-foreground mt-1">
            67.4% dari total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Menunggu Verifikasi</CardTitle>
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">385</div>
          <p className="text-xs text-muted-foreground mt-1">
            30.8% dari total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Berkas Kurang</CardTitle>
          <div className="p-2 bg-red-500/10 rounded-lg">
            <FileWarning className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">21</div>
          <p className="text-xs text-muted-foreground mt-1">
            1.6% dari total
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

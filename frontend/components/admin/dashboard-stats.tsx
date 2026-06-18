import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock, FileWarning } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white border-slate-200 rounded-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Pendaftar</CardTitle>
          <div className="p-2 bg-blue-50 rounded-lg">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">1,248</div>
          <p className="text-xs text-slate-500 mt-1">
            <span className="text-green-600 font-medium">+15%</span> dari bulan lalu
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white border-slate-200 rounded-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Terverifikasi</CardTitle>
          <div className="p-2 bg-green-50 rounded-lg">
            <UserCheck className="h-4 w-4 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">842</div>
          <p className="text-xs text-slate-500 mt-1">
            67.4% dari total
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white border-slate-200 rounded-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Menunggu Verifikasi</CardTitle>
          <div className="p-2 bg-amber-50 rounded-lg">
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">385</div>
          <p className="text-xs text-slate-500 mt-1">
            30.8% dari total
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white border-slate-200 rounded-xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Berkas Kurang</CardTitle>
          <div className="p-2 bg-red-50 rounded-lg">
            <FileWarning className="h-4 w-4 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">21</div>
          <p className="text-xs text-slate-500 mt-1">
            1.6% dari total
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

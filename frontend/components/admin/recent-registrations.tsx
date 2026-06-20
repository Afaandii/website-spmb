import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const recentRegistrations = [
  {
    id: "REG-001",
    name: "Ahmad Fadillah",
    school: "SMPN 1 Jakarta",
    status: "Terverifikasi",
    date: "12 Okt 2023",
  },
  {
    id: "REG-002",
    name: "Siti Nurhaliza",
    school: "SMPN 5 Bandung",
    status: "Menunggu",
    date: "12 Okt 2023",
  },
  {
    id: "REG-003",
    name: "Budi Santoso",
    school: "SMP Muhammadiyah",
    status: "Berkas Kurang",
    date: "11 Okt 2023",
  },
  {
    id: "REG-004",
    name: "Dewi Lestari",
    school: "SMPN 12 Surabaya",
    status: "Terverifikasi",
    date: "11 Okt 2023",
  },
  {
    id: "REG-005",
    name: "Rizky Pratama",
    school: "SMP PGRI 1",
    status: "Menunggu",
    date: "10 Okt 2023",
  },
]

export function RecentRegistrations() {
  return (
    <Card className="col-span-1 md:col-span-3">
      <CardHeader>
        <CardTitle>Pendaftar Terbaru</CardTitle>
        <CardDescription>
          Data 5 pendaftar terakhir yang masuk ke sistem.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-muted/50 rounded-t-lg">
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="font-medium">Pendaftar</TableHead>
              <TableHead className="font-medium">Asal Sekolah</TableHead>
              <TableHead className="hidden md:table-cell font-medium">Tanggal</TableHead>
              <TableHead className="text-right font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRegistrations.map((registration) => (
              <TableRow key={registration.id} className="border-border hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 hidden sm:flex">
                      <AvatarImage src={`https://avatar.vercel.sh/${registration.name}.png`} alt={registration.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">{registration.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{registration.name}</div>
                      <div className="text-xs text-muted-foreground">{registration.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{registration.school}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{registration.date}</TableCell>
                <TableCell className="text-right">
                  <Badge 
                    variant={
                      registration.status === "Terverifikasi" ? "default" :
                      registration.status === "Menunggu" ? "secondary" : "destructive"
                    }
                  >
                    {registration.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

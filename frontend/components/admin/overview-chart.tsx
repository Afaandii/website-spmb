"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Sen",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Sel",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Rab",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Kam",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Jum",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Sab",
    total: Math.floor(Math.random() * 50) + 10,
  },
  {
    name: "Min",
    total: Math.floor(Math.random() * 50) + 10,
  },
]

export function OverviewChart() {
  return (
    <Card className="col-span-1 md:col-span-4 bg-white border-slate-200 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-900">Statistik Pendaftaran</CardTitle>
        <CardDescription className="text-slate-500">
          Jumlah pendaftar baru per hari dalam minggu ini.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              />
              <Bar
                dataKey="total"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

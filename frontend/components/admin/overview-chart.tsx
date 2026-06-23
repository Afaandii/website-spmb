"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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
];

export function OverviewChart() {
  return (
    <Card className="col-span-1 md:col-span-4">
      <CardHeader>
        <CardTitle>Statistik Pendaftaran</CardTitle>
        <CardDescription>
          Jumlah pendaftar baru per hari dalam minggu ini.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-87.5 w-full">
          <ResponsiveContainer className="h-full w-full">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="currentColor"
                className="text-muted-foreground"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="currentColor"
                className="text-muted-foreground"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  backgroundColor: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  boxShadow:
                    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar
                dataKey="total"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

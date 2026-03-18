"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#6366f1"];

interface Analytics {
  totalViews: number;
  uniquePages: number;
  topCountry: string;
  topDevice: string;
  timeSeries: { date: string; count: number }[];
  topPages: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
  devices: { name: string; count: number }[];
  operatingSystems: { name: string; count: number }[];
  countries: { name: string; count: number }[];
  screenBreakpoints: { name: string; count: number }[];
  topReferrers: { name: string; count: number }[];
  utmSources: { name: string; count: number }[];
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function TableCard({ title, data }: { title: string; data: { name: string; count: number }[] }) {
  if (!data.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <span className="text-gray-300 truncate mr-4">{item.name}</span>
            <span className="text-gray-400 font-mono shrink-0">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchData = useCallback(async (d: number) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/analytics?days=${d}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch");
      setData(await res.json());
    } catch {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData(days);
  }, [days, fetchData]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                    days === d
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Total Views" value={data.totalViews} />
          <MetricCard label="Unique Pages" value={data.uniquePages} />
          <MetricCard label="Top Country" value={data.topCountry} />
          <MetricCard label="Top Device" value={data.topDevice} />
        </div>

        {/* Views Over Time */}
        <ChartCard title="Views Over Time">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(v) => v.slice(5)}
              />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                labelStyle={{ color: "#9ca3af" }}
                itemStyle={{ color: "#3b82f6" }}
              />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Pages + Devices */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Top Pages">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.topPages} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#6b7280"
                  fontSize={12}
                  width={80}
                  tickFormatter={(v) => (v.length > 12 ? v.slice(0, 12) + "..." : v)}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Devices">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data.devices}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                  fontSize={12}
                >
                  {data.devices.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Browsers + OS */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Browsers">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.browsers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Operating Systems">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.operatingSystems}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                  labelStyle={{ color: "#9ca3af" }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Countries + Screen Breakpoints */}
        <div className="grid lg:grid-cols-2 gap-6">
          <TableCard title="Top Countries" data={data.countries} />
          <TableCard title="Screen Breakpoints" data={data.screenBreakpoints} />
        </div>

        {/* Referrers + UTM */}
        <div className="grid lg:grid-cols-2 gap-6">
          <TableCard title="Top Referrers" data={data.topReferrers} />
          {data.utmSources.length > 0 && (
            <TableCard title="UTM Campaigns" data={data.utmSources} />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/src/contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
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

interface RecentVisitor {
  id: string;
  time: string;
  path: string;
  ip_address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  org: string | null;
  browser: string;
  os: string;
  device_type: string;
  referrer: string | null;
  session_duration: number | null;
  visitor_id: string | null;
  language: string | null;
}

interface Analytics {
  totalViews: number;
  uniqueVisitors: number;
  uniquePages: number;
  avgSessionDuration: number;
  topCountry: string;
  topDevice: string;
  timeSeries: { date: string; count: number }[];
  topPages: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
  devices: { name: string; count: number }[];
  operatingSystems: { name: string; count: number }[];
  countries: { name: string; count: number }[];
  topCities: { name: string; count: number }[];
  topOrgs: { name: string; count: number }[];
  screenBreakpoints: { name: string; count: number }[];
  topReferrers: { name: string; count: number }[];
  utmSources: { name: string; count: number }[];
  recentVisitors: RecentVisitor[];
  eventCounts: { name: string; count: number }[];
  topInteractions: { name: string; count: number }[];
  topLanguages: { name: string; count: number }[];
}

// Static Tailwind class bag (no React hook required; `dark:` handles theme)
const s = {
  page: "bg-gray-50 dark:bg-gray-950",
  card: "bg-white border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-800",
  header: "border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-gray-950/80",
  title: "text-gray-900 dark:text-white",
  subtitle: "text-gray-500 dark:text-gray-400",
  muted: "text-gray-400 dark:text-gray-500",
  text: "text-gray-700 dark:text-gray-300",
  mono: "text-gray-400 dark:text-gray-500",
  border: "border-gray-200 dark:border-gray-800",
  divider: "divide-gray-100 dark:divide-gray-800/50",
  hover: "hover:bg-gray-50 dark:hover:bg-gray-800/30",
  btnInactive: "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
  btnBg: "bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-800",
  paginationBtn:
    "border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
  placeholder: "text-gray-300 dark:text-gray-600",
} as const;

// Hook for Recharts hex values (these must be JS strings, not CSS classes)
function useChartColors() {
  const { theme } = useTheme();
  const d = theme === "dark";
  return {
    grid: d ? "#374151" : "#e5e7eb",
    axis: d ? "#6b7280" : "#9ca3af",
    tooltipBg: d ? "#1f2937" : "#ffffff",
    tooltipBorder: d ? "#374151" : "#e5e7eb",
    tooltipLabel: d ? "#9ca3af" : "#6b7280",
  };
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className={`border rounded-xl p-5 ${s.card}`}>
      <p className={`text-sm ${s.subtitle}`}>{label}</p>
      <p className={`text-2xl font-bold mt-1 ${s.title}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={`border rounded-xl p-5 ${s.card}`}>
      <h3 className={`font-semibold mb-4 ${s.title}`}>{title}</h3>
      {children}
    </div>
  );
}

function TableCard({ title, data }: { title: string; data: { name: string; count: number }[] }) {
  if (!data.length) return null;
  return (
    <div className={`border rounded-xl p-5 ${s.card}`}>
      <h3 className={`font-semibold mb-4 ${s.title}`}>{title}</h3>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <span className={`truncate mr-4 ${s.text}`}>{item.name}</span>
            <span className={`font-mono shrink-0 ${s.mono}`}>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return sec > 0 ? `${m}m ${sec}s` : `${m}m`;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function deviceIcon(type: string): string {
  if (type === "mobile") return "\u{1F4F1}";
  if (type === "tablet") return "\u{1F4CB}";
  return "\u{1F4BB}";
}

const PAGE_SIZE = 15;

function RecentVisitorsTable({ visitors, onDelete }: { visitors: RecentVisitor[]; onDelete: (id: string) => void }) {
  const [page, setPage] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);
  if (!visitors.length) return null;

  const totalPages = Math.ceil(visitors.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const visible = visitors.slice(start, start + PAGE_SIZE);

  return (
    <div className={`border rounded-xl p-5 ${s.card}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold ${s.title}`}>Recent Visitors</h3>
        <span className={`text-sm ${s.muted}`}>{visitors.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`text-left border-b ${s.border} ${s.subtitle}`}>
              <th className="pb-2 pr-4 font-medium">When</th>
              <th className="pb-2 pr-4 font-medium">IP</th>
              <th className="pb-2 pr-4 font-medium">Location</th>
              <th className="pb-2 pr-4 font-medium">Organization</th>
              <th className="pb-2 pr-4 font-medium">Page</th>
              <th className="pb-2 pr-4 font-medium">Source</th>
              <th className="pb-2 pr-4 font-medium">Device</th>
              <th className="pb-2 pr-4 font-medium">Duration</th>
              <th className="pb-2 font-medium"></th>
            </tr>
          </thead>
          <tbody className={`divide-y ${s.divider}`}>
            {visible.map((v, i) => (
              <tr key={start + i} className={`${s.text} ${s.hover} transition-colors`}>
                <td className={`py-2.5 pr-4 whitespace-nowrap ${s.subtitle}`}>
                  {timeAgo(v.time)}
                </td>
                <td className={`py-2.5 pr-4 whitespace-nowrap font-mono text-xs ${s.mono}`}>
                  {v.ip_address || <span className={s.placeholder}>-</span>}
                </td>
                <td className="py-2.5 pr-4 whitespace-nowrap">
                  {[v.city, v.region, v.country].filter(Boolean).join(", ") || "Unknown"}
                </td>
                <td className="py-2.5 pr-4 whitespace-nowrap max-w-[200px] truncate">
                  {v.org || <span className={s.placeholder}>-</span>}
                </td>
                <td className="py-2.5 pr-4 whitespace-nowrap font-mono text-xs text-blue-500 max-w-[150px] truncate">
                  {v.path}
                </td>
                <td className={`py-2.5 pr-4 whitespace-nowrap max-w-[150px] truncate ${s.subtitle}`}>
                  {v.referrer || "direct"}
                </td>
                <td className="py-2.5 pr-4 whitespace-nowrap">
                  {deviceIcon(v.device_type)} {v.browser}/{v.os}
                </td>
                <td className={`py-2.5 pr-4 whitespace-nowrap ${s.subtitle}`}>
                  {v.session_duration != null ? formatDuration(v.session_duration) : <span className={s.placeholder}>-</span>}
                </td>
                <td className="py-2.5 whitespace-nowrap">
                  <button
                    onClick={async () => {
                      setDeleting(v.id);
                      try {
                        const res = await fetch("/api/admin/delete-row", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: v.id }),
                        });
                        if (res.ok) onDelete(v.id);
                      } finally {
                        setDeleting(null);
                      }
                    }}
                    disabled={deleting === v.id}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      deleting === v.id
                        ? "opacity-30 cursor-not-allowed"
                        : "text-gray-400 hover:text-red-600 hover:bg-red-50 dark:text-gray-500 dark:hover:text-red-400 dark:hover:bg-red-400/10"
                    }`}
                    title="Delete row"
                  >
                    {deleting === v.id ? "..." : "\u2715"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={`flex items-center justify-between mt-4 pt-4 border-t ${s.border}`}>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className={`px-3 py-1.5 text-sm rounded-lg border disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${s.paginationBtn}`}
          >
            Previous
          </button>
          <span className={`text-sm ${s.muted}`}>
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className={`px-3 py-1.5 text-sm rounded-lg border disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${s.paginationBtn}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const chart = useChartColors();

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
      <div className={`min-h-screen flex items-center justify-center ${s.page}`}>
        <p className={s.subtitle}>Loading analytics...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${s.page}`}>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const tooltipStyle = {
    backgroundColor: chart.tooltipBg,
    border: `1px solid ${chart.tooltipBorder}`,
    borderRadius: "8px",
  };

  return (
    <div className={`min-h-screen ${s.page}`}>
      <header className={`border-b backdrop-blur-sm sticky top-0 z-10 ${s.header}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className={`text-xl font-bold ${s.title}`}>Analytics Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className={`flex border rounded-lg overflow-hidden ${s.btnBg}`}>
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 text-sm transition-colors ${
                    days === d
                      ? "bg-blue-600 text-white"
                      : s.btnInactive
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${s.btnInactive}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FontAwesomeIcon icon={faSun} className="w-[18px] h-[18px]" /> : <FontAwesomeIcon icon={faMoon} className="w-[18px] h-[18px]" />}
            </button>
            <button
              onClick={handleLogout}
              className={`text-sm transition-colors px-3 py-1.5 ${s.btnInactive}`}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <MetricCard label="Total Views" value={data.totalViews} />
          <MetricCard label="Unique Visitors" value={data.uniqueVisitors} />
          <MetricCard label="Unique Pages" value={data.uniquePages} />
          <MetricCard label="Avg. Duration" value={data.avgSessionDuration ? formatDuration(data.avgSessionDuration) : "N/A"} />
          <MetricCard label="Top Country" value={data.topCountry} />
          <MetricCard label="Top Device" value={data.topDevice} />
        </div>

        <RecentVisitorsTable
          visitors={data.recentVisitors}
          onDelete={(id) => {
            setData((prev) =>
              prev ? { ...prev, recentVisitors: prev.recentVisitors.filter((v) => v.id !== id), totalViews: prev.totalViews - 1 } : prev
            );
          }}
        />

        <ChartCard title="Views Over Time" >
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
              <XAxis dataKey="date" stroke={chart.axis} fontSize={12} tickFormatter={(v) => v.slice(5)} />
              <YAxis stroke={chart.axis} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: chart.tooltipLabel }} itemStyle={{ color: "#3b82f6" }} />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Top Pages" >
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={data.topPages} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis type="number" stroke={chart.axis} fontSize={12} />
                <YAxis type="category" dataKey="name" stroke={chart.axis} fontSize={12} width={80} tickFormatter={(v) => (v.length > 12 ? v.slice(0, 12) + "..." : v)} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: chart.tooltipLabel }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Devices" >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={data.devices} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={50} label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false} fontSize={12}>
                  {data.devices.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <TableCard title="Top Organizations / ISPs" data={data.topOrgs} />
          <TableCard title="Top Cities" data={data.topCities} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Browsers" >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.browsers}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis dataKey="name" stroke={chart.axis} fontSize={12} />
                <YAxis stroke={chart.axis} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: chart.tooltipLabel }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Operating Systems" >
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.operatingSystems}>
                <CartesianGrid strokeDasharray="3 3" stroke={chart.grid} />
                <XAxis dataKey="name" stroke={chart.axis} fontSize={12} />
                <YAxis stroke={chart.axis} fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: chart.tooltipLabel }} />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <TableCard title="Top Countries" data={data.countries} />
          <TableCard title="Screen Breakpoints" data={data.screenBreakpoints} />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <TableCard title="Languages" data={data.topLanguages} />
          {data.topInteractions.length > 0 && (
            <TableCard title="Top Interactions" data={data.topInteractions} />
          )}
        </div>

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

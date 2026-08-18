import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, DollarSign, Clock, TrendingUp } from "lucide-react";
import { DashboardState, MetricsData, RevenuePlannerData, calcRevenue } from "@/lib/dashboard-state";

interface ResultsTabProps {
  state: DashboardState;
  setMetric: (key: keyof MetricsData, field: "goal" | "actual", value: number) => void;
  setRevenuePlanner: (field: keyof RevenuePlannerData, value: number) => void;
  setHoursThisWeek: (h: number) => void;
}

type MetricKey = keyof MetricsData;

interface MetricRowDef {
  key: MetricKey;
  label: string;
  note?: string;
}

const METRIC_ROWS: MetricRowDef[] = [
  { key: "guideDownloads", label: "Free Guide Downloads", note: "Lead magnet" },
  { key: "classRegistrations", label: "Intro Class Registrations" },
  { key: "classAttendees", label: "Intro Class Attendees" },
  { key: "coursePurchases", label: "Course Purchases", note: "Most important" },
  { key: "revenue", label: "Revenue ($)", note: "Total collected" },
  { key: "referrals", label: "Referrals" },
];

function statusDot(actual: number, goal: number, lowerIsBetter = false) {
  if (actual === 0) return { dot: "⚪", text: "text-gray-400", label: "Not started" };
  const ratio = actual / goal;
  if (lowerIsBetter) {
    return ratio <= 1
      ? { dot: "🟢", text: "text-green-700", label: "On target" }
      : { dot: "🔴", text: "text-red-600", label: "Over target" };
  }
  if (ratio >= 1) return { dot: "🟢", text: "text-green-700", label: "Met" };
  if (ratio >= 0.6) return { dot: "🟡", text: "text-yellow-700", label: "Close" };
  return { dot: "🔴", text: "text-red-600", label: "Behind" };
}

function NumInput({
  value,
  onChange,
  prefix = "",
  min = 0,
}: {
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  min?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {prefix && <span className="text-gray-500 text-sm">{prefix}</span>}
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value)))}
        className="w-20 text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-tymflo-purple/30"
      />
    </div>
  );
}

export default function ResultsTab({
  state,
  setMetric,
  setRevenuePlanner,
  setHoursThisWeek,
}: ResultsTabProps) {
  const m = state.metrics;
  const rp = state.revenuePlanner;
  const projected = calcRevenue(rp);
  const actualRevenue = m.revenue.actual;
  const hoursThisWeek = state.hoursThisWeek;
  const revenuePerHour = hoursThisWeek > 0 ? actualRevenue / hoursThisWeek : null;

  // Conversion rates
  const freebieToClass =
    m.guideDownloads.actual > 0
      ? Math.round((m.classRegistrations.actual / m.guideDownloads.actual) * 100)
      : null;
  const classToCourse =
    m.classAttendees.actual > 0
      ? Math.round((m.coursePurchases.actual / m.classAttendees.actual) * 100)
      : null;

  return (
    <div className="space-y-6">
      {/* Metrics table */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <BarChart2 className="tymflo-purple mr-3" size={24} />
            Validation Metrics
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            Enter your actual numbers. Goals are starting targets — update them as you learn what's realistic.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tymflo-purple text-white">
                  <th className="text-left px-4 py-3 font-heading">Metric</th>
                  <th className="text-center px-4 py-3 font-heading">Goal</th>
                  <th className="text-center px-4 py-3 font-heading">Actual</th>
                  <th className="text-center px-4 py-3 font-heading">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {METRIC_ROWS.map((row) => {
                  const { actual, goal } = m[row.key];
                  const s = statusDot(actual, goal, false);
                  return (
                    <tr key={row.key} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900">{row.label}</span>
                        {row.note && (
                          <span className="ml-2 text-xs text-gray-400">{row.note}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <NumInput
                          value={goal}
                          onChange={(v) => setMetric(row.key, "goal", v)}
                          prefix={row.key === "revenue" ? "$" : ""}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <NumInput
                          value={actual}
                          onChange={(v) => setMetric(row.key, "actual", v)}
                          prefix={row.key === "revenue" ? "$" : ""}
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span title={s.label}>{s.dot}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Conversion rates */}
          {(freebieToClass !== null || classToCourse !== null) && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {freebieToClass !== null && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide font-heading mb-1">
                    Guide → Class Conversion
                  </p>
                  <p className="text-3xl font-bold text-blue-800 font-heading">{freebieToClass}%</p>
                  <p className="text-xs text-blue-600 mt-1">
                    {m.classRegistrations.actual} of {m.guideDownloads.actual} guide downloaders registered for the class
                  </p>
                  {freebieToClass < 30 && (
                    <p className="text-xs text-blue-700 mt-2 italic">
                      💡 Low conversion here suggests the CTA from the guide to the class needs strengthening.
                    </p>
                  )}
                </div>
              )}
              {classToCourse !== null && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide font-heading mb-1">
                    Class → Course Conversion
                  </p>
                  <p className="text-3xl font-bold text-green-800 font-heading">{classToCourse}%</p>
                  <p className="text-xs text-green-600 mt-1">
                    {m.coursePurchases.actual} of {m.classAttendees.actual} class attendees purchased the course
                  </p>
                  {classToCourse > 0 && (
                    <p className="text-xs text-green-700 mt-2 italic">
                      {classToCourse >= 30
                        ? "✅ Strong conversion — people who attend the class are buying."
                        : "💡 Consider following up with class attendees who didn't purchase."}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Revenue Planner */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <DollarSign className="tymflo-purple mr-3" size={24} />
            Revenue Planner
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            Adjust the numbers below to see how revenue changes. Use this to plan, not to predict.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 font-heading">Course</h3>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Price per student</label>
                <NumInput
                  value={rp.coursePrice}
                  onChange={(v) => setRevenuePlanner("coursePrice", v)}
                  prefix="$"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Expected buyers</label>
                <NumInput
                  value={rp.courseBuyers}
                  onChange={(v) => setRevenuePlanner("courseBuyers", v)}
                />
              </div>
              <div className="bg-green-50 rounded-lg p-3 border border-green-200 text-right">
                <span className="text-xs text-green-600">Course subtotal</span>
                <div className="text-xl font-bold text-green-700 font-heading">
                  ${(rp.coursePrice * rp.courseBuyers).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 font-heading">Group Q&A</h3>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Price per member/mo</label>
                <NumInput
                  value={rp.supportPrice}
                  onChange={(v) => setRevenuePlanner("supportPrice", v)}
                  prefix="$"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-600">Expected members</label>
                <NumInput
                  value={rp.supportMembers}
                  onChange={(v) => setRevenuePlanner("supportMembers", v)}
                />
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 text-right">
                <span className="text-xs text-blue-600">Q&A subtotal</span>
                <div className="text-xl font-bold text-blue-700 font-heading">
                  ${(rp.supportPrice * rp.supportMembers).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-tymflo-purple rounded-xl p-5 text-white text-center">
            <p className="text-sm text-purple-200 mb-1">Estimated Monthly Revenue</p>
            <p className="text-4xl font-bold font-heading">${projected.toLocaleString()}</p>
            {actualRevenue > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div className="bg-white/10 rounded-lg p-2">
                  <div className="font-bold text-base">${actualRevenue}</div>
                  <div className="text-purple-200">Actual</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <div className="font-bold text-base">${projected.toLocaleString()}</div>
                  <div className="text-purple-200">Planned</div>
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <div className="font-bold text-base">
                    {projected > 0 ? Math.round((actualRevenue / projected) * 100) : 0}%
                  </div>
                  <div className="text-purple-200">of Target</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dayna's Time KPI */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <Clock className="tymflo-purple mr-3" size={24} />
            Dayna's Time
          </h2>
          <p className="text-sm text-gray-600 mb-5">
            The entire model was designed to avoid creating another business that consumes Dayna's time.
            Track it here. Target is ≤5 hours per week.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Hours spent on business this week
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={0.5}
                  value={hoursThisWeek}
                  onChange={(e) => setHoursThisWeek(Number(e.target.value))}
                  className="flex-1 accent-tymflo-purple"
                />
                <span className="text-2xl font-bold font-heading tymflo-purple w-16 text-right">
                  {hoursThisWeek}h
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`rounded-full h-2 transition-all ${
                      hoursThisWeek <= 5 ? "bg-green-500" : hoursThisWeek <= 8 ? "bg-yellow-400" : "bg-red-400"
                    }`}
                    style={{ width: `${Math.min(100, (hoursThisWeek / 20) * 100)}%` }}
                  />
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    hoursThisWeek <= 5 ? "text-green-600" : hoursThisWeek <= 8 ? "text-yellow-600" : "text-red-600"
                  }`}
                >
                  {hoursThisWeek <= 5 ? "🟢 On target" : hoursThisWeek <= 8 ? "🟡 Slightly over" : "🔴 Over target"}
                </span>
              </div>
            </div>

            <div className="sm:w-48 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1">Target</div>
                <div className="text-2xl font-bold font-heading text-gray-700">≤5h</div>
              </div>
              <div
                className={`rounded-xl p-4 text-center ${
                  revenuePerHour
                    ? "bg-tymflo-tangerine-light border border-orange-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">$/Hour</div>
                <div className="text-2xl font-bold font-heading text-gray-800">
                  {revenuePerHour ? `$${Math.round(revenuePerHour)}` : "—"}
                </div>
              </div>
            </div>
          </div>

          {revenuePerHour && (
            <div className="mt-4 bg-tymflo-tangerine-light border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800 font-medium">
                💡 $${Math.round(revenuePerHour)}/hour of Dayna's time — that's what "Less Work. More Flo." looks like in practice.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

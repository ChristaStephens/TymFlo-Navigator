import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, CheckCircle2, Target, Clock } from "lucide-react";
import {
  DashboardState,
  TASK_DEFS,
  getTaskData,
  getActiveTaskIndex,
  getCompletedTaskCount,
  getSubtaskCompletion,
  gatesMet,
} from "@/lib/dashboard-state";

interface HomeTabProps {
  state: DashboardState;
  onNavigate: (tab: string) => void;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const STATUS_COLORS: Record<string, string> = {
  not_started: "bg-gray-100 text-gray-600",
  in_progress: "bg-orange-100 text-orange-700",
  waiting: "bg-yellow-100 text-yellow-700",
  complete: "bg-green-100 text-green-700",
};
const STATUS_LABELS: Record<string, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  waiting: "Waiting",
  complete: "Complete",
};

export default function HomeTab({ state, onNavigate }: HomeTabProps) {
  const activeIdx = getActiveTaskIndex(state);
  const activeTask = TASK_DEFS[activeIdx];
  const activeTd = getTaskData(state, activeTask.id);
  const completedCount = getCompletedTaskCount(state);
  const { done: subtasksDone, total: subtasksTotal } = getSubtaskCompletion(state, activeTask.id);
  const allComplete = completedCount === TASK_DEFS.length;
  const phaseUnlocked = gatesMet(state);

  const metrics = state.metrics;
  const totalRevenue = metrics.revenue.actual;
  const hoursThisWeek = state.hoursThisWeek;
  const revenuePerHour = hoursThisWeek > 0 ? (totalRevenue / hoursThisWeek).toFixed(0) : null;

  return (
    <div className="space-y-6">
      {/* Greeting banner */}
      <Card className="bg-tymflo-purple text-white border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-purple-200 text-sm font-medium mb-1">
                {getGreeting()}, Dayna 👋
              </p>
              <h2 className="text-2xl font-bold font-heading">You're in: VALIDATE</h2>
              <p className="text-purple-200 text-sm mt-1">
                Phase 1 of 4 · {completedCount} of {TASK_DEFS.length} priorities complete
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/10 rounded-xl p-4 text-center min-w-[80px]">
                <div className="text-2xl font-bold font-heading">{completedCount}</div>
                <div className="text-xs text-purple-200 mt-1">Done</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center min-w-[80px]">
                <div className="text-2xl font-bold font-heading">
                  {TASK_DEFS.length - completedCount}
                </div>
                <div className="text-xs text-purple-200 mt-1">Remaining</div>
              </div>
              {totalRevenue > 0 && (
                <div className="bg-tymflo-tangerine/80 rounded-xl p-4 text-center min-w-[80px]">
                  <div className="text-2xl font-bold font-heading">${totalRevenue}</div>
                  <div className="text-xs text-white/80 mt-1">Revenue</div>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-purple-200 mb-1">
              <span>Phase 1 Progress</span>
              <span>{Math.round((completedCount / TASK_DEFS.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-tymflo-tangerine rounded-full h-2 transition-all duration-500"
                style={{ width: `${(completedCount / TASK_DEFS.length) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {allComplete ? (
        /* All done state */
        <Card className="border-green-200 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-green-700 font-heading mb-2">
              Phase 1 Priorities Complete!
            </h3>
            <p className="text-gray-600 text-sm">
              Check your Results tab to see if you've met the Phase 2 decision gates.
            </p>
            {phaseUnlocked ? (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 font-semibold text-sm">
                  ✅ All gate criteria met — you're ready to move into Phase 2: Refine!
                </p>
              </div>
            ) : (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  ⚠️ Some gate criteria haven't been met yet. Stay in Validate until demand is sufficiently tested.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Next priority card */
        <Card className="border-2 border-tymflo-purple shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Zap className="tymflo-tangerine flex-shrink-0" size={20} />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-heading">
                  Your Next Priority
                </span>
              </div>
              <Badge className={STATUS_COLORS[activeTd.status]}>
                {STATUS_LABELS[activeTd.status]}
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">
              {activeTask.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{activeTask.description}</p>

            <div className="bg-tymflo-purple-light rounded-lg p-3 mb-4 border border-purple-200">
              <p className="text-sm tymflo-purple font-medium">
                <strong>Why this matters:</strong> {activeTask.why}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-gray-600">
                <Target size={14} className="tymflo-tangerine" />
                <span>{activeTask.milestone}</span>
              </div>
              {activeTd.dueDate && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Clock size={14} />
                  <span>Due {activeTd.dueDate}</span>
                </div>
              )}
              {subtasksTotal > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-tymflo-tangerine rounded-full h-1.5 transition-all"
                      style={{ width: `${(subtasksDone / subtasksTotal) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-500 text-xs">
                    {subtasksDone}/{subtasksTotal} subtasks
                  </span>
                </div>
              )}
            </div>

            <Button
              onClick={() => onNavigate("plan")}
              className="mt-5 bg-tymflo-purple hover:bg-purple-800 text-white font-heading"
            >
              Continue Task
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Guide Downloads",
            value: metrics.guideDownloads.actual,
            goal: metrics.guideDownloads.goal,
            icon: "📄",
          },
          {
            label: "Course Purchases",
            value: metrics.coursePurchases.actual,
            goal: metrics.coursePurchases.goal,
            icon: "🎓",
          },
          {
            label: "Hours This Week",
            value: hoursThisWeek,
            goal: 5,
            icon: "⏱",
            lowerIsBetter: true,
          },
          {
            label: "Revenue/Hour",
            value: revenuePerHour ? `$${revenuePerHour}` : "—",
            goal: null,
            icon: "💰",
            isText: true,
          },
        ].map((stat, i) => {
          const pct =
            stat.goal !== null && !stat.isText
              ? Math.min(100, Math.round(((stat.value as number) / stat.goal) * 100))
              : null;
          const isGood = stat.lowerIsBetter
            ? (stat.value as number) <= (stat.goal as number)
            : pct !== null && pct >= 100;
          return (
            <Card key={i} className="shadow-sm border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{stat.icon}</span>
                  {pct !== null && (
                    <span
                      className={`text-xs font-bold ${isGood ? "text-green-600" : "text-gray-400"}`}
                    >
                      {pct}%
                    </span>
                  )}
                </div>
                <div className="text-2xl font-bold font-heading text-gray-900">
                  {stat.isText ? stat.value : stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                {pct !== null && (
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1">
                    <div
                      className={`rounded-full h-1 transition-all ${
                        isGood ? "bg-green-500" : "bg-tymflo-tangerine"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Phase 2 gate preview */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 font-heading mb-1 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-gray-400" />
            Phase 2 Decision Gate
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Complete these before moving to Refine. The goal is to confirm real demand — not just complete tasks.
          </p>
          <div className="space-y-2">
            {[
              { label: "At least 10 guide downloads", met: metrics.guideDownloads.actual >= 10, actual: metrics.guideDownloads.actual },
              { label: "At least 5 class registrations", met: metrics.classRegistrations.actual >= 5, actual: metrics.classRegistrations.actual },
              { label: "At least 1 paid course customer", met: metrics.coursePurchases.actual >= 1, actual: metrics.coursePurchases.actual },
              { label: "Customer feedback collected (mark in Plan tab)", met: getTaskData(state, "pilot-group").status === "complete", actual: null },
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className={g.met ? "text-green-500" : "text-gray-300"}>
                  {g.met ? "✅" : "⬜"}
                </span>
                <span className={g.met ? "text-green-800 line-through" : "text-gray-700"}>
                  {g.label}
                </span>
                {g.actual !== null && !g.met && (
                  <span className="text-gray-400 text-xs ml-auto">{g.actual} so far</span>
                )}
              </div>
            ))}
          </div>
          {!phaseUnlocked && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Stay in Validate.</strong> Demand has not been sufficiently tested yet. Focus on getting more qualified people into the introductory class before investing in additional technology.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, CheckCircle2, Target, Clock, ChevronRight } from "lucide-react";
import {
  DashboardState,
  TASK_DEFS,
  PHASES,
  getTaskData,
  getCompletedTaskCount,
  getSubtaskCompletion,
  getCurrentPhase,
  getPhaseProgress,
  gatesMet,
  isPhaseComplete,
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
  const completedCount = getCompletedTaskCount(state);
  const currentPhase = getCurrentPhase(state);
  const { done: phaseDone, total: phaseTotal } = getPhaseProgress(state);

  // "Next Priority" is always scoped to the current phase — never bleeds into later phases
  const currentPhaseTasks = TASK_DEFS.filter((t) => t.phase === currentPhase.number);
  const activeTask = currentPhaseTasks.find(
    (t) => getTaskData(state, t.id).status !== "complete"
  ) ?? currentPhaseTasks[currentPhaseTasks.length - 1];
  const activeTd = getTaskData(state, activeTask.id);
  const { done: subtasksDone, total: subtasksTotal } = getSubtaskCompletion(state, activeTask.id);

  // "All done" only when every phase has tasks complete AND gates met
  const allComplete = PHASES.every((p) => isPhaseComplete(state, p));

  // Current-phase tasks all done (gates may or may not be met)
  const currentPhaseTasksDone = currentPhaseTasks.every(
    (t) => getTaskData(state, t.id).status === "complete"
  );

  const phaseUnlocked = gatesMet(state);

  const metrics = state.metrics;
  const totalRevenue = metrics.revenue.actual;
  const hoursThisWeek = state.hoursThisWeek;
  const revenuePerHour = hoursThisWeek > 0 ? (totalRevenue / hoursThisWeek).toFixed(0) : null;

  // Determine status of each phase for the roadmap strip.
  // "complete" = tasks done AND gates met; "active" = current phase (may have unmet gates).
  function getPhaseStatus(phaseNum: number): "complete" | "active" | "upcoming" {
    const phase = PHASES.find((p) => p.number === phaseNum)!;
    if (isPhaseComplete(state, phase) && phaseNum < currentPhase.number) return "complete";
    if (phaseNum === currentPhase.number) return "active";
    if (phaseNum < currentPhase.number) return "active"; // tasks done but gates blocked — still show as active
    return "upcoming";
  }

  return (
    <div className="space-y-6">
      {/* ── Greeting banner ──────────────────────────────────────────────── */}
      <Card className="bg-tymflo-purple text-white border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-purple-200 text-sm font-medium mb-1">
                {getGreeting()}, Dayna 👋
              </p>
              <h2 className="text-2xl font-bold font-heading">
                You're in: {currentPhase.name}
              </h2>
              <p className="text-purple-200 text-sm mt-1">
                Phase {currentPhase.number} of {PHASES.length} &bull; {completedCount} of {TASK_DEFS.length} priorities complete
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

          {/* Phase progress bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-purple-200 mb-1">
              <span>Phase {currentPhase.number}: {currentPhase.name} Progress</span>
              <span>{phaseDone}/{phaseTotal} tasks</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-tymflo-tangerine rounded-full h-2 transition-all duration-500"
                style={{ width: `${phaseTotal > 0 ? (phaseDone / phaseTotal) * 100 : 0}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 12-Month Roadmap strip ───────────────────────────────────────── */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 font-heading">
          12-Month Roadmap
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PHASES.map((phase, i) => {
            const status = getPhaseStatus(phase.number);
            const phaseTasks = TASK_DEFS.filter((t) => t.phase === phase.number);
            const phaseCompletedCount = phaseTasks.filter(
              (t) => getTaskData(state, t.id).status === "complete"
            ).length;

            return (
              <div
                key={phase.number}
                className={`relative rounded-xl p-4 border-2 transition-all ${
                  status === "active"
                    ? "border-tymflo-purple bg-tymflo-purple-light"
                    : status === "complete"
                    ? "border-green-300 bg-green-50"
                    : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                {/* Phase number + status badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest font-heading ${
                      status === "active"
                        ? "tymflo-purple"
                        : status === "complete"
                        ? "text-green-700"
                        : "text-gray-400"
                    }`}
                  >
                    Phase {phase.number}
                  </span>
                  {status === "complete" && (
                    <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                  )}
                  {status === "active" && (
                    <span className="text-[10px] bg-tymflo-purple text-white rounded-full px-2 py-0.5 font-semibold">
                      Active
                    </span>
                  )}
                  {status === "upcoming" && (
                    <span className="text-[10px] bg-gray-200 text-gray-500 rounded-full px-2 py-0.5">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Phase name */}
                <h4
                  className={`font-bold font-heading text-sm mb-0.5 ${
                    status === "active"
                      ? "text-tymflo-purple"
                      : status === "complete"
                      ? "text-green-800"
                      : "text-gray-400"
                  }`}
                >
                  {phase.name}
                </h4>
                <p
                  className={`text-[11px] font-medium mb-2 ${
                    status === "upcoming" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {phase.months}
                </p>

                {/* Goal summary */}
                <p
                  className={`text-xs leading-relaxed ${
                    status === "upcoming" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {phase.goalSummary}
                </p>

                {/* Task progress within phase */}
                {status !== "upcoming" && phaseTasks.length > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                      <span>{phaseCompletedCount}/{phaseTasks.length} tasks</span>
                    </div>
                    <div className="w-full bg-white/60 rounded-full h-1">
                      <div
                        className={`rounded-full h-1 transition-all ${
                          status === "complete" ? "bg-green-500" : "bg-tymflo-tangerine"
                        }`}
                        style={{ width: `${(phaseCompletedCount / phaseTasks.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Arrow between phases */}
                {i < PHASES.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {allComplete ? (
        /* ── All phases done and all gates met ─────────────────────────── */
        <Card className="border-green-200 shadow-sm">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-green-700 font-heading mb-2">
              All Priorities Complete!
            </h3>
            <p className="text-gray-600 text-sm">
              All tasks are done and all gate criteria are met. Incredible work.
            </p>
          </CardContent>
        </Card>
      ) : currentPhaseTasksDone && !phaseUnlocked ? (
        /* ── Current-phase tasks done but gates NOT yet met ────────────── */
        <Card className="border-2 border-yellow-300 shadow-sm bg-yellow-50/40">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={20} className="text-yellow-500" />
              <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wide font-heading">
                Tasks Done — Gates Needed Before Advancing
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">
              {currentPhase.name} tasks are complete.
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              You've finished all the work in Phase {currentPhase.number}, but the decision gates below haven't been met yet.
              Stay in <strong>{currentPhase.name}</strong> and focus on hitting those numbers before moving to{" "}
              <strong>{currentPhase.nextPhaseName}</strong>.
            </p>
            <div className="space-y-2 mb-4">
              {currentPhase.gates.map((g, i) => {
                const met = g.taskId
                  ? getTaskData(state, g.taskId).status === "complete"
                  : g.metricKey
                  ? (state.metrics[g.metricKey].actual ?? 0) >= g.target
                  : true;
                return (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className={met ? "text-green-500" : "text-gray-300"}>{met ? "✅" : "⬜"}</span>
                    <span className={met ? "text-green-800 line-through" : "text-gray-700"}>{g.label}</span>
                  </div>
                );
              })}
            </div>
            <Button
              onClick={() => onNavigate("results")}
              variant="outline"
              className="border-yellow-400 text-yellow-800 hover:bg-yellow-100 font-heading"
            >
              Update Results
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : currentPhaseTasksDone && phaseUnlocked && currentPhase.nextPhaseName ? (
        /* ── Tasks done AND gates met — ready to advance ───────────────── */
        <Card className="border-2 border-green-400 shadow-sm bg-green-50/40">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={20} className="text-green-500" />
              <span className="text-xs font-semibold text-green-700 uppercase tracking-wide font-heading">
                Phase {currentPhase.number} Complete
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">
              ✅ You're ready for Phase {currentPhase.number + 1}: {currentPhase.nextPhaseName}
            </h3>
            <p className="text-gray-600 text-sm">
              All tasks are done and all gate criteria are met. Head to the Plan tab to start your{" "}
              {currentPhase.nextPhaseName} priorities.
            </p>
            <Button
              onClick={() => onNavigate("plan")}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-heading"
            >
              Start {currentPhase.nextPhaseName}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* ── Next priority in the current phase ────────────────────────── */
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

      {/* ── Quick stats row ──────────────────────────────────────────────── */}
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
                  {stat.value}
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

      {/* ── Phase Decision Gate ──────────────────────────────────────────── */}
      {currentPhase.gates.length > 0 && (
        <Card className="shadow-sm border border-gray-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 font-heading mb-1 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-gray-400" />
              Phase {currentPhase.number + 1}: {currentPhase.nextPhaseName} — Decision Gate
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Complete these before moving to {currentPhase.nextPhaseName}. The goal is to confirm real progress — not just complete tasks.
            </p>
            <div className="space-y-2">
              {currentPhase.gates.map((g, i) => {
                const met = g.taskId
                  ? getTaskData(state, g.taskId).status === "complete"
                  : g.metricKey
                  ? (state.metrics[g.metricKey].actual ?? 0) >= g.target
                  : true;
                const actual = g.metricKey ? state.metrics[g.metricKey].actual : null;
                return (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className={met ? "text-green-500" : "text-gray-300"}>
                      {met ? "✅" : "⬜"}
                    </span>
                    <span className={met ? "text-green-800 line-through" : "text-gray-700"}>
                      {g.label}
                    </span>
                    {actual !== null && !met && (
                      <span className="text-gray-400 text-xs ml-auto">{actual} so far</span>
                    )}
                  </div>
                );
              })}
            </div>
            {!phaseUnlocked && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  <strong>Stay in {currentPhase.name}.</strong> Focus on meeting the criteria above before moving forward.
                </p>
              </div>
            )}
            {phaseUnlocked && currentPhase.nextPhaseName && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold text-sm">
                  ✅ All gate criteria met — you're ready to move into Phase {currentPhase.number + 1}: {currentPhase.nextPhaseName}!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

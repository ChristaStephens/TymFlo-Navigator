import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  CalendarDays,
  StickyNote,
  Link,
  Map,
} from "lucide-react";
import {
  DashboardState,
  TASK_DEFS,
  PHASES,
  TaskData,
  getTaskData,
  getSubtaskCompletion,
  getCompletedTaskCount,
  getCurrentPhase,
  isPhaseComplete,
} from "@/lib/dashboard-state";

interface PlanTabProps {
  state: DashboardState;
  setTaskStatus: (id: string, s: TaskData["status"]) => void;
  setTaskDueDate: (id: string, v: string) => void;
  setTaskNotes: (id: string, v: string) => void;
  setTaskAssetLink: (id: string, v: string) => void;
  toggleSubtask: (id: string, subtaskId: string) => void;
}

const STATUS_OPTIONS: { value: TaskData["status"]; label: string; color: string }[] = [
  { value: "not_started", label: "Not Started", color: "bg-gray-100 text-gray-600" },
  { value: "in_progress", label: "In Progress", color: "bg-orange-100 text-orange-700" },
  { value: "waiting", label: "Waiting", color: "bg-yellow-100 text-yellow-700" },
  { value: "complete", label: "Complete ✓", color: "bg-green-100 text-green-700" },
];

const PHASE_COLORS: Record<number, { border: string; bg: string; text: string; badge: string }> = {
  1: { border: "border-purple-300", bg: "bg-tymflo-purple-light", text: "tymflo-purple", badge: "bg-tymflo-purple text-white" },
  2: { border: "border-blue-300", bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-600 text-white" },
  3: { border: "border-green-300", bg: "bg-green-50", text: "text-green-700", badge: "bg-green-600 text-white" },
  4: { border: "border-orange-300", bg: "bg-orange-50", text: "text-orange-700", badge: "bg-orange-500 text-white" },
};

export default function PlanTab({
  state,
  setTaskStatus,
  setTaskDueDate,
  setTaskNotes,
  setTaskAssetLink,
  toggleSubtask,
}: PlanTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(TASK_DEFS[0].id);
  const [celebrating, setCelebrating] = useState<string | null>(null);
  const completedCount = getCompletedTaskCount(state);
  const currentPhase = getCurrentPhase(state);

  function handleStatusChange(taskId: string, status: TaskData["status"]) {
    setTaskStatus(taskId, status);
    if (status === "complete") {
      setCelebrating(taskId);
      setTimeout(() => setCelebrating(null), 3000);
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Overall progress header ───────────────────────────────────────── */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 font-heading flex items-center gap-2">
              <Map size={18} className="tymflo-purple" />
              Phase {currentPhase.number}: {currentPhase.name}
              <span className="text-gray-400 font-normal text-xs ml-1">({currentPhase.months})</span>
            </h2>
            <Badge className="bg-tymflo-purple text-white">
              {completedCount} / {TASK_DEFS.length} complete
            </Badge>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
            <div
              className="bg-tymflo-purple rounded-full h-3 transition-all duration-700"
              style={{ width: `${(completedCount / TASK_DEFS.length) * 100}%` }}
            />
          </div>
          {/* Phase mini-pills */}
          <div className="flex flex-wrap gap-2">
            {PHASES.map((phase) => {
              const phaseTasks = TASK_DEFS.filter((t) => t.phase === phase.number);
              const done = phaseTasks.filter((t) => getTaskData(state, t.id).status === "complete").length;
              const isActive = phase.number === currentPhase.number;
              // "Complete" only when both tasks done AND gates met
              const complete = isPhaseComplete(state, phase);
              return (
                <span
                  key={phase.number}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                    complete
                      ? "bg-green-50 text-green-700 border-green-200"
                      : isActive
                      ? "bg-tymflo-purple text-white border-transparent"
                      : "bg-gray-50 text-gray-400 border-gray-200"
                  }`}
                >
                  {complete ? "✅ " : isActive ? "🔄 " : "⬜ "}
                  {phase.name} ({done}/{phaseTasks.length})
                </span>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ── Tasks grouped by phase ────────────────────────────────────────── */}
      {PHASES.map((phase) => {
        const phaseTasks = TASK_DEFS.filter((t) => t.phase === phase.number);
        const colors = PHASE_COLORS[phase.number];
        const phaseCompleted = phaseTasks.filter(
          (t) => getTaskData(state, t.id).status === "complete"
        ).length;
        const isCurrentPhase = phase.number === currentPhase.number;
        // isPastPhase = tasks done AND gates met (truly passed)
        const isPastPhase = isPhaseComplete(state, phase) && phase.number < currentPhase.number;

        return (
          <div key={phase.number} className="space-y-3">
            {/* Phase section header */}
            <div
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${colors.border} ${colors.bg}`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-widest font-heading ${colors.text}`}>
                  Phase {phase.number}: {phase.name}
                </span>
                <span className="text-xs text-gray-400">{phase.months}</span>
                {isCurrentPhase && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${colors.badge}`}>
                    Active
                  </span>
                )}
                {isPastPhase && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">
                    Complete
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${colors.text}`}>
                {phaseCompleted}/{phaseTasks.length} tasks
              </span>
            </div>

            {/* Task cards in this phase */}
            {phaseTasks.map((task, taskIdx) => {
              const td = getTaskData(state, task.id);
              const isExpanded = expandedId === task.id;
              const { done, total } = getSubtaskCompletion(state, task.id);
              const isComplete = td.status === "complete";
              const isCelebrating = celebrating === task.id;

              // A task is "unlocked" if it's the first in its phase, or the previous task is complete
              const allPhaseTasks = TASK_DEFS.filter((t) => t.phase === task.phase);
              const posInPhase = allPhaseTasks.findIndex((t) => t.id === task.id);
              const isUnlocked =
                posInPhase === 0 ||
                getTaskData(state, allPhaseTasks[posInPhase - 1].id).status === "complete";

              return (
                <Card
                  key={task.id}
                  className={`shadow-sm transition-all duration-300 ${
                    isComplete
                      ? "border-green-200 bg-green-50/30"
                      : isUnlocked && isCurrentPhase
                      ? `border-2 ${colors.border}`
                      : "border border-gray-200"
                  }`}
                >
                  <CardContent className="p-0">
                    {/* Celebration banner */}
                    {isCelebrating && (
                      <div className="bg-green-500 text-white text-center py-2 px-4 text-sm font-medium rounded-t-lg animate-pulse">
                        🎉 Step {task.step} Complete!{" "}
                        {task.step < TASK_DEFS.length && `Next up: ${TASK_DEFS[task.step].title}`}
                      </div>
                    )}

                    {/* Header row */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : task.id)}
                      className="w-full text-left p-5 flex items-center gap-4"
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          isComplete
                            ? "bg-green-500"
                            : td.status === "in_progress"
                            ? "bg-orange-400"
                            : "bg-gray-300"
                        }`}
                      >
                        {isComplete ? "✓" : task.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-gray-900 font-heading text-sm">
                            {task.title}
                          </h3>
                          <Badge
                            className={
                              STATUS_OPTIONS.find((o) => o.value === td.status)?.color ??
                              "bg-gray-100 text-gray-600"
                            }
                          >
                            {STATUS_OPTIONS.find((o) => o.value === td.status)?.label}
                          </Badge>
                        </div>
                        {total > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-24 bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-tymflo-tangerine rounded-full h-1.5 transition-all"
                                style={{ width: `${(done / total) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{done}/{total} subtasks</span>
                            {td.dueDate && (
                              <span className="text-xs text-gray-400 ml-2">📅 {td.dueDate}</span>
                            )}
                          </div>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {/* Expanded body */}
                    {isExpanded && (
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-5">
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className={`rounded-lg p-3 border ${colors.border} ${colors.bg}`}>
                          <p className={`text-xs ${colors.text}`}>
                            <strong>Why:</strong> {task.why}
                          </p>
                        </div>

                        {/* Subtasks */}
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 font-heading">
                            Subtasks
                          </h4>
                          <div className="space-y-2">
                            {task.subtasks.map((sub) => {
                              const checked = td.subtasks[sub.id] ?? false;
                              return (
                                <label
                                  key={sub.id}
                                  className="flex items-start gap-3 cursor-pointer group"
                                >
                                  <button
                                    onClick={() => toggleSubtask(task.id, sub.id)}
                                    className="mt-0.5 flex-shrink-0"
                                  >
                                    {checked ? (
                                      <CheckCircle2 size={18} className="text-green-500" />
                                    ) : (
                                      <Circle size={18} className="text-gray-300 group-hover:text-gray-400" />
                                    )}
                                  </button>
                                  <span
                                    className={`text-sm ${
                                      checked ? "line-through text-gray-400" : "text-gray-700"
                                    }`}
                                  >
                                    {sub.label}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Status / date / notes / asset */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 font-heading">
                              Status
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {STATUS_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() => handleStatusChange(task.id, opt.value)}
                                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                                    td.status === opt.value
                                      ? `${opt.color} border-current ring-1 ring-offset-1 ring-current/30`
                                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 font-heading">
                              <CalendarDays size={12} /> Target Date
                            </label>
                            <input
                              type="date"
                              value={td.dueDate}
                              onChange={(e) => setTaskDueDate(task.id, e.target.value)}
                              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-tymflo-purple/30"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 font-heading">
                            <Link size={12} /> Asset / Link
                          </label>
                          <input
                            type="url"
                            placeholder="Paste a Canva link, Google Drive URL, or Eventbrite page…"
                            value={td.assetLink}
                            onChange={(e) => setTaskAssetLink(task.id, e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-tymflo-purple/30"
                          />
                          {td.assetLink && (
                            <a
                              href={td.assetLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs tymflo-purple underline mt-1 inline-block"
                            >
                              Open link ↗
                            </a>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 font-heading">
                            <StickyNote size={12} /> Notes
                          </label>
                          <textarea
                            rows={3}
                            placeholder="What did you try? What do you need? What's blocking you?"
                            value={td.notes}
                            onChange={(e) => setTaskNotes(task.id, e.target.value)}
                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tymflo-purple/30 resize-none"
                          />
                        </div>

                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(task.id, "complete")}
                            disabled={isComplete}
                            className="bg-green-600 hover:bg-green-700 text-white font-heading"
                          >
                            {isComplete ? "✓ Marked Complete" : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

import { useState, useCallback } from "react";
import {
  DashboardState,
  TaskData,
  MetricsData,
  RevenuePlannerData,
  LearningData,
  NoteEntry,
  ProductLink,
  loadState,
  saveState,
  getTaskData,
  DEFAULT_TASK_DATA,
} from "@/lib/dashboard-state";

export function useDashboardState() {
  const [state, setState] = useState<DashboardState>(() => loadState());

  const update = useCallback((updater: (prev: DashboardState) => DashboardState) => {
    setState((prev) => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  // ── Task helpers ──────────────────────────────────────────────────────────

  const setTaskField = useCallback(
    (taskId: string, field: keyof TaskData, value: TaskData[keyof TaskData]) => {
      update((prev) => {
        const existing = getTaskData(prev, taskId);
        return {
          ...prev,
          taskStatuses: {
            ...prev.taskStatuses,
            [taskId]: { ...existing, [field]: value },
          },
        };
      });
    },
    [update]
  );

  const toggleSubtask = useCallback(
    (taskId: string, subtaskId: string) => {
      update((prev) => {
        const existing = getTaskData(prev, taskId);
        return {
          ...prev,
          taskStatuses: {
            ...prev.taskStatuses,
            [taskId]: {
              ...existing,
              subtasks: {
                ...existing.subtasks,
                [subtaskId]: !existing.subtasks[subtaskId],
              },
            },
          },
        };
      });
    },
    [update]
  );

  const setTaskStatus = useCallback(
    (taskId: string, status: TaskData["status"]) => {
      setTaskField(taskId, "status", status);
    },
    [setTaskField]
  );

  const setTaskDueDate = useCallback(
    (taskId: string, date: string) => setTaskField(taskId, "dueDate", date),
    [setTaskField]
  );

  const setTaskNotes = useCallback(
    (taskId: string, notes: string) => setTaskField(taskId, "notes", notes),
    [setTaskField]
  );

  const setTaskAssetLink = useCallback(
    (taskId: string, link: string) => setTaskField(taskId, "assetLink", link),
    [setTaskField]
  );

  // ── Metrics helpers ───────────────────────────────────────────────────────

  const setMetric = useCallback(
    (key: keyof MetricsData, field: "goal" | "actual", value: number) => {
      update((prev) => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          [key]: { ...prev.metrics[key], [field]: value },
        },
      }));
    },
    [update]
  );

  // ── Revenue planner ───────────────────────────────────────────────────────

  const setRevenuePlanner = useCallback(
    (field: keyof RevenuePlannerData, value: number) => {
      update((prev) => ({
        ...prev,
        revenuePlanner: { ...prev.revenuePlanner, [field]: value },
      }));
    },
    [update]
  );

  // ── Time tracking ─────────────────────────────────────────────────────────

  const setHoursThisWeek = useCallback(
    (hours: number) => update((prev) => ({ ...prev, hoursThisWeek: hours })),
    [update]
  );

  // ── Learning ──────────────────────────────────────────────────────────────

  const setLearningField = useCallback(
    (field: keyof LearningData, value: string) => {
      update((prev) => ({
        ...prev,
        learning: { ...prev.learning, [field]: value },
      }));
    },
    [update]
  );

  // ── Notes ─────────────────────────────────────────────────────────────────

  const addNote = useCallback(
    (month: string, content: string) => {
      const entry: NoteEntry = {
        id: Date.now().toString(),
        month,
        content,
        createdAt: new Date().toISOString(),
      };
      update((prev) => ({ ...prev, notes: [entry, ...prev.notes] }));
    },
    [update]
  );

  const deleteNote = useCallback(
    (id: string) => {
      update((prev) => ({ ...prev, notes: prev.notes.filter((n) => n.id !== id) }));
    },
    [update]
  );

  // ── Product links ─────────────────────────────────────────────────────────

  const setProductLink = useCallback(
    (step: number, data: Partial<ProductLink>) => {
      update((prev) => ({
        ...prev,
        productLinks: {
          ...prev.productLinks,
          [step]: { ...(prev.productLinks[step] ?? { assetLink: "", customerCount: 0 }), ...data },
        },
      }));
    },
    [update]
  );

  return {
    state,
    setTaskStatus,
    setTaskDueDate,
    setTaskNotes,
    setTaskAssetLink,
    toggleSubtask,
    setMetric,
    setRevenuePlanner,
    setHoursThisWeek,
    setLearningField,
    addNote,
    deleteNote,
    setProductLink,
  };
}

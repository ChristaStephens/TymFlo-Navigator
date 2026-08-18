// ─── Types ───────────────────────────────────────────────────────────────────

export type TaskStatus = "not_started" | "in_progress" | "waiting" | "complete";

export interface TaskData {
  status: TaskStatus;
  dueDate: string;
  notes: string;
  assetLink: string;
  subtasks: Record<string, boolean>;
}

export interface MetricRow {
  goal: number;
  actual: number;
}

export interface MetricsData {
  guideDownloads: MetricRow;
  classRegistrations: MetricRow;
  classAttendees: MetricRow;
  coursePurchases: MetricRow;
  revenue: MetricRow;
  referrals: MetricRow;
  recurringMembers: MetricRow; // monthly paying community members (Phase 3: Grow)
}

export interface RevenuePlannerData {
  coursePrice: number;
  courseBuyers: number;
  supportPrice: number;
  supportMembers: number;
}

export interface LearningData {
  commonQuestion: string;
  bestContent: string;
  purchaseReasons: string;
  unmetNeeds: string;
  nextTest: string;
}

export interface NoteEntry {
  id: string;
  month: string;
  content: string;
  createdAt: string;
}

export interface ProductLink {
  assetLink: string;
  customerCount: number;
}

export interface DashboardState {
  taskStatuses: Record<string, TaskData>;
  metrics: MetricsData;
  revenuePlanner: RevenuePlannerData;
  hoursThisWeek: number;
  learning: LearningData;
  notes: NoteEntry[];
  productLinks: Record<number, ProductLink>;
  lastUpdated: string;
}

// ─── Static task definitions ─────────────────────────────────────────────────

export interface SubtaskDef {
  id: string;
  label: string;
}

export interface TaskDef {
  id: string;
  step: number;
  phase: number; // which phase (1–4) this task belongs to
  title: string;
  description: string;
  why: string;
  milestone: string;
  subtasks: SubtaskDef[];
}

export const TASK_DEFS: TaskDef[] = [
  // ── Phase 1: Validate ──────────────────────────────────────────────────
  {
    id: "free-guide",
    step: 1,
    phase: 1,
    title: "Create the Free Guide",
    description:
      "Outline the 10 most important things someone needs to know to start a Home Help agency. Write it as a 1-page FAQ document.",
    why: "This is the first step in testing whether people are interested enough to enter your customer journey.",
    milestone: "Goal: 10 guide downloads",
    subtasks: [
      { id: "choose-topic", label: 'Choose a guide title (e.g., "10 Things to Know…")' },
      { id: "outline-questions", label: "Outline 10 questions or FAQ items" },
      { id: "write-answers", label: "Write clear answers for each question" },
      { id: "design-pdf", label: "Design the 1-page PDF in Canva" },
      { id: "add-signup", label: "Add an email signup link (Beacons)" },
      { id: "publish", label: "Publish and share on Facebook, Instagram, and LinkedIn" },
    ],
  },
  {
    id: "intro-class",
    step: 2,
    phase: 1,
    title: "Create the Introductory Class",
    description:
      "Outline 5–10 important items that expand the information from the free guide into a 20-minute recorded class.",
    why: 'The intro class moves someone from curious to convinced. It answers "Is this for me?" before asking them to spend money.',
    milestone: "Goal: 5 class attendees",
    subtasks: [
      { id: "outline-class", label: "Outline 5–10 key topics from the free guide" },
      { id: "record-class", label: "Record the 20-minute class on Zoom" },
      { id: "upload-class", label: "Upload the recording and make it accessible" },
      { id: "create-registration", label: "Create a registration page (Eventbrite)" },
      { id: "promote-subscribers", label: "Promote to everyone who downloaded the guide" },
    ],
  },
  {
    id: "paid-course",
    step: 3,
    phase: 1,
    title: "Build the First Version of the Paid Course",
    description:
      "Outline 6–8 topics about what you wish you had known before starting a Home Help agency. Each topic becomes a video.",
    why: "Each video topic can also become a blog post — driving more people to find Dayna organically.",
    milestone: "Goal: 1 paying course customer ($129)",
    subtasks: [
      { id: "outline-topics", label: "Outline 6–8 course topics" },
      { id: "record-videos", label: "Record a short video for each topic" },
      { id: "create-resources", label: "Create a resource, checklist, or link for each lesson" },
      { id: "set-up-payment", label: "Set up course payment via Square" },
      { id: "set-price", label: "Set launch price at $129" },
      { id: "deliver-access", label: "Decide how students access the course (shared folder, Zoom recordings, etc.)" },
    ],
  },
  {
    id: "pilot-group",
    step: 4,
    phase: 1,
    title: "Enroll a Small Pilot Group",
    description:
      "Reach out to people who signed up for the freebie. Offer exclusive early access to course material. Collect feedback.",
    why: "Pilot feedback improves the course before it's sold at full price. Testimonials and reviews build trust for new buyers.",
    milestone: "Goal: 3 pieces of written feedback or testimonials",
    subtasks: [
      { id: "email-subscribers", label: "Email guide subscribers with an exclusive pilot offer" },
      { id: "offer-access", label: "Give pilot participants access to the course" },
      { id: "collect-feedback", label: "Collect written feedback from each participant" },
      { id: "request-reviews", label: "Ask for Google reviews and social media testimonials" },
      { id: "revise-course", label: "Use feedback to improve at least one part of the course" },
    ],
  },

  // ── Phase 2: Refine ────────────────────────────────────────────────────
  {
    id: "refine-course",
    step: 5,
    phase: 2,
    title: "Refine the Course & Build Your Brand",
    description:
      "Use pilot feedback to improve the course, set up automated delivery so students access it without manual steps, and establish a consistent brand voice and social media posting schedule.",
    why: "A course that runs itself and markets itself consistently is more scalable than one that requires Dayna's direct attention for every sale and delivery.",
    milestone: "Goal: Automated course delivery + 4-week consistent content run",
    subtasks: [
      { id: "review-feedback", label: "Review pilot feedback and identify top 2–3 improvements" },
      { id: "revise-content", label: "Revise course content based on feedback" },
      { id: "automate-access", label: "Set up automated course access (e.g., Thinkific, Teachable, or auto-email)" },
      { id: "create-brand-guide", label: "Create a simple brand guide (colors, fonts, tone, photo style)" },
      { id: "create-content-calendar", label: "Build a content calendar (minimum 3 posts/week)" },
      { id: "post-consistently", label: "Post consistently for 4 consecutive weeks" },
    ],
  },

  // ── Phase 3: Grow ──────────────────────────────────────────────────────
  {
    id: "recurring-access",
    step: 6,
    phase: 3,
    title: "Introduce Recurring Community Access",
    description:
      "After the pilot is validated, open the monthly Group Q&A to new members. Start at $14/month and raise gradually.",
    why: "Recurring revenue is the most stable part of the model. A VA can lead these sessions so Dayna doesn't have to be present every month.",
    milestone: "Goal: 5 monthly paying members",
    subtasks: [
      { id: "set-up-recurring", label: "Set up monthly recurring payment (Square or similar)" },
      { id: "schedule-qa", label: "Schedule first monthly Group Q&A (Zoom)" },
      { id: "set-launch-price", label: "Set launch price at $14/month" },
      { id: "promote-to-grads", label: "Promote to everyone who completed the course" },
      { id: "plan-va", label: "Begin planning for a VA to support or lead future sessions" },
    ],
  },

  // ── Phase 4: Evaluate ──────────────────────────────────────────────────
  {
    id: "evaluate-expand",
    step: 7,
    phase: 4,
    title: "Evaluate Results & Plan Expansion",
    description:
      "Review all revenue, customer data, technology systems, and personal workload. Identify what's working and what's not. Decide the next major move: new market, new product tier, hire a VA, or build a referral program.",
    why: "Growing a business that's unsustainable is worse than not growing. This phase is about making a clear-eyed decision with real data before committing to the next year.",
    milestone: "Goal: Written expansion plan with 3 options analyzed",
    subtasks: [
      { id: "pull-revenue-report", label: "Pull 12-month revenue report from Square" },
      { id: "review-course-outcomes", label: "Review course completion rates and student outcomes" },
      { id: "assess-time-vs-revenue", label: "Assess personal time investment vs. revenue earned" },
      { id: "list-automation-gaps", label: "List what systems need to be automated or delegated" },
      { id: "identify-growth-options", label: "Identify 3 growth options (expand market, add product, or grow team)" },
      { id: "write-whats-next", label: "Write a 1-page \"What's Next\" decision document" },
    ],
  },
];

// ─── Phase definitions ────────────────────────────────────────────────────────

export interface GateCriterion {
  label: string;
  metricKey: keyof MetricsData | null;
  target: number;
  taskId?: string; // if this gate is satisfied by a task being complete
}

export interface PhaseDef {
  number: number;
  name: string;
  months: string;
  goalSummary: string;
  taskIds: string[];
  nextPhaseName: string | null;
  gates: GateCriterion[];
}

export const PHASES: PhaseDef[] = [
  {
    number: 1,
    name: "VALIDATE",
    months: "Months 1–3",
    goalSummary: "Free guide + intro class + first paid-course pilot. Confirm real demand with at least 1 paying customer.",
    taskIds: ["free-guide", "intro-class", "paid-course", "pilot-group"],
    nextPhaseName: "REFINE",
    gates: [
      { label: "At least 10 guide downloads", metricKey: "guideDownloads", target: 10 },
      { label: "At least 5 class registrations", metricKey: "classRegistrations", target: 5 },
      { label: "At least 1 paid course customer", metricKey: "coursePurchases", target: 1 },
      { label: "Pilot group feedback collected", metricKey: null, target: 0, taskId: "pilot-group" },
    ],
  },
  {
    number: 2,
    name: "REFINE",
    months: "Months 4–6",
    goalSummary: "Improve course from feedback, automate delivery, and build consistent brand and social media marketing.",
    taskIds: ["refine-course"],
    nextPhaseName: "GROW",
    gates: [
      { label: "Course refined and delivery automated", metricKey: null, target: 0, taskId: "refine-course" },
      { label: "4-week consistent content schedule completed", metricKey: null, target: 0, taskId: "refine-course" },
    ],
  },
  {
    number: 3,
    name: "GROW",
    months: "Months 7–9",
    goalSummary: "Increase pricing if demand supports it, strengthen referrals, and launch recurring low-touch revenue.",
    taskIds: ["recurring-access"],
    nextPhaseName: "EVALUATE",
    gates: [
      { label: "Recurring community launched", metricKey: null, target: 0, taskId: "recurring-access" },
      { label: "At least 5 monthly paying members", metricKey: "recurringMembers", target: 5 },
    ],
  },
  {
    number: 4,
    name: "EVALUATE",
    months: "Months 10–12",
    goalSummary: "Review revenue, technology, workload, and customer demand. Decide what to expand next.",
    taskIds: ["evaluate-expand"],
    nextPhaseName: null,
    gates: [],
  },
];

// Keep the old PHASE_GATES export as an alias for the current phase's gates
// (used for backwards-compat — components should use getCurrentPhase().gates instead)
export const PHASE_GATES: GateCriterion[] = PHASES[0].gates;

// ─── Default state ────────────────────────────────────────────────────────────

export const DEFAULT_TASK_DATA: TaskData = {
  status: "not_started",
  dueDate: "",
  notes: "",
  assetLink: "",
  subtasks: {},
};

export const DEFAULT_STATE: DashboardState = {
  taskStatuses: {},
  metrics: {
    guideDownloads: { goal: 20, actual: 0 },
    classRegistrations: { goal: 10, actual: 0 },
    classAttendees: { goal: 5, actual: 0 },
    coursePurchases: { goal: 1, actual: 0 },
    revenue: { goal: 129, actual: 0 },
    referrals: { goal: 1, actual: 0 },
    recurringMembers: { goal: 5, actual: 0 },
  },
  revenuePlanner: {
    coursePrice: 129,
    courseBuyers: 10,
    supportPrice: 14,
    supportMembers: 5,
  },
  hoursThisWeek: 0,
  learning: {
    commonQuestion: "",
    bestContent: "",
    purchaseReasons: "",
    unmetNeeds: "",
    nextTest: "",
  },
  notes: [],
  productLinks: {},
  lastUpdated: new Date().toISOString(),
};

// ─── localStorage helpers ─────────────────────────────────────────────────────

const STORAGE_KEY = "tymflo-dayna";

export function loadState(): DashboardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<DashboardState>;
    // Deep merge with defaults so new fields added later don't break old data
    return {
      ...DEFAULT_STATE,
      ...parsed,
      metrics: { ...DEFAULT_STATE.metrics, ...(parsed.metrics ?? {}) },
      revenuePlanner: { ...DEFAULT_STATE.revenuePlanner, ...(parsed.revenuePlanner ?? {}) },
      learning: { ...DEFAULT_STATE.learning, ...(parsed.learning ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: DashboardState): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...state, lastUpdated: new Date().toISOString() })
    );
  } catch {
    // localStorage unavailable — silent fail
  }
}

export function getTaskData(state: DashboardState, taskId: string): TaskData {
  return state.taskStatuses[taskId] ?? { ...DEFAULT_TASK_DATA };
}

// ─── Computed helpers ─────────────────────────────────────────────────────────

export function getActiveTaskIndex(state: DashboardState): number {
  for (let i = 0; i < TASK_DEFS.length; i++) {
    const td = getTaskData(state, TASK_DEFS[i].id);
    if (td.status !== "complete") return i;
  }
  return TASK_DEFS.length - 1;
}

export function getCompletedTaskCount(state: DashboardState): number {
  return TASK_DEFS.filter((t) => getTaskData(state, t.id).status === "complete").length;
}

export function getSubtaskCompletion(state: DashboardState, taskId: string): { done: number; total: number } {
  const task = TASK_DEFS.find((t) => t.id === taskId);
  if (!task) return { done: 0, total: 0 };
  const td = getTaskData(state, taskId);
  const done = task.subtasks.filter((s) => td.subtasks[s.id]).length;
  return { done, total: task.subtasks.length };
}

/** Checks whether all gate criteria for a specific phase are satisfied. */
export function phaseGatesMet(state: DashboardState, phase: PhaseDef): boolean {
  return phase.gates.every((g) => {
    if (g.taskId) return getTaskData(state, g.taskId).status === "complete";
    if (!g.metricKey) return true;
    // Optional chaining guards against missing metric keys in cached localStorage states
    return (state.metrics[g.metricKey]?.actual ?? 0) >= g.target;
  });
}

/**
 * Returns true when a phase is fully passed:
 * ALL tasks complete AND ALL gate criteria met.
 * Use this for any "phase complete" UI status.
 */
export function isPhaseComplete(state: DashboardState, phase: PhaseDef): boolean {
  const allTasksComplete = phase.taskIds.every(
    (id) => getTaskData(state, id).status === "complete"
  );
  return allTasksComplete && phaseGatesMet(state, phase);
}

/**
 * Returns the phase Dayna is currently in.
 * A phase is considered "passed" only when ALL its tasks are complete AND
 * ALL its gate criteria are met. If tasks are done but gates are unmet,
 * she stays in that phase until she satisfies the gates.
 */
export function getCurrentPhase(state: DashboardState): PhaseDef {
  for (const phase of PHASES) {
    const allTasksComplete = phase.taskIds.every(
      (id) => getTaskData(state, id).status === "complete"
    );
    // Still has incomplete tasks → stay in this phase
    if (!allTasksComplete) return phase;
    // Tasks done but gates not cleared → stay until gates are met
    if (!phaseGatesMet(state, phase)) return phase;
    // Both tasks and gates done → advance to next phase
  }
  // All phases passed — stay in the final phase
  return PHASES[PHASES.length - 1];
}

/** Returns the phase-specific task progress: { done, total } for the current phase's tasks. */
export function getPhaseProgress(state: DashboardState): { done: number; total: number; phase: PhaseDef } {
  const phase = getCurrentPhase(state);
  const total = phase.taskIds.length;
  const done = phase.taskIds.filter((id) => getTaskData(state, id).status === "complete").length;
  return { done, total, phase };
}

/** Returns true when all gate criteria for the current phase are satisfied. */
export function gatesMet(state: DashboardState): boolean {
  return phaseGatesMet(state, getCurrentPhase(state));
}

export function calcRevenue(planner: RevenuePlannerData): number {
  return planner.coursePrice * planner.courseBuyers + planner.supportPrice * planner.supportMembers;
}

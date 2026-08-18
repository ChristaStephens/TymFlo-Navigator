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
  title: string;
  description: string;
  why: string;
  milestone: string;
  subtasks: SubtaskDef[];
}

export const TASK_DEFS: TaskDef[] = [
  {
    id: "free-guide",
    step: 1,
    title: "Create the Free Guide",
    description:
      "Outline the 10 most important things someone needs to know to start a Home Help agency. Write it as a 1-page FAQ document.",
    why: "This is the first step in testing whether people are interested enough to enter your customer journey.",
    milestone: "Goal: 10 guide downloads",
    subtasks: [
      { id: "choose-topic", label: 'Choose a guide title (e.g., "10 Things to Know...")', },
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
  {
    id: "recurring-access",
    step: 5,
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
];

// ─── Phase gate criteria ──────────────────────────────────────────────────────

export interface GateCriterion {
  label: string;
  metricKey: keyof MetricsData | null;
  target: number;
}

export const PHASE_GATES: GateCriterion[] = [
  { label: "At least 10 guide downloads", metricKey: "guideDownloads", target: 10 },
  { label: "At least 5 class registrations", metricKey: "classRegistrations", target: 5 },
  { label: "At least 1 paid course customer", metricKey: "coursePurchases", target: 1 },
  { label: "Customer feedback collected", metricKey: null, target: 0 },
];

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

export function gatesMet(state: DashboardState): boolean {
  return PHASE_GATES.every((g) => {
    if (!g.metricKey) return true;
    return (state.metrics[g.metricKey].actual ?? 0) >= g.target;
  });
}

export function calcRevenue(planner: RevenuePlannerData): number {
  return planner.coursePrice * planner.courseBuyers + planner.supportPrice * planner.supportMembers;
}

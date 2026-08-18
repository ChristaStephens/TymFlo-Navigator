import { Card, CardContent } from "@/components/ui/card";
import { Route, Eye, BookOpen, ShoppingCart, Headphones, Share2 } from "lucide-react";
import { DashboardState } from "@/lib/dashboard-state";

interface CustomersTabProps {
  state: DashboardState;
}

const JOURNEY_STEPS = [
  {
    step: 1,
    stage: "Awareness",
    tagline: "I found something interesting",
    icon: Eye,
    iconBg: "bg-tymflo-purple",
    bg: "bg-tymflo-purple-light",
    border: "border-purple-200",
    textColor: "text-purple-800",
    offer: "Social media post or article on Home Help agency ownership",
    trigger: 'Andrea searches "What businesses can nurses start?" and finds Dayna\'s content.',
    cta: "Clicks Dayna's link",
    metricKey: null,
    platforms: ["Facebook", "Instagram", "LinkedIn"],
  },
  {
    step: 2,
    stage: "Learn",
    tagline: "This looks real",
    icon: BookOpen,
    iconBg: "bg-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-200",
    textColor: "text-blue-800",
    offer: "Free Guide — 10 Things to Know Before Starting a Home Help Business in Michigan",
    trigger: "Andrea downloads the guide and gets enough info to understand the opportunity.",
    cta: "Joins free intro class",
    metricKey: "guideDownloads" as const,
    platforms: ["Beacons landing page", "Email signup"],
  },
  {
    step: 3,
    stage: "Purchase",
    tagline: "I could actually do this",
    icon: ShoppingCart,
    iconBg: "bg-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    textColor: "text-green-800",
    offer: "Home Help Agency Startup Course — Launch $129 / Target $199",
    trigger: 'Andrea finishes the intro class thinking "This is something I could actually see myself doing."',
    cta: "Buys the course",
    metricKey: "coursePurchases" as const,
    platforms: ["Square payment", "Direct email"],
  },
  {
    step: 4,
    stage: "Support",
    tagline: "I have questions as I implement",
    icon: Headphones,
    iconBg: "bg-tymflo-tangerine",
    bg: "bg-tymflo-tangerine-light",
    border: "border-orange-200",
    textColor: "text-orange-800",
    offer: "Monthly Group Q&A — Launch $14/mo / Target $79/mo",
    trigger: "Andrea completes the course but has specific questions during implementation.",
    cta: "Joins monthly group session",
    metricKey: null,
    platforms: ["Zoom", "Calendly"],
  },
  {
    step: 5,
    stage: "Referral",
    tagline: "Someone else needs this",
    icon: Share2,
    iconBg: "bg-pink-500",
    bg: "bg-pink-50",
    border: "border-pink-200",
    textColor: "text-pink-800",
    offer: "Word of mouth + referral back to Free Guide",
    trigger: "Andrea makes progress and tells another healthcare professional about Dayna's intro class.",
    cta: "Sends a friend to the free guide",
    metricKey: "referrals" as const,
    platforms: ["Word of mouth", "Social sharing"],
  },
];

type MetricKey = "guideDownloads" | "classRegistrations" | "coursePurchases" | "referrals";

export default function CustomersTab({ state }: CustomersTabProps) {
  const m = state.metrics;

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <Route className="tymflo-purple mr-3" size={24} />
            Client Journey
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            How Andrea (and customers like her) move from curious to paying — and eventually become referral sources.
            Numbers come from your Results tab.
          </p>

          {/* Flow path */}
          <div className="hidden md:flex items-center justify-center mb-5 gap-2 flex-wrap">
            {JOURNEY_STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {s.stage}
                </span>
                {i < JOURNEY_STEPS.length - 1 && (
                  <span className="text-gray-300">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {JOURNEY_STEPS.map((step) => {
              const IconComponent = step.icon;
              const count = step.metricKey ? m[step.metricKey as MetricKey]?.actual ?? 0 : null;

              return (
                <div
                  key={step.step}
                  className={`${step.bg} border ${step.border} rounded-xl p-4 flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-9 h-9 ${step.iconBg} text-white rounded-full flex items-center justify-center flex-shrink-0`}>
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Step {step.step}</div>
                      <h3 className={`font-bold text-sm font-heading ${step.textColor}`}>
                        {step.stage}
                      </h3>
                    </div>
                  </div>

                  {count !== null && (
                    <div className={`text-center mb-2 ${step.textColor}`}>
                      <span className="text-2xl font-bold font-heading">{count}</span>
                      <span className="text-xs ml-1 opacity-70">people</span>
                    </div>
                  )}

                  <p className={`text-xs italic mb-3 ${step.textColor}`}>"{step.tagline}"</p>

                  <div className="space-y-2 flex-1">
                    <div className="bg-white rounded-lg p-2 border border-white/60">
                      <p className="text-xs font-semibold text-gray-600 mb-0.5">Offer</p>
                      <p className="text-xs text-gray-800">{step.offer}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-white/60">
                      <p className="text-xs font-semibold text-gray-600 mb-0.5">Platforms</p>
                      <div className="flex flex-wrap gap-1">
                        {step.platforms.map((p, pi) => (
                          <span key={pi} className="text-xs bg-gray-100 text-gray-600 rounded px-1.5 py-0.5">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`mt-3 text-xs font-semibold ${step.textColor} border-t border-current/20 pt-2`}>
                    → {step.cta}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-xs text-gray-600 font-medium">
              Content → Free Resource → Free Introductory Class → Paid Course → Optional Group Support → Referral
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Persona card — compact */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 font-heading mb-4">
            Who You're Talking To: Andrea, 38
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">Goals</h4>
              <ul className="space-y-1 text-green-700 text-xs">
                {[
                  "Leave bedside care",
                  "Control her schedule",
                  "Create an additional income source",
                  "Build a business that doesn't depend on her doing all the work",
                ].map((g, i) => <li key={i}>✓ {g}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-2">Pains</h4>
              <ul className="space-y-1 text-red-700 text-xs">
                {[
                  "Burned out from long shifts",
                  "Never owned a business",
                  "Doesn't know where to start",
                  "Limited time to research",
                ].map((p, i) => <li key={i}>• {p}</li>)}
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">She's Searching For</h4>
              <ul className="space-y-1.5 text-blue-700 text-xs">
                {[
                  '"What businesses can nurses start?"',
                  '"How to leave bedside nursing?"',
                  '"Healthcare business in Michigan?"',
                ].map((q, i) => <li key={i} className="italic">{q}</li>)}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

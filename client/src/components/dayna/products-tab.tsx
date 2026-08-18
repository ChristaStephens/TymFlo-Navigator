import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ArrowDown, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { DashboardState, ProductLink } from "@/lib/dashboard-state";

interface ProductsTabProps {
  state: DashboardState;
  setProductLink: (step: number, data: Partial<ProductLink>) => void;
}

const LADDER = [
  {
    step: 1,
    title: "Free Guide",
    subtitle: "1-Page PDF / Short Guide",
    launchPrice: "Free",
    targetPrice: "Free",
    isFree: true,
    purpose: "Introduce Home Help agency ownership and collect contact info.",
    bg: "bg-tymflo-purple-light",
    border: "border-purple-200",
    iconBg: "bg-tymflo-purple",
    label: "STEP 1 — ENTRY POINT",
    labelColor: "bg-purple-100 text-purple-700",
    textColor: "text-purple-800",
    metric: "guideDownloads" as const,
  },
  {
    step: 2,
    title: "Introductory Class",
    subtitle: "20-Minute Recorded Session",
    launchPrice: "Free",
    targetPrice: "Free",
    isFree: true,
    purpose: "Help potential customers decide if they want to learn more.",
    bg: "bg-tymflo-tangerine-light",
    border: "border-orange-200",
    iconBg: "bg-tymflo-tangerine",
    label: "STEP 2 — BUILD TRUST",
    labelColor: "bg-orange-100 text-orange-700",
    textColor: "text-orange-800",
    metric: "classRegistrations" as const,
  },
  {
    step: 3,
    title: "Home Help Agency Startup Course",
    subtitle: "6–8 Short Video Lessons + Resources",
    launchPrice: "$129",
    targetPrice: "$199",
    isFree: false,
    purpose: "Step-by-step education with resources, links, forms, and checklists.",
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-600",
    label: "STEP 3 — CORE PRODUCT",
    labelColor: "bg-green-100 text-green-700",
    textColor: "text-green-800",
    metric: "coursePurchases" as const,
  },
  {
    step: 4,
    title: "Monthly Group Q&A",
    subtitle: "45-Minute Implementation Session",
    launchPrice: "$14/mo",
    targetPrice: "$79/mo",
    isFree: false,
    purpose: "Recurring support for course graduates. Could be led by a trained VA.",
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-600",
    label: "STEP 4 — ONGOING SUPPORT",
    labelColor: "bg-blue-100 text-blue-700",
    textColor: "text-blue-800",
    metric: null,
  },
];

type MetricKey = "guideDownloads" | "classRegistrations" | "coursePurchases";

export default function ProductsTab({ state, setProductLink }: ProductsTabProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const m = state.metrics;

  function getCount(key: MetricKey | null): number {
    if (!key) return state.productLinks[4]?.customerCount ?? 0;
    return m[key].actual;
  }

  function conversionRate(fromKey: MetricKey | null, toKey: MetricKey | null): number | null {
    const from = fromKey ? m[fromKey].actual : 0;
    const to = toKey ? m[toKey].actual : 0;
    if (from === 0) return null;
    return Math.round((to / from) * 100);
  }

  const rates = [
    conversionRate("guideDownloads", "classRegistrations"),
    conversionRate("classRegistrations", "coursePurchases"),
    null,
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <GraduationCap className="tymflo-purple mr-3" size={24} />
            Product Ladder — Live Funnel
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Customer counts pull from your Results tab. Add asset links and track how people move through your funnel.
          </p>

          <div className="flex flex-col items-center gap-1">
            {LADDER.map((item, index) => {
              const count = getCount(item.metric as MetricKey | null);
              const rate = index < rates.length ? rates[index] : null;
              const link = state.productLinks[item.step];
              const isExpanded = expandedStep === item.step;

              return (
                <div key={item.step} className="w-full">
                  <div className={`${item.bg} border ${item.border} rounded-xl overflow-hidden`}>
                    {/* Main row */}
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Icon + label */}
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div
                            className={`w-10 h-10 ${item.iconBg} text-white rounded-full flex items-center justify-center font-bold`}
                          >
                            {item.step}
                          </div>
                          <Badge className={`${item.labelColor} text-xs border-0`}>
                            {item.label}
                          </Badge>
                        </div>

                        {/* Title + price + count */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 font-heading">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.subtitle}</p>
                        </div>

                        {/* Pricing */}
                        <div className="flex items-center gap-4">
                          {!item.isFree && (
                            <div className="text-right">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-gray-400">Launch</span>
                                <span className="font-bold text-green-600 font-heading">{item.launchPrice}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-gray-400">Target</span>
                                <span className="font-bold tymflo-purple font-heading">{item.targetPrice}</span>
                              </div>
                            </div>
                          )}

                          {/* Live count */}
                          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-center min-w-[70px]">
                            <div className={`text-2xl font-bold font-heading ${item.textColor}`}>
                              {count}
                            </div>
                            <div className="text-xs text-gray-500">customers</div>
                          </div>

                          <button
                            onClick={() => setExpandedStep(isExpanded ? null : item.step)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="border-t border-current/10 px-5 py-4 bg-white/60 space-y-3">
                        <p className="text-sm text-gray-700">{item.purpose}</p>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-heading mb-1 block">
                            Asset / Product Link
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              placeholder="Paste a link to this product…"
                              value={link?.assetLink ?? ""}
                              onChange={(e) =>
                                setProductLink(item.step, { assetLink: e.target.value })
                              }
                              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-tymflo-purple/30"
                            />
                            {link?.assetLink && (
                              <a
                                href={link.assetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-3 py-1.5 bg-tymflo-purple text-white rounded-lg text-xs"
                              >
                                Open <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Conversion arrow between steps */}
                  {index < LADDER.length - 1 && (
                    <div className="flex flex-col items-center my-1">
                      <ArrowDown className="text-gray-400" size={18} />
                      {rates[index] !== null && (
                        <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5 -mt-1">
                          {rates[index]}% conversion
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-xs text-gray-600">
            Customer counts are pulled from your <strong>Results</strong> tab. Update actuals there to see the funnel update here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

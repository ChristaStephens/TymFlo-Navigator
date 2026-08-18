import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlayCircle, GraduationCap, Users, ArrowDown } from "lucide-react";

const ladder = [
  {
    step: 1,
    icon: BookOpen,
    title: "Free Guide",
    subtitle: "1-Page PDF / Short Guide",
    launchPrice: "Free",
    targetPrice: "Free",
    isFree: true,
    purpose: "Introduce Home Help agency ownership and collect potential customer contact information.",
    examples: [
      "10 Things to Know Before Starting a Home Help Business in Michigan",
      "Is Home Help Agency Ownership Right for You?",
    ],
    bg: "bg-tymflo-purple-light",
    border: "border-purple-200",
    iconBg: "bg-tymflo-purple",
    label: "STEP 1 — ENTRY POINT",
    labelColor: "bg-purple-100 text-purple-700",
  },
  {
    step: 2,
    icon: PlayCircle,
    title: "Introductory Class",
    subtitle: "20-Minute Recorded Session",
    launchPrice: "Free",
    targetPrice: "Free",
    isFree: true,
    purpose: "Help potential customers determine whether they want to learn more about owning a Home Help agency.",
    examples: [
      "What a Home Help business is and what an agency owner does",
      "What to consider before starting, and the general pathway",
    ],
    bg: "bg-tymflo-tangerine-light",
    border: "border-orange-200",
    iconBg: "bg-tymflo-tangerine",
    label: "STEP 2 — BUILD TRUST",
    labelColor: "bg-orange-100 text-orange-700",
  },
  {
    step: 3,
    icon: GraduationCap,
    title: "Home Help Agency Startup Course",
    subtitle: "6–8 Short Video Lessons + Resources",
    launchPrice: "$129",
    targetPrice: "$199",
    isFree: false,
    purpose: "Provide structured step-by-step education with relevant resources, links, forms, and checklists.",
    examples: [
      "Everything needed to understand the startup process",
      "Repurpose each video topic into blog content for visibility",
    ],
    bg: "bg-green-50",
    border: "border-green-200",
    iconBg: "bg-green-600",
    label: "STEP 3 — CORE PRODUCT",
    labelColor: "bg-green-100 text-green-700",
  },
  {
    step: 4,
    icon: Users,
    title: "Monthly Group Q&A",
    subtitle: "45-Minute Implementation Session",
    launchPrice: "$14/mo",
    targetPrice: "$79/mo",
    isFree: false,
    purpose: "Generate recurring revenue while preventing unlimited individual support. Could be led by a trained VA instead of Dayna directly.",
    examples: [
      "Open to course graduates with questions as they implement",
      "Raise price gradually as more members join",
    ],
    bg: "bg-blue-50",
    border: "border-blue-200",
    iconBg: "bg-blue-600",
    label: "STEP 4 — ONGOING SUPPORT",
    labelColor: "bg-blue-100 text-blue-700",
  },
];

export default function ProductLadder() {
  return (
    <section className="mb-8">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center font-heading">
              <GraduationCap className="tymflo-purple mr-3" size={24} />
              Product Ladder
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Each step moves a potential customer closer to a paid relationship. Build new products only after customer demand shows what is needed next.
          </p>

          <div className="flex flex-col items-center gap-2">
            {ladder.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={item.step} className="w-full">
                  <div className={`${item.bg} border ${item.border} rounded-xl p-5`}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Icon + Step */}
                      <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2">
                        <div className={`w-11 h-11 ${item.iconBg} text-white rounded-full flex items-center justify-center`}>
                          <IconComponent size={20} />
                        </div>
                        <Badge className={`${item.labelColor} text-xs whitespace-nowrap border-0`}>
                          {item.label}
                        </Badge>
                      </div>

                      {/* Main content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <div>
                            <h3 className="font-bold text-gray-900 font-heading">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.subtitle}</p>
                          </div>

                          {/* Price block */}
                          <div className="flex flex-col items-end gap-1">
                            {item.isFree ? (
                              <span className="text-xl font-bold text-green-600 font-heading">Free</span>
                            ) : (
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 font-medium">Launch</span>
                                  <span className="text-lg font-bold text-green-600 font-heading">{item.launchPrice}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 font-medium">Target</span>
                                  <span className="text-lg font-bold tymflo-purple font-heading">{item.targetPrice}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-2">{item.purpose}</p>
                        <ul className="space-y-1">
                          {item.examples.map((ex, i) => (
                            <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                              <span className="tymflo-tangerine mt-0.5">•</span>
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {index < ladder.length - 1 && (
                    <div className="flex justify-center my-1">
                      <ArrowDown className="text-gray-400" size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-xs text-gray-600">
              <strong>Note:</strong> Launch prices are where to start. Gradually raise to target prices as demand increases. Any additional products should only be created after at least 5 new clients per month consistently enter the journey.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

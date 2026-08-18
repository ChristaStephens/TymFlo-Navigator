import { Card, CardContent } from "@/components/ui/card";
import { Route, Eye, BookOpen, ShoppingCart, Headphones, Share2 } from "lucide-react";

const steps = [
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
    trigger:
      'Andrea searches "What businesses can nurses start?" and finds Dayna\'s content.',
    cta: "Clicks Dayna's link",
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
  },
  {
    step: 5,
    stage: "Referral & Repeat",
    tagline: "Someone else needs this",
    icon: Share2,
    iconBg: "bg-pink-500",
    bg: "bg-pink-50",
    border: "border-pink-200",
    textColor: "text-pink-800",
    offer: "Word of mouth + referral back to Free Guide",
    trigger: "Andrea begins making progress and tells another healthcare professional about Dayna's introductory class.",
    cta: "Sends a friend to the free guide",
  },
];

export default function ClientJourney() {
  return (
    <section className="mb-8">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <Route className="tymflo-purple mr-3" size={24} />
            Client Journey
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            How a potential client moves from curious to paying — and eventually becomes a referral source.
            Each step should be easy to navigate before adding more technology.
          </p>

          {/* Flow path label */}
          <div className="hidden md:flex items-center justify-between mb-4 px-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  {s.stage}
                </span>
                {i < steps.length - 1 && (
                  <span className="mx-3 text-gray-300 text-lg">→</span>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  className={`${step.bg} border ${step.border} rounded-xl p-4 flex flex-col`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-9 h-9 ${step.iconBg} text-white rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Step {step.step}</div>
                      <h3 className={`font-bold text-sm font-heading ${step.textColor}`}>
                        {step.stage}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-xs italic mb-3 ${step.textColor}`}>"{step.tagline}"</p>

                  <div className="space-y-2 flex-1">
                    <div className="bg-white rounded-lg p-2 border border-white/60">
                      <p className="text-xs font-semibold text-gray-600 mb-0.5">Offer</p>
                      <p className="text-xs text-gray-800">{step.offer}</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-white/60">
                      <p className="text-xs font-semibold text-gray-600 mb-0.5">What happens</p>
                      <p className="text-xs text-gray-700">{step.trigger}</p>
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
    </section>
  );
}

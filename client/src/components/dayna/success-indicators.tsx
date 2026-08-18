import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Users, FileDown, CalendarCheck, BookOpen, Star, Share2 } from "lucide-react";

const indicators = [
  {
    icon: Users,
    title: "Audience",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-tymflo-purple",
    textColor: "text-purple-800",
    metrics: [
      "New likes and views on Facebook",
      "New followers on Instagram",
      "New connections on LinkedIn",
    ],
    why: "Shows whether content is reaching the right people.",
  },
  {
    icon: FileDown,
    title: "Lead Magnet",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-600",
    textColor: "text-blue-800",
    metrics: [
      "Number of free guide downloads",
      "Email signups from the guide",
    ],
    why: "Confirms whether the free guide attracts interest.",
  },
  {
    icon: CalendarCheck,
    title: "Introductory Class",
    color: "bg-tymflo-tangerine-light border-orange-200",
    iconBg: "bg-tymflo-tangerine",
    textColor: "text-orange-800",
    metrics: [
      "Number registered for the class",
      "Number actually attending",
    ],
    why: "Measures the gap between interest and follow-through.",
  },
  {
    icon: BookOpen,
    title: "Course",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-600",
    textColor: "text-green-800",
    metrics: [
      "Number purchasing the course",
      "Conversion from introductory class to course",
    ],
    why: "The most important early signal — will people pay?",
  },
  {
    icon: Star,
    title: "Community (Group Q&A)",
    color: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-500",
    textColor: "text-yellow-800",
    metrics: [
      "Number of paid monthly members",
      "Monthly retention — how many stay month after month",
    ],
    why: "Shows whether recurring support has real demand.",
  },
  {
    icon: Share2,
    title: "Referral",
    color: "bg-pink-50 border-pink-200",
    iconBg: "bg-pink-500",
    textColor: "text-pink-800",
    metrics: [
      "Number of customers referred by existing participants",
    ],
    why: "Referrals are the lowest-cost, highest-trust source of new clients.",
  },
];

export default function SuccessIndicators() {
  return (
    <section className="mb-8">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <BarChart2 className="tymflo-purple mr-3" size={24} />
            Success Indicators
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Track these numbers to know where the client journey is working and where potential customers are dropping off.
            All information is useful — whether the numbers are big or small.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {indicators.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className={`${item.color} border rounded-xl p-5`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 ${item.iconBg} text-white rounded-full flex items-center justify-center flex-shrink-0`}>
                      <IconComponent size={16} />
                    </div>
                    <h3 className={`font-bold font-heading ${item.textColor}`}>{item.title}</h3>
                  </div>
                  <ul className="space-y-1.5 mb-3">
                    {item.metrics.map((m, mi) => (
                      <li key={mi} className="flex items-start gap-2 text-sm text-gray-800">
                        <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full ${item.iconBg}`} />
                        {m}
                      </li>
                    ))}
                  </ul>
                  <p className={`text-xs italic ${item.textColor} border-t border-current/20 pt-2`}>
                    {item.why}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>Target during Phase 1 (Months 1–3):</strong> At least <strong>1 paying customer</strong> confirms the business model has real demand. Scale to at least <strong>5 new clients per month</strong> entering the journey before adding new products or raising prices significantly.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

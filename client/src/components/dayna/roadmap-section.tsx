import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map } from "lucide-react";

const phases = [
  {
    months: "Months 1–3",
    goal: "Validate",
    goalColor: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-300",
    badgeBg: "bg-red-100 text-red-800",
    isCurrent: true,
    activities: [
      "Create and publish the free guide",
      "Record and host the 20-minute introductory class",
      "Outline and record the first version of the paid course",
      "Launch the e-book (Booming after the Burn) as a journey upsell",
      "Enroll a small pilot group and collect feedback",
      "Begin posting on Facebook, Instagram, and LinkedIn",
      "Goal: At least 1 paying customer confirms the model works",
    ],
  },
  {
    months: "Months 4–6",
    goal: "Refine",
    goalColor: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badgeBg: "bg-orange-100 text-orange-800",
    isCurrent: false,
    activities: [
      "Improve the course using pilot group feedback",
      "Automate course purchase and delivery",
      "Establish a consistent social media posting schedule",
      "Develop a consistent brand identity and messaging",
      "Build out the email follow-up sequence for leads",
    ],
  },
  {
    months: "Months 7–9",
    goal: "Grow",
    goalColor: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    badgeBg: "bg-green-100 text-green-800",
    isCurrent: false,
    activities: [
      "Increase pricing if demand supports it",
      "Strengthen referral systems among existing students",
      "Test recurring low-touch product (monthly Group Q&A)",
      "Begin tracking which platform drives the most engagement",
    ],
  },
  {
    months: "Months 10–12",
    goal: "Evaluate",
    goalColor: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badgeBg: "bg-blue-100 text-blue-800",
    isCurrent: false,
    activities: [
      "Review revenue, technology/systems, and workload",
      "Assess customer demand and retention",
      "Decide what should be expanded, added, or removed",
      "Determine whether to invest in a larger learning platform",
    ],
  },
];

export default function RoadmapSection() {
  return (
    <section className="mb-8">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <Map className="tymflo-purple mr-3" size={24} />
            12-Month Roadmap
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Four phases that build on each other. Focus on completing Phase 1 before investing
            in more technology or additional products.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`${phase.bg} border-2 ${phase.border} rounded-xl p-5 relative ${
                  phase.isCurrent ? "ring-2 ring-offset-2 ring-purple-400" : ""
                }`}
              >
                {phase.isCurrent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-tymflo-purple text-white text-xs whitespace-nowrap">
                      ← You Are Here
                    </Badge>
                  </div>
                )}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide font-heading">
                    {phase.months}
                  </p>
                  <h3 className={`text-xl font-bold font-heading ${phase.goalColor}`}>
                    {phase.goal}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {phase.activities.map((activity, ai) => (
                    <li key={ai} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                        phase.isCurrent ? "bg-red-500" : "bg-gray-400"
                      }`} />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle2, Circle } from "lucide-react";

const priorities = [
  {
    step: 1,
    title: "Create the Free Guide",
    description:
      "Outline the 10 most important things someone needs to know to start a Home Help agency. Write it as a 1-page FAQ document.",
    status: "DO FIRST",
    statusColor: "bg-red-100 text-red-800",
    done: false,
  },
  {
    step: 2,
    title: "Create the Introductory Class",
    description:
      "Outline 5–10 important items that expand the information from the free guide into a 20-minute recorded class.",
    status: "UP NEXT",
    statusColor: "bg-orange-100 text-orange-800",
    done: false,
  },
  {
    step: 3,
    title: "Build the First Version of the Paid Course",
    description:
      "Outline 6–8 topics about what you wish you had known before starting a Home Help agency. Each topic becomes a short video and a blog post.",
    status: "PLANNED",
    statusColor: "bg-blue-100 text-blue-800",
    done: false,
  },
  {
    step: 4,
    title: "Enroll a Small Pilot Group",
    description:
      "Reach out to people who signed up for the freebie. Offer exclusive early access to course material. Collect Google reviews, testimonials, and feedback.",
    status: "PLANNED",
    statusColor: "bg-blue-100 text-blue-800",
    done: false,
  },
  {
    step: 5,
    title: "Introduce Recurring Community Access",
    description:
      "After the pilot is validated, open the monthly Group Q&A to new members at a raised price. Demand is proven when at least 5 new clients enter the journey each month.",
    status: "FUTURE",
    statusColor: "bg-gray-100 text-gray-600",
    done: false,
  },
];

export default function PrioritySection() {
  return (
    <section className="mb-8">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center font-heading">
              <Zap className="tymflo-tangerine mr-3" size={24} />
              What Needs to Happen Next
            </h2>
            <Badge className="bg-tymflo-purple text-white font-heading">
              Phase 1: Validate
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            You don't have to build every part at once. Follow these steps in order. Document
            and post on social media as you build to grow a following before launch.
          </p>

          <div className="space-y-4">
            {priorities.map((item) => (
              <div
                key={item.step}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                  item.step === 1
                    ? "bg-red-50 border-red-200"
                    : item.step === 2
                    ? "bg-orange-50 border-orange-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {item.done ? (
                    <CheckCircle2 className="text-green-500" size={22} />
                  ) : (
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                        item.step === 1
                          ? "bg-red-500"
                          : item.step === 2
                          ? "bg-orange-400"
                          : "bg-gray-400"
                      }`}
                    >
                      {item.step}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 font-heading text-sm">
                      {item.title}
                    </h3>
                    <Badge className={item.statusColor}>{item.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-tymflo-purple-light rounded-lg border border-purple-200">
            <p className="text-sm tymflo-purple font-medium">
              💡 The first goal is to find out if people will pay for structured Home Help education — not to maximize revenue. One paying customer during Phase 1 confirms the model works.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

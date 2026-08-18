import { Card, CardContent } from "@/components/ui/card";
import { User, Target, AlertCircle, Search, ShoppingBag } from "lucide-react";

export default function PersonaSection() {
  return (
    <section className="mb-8">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <User className="tymflo-purple mr-3" size={24} />
            Customer Persona
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Understanding your customer helps you speak directly to her situation — so she recognizes Home Help agency ownership as an answer before you ask her to buy anything.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Persona header */}
            <div className="lg:col-span-1">
              <div className="bg-tymflo-purple rounded-xl p-6 text-white h-full flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <User size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading">Andrea</h3>
                  <p className="text-purple-200 text-sm">Age 38 • Metro Detroit</p>
                </div>
                <div className="mt-6 space-y-2 text-sm">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold text-purple-100">Registered Nurse</p>
                    <p className="text-purple-200 text-xs">8 years in healthcare</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold text-purple-100">Experiencing burnout</p>
                    <p className="text-purple-200 text-xs">Long shifts, weekends, physical demands</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="font-semibold text-purple-100">Interested in business ownership</p>
                    <p className="text-purple-200 text-xs">Wants to use her experience differently</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-4">
              {/* Goals */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3 font-heading">
                  <Target size={16} />
                  Goals & Aspirations
                </h4>
                <ul className="space-y-1.5">
                  {[
                    "Transition away from bedside care",
                    "Have greater control over her schedule",
                    "Travel more",
                    "Create an additional source of income",
                    "Eventually build a business that doesn't depend entirely on her doing the work herself",
                  ].map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-green-800">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pains */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-3 font-heading">
                  <AlertCircle size={16} />
                  Pains & Challenges
                </h4>
                <ul className="space-y-1.5">
                  {[
                    "Works long shifts and weekends",
                    "Currently experiencing burnout",
                    "Has never owned a business",
                    "Does not know where to begin",
                    "Has limited time to research new opportunities",
                    "Does not want to leave one demanding job and create another one full of administrative work",
                  ].map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-800">
                      <span className="text-red-400 mt-0.5">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Information Needs */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-3 font-heading">
                  <Search size={16} />
                  What She's Searching For
                </h4>
                <div className="space-y-2">
                  {[
                    "What businesses can I start with my healthcare experience?",
                    "How can I leave bedside nursing but still work in healthcare?",
                    "What businesses can nurses start?",
                    "How can I start a healthcare business in Michigan?",
                  ].map((q, i) => (
                    <div key={i} className="bg-white rounded-lg px-3 py-2 text-sm text-blue-800 border border-blue-100 italic">
                      "{q}"
                    </div>
                  ))}
                </div>
              </div>

              {/* Buyer thinking */}
              <div className="bg-tymflo-tangerine-light border border-orange-200 rounded-xl p-4">
                <h4 className="font-semibold text-orange-800 flex items-center gap-2 mb-2 font-heading">
                  <ShoppingBag size={16} />
                  Buyer Thinking
                </h4>
                <p className="text-sm text-orange-800">
                  Andrea is <strong>not</strong> initially looking for a course. She is looking for a realistic
                  transition from the work she is doing now — one that doesn't take a lot of time or energy.
                  Dayna's content must first help Andrea <em>recognize</em> Home Help agency ownership as an
                  opportunity before asking her to purchase education about how to start one.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

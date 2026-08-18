import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";

const products = [
  {
    name: "Free Guide",
    launchPrice: "$0",
    targetPrice: "$0",
    monthlySales: "Lead generation",
    potential: "—",
    rowBg: "bg-gray-50",
  },
  {
    name: "Introductory Class",
    launchPrice: "$0",
    targetPrice: "$0",
    monthlySales: "Lead generation",
    potential: "—",
    rowBg: "bg-white",
  },
  {
    name: "Home Help Agency Course",
    launchPrice: "$129",
    targetPrice: "$199",
    monthlySales: "~10 customers",
    potential: "$1,290",
    rowBg: "bg-green-50",
    highlight: true,
  },
  {
    name: "Monthly Group Q&A",
    launchPrice: "$14/mo",
    targetPrice: "$79/mo",
    monthlySales: "~5 members",
    potential: "$70",
    rowBg: "bg-blue-50",
  },
];

export default function RevenueSection() {
  return (
    <section className="mb-8">
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center mb-2 font-heading">
            <DollarSign className="tymflo-purple mr-3" size={24} />
            Revenue Opportunity
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Starting revenue estimates for the pilot phase. The goal is not to maximize revenue early — it is to confirm
            the model works. These numbers are examples for planning, not projections.
          </p>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tymflo-purple text-white">
                  <th className="text-left px-4 py-3 font-heading font-semibold">Product</th>
                  <th className="text-center px-4 py-3 font-heading font-semibold">Launch Price</th>
                  <th className="text-center px-4 py-3 font-heading font-semibold">Target Price</th>
                  <th className="text-center px-4 py-3 font-heading font-semibold">Monthly Sales</th>
                  <th className="text-right px-4 py-3 font-heading font-semibold">Potential Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((p, i) => (
                  <tr key={i} className={p.rowBg}>
                    <td className={`px-4 py-3 font-medium text-gray-900 ${p.highlight ? "font-semibold" : ""}`}>
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-center text-green-700 font-semibold">{p.launchPrice}</td>
                    <td className="px-4 py-3 text-center tymflo-purple font-semibold">{p.targetPrice}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{p.monthlySales}</td>
                    <td className={`px-4 py-3 text-right font-bold ${p.potential !== "—" ? "text-green-700" : "text-gray-400"}`}>
                      {p.potential}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-tymflo-purple-light border-t-2 border-purple-300">
                  <td colSpan={4} className="px-4 py-3 font-bold tymflo-purple font-heading text-right">
                    Pilot Phase Monthly Potential
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-xl tymflo-purple font-heading">
                    $1,360
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Key validation questions */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 font-heading mb-3 flex items-center gap-2">
              <TrendingUp size={18} className="tymflo-tangerine" />
              What to Test During the Pilot
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Will people sign up for the free guide?",
                "Will people attend the free introductory class?",
                "Will people pay $129 for the full course?",
                "Which platform drives the most engagement?",
                "What questions repeatedly come up after the course?",
                "What support do customers want after completing the course?",
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="flex-shrink-0 w-5 h-5 bg-tymflo-tangerine text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-700">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

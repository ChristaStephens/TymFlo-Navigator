import tymfloLogo from "@assets/Tymflo-horizontal-crlPng_1755805562259.png";
import { Sparkles } from "lucide-react";

export default function DaynaHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <img src={tymfloLogo} alt="TymFlo Logo" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-heading">
                Dayna Foster — Business Development & Growth Roadmap
              </h1>
              <p className="text-sm text-gray-600">
                Home Help Agency Ownership Education • TymFlo Strategy
              </p>
            </div>
          </div>
          <div className="text-right flex items-center space-x-3">
            <Sparkles className="tymflo-tangerine" size={20} />
            <div>
              <div className="text-lg font-semibold tymflo-purple font-heading italic">
                "Less Work. More Flo."
              </div>
              <div className="text-xs text-gray-500">Last Updated: August 2026</div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden py-4 space-y-3">
          <div className="flex items-center justify-between">
            <img src={tymfloLogo} alt="TymFlo Logo" className="h-8" />
            <div className="flex items-center space-x-1">
              <Sparkles className="tymflo-tangerine" size={14} />
              <span className="text-xs tymflo-purple font-heading italic">"Less Work. More Flo."</span>
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 font-heading leading-tight">
              Dayna Foster — Business Development & Growth Roadmap
            </h1>
            <p className="text-xs text-gray-500 mt-1">Home Help Agency Ownership Education</p>
          </div>
        </div>
      </div>
    </header>
  );
}

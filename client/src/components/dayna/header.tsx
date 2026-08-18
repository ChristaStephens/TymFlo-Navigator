import tymfloLogo from "@assets/Tymflo-horizontal-crlPng_1755805562259.png";

export default function DaynaHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between py-4">
          {/* Logo + tagline stacked on left */}
          <div className="flex-shrink-0">
            <img src={tymfloLogo} alt="TymFlo Logo" className="h-12" />
            <p className="text-xs tymflo-purple font-heading italic mt-0.5 pl-0.5">
              "Less Work. More Flo."
            </p>
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0 px-6">
            <h1 className="text-xl font-bold text-gray-900 font-heading leading-snug">
              Business Development &amp; Growth Roadmap
              <span className="text-gray-500 font-normal">: Dayna Foster</span>
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Home Help Agency Ownership Education &bull; TymFlo Navigator™
            </p>
          </div>

          {/* Date badge */}
          <div className="flex-shrink-0 text-xs text-gray-400 text-right">
            <div className="font-medium">Last Updated</div>
            <div>August 2026</div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden py-3">
          <div className="flex items-end justify-between mb-2">
            <div>
              <img src={tymfloLogo} alt="TymFlo Logo" className="h-8" />
              <p className="text-[10px] tymflo-purple font-heading italic mt-0.5 pl-0.5">
                "Less Work. More Flo."
              </p>
            </div>
            <span className="text-[10px] text-gray-400 pb-0.5">Aug 2026</span>
          </div>
          <h1 className="text-sm font-bold text-gray-900 font-heading leading-tight">
            Business Development &amp; Growth Roadmap
            <span className="text-gray-500 font-normal">: Dayna Foster</span>
          </h1>
          <p className="text-[11px] text-gray-500 mt-0.5">Home Help Agency Ownership Education &bull; TymFlo Navigator™</p>
        </div>
      </div>
    </header>
  );
}

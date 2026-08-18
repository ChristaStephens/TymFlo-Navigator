import tymfloLogo from "@assets/Tymflo-horizontal-crlPng_1755805562259.png";

export default function DaynaFooter() {
  return (
    <footer className="bg-tymflo-purple text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={tymfloLogo} alt="TymFlo Logo" className="h-10" />
            <div>
              <div className="font-heading font-semibold">Business Development & Growth Strategy</div>
              <div className="text-sm text-gray-200">Home Help Agency Ownership Education</div>
              <div className="text-xs text-tymflo-tangerine italic mt-1">"Less Work. More Flo."</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-200">Dashboard developed by TymFlo Team</div>
            <div className="text-xs text-gray-300">Last Updated: August 2026</div>
            <div className="text-xs text-tymflo-tangerine">hello@TymFlo.com • www.TymFlo.com</div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-center">
            <img src={tymfloLogo} alt="TymFlo Logo" className="h-8" />
          </div>
          <div className="text-center">
            <div className="font-heading font-semibold text-sm">Business Development & Growth Strategy</div>
            <div className="text-xs text-gray-200 mt-1">Home Help Agency Ownership Education</div>
            <div className="text-xs text-tymflo-tangerine italic mt-2">"Less Work. More Flo."</div>
          </div>
          <div className="text-center border-t border-purple-400 pt-4">
            <div className="text-xs text-gray-200">Dashboard developed by TymFlo Team</div>
            <div className="text-xs text-gray-300 mt-1">Last Updated: August 2026</div>
            <div className="text-xs text-tymflo-tangerine mt-1">hello@TymFlo.com • www.TymFlo.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

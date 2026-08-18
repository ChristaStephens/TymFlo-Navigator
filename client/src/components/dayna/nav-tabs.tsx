import { Home, Map, GraduationCap, Users, BarChart2, FolderOpen } from "lucide-react";

export type TabId = "home" | "plan" | "products" | "customers" | "results" | "resources";

const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "plan", label: "Plan", Icon: Map },
  { id: "products", label: "Products", Icon: GraduationCap },
  { id: "customers", label: "Customers", Icon: Users },
  { id: "results", label: "Results", Icon: BarChart2 },
  { id: "resources", label: "Resources", Icon: FolderOpen },
];

interface NavTabsProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export default function NavTabs({ active, onChange }: NavTabsProps) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide -mb-px">
          {TABS.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => onChange(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium font-heading border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-tymflo-purple tymflo-purple bg-tymflo-purple-light/40"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

import { useState } from "react";
import DaynaHeader from "@/components/dayna/header";
import DaynaFooter from "@/components/dayna/footer";
import NavTabs, { TabId } from "@/components/dayna/nav-tabs";
import HomeTab from "@/components/dayna/home-tab";
import PlanTab from "@/components/dayna/plan-tab";
import ProductsTab from "@/components/dayna/products-tab";
import CustomersTab from "@/components/dayna/customers-tab";
import ResultsTab from "@/components/dayna/results-tab";
import ResourcesTab from "@/components/dayna/resources-tab";
import { useDashboardState } from "@/hooks/useDashboardState";

export default function DaynaDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const {
    state,
    setTaskStatus,
    setTaskDueDate,
    setTaskNotes,
    setTaskAssetLink,
    toggleSubtask,
    setMetric,
    setRevenuePlanner,
    setHoursThisWeek,
    setLearningField,
    addNote,
    deleteNote,
    setProductLink,
  } = useDashboardState();

  return (
    <div className="min-h-screen bg-tymflo-gray flex flex-col">
      <DaynaHeader />
      <NavTabs active={activeTab} onChange={setActiveTab} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "home" && (
          <HomeTab state={state} onNavigate={(tab) => setActiveTab(tab as TabId)} />
        )}
        {activeTab === "plan" && (
          <PlanTab
            state={state}
            setTaskStatus={setTaskStatus}
            setTaskDueDate={setTaskDueDate}
            setTaskNotes={setTaskNotes}
            setTaskAssetLink={setTaskAssetLink}
            toggleSubtask={toggleSubtask}
          />
        )}
        {activeTab === "products" && (
          <ProductsTab state={state} setProductLink={setProductLink} />
        )}
        {activeTab === "customers" && <CustomersTab state={state} />}
        {activeTab === "results" && (
          <ResultsTab
            state={state}
            setMetric={setMetric}
            setRevenuePlanner={setRevenuePlanner}
            setHoursThisWeek={setHoursThisWeek}
          />
        )}
        {activeTab === "resources" && (
          <ResourcesTab
            state={state}
            setLearningField={setLearningField}
            addNote={addNote}
            deleteNote={deleteNote}
          />
        )}
      </main>

      <DaynaFooter />
    </div>
  );
}

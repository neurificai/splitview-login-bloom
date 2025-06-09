
import React from "react";
import { cn } from "@/lib/utils";

interface TabStatus {
  estimate: boolean;
  design: boolean;
  print: boolean;
  install: boolean;
  invoice: boolean;
}

interface TabNavigationProps {
  activeTab: string;
  tabStatus: TabStatus;
  onTabClick: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  tabStatus,
  onTabClick
}) => {
  // Define sky blue color for completed tabs
  const completedTabColor = "bg-[#8DE3FD]";

  return (
    <div className="relative flex mb-4 gap-2">
      {/* Estimate Tab */}
      <div
        className={cn(
          "flex-1 py-3 px-4 text-center rounded-sm font-medium transition-all duration-300",
          activeTab === "estimate" ? "bg-[#33C3F0] text-white" :
            tabStatus.estimate ? completedTabColor + " text-white" : "bg-gray-200 text-gray-600",
          "hover:brightness-105"
        )}
        data-state={activeTab === "estimate" ? "active" : tabStatus.estimate ? "completed" : "inactive"}
        onClick={() => onTabClick("estimate")}
      >
        Estimates
      </div>

      {/* Design Tab */}
      <div
        className={cn(
          "flex-1 py-3 px-4 text-center rounded-sm font-medium transition-all duration-300",
          activeTab === "design" ? "bg-[#33C3F0] text-white" :
            tabStatus.design ? completedTabColor + " text-white" : "bg-gray-200 text-gray-600",
          "hover:brightness-105"
        )}
        data-state={activeTab === "design" ? "active" : tabStatus.design ? "completed" : "inactive"}
        onClick={() => onTabClick("design")}
      >
        Designs
      </div>

      {/* Print Tab */}
      {/* <div 
        className={cn(
          "flex-1 py-3 px-4 text-center relative arrow-tab font-medium transition-all duration-300",
          activeTab === "print" ? "bg-[#33C3F0] text-white" : 
          tabStatus.print ? completedTabColor + " text-white" : "bg-gray-200 text-gray-600",
          "hover:brightness-105"
        )}
        data-state={activeTab === "print" ? "active" : tabStatus.print ? "completed" : "inactive"}
        onClick={() => onTabClick("print")}
      >
        Print
      </div> */}

      {/* Install Tab */}
      <div
        className={cn(
          "flex-1 py-3 px-4 text-center rounded-sm font-medium transition-all duration-300",
          activeTab === "install" ? "bg-[#33C3F0] text-white" :
            tabStatus.install ? completedTabColor + " text-white" : "bg-gray-200 text-gray-600",
          "hover:brightness-105"
        )}
        data-state={activeTab === "install" ? "active" : tabStatus.install ? "completed" : "inactive"}
        onClick={() => onTabClick("install")}
      >
        Unit Details
      </div>

      {/* Invoice Tab */}
      <div
        className={cn(
          "flex-1 py-3 px-4 text-center rounded-sm font-medium transition-all duration-300",
          activeTab === "invoice" ? "bg-[#33C3F0] text-white" :
            tabStatus.invoice ? completedTabColor + " text-white" : "bg-gray-200 text-gray-600",
          "hover:brightness-105"
        )}
        data-state={activeTab === "invoice" ? "active" : tabStatus.invoice ? "completed" : "inactive"}
        onClick={() => onTabClick("invoice")}
      >
        Invoices
      </div>
    </div>
  );
};

export default TabNavigation;

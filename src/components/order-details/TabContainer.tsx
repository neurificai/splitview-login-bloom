
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TabContainerProps {
  mainTab: string;
  children: {
    estimate: React.ReactNode;
    design: React.ReactNode;
    detail: React.ReactNode;
    invoice: React.ReactNode;
  };
  colorScheme: {
    estimate: string;
    design: string;
    detail: string;
    invoice: string;
  };
}

const TabContainer: React.FC<TabContainerProps> = ({ mainTab, children, colorScheme }) => {
  const [activeSubTab, setActiveSubTab] = useState<string>("detail");

  const handleSubTabChange = (subTab: string) => {
    setActiveSubTab(subTab);
  };

  // Define the active color for the underline
  const activeColor = "bg-[#33C3F0]";

  return (
    <div className="mb-4 w-full">
      <div className="inline-flex h-9 items-center justify-center rounded-lg p-1 text-muted-foreground mb-3 w-full sm:w-auto gap-6 border-b">
        <button
          onClick={() => handleSubTabChange("estimate")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium transition-colors relative text-gray-700",
          )}
        >
          Estimates
          {activeSubTab === "estimate" && (
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5", activeColor)}></span>
          )}
        </button>
        <button
          onClick={() => handleSubTabChange("design")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium transition-colors relative text-gray-700",
          )}
        >
          Designs
          {activeSubTab === "design" && (
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5", activeColor)}></span>
          )}
        </button>
        <button
          onClick={() => handleSubTabChange("detail")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium transition-colors relative text-gray-700",
          )}
        >
          Unit Details
          {activeSubTab === "detail" && (
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5", activeColor)}></span>
          )}
        </button>
        <button
          onClick={() => handleSubTabChange("invoice")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium transition-colors relative text-gray-700",
          )}
        >
          Invoices
          {activeSubTab === "invoice" && (
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5", activeColor)}></span>
          )}
        </button>
      </div>

      <div className="mt-3">
        {children[activeSubTab as keyof typeof children]}
      </div>
    </div>
  );
};

export default TabContainer;

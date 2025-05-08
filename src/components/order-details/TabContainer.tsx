
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TabContainerProps {
  mainTab: string;
  children: {
    activity: React.ReactNode;
    collaborate: React.ReactNode;
    detail: React.ReactNode;
  };
  colorScheme: {
    activity: string;
    collaborate: string;
    detail: string;
  };
}

const TabContainer: React.FC<TabContainerProps> = ({ mainTab, children, colorScheme }) => {
  const [activeSubTab, setActiveSubTab] = useState<string>("activity");
  
  const handleSubTabChange = (subTab: string) => {
    setActiveSubTab(subTab);
  };
  
  // Get the active color for the underline based on the main tab
  const getActiveColor = () => {
    switch(mainTab) {
      case "estimate": return "border-[#33C3F0]";
      case "design": return "border-[#33C3F0]";
      case "print": return "border-[#33C3F0]";
      case "install": return "border-[#33C3F0]";
      case "invoice": return "border-[#33C3F0]";
      default: return "border-[#33C3F0]";
    }
  };
  
  const activeColor = getActiveColor();
  
  return (
    <div className="mb-6">
      <div className="inline-flex h-10 items-center justify-center rounded-lg p-1 text-muted-foreground mb-4 w-full sm:w-auto gap-8 border-b">
        <button 
          onClick={() => handleSubTabChange("activity")}
          className={cn(
            "px-5 py-2 text-sm font-medium transition-colors relative",
            activeSubTab === "activity" 
              ? "text-[#33C3F0]" 
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          Activity
          {activeSubTab === "activity" && (
            <span className={cn("absolute bottom-0 left-0 w-full h-0.5", activeColor, "-mb-[9px]")}></span>
          )}
        </button>
        <button 
          onClick={() => handleSubTabChange("collaborate")}
          className={cn(
            "px-5 py-2 text-sm font-medium transition-colors relative",
            activeSubTab === "collaborate" 
              ? "text-[#33C3F0]" 
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          Collaborate
          {activeSubTab === "collaborate" && (
            <span className={cn("absolute bottom-0 left-0 w-full h-0.5", activeColor, "-mb-[9px]")}></span>
          )}
        </button>
        <button 
          onClick={() => handleSubTabChange("detail")}
          className={cn(
            "px-5 py-2 text-sm font-medium transition-colors relative",
            activeSubTab === "detail" 
              ? "text-[#33C3F0]" 
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          Detail
          {activeSubTab === "detail" && (
            <span className={cn("absolute bottom-0 left-0 w-full h-0.5", activeColor, "-mb-[9px]")}></span>
          )}
        </button>
      </div>
      
      <div className="mt-4">
        {children[activeSubTab as keyof typeof children]}
      </div>
    </div>
  );
};

export default TabContainer;

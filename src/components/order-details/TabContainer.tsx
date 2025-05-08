
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
  
  // Define the active color for the underline
  const activeColor = "bg-[#33C3F0]";
  
  return (
    <div className="mb-6 w-[70%]">
      <div className="inline-flex h-10 items-center justify-center rounded-lg p-1 text-muted-foreground mb-4 w-full sm:w-auto gap-8 border-b">
        <button 
          onClick={() => handleSubTabChange("activity")}
          className={cn(
            "px-5 py-2 text-sm font-medium transition-colors relative text-gray-700",
          )}
        >
          Activity
          {activeSubTab === "activity" && (
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5", activeColor)}></span>
          )}
        </button>
        <button 
          onClick={() => handleSubTabChange("collaborate")}
          className={cn(
            "px-5 py-2 text-sm font-medium transition-colors relative text-gray-700",
          )}
        >
          Collaborate
          {activeSubTab === "collaborate" && (
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5", activeColor)}></span>
          )}
        </button>
        <button 
          onClick={() => handleSubTabChange("detail")}
          className={cn(
            "px-5 py-2 text-sm font-medium transition-colors relative text-gray-700",
          )}
        >
          Detail
          {activeSubTab === "detail" && (
            <span className={cn("absolute inset-x-0 bottom-0 h-0.5", activeColor)}></span>
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

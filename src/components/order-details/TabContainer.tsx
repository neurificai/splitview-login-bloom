
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
  
  return (
    <div className="mb-6">
      <div className="inline-flex h-10 items-center justify-center rounded-lg bg-white border p-1 text-muted-foreground mb-4 w-full sm:w-auto gap-3">
        <button 
          onClick={() => handleSubTabChange("activity")}
          className={cn(
            "px-5 py-2 text-sm font-medium rounded-md transition-colors",
            activeSubTab === "activity" 
              ? `${colorScheme.activity} text-gray-800 shadow-sm` 
              : "bg-blue-50 text-gray-600 hover:bg-blue-100"
          )}
        >
          Activity
        </button>
        <button 
          onClick={() => handleSubTabChange("collaborate")}
          className={cn(
            "px-5 py-2 text-sm font-medium rounded-md transition-colors",
            activeSubTab === "collaborate" 
              ? `${colorScheme.collaborate} text-gray-800 shadow-sm` 
              : "bg-blue-50 text-gray-600 hover:bg-blue-100"
          )}
        >
          Collaborate
        </button>
        <button 
          onClick={() => handleSubTabChange("detail")}
          className={cn(
            "px-5 py-2 text-sm font-medium rounded-md transition-colors",
            activeSubTab === "detail" 
              ? `${colorScheme.detail} text-gray-800 shadow-sm` 
              : "bg-blue-50 text-gray-600 hover:bg-blue-100"
          )}
        >
          Detail
        </button>
      </div>
      
      <div className="mt-4">
        {children[activeSubTab as keyof typeof children]}
      </div>
    </div>
  );
};

export default TabContainer;

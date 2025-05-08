
import React, { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-white border p-1 text-muted-foreground mb-4 w-full sm:w-auto">
        <TabsTrigger 
          value="activity" 
          onClick={() => handleSubTabChange("activity")}
          className={activeSubTab === "activity" ? `${colorScheme.activity} text-gray-800` : ""}
          data-state={activeSubTab === "activity" ? "active" : ""}
        >
          Activity
        </TabsTrigger>
        <TabsTrigger 
          value="collaborate" 
          onClick={() => handleSubTabChange("collaborate")}
          className={activeSubTab === "collaborate" ? `${colorScheme.collaborate} text-gray-800` : ""}
          data-state={activeSubTab === "collaborate" ? "active" : ""}
        >
          Collaborate
        </TabsTrigger>
        <TabsTrigger 
          value="detail" 
          onClick={() => handleSubTabChange("detail")}
          className={activeSubTab === "detail" ? `${colorScheme.detail} text-gray-800` : ""}
          data-state={activeSubTab === "detail" ? "active" : ""}
        >
          Detail
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-4">
        {children[activeSubTab as keyof typeof children]}
      </div>
    </div>
  );
};

export default TabContainer;


import React from "react";
import { cn } from "@/lib/utils";

interface DateDisplayProps {
  date: string;
  statusClass: string;
  statusLabel: string;
  icon: React.ReactNode;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date, statusClass, statusLabel, icon }) => {
  return (
    <div className="flex items-center">
      {icon}
      <span className={cn("text-sm font-medium", statusClass)}>
        {date}
      </span>
      {statusLabel && (
        <span className={cn("ml-2 px-2 py-0.5 text-xs rounded-full shadow-sm",
          statusLabel === "Today" ? "bg-blue-50 text-blue-700" :
            statusLabel === "Soon" ? "bg-indigo-50 text-indigo-700" :
              "bg-gray-50 text-gray-600"
        )}>
          {statusLabel}
        </span>
      )}
    </div>
  );
};

export default DateDisplay;

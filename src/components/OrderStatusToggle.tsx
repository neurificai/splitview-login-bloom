
import React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderStatusToggleProps {
  viewStatus: string;
  setViewStatus: (value: string) => void;
}

const OrderStatusToggle: React.FC<OrderStatusToggleProps> = ({
  viewStatus,
  setViewStatus
}) => {
  console.log(viewStatus);
  return (
    <div className="mb-5 mt-6">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={() => setViewStatus("in-progress")}
          className={cn(
            "h-9 rounded-full transition-all duration-200",
            viewStatus === "in-progress"
              ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-blue-600"
          )}
        >
          <span className="px-1">In-Progress</span>
        </Button>

        <Button
          type="button"
          onClick={() => setViewStatus("completed")}
          className={cn(
            "h-9 rounded-full transition-all duration-200",
            viewStatus == "completed"
              ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
              : "bg-green-50/40 text-green-600/80 border border-green-200/60 hover:bg-green-100 hover:text-green-600"
          )}
        >
          <Check
            size={16}
            className="mr-1 shrink-0"
            strokeWidth={2.5}
            color={viewStatus === "completed" ? "#22c55e" : "#34d399"}
          />
          <span className="sm:inline">Completed</span>
        </Button>

        <Button
          type="button"
          onClick={() => setViewStatus("cancelled")}
          className={cn(
            "h-9 rounded-full transition-all duration-200",
            viewStatus === "cancelled"
              ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
              : "bg-amber-50/40 text-amber-600/80 border border-amber-200/60 hover:bg-amber-100 hover:text-amber-600"
          )}
        >
          <X
            size={16}
            className="mr-1 shrink-0"
            strokeWidth={2.5}
            color={viewStatus === "cancelled" ? "#F97316" : "#fdba74"}
          />
          <span className="sm:inline">Cancelled</span>
        </Button>

        <Button
          type="button"
          onClick={() => setViewStatus("all")}
          className={cn(
            "h-9 rounded-full transition-all duration-200",
            viewStatus === "all"
              ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
              : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-blue-600"
          )}
        >
          <span className="px-1">All Orders</span>
        </Button>

      </div>
    </div>
  );
};

export default OrderStatusToggle;

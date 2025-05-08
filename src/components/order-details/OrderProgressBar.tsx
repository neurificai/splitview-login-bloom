
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Order } from "@/services/orderService";

interface OrderProgressBarProps {
  order: Order;
}

const OrderProgressBar: React.FC<OrderProgressBarProps> = ({ order }) => {
  // Calculate which steps have been completed based on the percentage
  const isDesignComplete = order.Job_Status_Pct >= 30;
  const isPrintComplete = order.Job_Status_Pct >= 60;
  const isInstallComplete = order.Job_Status_Pct >= 80;
  const isOrderComplete = order.Job_Status_Pct === 100;

  return (
    <Card className="p-6 mb-6 bg-white">
      <h3 className="text-lg font-medium mb-4">Order Progress</h3>
      <div className="mb-4 w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Overall Completion</span>
          <span className="text-sm font-medium text-green-600">{order.Job_Status_Pct}%</span>
        </div>
        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full w-full relative">
            <div 
              className="h-full bg-green-500 rounded-full absolute left-0 transition-all duration-500 ease-out"
              style={{ width: `${order.Job_Status_Pct}%` }}
              aria-valuenow={order.Job_Status_Pct}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            ></div>
          </div>
        </div>
        
        {/* Progress steps - new design with clear boundary segments */}
        <div className="flex mt-6 w-full">
          <div 
            className="text-center py-2 px-4 border-r-2 border-gray-200 bg-green-500 text-white"
            style={{ flex: 1 }}
          >
            Estimate
          </div>
          
          <div 
            className={`text-center py-2 px-4 border-r-2 border-gray-200 ${isDesignComplete ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            style={{ flex: 1 }}
          >
            Design
          </div>
          
          <div 
            className={`text-center py-2 px-4 border-r-2 border-gray-200 ${isPrintComplete ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            style={{ flex: 1 }}
          >
            Print
          </div>
          
          <div 
            className={`text-center py-2 px-4 border-r-2 border-gray-200 ${isInstallComplete ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            style={{ flex: 1 }}
          >
            Install
          </div>
          
          <div 
            className={`text-center py-2 px-4 ${isOrderComplete ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
            style={{ flex: 1 }}
          >
            Closed
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderProgressBar;

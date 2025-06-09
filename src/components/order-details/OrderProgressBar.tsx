
import React from "react";
import { Card } from "@/components/ui/card";
import type { Order } from "@/services/orderService";

interface OrderProgressBarProps {
  order: Order;
}

const OrderProgressBar: React.FC<OrderProgressBarProps> = ({ order }) => {
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

        {/* Progress steps */}
        <div className="flex justify-between mt-4">
          <div className="flex flex-col items-center w-1/5">
            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs mt-1 text-center">Estimate</span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            {order.Job_Status_Pct >= 30 ? (
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">2</span>
              </div>
            )}
            <span className="text-xs mt-1 text-center">Design</span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            {order.Job_Status_Pct >= 60 ? (
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">3</span>
              </div>
            )}
            <span className="text-xs mt-1 text-center">Print</span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            {order.Job_Status_Pct >= 80 ? (
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">4</span>
              </div>
            )}
            <span className="text-xs mt-1 text-center">Install</span>
          </div>

          <div className="flex flex-col items-center w-1/5">
            {order.Job_Status_Pct === 100 ? (
              <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs text-gray-500">5</span>
              </div>
            )}
            <span className="text-xs mt-1 text-center">Closed</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderProgressBar;

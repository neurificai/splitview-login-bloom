
import React from "react";
import { Order } from "@/services/orderService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDate, calculateDueDate } from "@/services/orderService";
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-white shadow-sm">
        <p className="text-gray-500">No orders found matching your criteria.</p>
      </div>
    );
  }

  const toggleNotes = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const dueDate = calculateDueDate(order.Order_Date);
        const formattedOrderDate = formatDate(order.Order_Date);
        const formattedDueDate = dueDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const isExpanded = expandedOrder === order.AV_SO;

        return (
          <div
            key={order.AV_SO}
            className={cn(
              "bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-200",
              "hover:shadow-md hover:border-gray-200"
            )}
          >
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold">#{order.AV_SO}</h3>
                    <Badge
                      className="bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 border-0"
                    >
                      {order.Job_Type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{order.Order_Title}</p>
                </div>
              </div>

              {/* Progress Bar - Horizontal, 90% width, now green and thinner */}
              <div className="mb-4 w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-sm font-medium text-green-600">{order.Job_Status_Pct}%</span>
                </div>
                <div className="w-[90%] mx-auto">
                  <div className="h-1 bg-[#E0E4EA] rounded-full w-full relative">
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
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Unit / VIN</div>
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">{order.Unit_No}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[120px]">{order.VIN_No}</div>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Assigned to</div>
                  <div className="text-sm font-medium">{order.AE_Name} / {order.PM_Name}</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Job Request</div>
                  <div className="text-sm font-medium">{order.Job_Request}</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Timeline</div>
                  <div className="text-sm">
                    {formattedOrderDate} → {formattedDueDate}
                  </div>
                </div>
              </div>

              {/* Installation & Notes */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">Frame:</span>
                    {order.Frame_Installation ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-gray-300" />
                    )}
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">Vinyl:</span>
                    {order.Vinyl_Installation ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-gray-300" />
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#007AFF]"
                  onClick={() => toggleNotes(order.AV_SO)}
                  aria-expanded={isExpanded}
                >
                  <span>Notes</span>
                  {isExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </Button>
              </div>

              {/* Expandable Notes Section */}
              {isExpanded && (
                <div className="mt-4 p-4 bg-[#F5F7FA] rounded-lg text-sm animate-fade-in">
                  <p>{order.Customer_Notes}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;

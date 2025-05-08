
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, calculateDueDate } from "@/services/orderService";
import type { Order } from "@/services/orderService";

interface OrderDetailsHeaderProps {
  order: Order;
}

const OrderDetailsHeader: React.FC<OrderDetailsHeaderProps> = ({ order }) => {
  const dueDate = calculateDueDate(order.Order_Date);
  const formattedOrderDate = formatDate(order.Order_Date);
  const formattedDueDate = dueDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <Link to="/orders">
          <Button variant="ghost" size="sm" className="mb-2">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">#{order.AV_SO}</h1>
          <Badge 
            className="bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 border-0"
          >
            {order.Job_Type}
          </Badge>
        </div>
        <h2 className="text-lg text-gray-600 mt-1">{order.Order_Title}</h2>
      </div>
      
      <div className="text-right">
        <div className="text-sm text-gray-500 mb-1">Order Timeline</div>
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-gray-400" />
          <span className="text-sm">
            {formattedOrderDate} → {formattedDueDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsHeader;

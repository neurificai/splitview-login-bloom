
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CheckCircle, XCircle } from "lucide-react";
import { calculateDueDate, formatDate, Order } from "@/services/orderService";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation for progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(order.Job_Status_Pct);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [order.Job_Status_Pct]);

  // Calculate due date (15 days from order date)
  const dueDate = calculateDueDate(order.Order_Date);
  const formattedOrderDate = formatDate(order.Order_Date);
  const formattedDueDate = dueDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Calculate days between order and due date
  const daysDifference = 15; // Hardcoded to 15 as per specs
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200 rounded-2xl",
        isHovered 
          ? "shadow-lg transform -translate-y-1" 
          : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-base font-semibold">
              #{order.AV_SO}
            </h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {order.Order_Title}
            </p>
          </div>
          
          <Badge 
            className="ml-2 bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white"
          >
            {order.Job_Type}
          </Badge>
        </div>
        
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-semibold text-[#007AFF]">{order.Job_Status_Pct}%</span>
          </div>
          
          <Progress 
            value={progress} 
            className="h-2 bg-[#E0E4EA]" 
            aria-valuenow={order.Job_Status_Pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
          
          <div className="text-xs text-gray-500 mt-2">
            Ordered {formattedOrderDate} • Due {formattedDueDate} ({daysDifference} days)
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500">Unit No</div>
            <div className="text-sm font-medium">{order.Unit_No}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">VIN No</div>
            <div className="text-sm font-medium truncate">{order.VIN_No}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">AE / PM</div>
            <div className="text-sm font-medium">{order.AE_Name} / {order.PM_Name}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500">Job Request</div>
            <div className="text-sm font-medium">{order.Job_Request}</div>
          </div>
        </div>
        
        {/* Installation Info */}
        <div className="flex justify-between mb-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="text-xs text-gray-500 mr-2">Frame:</div>
            {order.Frame_Installation ? (
              <CheckCircle size={16} className="text-green-500" />
            ) : (
              <XCircle size={16} className="text-gray-300" />
            )}
          </div>
          
          <div className="flex items-center">
            <div className="text-xs text-gray-500 mr-2">Vinyl:</div>
            {order.Vinyl_Installation ? (
              <CheckCircle size={16} className="text-green-500" />
            ) : (
              <XCircle size={16} className="text-gray-300" />
            )}
          </div>
        </div>
        
        {/* Customer Notes */}
        <div>
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full justify-between text-[#007AFF]"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            <span>View Notes</span>
            {expanded ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </Button>
          
          {expanded && (
            <div className="mt-2 p-3 bg-[#F5F7FA] rounded-lg text-sm animate-fade-in">
              <p>{order.Customer_Notes}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;

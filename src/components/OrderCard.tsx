
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: {
    avsoId: string;
    orderTitle: string;
    jobStatus: string;
    orderDate: string;
    aeName: string;
    pmName: string;
    jobType: string;
  };
  index: number;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, index }) => {
  const [expanded, setExpanded] = React.useState(false);
  
  // Simulate completion percentage based on job status
  const completionPercentage = order.jobStatus === "In Progress" ? 45 : 75;
  
  // Calculate expected completion date (15 days from order date)
  const orderDate = new Date(order.orderDate);
  const expectedCompletion = new Date(orderDate);
  expectedCompletion.setDate(orderDate.getDate() + 15);
  
  const formattedExpectedDate = expectedCompletion.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <Card className="mb-4 border-none shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">
              Order {index + 1} 
              <span className="text-sm font-normal text-muted-foreground ml-2">
                {order.avsoId}
              </span>
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              <span>Agent: {order.aeName}</span>
              <span className="mx-2">•</span>
              <span>Task: {order.jobType}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium">
                Expected Completion
              </div>
              <div className="text-sm text-muted-foreground">
                {formattedExpectedDate}
              </div>
              <div className="text-xs text-muted-foreground">
                15 Days
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">Complete</div>
          <div className="text-xl font-bold text-primary">{completionPercentage}%</div>
        </div>
        
        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((step) => {
              const isActive = (step / 5) * 100 <= completionPercentage;
              return (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs",
                      isActive 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 text-gray-400"
                    )}
                  >
                    {step}
                  </div>
                  <div className={cn(
                    "h-0.5 w-6 mt-1", 
                    isActive ? "bg-primary" : "bg-gray-100"
                  )}></div>
                </div>
              );
            })}
          </div>
          
          <Button
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
            className="text-xs"
          >
            {expanded ? (
              <>Minimize <ChevronUp className="ml-1 h-3 w-3" /></>
            ) : (
              <>Expand <ChevronDown className="ml-1 h-3 w-3" /></>
            )}
          </Button>
        </div>
        
        {expanded && (
          <div className="pt-4 border-t mt-4 space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium">Order Title</div>
                <div className="text-muted-foreground">{order.orderTitle}</div>
              </div>
              <div>
                <div className="font-medium">Project Manager</div>
                <div className="text-muted-foreground">{order.pmName}</div>
              </div>
              <div>
                <div className="font-medium">Order Date</div>
                <div className="text-muted-foreground">{order.orderDate}</div>
              </div>
              <div>
                <div className="font-medium">Status</div>
                <div>
                  <span 
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                      order.jobStatus === "In Progress" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-green-100 text-green-800"
                    )}
                  >
                    {order.jobStatus}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pt-2">
              <h4 className="font-medium mb-2">Recommendations</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-black rounded-full mt-1.5 mr-2"></div>
                    <span>22% increase in home listing is what you like to view?</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="h-7 px-3">Yes</Button>
                    <Button variant="outline" size="sm" className="h-7 px-3">No</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;

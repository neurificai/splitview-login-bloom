
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SubOrder } from "@/components/SubOrdersList"; // We'll update this import later
import ShippingSection from "./ShippingSection";
import InstallationSection from "./InstallationSection";

interface SubOrderCardProps {
  subOrder: SubOrder;
  index: number;
}

const SubOrderCard: React.FC<SubOrderCardProps> = ({ subOrder, index }) => {
  const isEven = index % 2 === 0;

  return (
    <Card
      key={subOrder.id}
      className="overflow-hidden border-0 relative transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        boxShadow: "0 6px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)",
        transform: `perspective(1200px) rotateX(${isEven ? '0.8deg' : '-0.8deg'})`,
        borderRadius: "16px",
        transformStyle: "preserve-3d"
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: isEven
            ? 'linear-gradient(to bottom, rgba(248,250,252,0.8) 0%, rgba(239,246,255,0.5) 100%)'
            : 'linear-gradient(to bottom, rgba(249,250,251,0.8) 0%, rgba(238,242,255,0.5) 100%)',
          borderLeft: isEven
            ? '4px solid rgba(59, 130, 246, 0.3)'
            : '4px solid rgba(99, 102, 241, 0.3)',
          borderRadius: "16px",
          transform: "translateZ(-1px)"
        }}
      />
      <CardContent className="p-0 relative z-10">
        <div className="p-6">
          {/* Header with badges and status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="bg-blue-50/80 text-blue-700 hover:bg-blue-100 border-blue-200/50 shadow-sm">
                Vehicle: {subOrder.vehicleNumber}
              </Badge>
              {/* <Badge variant="outline" className="bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 border-indigo-200/50 shadow-sm">
                Unit: {subOrder.unitNumber}
              </Badge> */}
            </div>

            {/* <Badge 
              className={cn(
                "text-sm font-medium px-3 py-1 shadow-sm",
                subOrder.installStatus === 'Completed' ? 'bg-green-50/80 text-green-700 border-green-200/50' : 
                subOrder.installStatus === 'In Transit' ? 'bg-amber-50/80 text-amber-700 border-amber-200/50' : 
                'bg-blue-50/80 text-blue-700 border-blue-200/50'
              )}
            >
              {subOrder.installStatus}
            </Badge> */}
          </div>

          {/* Main content with shipping and installation details */}
          <div className="space-y-6">
            <ShippingSection
              shippingAddress={subOrder.shippingAddress}
              shippingDate={subOrder.shippingDate}
              trackingNumber={subOrder.trackingNumber}
            />

            <InstallationSection
              installAddress={subOrder.installAddress}
              installationDate={subOrder.installationDate}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubOrderCard;


import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ActivityItem } from "@/services/orderService";
import EstimateTab from "./order-details/tabs/EstimateTab";
import DesignTab from "./order-details/tabs/DesignTab";
import PrintTab from "./order-details/tabs/PrintTab";
import InstallTab from "./order-details/tabs/InstallTab";
import InvoiceTab from "./order-details/tabs/InvoiceTab";
import { cn } from "@/lib/utils";

interface OrderDetailsTabsProps {
  activities: ActivityItem[];
  shippingAddresses?: string[];
  vehicleDetails?: {
    model?: string;
    year?: string;
    availabilityDate?: string;
  };
  installLocations?: string[];
  approvedDesigns?: string[];
  invoices?: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending";
  }[];
}

const OrderDetailsTabs: React.FC<OrderDetailsTabsProps> = ({
  activities,
  shippingAddresses,
  vehicleDetails,
  installLocations,
  approvedDesigns,
  invoices
}) => {
  // Add state to control the active tab
  const [activeTab, setActiveTab] = useState<string>("estimate");
  
  // Determine progress stage based on activities
  const getTabStatus = () => {
    const stages = {
      estimate: false,
      design: false,
      print: false,
      install: false,
      invoice: false
    };
    
    // Check for activities that indicate completion of each stage
    const estimateCompleted = activities.some(a => a.type === "estimate" && a.title === "Estimate Signed");
    const designCompleted = activities.some(a => a.type === "design" && a.title.includes("Approved"));
    const printCompleted = activities.some(a => a.type === "print" && a.title.includes("Shipped"));
    const installCompleted = activities.some(a => a.type === "install" && a.title.includes("Completed"));
    const invoiceCompleted = activities.some(a => a.type === "invoice" && a.title.includes("Paid"));
    
    // Set status based on completion
    stages.estimate = estimateCompleted;
    stages.design = estimateCompleted && designCompleted;
    stages.print = estimateCompleted && designCompleted && printCompleted;
    stages.install = estimateCompleted && designCompleted && printCompleted && installCompleted;
    stages.invoice = estimateCompleted && designCompleted && printCompleted && installCompleted && invoiceCompleted;
    
    return stages;
  };
  
  const tabStatus = getTabStatus();

  // Handle tab selection
  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="relative flex mb-10 gap-2">
        {/* Arrow-shaped tabs with improved styling */}
        <div 
          className={cn(
            "flex-1 py-3 px-4 text-center relative arrow-tab first-tab font-medium transition-all duration-300",
            activeTab === "estimate" ? "bg-[#33C3F0] text-white" : 
            tabStatus.estimate ? "bg-[#8DE3FD] text-white" : "bg-gray-200 text-gray-600",
            "hover:brightness-105"
          )}
          data-state={activeTab === "estimate" ? "active" : tabStatus.estimate ? "completed" : "inactive"}
          onClick={() => handleTabClick("estimate")}
        >
          Estimate
        </div>
        <div 
          className={cn(
            "flex-1 py-3 px-4 text-center relative arrow-tab font-medium transition-all duration-300",
            activeTab === "design" ? "bg-[#33C3F0] text-white" : 
            tabStatus.design ? "bg-[#8DE3FD] text-white" : "bg-gray-200 text-gray-600",
            "hover:brightness-105"
          )}
          data-state={activeTab === "design" ? "active" : tabStatus.design ? "completed" : "inactive"}
          onClick={() => handleTabClick("design")}
        >
          Design
        </div>
        <div 
          className={cn(
            "flex-1 py-3 px-4 text-center relative arrow-tab font-medium transition-all duration-300",
            activeTab === "print" ? "bg-[#33C3F0] text-white" : 
            tabStatus.print ? "bg-[#8DE3FD] text-white" : "bg-gray-200 text-gray-600",
            "hover:brightness-105"
          )}
          data-state={activeTab === "print" ? "active" : tabStatus.print ? "completed" : "inactive"}
          onClick={() => handleTabClick("print")}
        >
          Print
        </div>
        <div 
          className={cn(
            "flex-1 py-3 px-4 text-center relative arrow-tab font-medium transition-all duration-300",
            activeTab === "install" ? "bg-[#33C3F0] text-white" : 
            tabStatus.install ? "bg-[#8DE3FD] text-white" : "bg-gray-200 text-gray-600",
            "hover:brightness-105"
          )}
          data-state={activeTab === "install" ? "active" : tabStatus.install ? "completed" : "inactive"}
          onClick={() => handleTabClick("install")}
        >
          Install
        </div>
        <div 
          className={cn(
            "flex-1 py-3 px-4 text-center relative arrow-tab last-tab font-medium transition-all duration-300",
            activeTab === "invoice" ? "bg-[#33C3F0] text-white" : 
            tabStatus.invoice ? "bg-[#8DE3FD] text-white" : "bg-gray-200 text-gray-600",
            "hover:brightness-105"
          )}
          data-state={activeTab === "invoice" ? "active" : tabStatus.invoice ? "completed" : "inactive"}
          onClick={() => handleTabClick("invoice")}
        >
          Invoice
        </div>
      </div>
      
      {/* Hidden actual tabs for functionality */}
      <TabsList className="hidden">
        <TabsTrigger value="estimate">Estimate</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
        <TabsTrigger value="print">Print</TabsTrigger>
        <TabsTrigger value="install">Install</TabsTrigger>
        <TabsTrigger value="invoice">Invoice</TabsTrigger>
      </TabsList>
      
      {/* ESTIMATE TAB */}
      <TabsContent value="estimate">
        <EstimateTab activities={activities} />
      </TabsContent>
      
      {/* DESIGN TAB */}
      <TabsContent value="design">
        <DesignTab 
          activities={activities}
          approvedDesigns={approvedDesigns}
        />
      </TabsContent>
      
      {/* PRINT TAB */}
      <TabsContent value="print">
        <PrintTab 
          activities={activities}
          shippingAddresses={shippingAddresses}
        />
      </TabsContent>
      
      {/* INSTALL TAB */}
      <TabsContent value="install">
        <InstallTab 
          activities={activities}
          vehicleDetails={vehicleDetails}
          installLocations={installLocations}
        />
      </TabsContent>
      
      {/* INVOICE TAB */}
      <TabsContent value="invoice">
        <InvoiceTab 
          activities={activities}
          invoices={invoices}
        />
      </TabsContent>
    </Tabs>
  );
};

export default OrderDetailsTabs;

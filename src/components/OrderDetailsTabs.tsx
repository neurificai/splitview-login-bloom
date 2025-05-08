
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
      <div className="relative flex mb-8">
        {/* Arrow-shaped tabs */}
        <div 
          className={cn(
            "flex-1 py-2 px-3 text-center relative arrow-tab first-tab",
            tabStatus.estimate ? "bg-[#33C3F0] text-white" : "bg-gray-200 text-gray-600"
          )}
          data-state={tabStatus.estimate ? "active" : "inactive"}
          onClick={() => handleTabClick("estimate")}
        >
          Estimate
        </div>
        <div 
          className={cn(
            "flex-1 py-2 px-3 text-center relative arrow-tab",
            tabStatus.design ? "bg-[#33C3F0] text-white" : "bg-gray-200 text-gray-600"
          )}
          data-state={tabStatus.design ? "active" : "inactive"}
          onClick={() => handleTabClick("design")}
        >
          Design
        </div>
        <div 
          className={cn(
            "flex-1 py-2 px-3 text-center relative arrow-tab",
            tabStatus.print ? "bg-[#33C3F0] text-white" : "bg-gray-200 text-gray-600"
          )}
          data-state={tabStatus.print ? "active" : "inactive"}
          onClick={() => handleTabClick("print")}
        >
          Print
        </div>
        <div 
          className={cn(
            "flex-1 py-2 px-3 text-center relative arrow-tab",
            tabStatus.install ? "bg-[#33C3F0] text-white" : "bg-gray-200 text-gray-600"
          )}
          data-state={tabStatus.install ? "active" : "inactive"}
          onClick={() => handleTabClick("install")}
        >
          Install
        </div>
        <div 
          className={cn(
            "flex-1 py-2 px-3 text-center relative arrow-tab last-tab",
            tabStatus.invoice ? "bg-[#33C3F0] text-white" : "bg-gray-200 text-gray-600"
          )}
          data-state={tabStatus.invoice ? "active" : "inactive"}
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


import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityItem } from "@/services/orderService";
import TabNavigation from "./order-details/TabNavigation";
import TabContent from "./order-details/TabContent";
import { useTabStatus } from "@/hooks/useTabStatus";

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
  sidebarContent?: React.ReactNode;
}

const OrderDetailsTabs: React.FC<OrderDetailsTabsProps> = ({
  activities,
  shippingAddresses,
  vehicleDetails,
  installLocations,
  approvedDesigns,
  invoices,
  sidebarContent
}) => {
  // Add state to control the active tab
  const [activeTab, setActiveTab] = useState<string>("estimate");
  
  // Use the new hook to get tab status
  const tabStatus = useTabStatus(activities);

  // Handle tab selection
  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Custom tab navigation */}
      <TabNavigation 
        activeTab={activeTab}
        tabStatus={tabStatus}
        onTabClick={handleTabClick}
      />
      
      {/* Hidden actual tabs for functionality */}
      <TabsList className="hidden">
        <TabsTrigger value="estimate">Estimate</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
        <TabsTrigger value="print">Print</TabsTrigger>
        <TabsTrigger value="install">Install</TabsTrigger>
        <TabsTrigger value="invoice">Invoice</TabsTrigger>
      </TabsList>
      
      {/* Tab content component */}
      <TabContent
        activeTab={activeTab}
        activities={activities}
        shippingAddresses={shippingAddresses}
        vehicleDetails={vehicleDetails}
        installLocations={installLocations}
        approvedDesigns={approvedDesigns}
        invoices={invoices}
        sidebarContent={sidebarContent}
      />
    </Tabs>
  );
};

export default OrderDetailsTabs;

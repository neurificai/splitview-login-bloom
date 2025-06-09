
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabContent from "./order-details/TabContent";
import { useTabStatus } from "@/hooks/useTabStatus";

interface OrderDetailsTabsProps {
  shippingAddresses?: string[];
  vehicleDetails?: any[];
  installLocations?: string[];
  approvedDesigns?: string[];
  estimates?: any[];
  designs?: string[];
  invoices?: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending";
  }[];
  sidebarContent?: React.ReactNode;
  order: any;
}

const OrderDetailsTabs: React.FC<OrderDetailsTabsProps> = ({
  order,
  estimates,
  designs,
  vehicleDetails,
  invoices,
}) => {
  const [activeTab, setActiveTab] = useState<string>("estimate");

  // Use the new hook to get tab status
  const tabStatus = useTabStatus(estimates);

  // Handle tab selection
  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

      {/* Hidden actual tabs for functionality */}
      <TabsList className="hidden">
        <TabsTrigger value="estimate">Estimates</TabsTrigger>
        <TabsTrigger value="design">Designs</TabsTrigger>
        <TabsTrigger value="unitDetail">Unit Details</TabsTrigger>
        <TabsTrigger value="invoice">Invoices</TabsTrigger>
      </TabsList>

      {/* Tab content component */}
      <TabContent
        activeTab={activeTab}
        order={order}
        estimates={estimates}
        designs={designs}
        vehicleDetails={vehicleDetails}
        invoices={invoices}
      />

    </Tabs>
  );
};

export default OrderDetailsTabs;

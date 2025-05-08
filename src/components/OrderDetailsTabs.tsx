
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ActivityItem } from "@/services/orderService";
import EstimateTab from "./order-details/tabs/EstimateTab";
import DesignTab from "./order-details/tabs/DesignTab";
import PrintTab from "./order-details/tabs/PrintTab";
import InstallTab from "./order-details/tabs/InstallTab";
import InvoiceTab from "./order-details/tabs/InvoiceTab";

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
  return (
    <Tabs defaultValue="estimate" className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
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

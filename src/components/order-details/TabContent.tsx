
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ActivityItem } from "@/services/orderService";
import EstimateTab from "./tabs/EstimateTab";
import DesignTab from "./tabs/DesignTab";
import PrintTab from "./tabs/PrintTab";
import InstallTab from "./tabs/InstallTab";
import InvoiceTab from "./tabs/InvoiceTab";

interface TabContentProps {
  activeTab: string;
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

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  activities,
  shippingAddresses,
  vehicleDetails,
  installLocations,
  approvedDesigns,
  invoices,
  sidebarContent
}) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <TabsContent value="estimate">
          <EstimateTab activities={activities} />
        </TabsContent>
        
        <TabsContent value="design">
          <DesignTab 
            activities={activities}
            approvedDesigns={approvedDesigns}
          />
        </TabsContent>
        
        <TabsContent value="print">
          <PrintTab 
            activities={activities}
            shippingAddresses={shippingAddresses}
          />
        </TabsContent>
        
        <TabsContent value="install">
          <InstallTab 
            activities={activities}
            vehicleDetails={vehicleDetails}
            installLocations={installLocations}
          />
        </TabsContent>
        
        <TabsContent value="invoice">
          <InvoiceTab 
            activities={activities}
            invoices={invoices}
          />
        </TabsContent>
      </div>
      
      {/* Sidebar with contacts and shortcuts */}
      {sidebarContent && (
        <div className="w-64 shrink-0 mt-[39px]">
          {sidebarContent}
        </div>
      )}
    </div>
  );
};

export default TabContent;

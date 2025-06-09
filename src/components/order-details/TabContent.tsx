
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
// import { ActivityItem } from "@/services/orderService";
// import EstimateTab from "./tabs/EstimateTab";
// import DesignTab from "./tabs/DesignTab";
// import PrintTab from "./tabs/PrintTab";
// import InstallTab from "./tabs/InstallTab";
// import InvoiceTab from "./tabs/InvoiceTab";
import OrderTab from "../../components/order-details/OrderTab";

interface TabContentProps {
  activeTab: string;
  shippingAddresses?: string[];
  estimates?: any[];
  designs?: string[];
  vehicleDetails?: any[];
  installLocations?: string[];
  approvedDesigns?: string[];
  invoices?: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending";
  }[];
  sidebarContent?: React.ReactNode;
  order: any;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  order,
  estimates,
  designs,
  vehicleDetails,
  invoices
}) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <TabsContent value="estimate">
          {/* <EstimateTab estimates={estimates} /> */}
          <OrderTab order={order} estimates={estimates} designs={designs} vehicleDetails={vehicleDetails} invoices={invoices} />
        </TabsContent>

        {/* <TabsContent value="design">
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
        </TabsContent> */}
      </div>

      {/* Sidebar with contacts and shortcuts - adjusted margin top */}
      {/* {sidebarContent && (
        <div className="w-64 shrink-0 mt-[48px]">
          {sidebarContent}
        </div>
      )} */}
    </div>
  );
};

export default TabContent;
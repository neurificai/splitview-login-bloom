
import React from "react";
import { ActivityItem } from "@/services/orderService";
import { FileText, Truck, MapPin } from "lucide-react";
import ActivityTimeline from "../ActivityTimeline";
import TabContainer from "../TabContainer";

interface PrintTabProps {
  activities: ActivityItem[];
  shippingAddresses?: string[];
}

const PrintTab: React.FC<PrintTabProps> = ({ activities, shippingAddresses }) => {
  const printActivities = activities.filter(a => a.type === "print");
  
  const colorScheme = {
    activity: "bg-[#FEF7CD]",
    collaborate: "bg-[#FEF7CD]",
    detail: "bg-[#FEF7CD]",
  };
  
  const activityContent = (
    <ActivityTimeline activities={printActivities} title="Activity" />
  );
  
  const collaborateContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Truck size={18} className="text-blue-500" />
        Shipping Addresses
      </h3>
      
      {shippingAddresses && shippingAddresses.length > 0 ? (
        <div className="space-y-3">
          {shippingAddresses.map((address, idx) => (
            <div key={idx} className="text-sm p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-gray-500 mt-0.5" />
                <div>{address}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No shipping addresses provided.</p>
      )}
    </div>
  );
  
  const detailContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <FileText size={18} className="text-blue-500" />
        Print Details
      </h3>
      
      <p className="text-sm text-gray-500 mb-2">Materials and specifications:</p>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="font-medium">Material:</div>
        <div>High-quality vinyl</div>
        
        <div className="font-medium">Finish:</div>
        <div>Matte</div>
        
        <div className="font-medium">Quantity:</div>
        <div>{(shippingAddresses?.length || 1) * 5} pieces</div>
      </div>
    </div>
  );
  
  return (
    <TabContainer
      mainTab="print"
      colorScheme={colorScheme}
      children={{
        activity: activityContent,
        collaborate: collaborateContent,
        detail: detailContent,
      }}
    />
  );
};

export default PrintTab;

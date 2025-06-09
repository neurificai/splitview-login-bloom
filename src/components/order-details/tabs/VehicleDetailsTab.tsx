
import React from "react";
// import SubOrderCard from "../../suborder/SubOrderCard";
import VehicleDetailsCard from "../tabs/VehicleDetailsCard";
import { FileText } from "lucide-react";

// Interface for suborder data
export interface SubOrder {
  id: string;
  vehicleNumber: string;
  unitNumber: string;
  shippingAddress: string;
  shippingDate: string;
  trackingNumber: string;
  installAddress: string;
  installationDate: string;
  installStatus: string;
  imageUrl?: string;
}

interface SubOrdersListProps {
  vehicleDetails: any[];
  order: any;
}

const VehicleDetailsTab: React.FC<SubOrdersListProps> = ({ vehicleDetails, order }) => {
  console.log('srdtfyguygd');
  console.log(vehicleDetails);
  return (
    <>
      {vehicleDetails && vehicleDetails.length > 0 ? (
        <div className="space-y-6">
          {vehicleDetails.map((vehicleItem, index) => (
            <VehicleDetailsCard
              key={vehicleItem.id}
              vehicleItem={vehicleItem}
              index={index}
              order={order}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <FileText size={18} className="text-blue-500" />
              Unit Details
            </h3>
            <p className="text-sm text-gray-500">No unit details available.</p>
          </div>
        </>
      )}
    </>
  );
};

export default VehicleDetailsTab;

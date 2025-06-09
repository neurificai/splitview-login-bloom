
import React from "react";
import SubOrderCard from "./suborder/SubOrderCard";

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
  subOrders: SubOrder[];
}

const SubOrdersList: React.FC<SubOrdersListProps> = ({ subOrders }) => {
  return (
    <div className="space-y-6">
      {subOrders.map((subOrder, index) => (
        <SubOrderCard
          key={subOrder.id}
          subOrder={subOrder}
          index={index}
        />
      ))}
    </div>
  );
};

export default SubOrdersList;

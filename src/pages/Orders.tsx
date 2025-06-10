
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import SimpleOrderList from "@/components/SimpleOrderList";

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <SimpleOrderList />
      </div>
    </DashboardLayout>
  );
};

export default Orders;

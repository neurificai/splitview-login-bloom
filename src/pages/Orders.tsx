
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrderStatusToggle from "@/components/OrderStatusToggle";
import SimpleOrderList from "@/components/SimpleOrderList";
import { useOrdersFiltering } from "@/hooks/useOrdersFiltering";

const Orders = () => {
  const {
    viewStatus,
    setViewStatus,
  } = useOrdersFiltering();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <OrderStatusToggle
            viewStatus={viewStatus}
            setViewStatus={setViewStatus}
          />
        </div>

        <SimpleOrderList />
      </div>
    </DashboardLayout>
  );
};

export default Orders;


import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrdersToolbar from "@/components/OrdersToolbar";
import OrdersList from "@/components/OrdersList";
import { orders, FilterOption, ViewMode } from "@/services/orderService";
import { useOrdersFiltering } from "@/hooks/useOrdersFiltering";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [filterOption, setFilterOption] = useState<FilterOption>("all");

  const { uniqueOrders } = useOrdersFiltering({
    orders,
    searchQuery,
    filterOption,
  });

  return (
    <DashboardLayout title="Orders Dashboard">
      <div className="mb-6">
        <OrdersToolbar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        <OrdersList orders={uniqueOrders} />
      </div>
    </DashboardLayout>
  );
};

export default Orders;

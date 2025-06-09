
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrdersToolbar from "@/components/OrdersToolbar";
import OrdersList from "@/components/OrdersList";
import { orders, FilterOption } from "@/services/orderService";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState<FilterOption>("all");
  const [filterJobType, setFilterJobType] = useState<string>("all");
  const [filterAEName, setFilterAEName] = useState<string>("all");

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter((order) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      order.AV_SO.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.Order_Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.AE_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.PM_Name.toLowerCase().includes(searchQuery.toLowerCase());

    // Job type filter
    const matchesJobType =
      filterJobType === "all" ||
      order.Job_Type === filterJobType;

    // AE Name filter
    const matchesAEName =
      filterAEName === "all" ||
      order.AE_Name === filterAEName;

    // Status filter
    const matchesStatus =
      filterOption === "all" ||
      (filterOption === "inProgress" && order.Job_Status_Pct < 100) ||
      (filterOption === "completed" && order.Job_Status_Pct === 100);

    return matchesSearch && matchesJobType && matchesAEName && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        {/* <OrdersToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterOption={filterOption}
          setFilterOption={setFilterOption}
          filterJobType={filterJobType}
          setFilterJobType={setFilterJobType}
          filterAEName={filterAEName}
          setFilterAEName={setFilterAEName}
          jobTypes={[...new Set(orders.map(order => order.Job_Type))]}
          aeNames={[...new Set(orders.map(order => order.AE_Name))]}
        />
        <OrdersList orders={filteredOrders} /> */}
    
        <OrdersList />
      </div>
    </DashboardLayout>
  );
};

export default Orders;

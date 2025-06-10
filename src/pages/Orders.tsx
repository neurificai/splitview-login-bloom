
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import OrdersToolbar from "@/components/OrdersToolbar";
import OrderStatusToggle from "@/components/OrderStatusToggle";
import SimpleOrderList from "@/components/SimpleOrderList";
import { useOrdersFiltering } from "@/hooks/useOrdersFiltering";

const Orders = () => {
  const {
    searchQuery,
    setSearchQuery,
    filterOption,
    setFilterOption,
    filterJobType,
    setFilterJobType,
    filterAEName,
    setFilterAEName,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    viewStatus,
    setViewStatus,
    filteredOrders,
    jobTypes,
    aeNames
  } = useOrdersFiltering();

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <OrdersToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            filterJobType={filterJobType}
            setFilterJobType={setFilterJobType}
            filterAEName={filterAEName}
            setFilterAEName={setFilterAEName}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            jobTypes={jobTypes}
            aeNames={aeNames}
          />

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

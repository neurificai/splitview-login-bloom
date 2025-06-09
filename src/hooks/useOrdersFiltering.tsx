
import { useState, useMemo } from "react";
import { orders, FilterOption, Order } from "@/services/orderService";

export const useOrdersFiltering = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState<FilterOption>("all");
  const [filterJobType, setFilterJobType] = useState<string>("all");
  const [filterAEName, setFilterAEName] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [viewStatus, setViewStatus] = useState<string>("all");

  // Extract unique job types and AE names
  const jobTypes = useMemo(() => {
    return [...new Set(orders.map(order => order.Job_Type))];
  }, []);

  const aeNames = useMemo(() => {
    return [...new Set(orders.map(order => order.AE_Name))];
  }, []);

  // Function to check if an order is within the date range
  const isWithinDateRange = (order: Order) => {
    if (!startDate && !endDate) return true;

    const orderDate = new Date(order.Order_Date);

    if (startDate && endDate) {
      // Set end date to end of day
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      return orderDate >= startDate && orderDate <= endOfDay;
    }

    if (startDate && !endDate) {
      return orderDate >= startDate;
    }

    if (!startDate && endDate) {
      // Set end date to end of day
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      return orderDate <= endOfDay;
    }

    return true;
  };

  // Filter orders based on search query and filters
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
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

      // Date range filter
      const matchesDateRange = isWithinDateRange(order);

      // Status filter from toolbar
      const matchesToolbarStatus =
        filterOption === "all" ||
        (filterOption === "inProgress" && order.Job_Status_Pct < 100) ||
        (filterOption === "completed" && order.Job_Status_Pct === 100);

      // View Status filter from toggle
      const matchesViewStatus =
        viewStatus === "all" ||
        (viewStatus === "completed" && order.Job_Status_Pct === 100) ||
        (viewStatus === "cancelled" && order.Job_Status_Pct === 0);

      return matchesSearch && matchesJobType && matchesAEName && matchesToolbarStatus && matchesDateRange && matchesViewStatus;
    });
  }, [searchQuery, filterJobType, filterAEName, filterOption, viewStatus, startDate, endDate]);

  return {
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
  };
};

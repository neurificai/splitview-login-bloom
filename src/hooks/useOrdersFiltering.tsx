
import { useMemo } from "react";
import { FilterOption, Order } from "@/services/orderService";

interface UseOrdersFilteringProps {
  orders: Order[];
  searchQuery: string;
  filterOption: FilterOption;
}

export const useOrdersFiltering = ({
  orders,
  searchQuery,
  filterOption,
}: UseOrdersFilteringProps) => {
  // Filter orders based on search query and filter option
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        searchQuery === "" ||
        order.AV_SO.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.Order_Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.AE_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.PM_Name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterOption === "all" ||
        (filterOption === "inProgress" && order.Job_Status_Pct < 100) ||
        (filterOption === "completed" && order.Job_Status_Pct === 100);

      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, filterOption]);

  // Create a set of unique orders
  const uniqueOrders = useMemo(() => {
    return filteredOrders;
  }, [filteredOrders]);

  return { filteredOrders, uniqueOrders };
};

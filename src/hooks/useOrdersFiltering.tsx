
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
        order.avsoId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.aeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.pmName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filterOption === "all" ||
        (filterOption === "inProgress" && order.jobStatus === "In Progress") ||
        (filterOption === "completed" && order.jobStatus === "Completed");

      return matchesSearch && matchesFilter;
    });
  }, [orders, searchQuery, filterOption]);

  // Filter unique orders by removing child orders with the same base ID
  const uniqueOrders = useMemo(() => {
    const baseIds = new Set();
    return filteredOrders.filter(order => {
      const baseId = order.avsoId.split('-')[0];
      if (!baseIds.has(baseId)) {
        baseIds.add(baseId);
        return true;
      }
      return false;
    });
  }, [filteredOrders]);

  return { filteredOrders, uniqueOrders };
};

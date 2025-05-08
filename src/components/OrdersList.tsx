
import React from "react";
import { Order } from "@/services/orderService";
import OrderCard from "@/components/OrderCard";

interface OrdersListProps {
  orders: Order[];
  viewMode: "card" | "table";
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, viewMode }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-white">
        <p className="text-gray-500">No orders found matching your criteria.</p>
      </div>
    );
  }

  if (viewMode === "table") {
    // Table view implementation (placeholder for now)
    return (
      <div className="bg-white rounded-lg p-4">
        <p className="text-center text-gray-500">Table view coming soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {orders.map((order) => (
        <OrderCard key={order.AV_SO} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;

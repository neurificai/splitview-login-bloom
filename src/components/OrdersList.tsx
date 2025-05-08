
import React from "react";
import { Order } from "@/services/orderService";
import OrderCard from "@/components/OrderCard";

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {orders.map((order, index) => (
        <OrderCard key={order.avsoId} order={order} index={index} />
      ))}
    </div>
  );
};

export default OrdersList;

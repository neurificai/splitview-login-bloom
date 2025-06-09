
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderProgress from "../order-details/OrderProgress";

interface OrdersHeaderProps {
    order: any;
}

const OrdersHeader: React.FC<OrdersHeaderProps> = ({ order }) => {
    return (
        <div className="items-start justify-between mb-6">
            <div>
                <Link to="/orders">
                    <Button variant="ghost" size="sm" className="mb-2 text-blue-500 hover:text-blue-700">
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back to Orders
                    </Button>
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">#{order.order_number}</h1>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                    {order.customer}
                    {order.end_customer && order.end_customer != order.customer && ` | ${order.end_customer}`}
                    {` | Qty: ${order.display_qty}`}
                </p>
                <OrderProgress order={order} />
            </div>

        </div>
    );
};

export default OrdersHeader;

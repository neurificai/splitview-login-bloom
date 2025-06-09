
import React from "react";
import { useEffect, useState } from 'react';
import { Order } from "@/services/orderService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDate, calculateDueDate } from "@/services/orderService";
import { ChevronDown, ChevronUp, CheckCircle, XCircle, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { getOrderList } from "../services/netSuiteOrderService";
import OrderProgress from "../components/order-details/OrderProgress";

interface OrdersListProps {
  orders: Order[];
}

//Set Orders data state
// const [orders, setOrders] = useState(null);

const OrdersList: React.FC = () => {
  const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const handleRowClick = (orderId: string, event: React.MouseEvent) => {
    // Prevent navigation if the click was on the action button
    if ((event.target as HTMLElement).closest('a')) {
      return;
    }
    navigate(`/order/${orderId}`);
  };

  //Set User data state
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  //Set Orders data state
  const [orders, setOrders] = useState(null);

  //get and set localStorage user data
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrderList({ poc_id: user.poc_id, company_id: user.company_id });
        //const result = await getOrderList({poc_id:123416, company_id:1844});
        if (result) {
          setOrders(result.nsdata);
        }
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
    };
    fetchData();
  }, []);

  const orderCount = orders ? orders.data.total_count : 0;
  console.log(orders);

  if (orderCount === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-white shadow-sm">
        <p className="text-gray-500">No orders found matching your criteria.</p>
      </div>
    );
  }

  const toggleNotes = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="space-y-4">
      {orders.data.records.map((order) => {
        const dueDate = calculateDueDate(order.order_date);
        const formattedOrderDate = formatDate(order.order_date);
        const formattedDueDate = dueDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const isExpanded = expandedOrder === order.order_number;

        return (
          <div
            key={order.order_number}
            className={cn(
              "bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-200",
              "hover:shadow-md hover:border-gray-200"
            )}
          >
            <div className="p-4 sm:p-6">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                {/* Left Side - Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold">#{order.order_number}</h3>
                    {/* <Badge
                      className="bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 border-0"
                    >
                      {order.project}
                    </Badge> */}
                  </div>
                  {/* <p className="text-sm text-gray-600 mt-1">{order.order_title}</p> */}
                  <p className="text-sm text-gray-600 mt-1">
                    {order.customer}
                    {order.end_customer && order.end_customer != order.customer && ` | ${order.end_customer}`}
                    {` | Qty: ${order.display_qty}`}
                  </p>
                </div>

                {/* Right Side - Order Details Link */}
                <div className="flex items-start">
                  {/* <Link to={`/order/${order.order_number}`}> */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#007AFF]"
                    onClick={(e) => handleRowClick(order.so_id, e)}
                  >
                    <span>Order Details</span>
                    <ZoomIn size={16} />
                  </Button>
                  {/* </Link> */}
                </div>
              </div>

              {/* Progress Bar - Horizontal, 90% width, now green and thinner */}
              <OrderProgress order={order} />

              {/* Details Grid */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Unit / VIN</div>
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">{order.Unit_No}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[120px]">{order.VIN_No}</div>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Assigned to</div>
                  <div className="text-sm font-medium">{order.ae_name} / {order.pm_name}</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Job Request</div>
                  <div className="text-sm font-medium">{order.Job_Request}</div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Timeline</div>
                  <div className="text-sm">
                    {formattedOrderDate} → {formattedDueDate}
                  </div>
                </div>
              </div> */}

              {/* Installation & Notes */}
              {/* <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">Frame:</span>
                    {order.Frame_Installation ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-gray-300" />
                    )}
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-gray-500 mr-2">Vinyl:</span>
                    {order.Vinyl_Installation ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-gray-300" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#007AFF]"
                    onClick={() => toggleNotes(order.order_number)}
                    aria-expanded={isExpanded}
                  >
                    <span>Notes</span>
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </Button>

                  <Link to={`/order/${order.order_number}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#007AFF]"
                    >
                      <span>Order Details</span>
                      <ZoomIn size={16} />
                    </Button>
                  </Link>
                </div>
              </div> */}

              {/* Expandable Notes Section */}
              {/* {isExpanded && (
                <div className="mt-4 p-4 bg-[#F5F7FA] rounded-lg text-sm animate-fade-in">
                  <p>{order.Customer_Notes}</p>
                </div>
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;

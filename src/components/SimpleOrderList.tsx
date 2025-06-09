import React from "react";
import { useEffect, useState } from 'react';
import { getOrderList } from "../services/netSuiteOrderService";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const SimpleOrderList: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (orderId: string, event: React.MouseEvent) => {
    // Prevent navigation if the click was on the action button
    if ((event.target as HTMLElement).closest('a, button')) {
      return;
    }

    navigate(`/order-old/${orderId}`);
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

  return (
    <div className="space-y-5 mt-6">
      {orders.data.records.map((order, index) => {
        const orderDate = new Date(order.order_date);
        const formattedDate = isNaN(orderDate.getTime())
          ? "Unknown date"
          : format(orderDate, "MMM d, yyyy");

        // More elegant alternating styles
        const isEven = index % 2 === 0;

        const gradientColors = isEven
          ? "from-slate-50 to-blue-50/30"
          : "from-slate-50 to-indigo-50/30";

        const borderColor = isEven
          ? "border-l-blue-300/30"
          : "border-l-indigo-300/30";

        const buttonGradient = isEven
          ? "bg-blue-50/80 hover:bg-blue-50"
          : "bg-indigo-50/80 hover:bg-indigo-50";

        const iconColor = isEven ? "text-blue-500/70" : "text-indigo-500/70";

        return (
          <div
            key={order.so_id}
            className={cn(
              "relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer bg-white",
              "hover:translate-y-[-2px] hover:shadow-md border-l-4",
              borderColor
            )}
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02)",
              transform: `perspective(1200px) rotateX(${isEven ? '0.8deg' : '-0.8deg'})`,
              transformStyle: "preserve-3d"
            }}
            onClick={(e) => handleRowClick(order.so_id, e)}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradientColors}`}
              style={{ transform: "translateZ(-1px)" }}
            />

            <div className="p-6 flex items-center relative z-10">
              <div className="flex-grow">
                <div className="font-medium text-gray-800 text-lg mb-2">{order.order_title}</div>

                <div className="flex flex-wrap gap-3 mt-3">
                  <div
                    className="flex items-center px-4 py-2 rounded-lg bg-white/80 text-sm shadow-sm"
                    style={{
                      borderBottom: isEven ? "1px solid rgba(59, 130, 246, 0.2)" : "1px solid rgba(79, 70, 229, 0.2)",
                      transform: "translateZ(1px)"
                    }}
                  >
                    <Calendar size={14} className={`mr-2 ${iconColor}`} />
                    <span className="text-gray-700">{formattedDate}</span>
                  </div>

                  {/* Removed the Job_Type conditional rendering block */}
                </div>
              </div>

              {/* Action button with elegantly styled effect */}
              <div className="flex-shrink-0 ml-3">
                <Link to={`/order/${order.so_id}`} onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-full w-11 h-11 p-0 transition-all duration-300",
                      buttonGradient
                    )}
                    style={{
                      boxShadow: "0 3px 5px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)",
                      transform: "translateZ(2px)",
                      border: isEven ? "1px solid rgba(59, 130, 246, 0.15)" : "1px solid rgba(79, 70, 229, 0.15)"
                    }}
                  >
                    <FileText
                      size={18}
                      className={cn(
                        "transition-all duration-300 group-hover:scale-105",
                        iconColor
                      )}
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SimpleOrderList;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import OrderDetailsTabs from "@/components/OrderDetailsTabs";
import { getOrderById, getOrderDetailsById, OrderDetails as OrderDetailsType } from "@/services/orderService";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, calculateDueDate } from "@/services/orderService";
import { Card } from "@/components/ui/card";

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Order ID is missing");
      setLoading(false);
      return;
    }

    const details = getOrderDetailsById(id);
    if (!details) {
      setError(`Order #${id} not found`);
      setLoading(false);
      return;
    }

    setOrderDetails(details);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="h-8 w-8 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading order details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !orderDetails) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error || "Failed to load order details"}</p>
            <Link to="/orders">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const { order } = orderDetails;
  const dueDate = calculateDueDate(order.Order_Date);
  const formattedOrderDate = formatDate(order.Order_Date);
  const formattedDueDate = dueDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <DashboardLayout>
      <div className="mb-6">
        {/* Header with back button and order info */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <Link to="/orders">
              <Button variant="ghost" size="sm" className="mb-2">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Orders
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">#{order.AV_SO}</h1>
              <Badge 
                className="bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 border-0"
              >
                {order.Job_Type}
              </Badge>
            </div>
            <h2 className="text-lg text-gray-600 mt-1">{order.Order_Title}</h2>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Order Timeline</div>
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-gray-400" />
              <span className="text-sm">
                {formattedOrderDate} → {formattedDueDate}
              </span>
            </div>
          </div>
        </div>
        
        {/* Order progress bar */}
        <Card className="p-6 mb-6 bg-white">
          <h3 className="text-lg font-medium mb-4">Order Progress</h3>
          <div className="mb-4 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Overall Completion</span>
              <span className="text-sm font-medium text-green-600">{order.Job_Status_Pct}%</span>
            </div>
            <div className="w-full">
              <div className="h-2 bg-gray-200 rounded-full w-full relative">
                <div 
                  className="h-full bg-blue-500 rounded-full absolute left-0 transition-all duration-500 ease-out"
                  style={{ width: `${order.Job_Status_Pct}%` }}
                  aria-valuenow={order.Job_Status_Pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                ></div>
              </div>
            </div>
            
            {/* Progress steps */}
            <div className="flex justify-between mt-4">
              <div className="flex flex-col items-center w-1/5">
                <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs mt-1 text-center">Estimate</span>
              </div>
              
              <div className="flex flex-col items-center w-1/5">
                {order.Job_Status_Pct >= 30 ? (
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">2</span>
                  </div>
                )}
                <span className="text-xs mt-1 text-center">Design</span>
              </div>
              
              <div className="flex flex-col items-center w-1/5">
                {order.Job_Status_Pct >= 60 ? (
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">3</span>
                  </div>
                )}
                <span className="text-xs mt-1 text-center">Print</span>
              </div>
              
              <div className="flex flex-col items-center w-1/5">
                {order.Job_Status_Pct >= 80 ? (
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">4</span>
                  </div>
                )}
                <span className="text-xs mt-1 text-center">Install</span>
              </div>
              
              <div className="flex flex-col items-center w-1/5">
                {order.Job_Status_Pct === 100 ? (
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-500">5</span>
                  </div>
                )}
                <span className="text-xs mt-1 text-center">Closed</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Order details tabs */}
        <OrderDetailsTabs 
          activities={orderDetails.activities}
          shippingAddresses={orderDetails.shippingAddresses}
          vehicleDetails={orderDetails.vehicleDetails}
          installLocations={orderDetails.installLocations}
          approvedDesigns={orderDetails.approvedDesigns}
          invoices={orderDetails.invoices}
        />
      </div>
    </DashboardLayout>
  );
};

export default OrderDetails;

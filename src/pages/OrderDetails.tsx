
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import OrderDetailsTabs from "@/components/OrderDetailsTabs";
import { getOrderById, getOrderDetailsById, OrderDetails as OrderDetailsType } from "@/services/orderService";
import OrderDetailsHeader from "@/components/order-details/OrderDetailsHeader";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <DashboardLayout>
      <div className="mb-6">
        {/* Header with back button and order info */}
        <OrderDetailsHeader order={order} />
        
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

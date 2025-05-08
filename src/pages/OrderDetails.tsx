
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import OrderDetailsTabs from "@/components/OrderDetailsTabs";
import { getOrderById, getOrderDetailsById, OrderDetails as OrderDetailsType } from "@/services/orderService";
import OrderDetailsHeader from "@/components/order-details/OrderDetailsHeader";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactBox from "@/components/ContactBox";
import ShortcutsBox from "@/components/order-details/ShortcutsBox";

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

  // Mock contact data - in a real app, this would come from API
  const contacts = [
    {
      name: "Sarah Johnson",
      role: "Account Manager",
      email: "sarah.j@example.com",
      phone: "(555) 123-4567"
    },
    {
      name: "Mike Peterson",
      role: "Design Lead",
      email: "mike.p@example.com",
      phone: "(555) 987-6543"
    },
    {
      name: "George Abdibal",
      role: "Executive Director",
      email: "george.a@example.com",
      phone: "(555) 234-5678"
    },
    {
      name: "Noel Fischer",
      role: "Project Manager",
      email: "noel.f@example.com", 
      phone: "(555) 345-6789"
    }
  ];

  // Determine which shortcuts to show based on the order's progress
  const hasApprovedDesign = orderDetails.approvedDesigns && orderDetails.approvedDesigns.length > 0;
  const hasInstallPictures = orderDetails.activities.some(a => a.type === "install" && a.title.includes("Complete"));

  return (
    <DashboardLayout>
      <div className="mb-6">
        {/* Header with back button and order info */}
        <OrderDetailsHeader order={order} />
        
        <div className="flex flex-col md:flex-row">
          {/* Main content area - tabs section */}
          <div className="flex-1 md:pr-4">
            <OrderDetailsTabs 
              activities={orderDetails.activities}
              shippingAddresses={orderDetails.shippingAddresses}
              vehicleDetails={orderDetails.vehicleDetails}
              installLocations={orderDetails.installLocations}
              approvedDesigns={orderDetails.approvedDesigns}
              invoices={orderDetails.invoices}
            />
          </div>
          
          {/* Right sidebar */}
          <div className="w-full md:w-80 flex flex-col gap-4 mt-4 md:mt-0">
            <div className="mb-4">
              <h3 className="font-medium text-base mb-2 text-gray-700 uppercase tracking-wide">Contacts</h3>
              <ContactBox contacts={contacts} />
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-2 text-gray-700 uppercase tracking-wide">Notes</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Justin Leblanc</span>
                    <span className="text-xs text-gray-500">10 Jan</span>
                  </div>
                  <p className="text-sm text-gray-600">We need to prepare for the presentation next week. Please review the materials.</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Fernand Naudé</span>
                    <span className="text-xs text-gray-500">14 Jan</span>
                  </div>
                  <p className="text-sm text-gray-600">Documentation is complete, awaiting final approval from the client.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <ShortcutsBox 
                hasEstimate={true}
                hasApprovedDesign={hasApprovedDesign}
                hasInstallPictures={hasInstallPictures}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetails;

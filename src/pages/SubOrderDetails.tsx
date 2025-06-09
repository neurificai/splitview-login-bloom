import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetails } from "../services/netSuiteOrderService";
import DashboardLayout from "@/components/DashboardLayout";
import SubOrdersList from "@/components/SubOrdersList";
import OrderPageShortcuts from "@/components/OrderPageShortcuts";
import { toast } from "@/hooks/use-toast";

const SubOrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [orderDetails, setData] = useState(null);
  console.log("Order ID: ", id);

  useEffect(() => {
    getOrderDetails({ so_id: id })
      .then((response) => {
        if (response.data) {
          setData(response.data.data);
          console.log('Data loaded:', response.data.data);
        }
        // if (!orderDetails) {
        //   toast({
        //     title: "Order Not Found",
        //     description: "The requested order could not be found.",
        //     variant: "destructive"
        //   });
        //   navigate("/orders");
        // }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(orderDetails);

  if (!orderDetails) return null;
  const order = orderDetails.record;
  const subOrders = orderDetails.items
  localStorage.setItem("contacts", JSON.stringify(orderDetails.contacts));
  console.log(JSON.stringify(orderDetails.contacts));

  // Simulate suborders based on order data
  // const subOrders = [
  // {
  //   id: `${order.AV_SO}-1`,
  //   vehicleNumber: "VH-1204",
  //   unitNumber: order.Unit_No,
  //   shippingAddress: orderDetails.shippingAddresses?.[0] || "No shipping address available",
  //   shippingDate: "2025-05-20",
  //   trackingNumber: "TRK98765432",
  //   installAddress: orderDetails.installLocations?.[0] || "No install location available",
  //   installationDate: "2025-05-25",
  //   installStatus: "Scheduled"
  // },
  // {
  //   id: `${order.AV_SO}-2`,
  //   vehicleNumber: "VH-1205",
  //   unitNumber: `${order.Unit_No}-A`,
  //   shippingAddress: orderDetails.shippingAddresses?.[1] || orderDetails.shippingAddresses?.[0] || "No shipping address available",
  //   shippingDate: "2025-05-22",
  //   trackingNumber: "TRK98765433",
  //   installAddress: orderDetails.installLocations?.[1] || orderDetails.installLocations?.[0] || "No install location available",
  //   installationDate: "2025-05-27",
  //   installStatus: "In Transit"
  // }
  // ];

  // Format the order date
  const orderDate = new Date(order.order_date || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 mb-10">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/orders")}
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Back to Orders
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-800">{order.order_title}</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Order Date: <span className="font-medium">{orderDate}</span>
              </div>

              {/* Shortcuts row */}
              <OrderPageShortcuts
                hasEstimate={true}
              //hasApprovedDesign={!!orderDetails.approvedDesigns?.length}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Suborders</h2>
          <SubOrdersList subOrders={subOrders} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubOrderDetails;

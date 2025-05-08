
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import OrderCard from "@/components/OrderCard";

interface Order {
  avsoId: string;
  orderTitle: string;
  unitNo: string;
  fmcUnitNo: string;
  cvnUnitNo: string;
  vinNo: string;
  orderDate: string;
  jobRequest: string;
  aeName: string;
  pmName: string;
  jobType: string;
  jobStatus: string;
  frameInstallation: string;
  bannerInstallation: string;
}

// Sample data based on the image
const orders: Order[] = [
  {
    avsoId: "AVSO1793",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Multiple Units",
    fmcUnitNo: "Multiple FMC Units",
    cvnUnitNo: "Multiple CVN Units",
    vinNo: "Multiple VINs",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "NA",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "NA",
  },
  {
    avsoId: "AVSO1793-10519",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Unit# 1",
    fmcUnitNo: "",
    cvnUnitNo: "",
    vinNo: "3FTTW8BA3SRA84298",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "Full Wrap",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "TBD",
  },
  {
    avsoId: "AVSO1793-10524",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Unit# 2",
    fmcUnitNo: "",
    cvnUnitNo: "",
    vinNo: "3FTTW8BA9SRA84547",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "Full Wrap",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "TBD",
  },
  {
    avsoId: "AVSO1793-10525",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Unit# 3",
    fmcUnitNo: "",
    cvnUnitNo: "",
    vinNo: "3FTTW8BA5SRA84111",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "Full Wrap",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "TBD",
  },
  {
    avsoId: "AVSO1793-10526",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Unit# 4",
    fmcUnitNo: "",
    cvnUnitNo: "",
    vinNo: "3FTTW8BA9SRA84516",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "Full Wrap",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "TBD",
  },
  {
    avsoId: "AVSO1793-10527",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Unit# 5",
    fmcUnitNo: "",
    cvnUnitNo: "",
    vinNo: "3FTTW8BA8SRA84720",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "Full Wrap",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "TBD",
  },
  {
    avsoId: "AVSO1793-10513",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Unit# 6",
    fmcUnitNo: "",
    cvnUnitNo: "",
    vinNo: "3FTTW8BA9SRA84290",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "Full Wrap",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "TBD",
  },
  {
    avsoId: "AVSO1793-10514",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Unit# 7",
    fmcUnitNo: "",
    cvnUnitNo: "",
    vinNo: "3FTTW8BA7SRA84322",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "Full Wrap",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "TBD",
  },
  {
    avsoId: "AVSO1793-10515",
    orderTitle: "#3306 Proforce | Qty 15 | Charlotte NC (Opportunity) SO# AVSO1793",
    unitNo: "Unit# 8",
    fmcUnitNo: "",
    cvnUnitNo: "",
    vinNo: "3FTTW8BA5SRA84349",
    orderDate: "05/07/2025",
    jobRequest: "Print And Install",
    aeName: "Adam Parrock",
    pmName: "Michael Schultz",
    jobType: "Full Wrap",
    jobStatus: "In Progress",
    frameInstallation: "NA",
    bannerInstallation: "TBD",
  },
];

// State types
type ViewMode = "card" | "table";
type FilterOption = "all" | "inProgress" | "completed";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [filterOption, setFilterOption] = useState<FilterOption>("all");

  // Filter orders based on search query and filter option
  const filteredOrders = React.useMemo(() => {
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
  }, [searchQuery, filterOption]);

  // Filter unique orders by removing child orders with the same base ID
  const uniqueOrders = React.useMemo(() => {
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

  return (
    <DashboardLayout title="Orders Dashboard">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by order ID, title, or name..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            
            <div className="flex items-center border rounded-md overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none h-8 px-3 ${viewMode === 'card' ? 'bg-orange-500 text-white' : ''}`}
                onClick={() => setViewMode('card')}
              >
                Cards
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-none h-8 px-3 ${viewMode === 'table' ? 'bg-orange-500 text-white' : ''}`}
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
            </div>
            
            <Button className="bg-orange-500 hover:bg-orange-600">+ New Order</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {uniqueOrders.map((order, index) => (
            <OrderCard key={order.avsoId} order={order} index={index} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;


import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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

// Column type for sorting
type SortDirection = "asc" | "desc" | null;
type SortColumn = keyof Order | null;

const Orders = () => {
  const [sortColumn, setSortColumn] = React.useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

  const handleSort = (column: keyof Order) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
      if (sortDirection === "desc") {
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedOrders = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return orders;

    return [...orders].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [sortColumn, sortDirection, orders]);

  // Render the sort icon based on sort state
  const renderSortIcon = (column: keyof Order) => {
    if (sortColumn !== column) return <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />;
    if (sortDirection === "asc") return <ChevronUp className="ml-1 h-4 w-4" />;
    return <ChevronDown className="ml-1 h-4 w-4" />;
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          Orders Dashboard
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export</Button>
          <Button>+ New Order</Button>
        </div>
      </div>
      
      <div className="rounded-md border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("avsoId")}
                >
                  <div className="flex items-center">
                    AV SO # {renderSortIcon("avsoId")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("orderTitle")}
                >
                  <div className="flex items-center">
                    Order Title {renderSortIcon("orderTitle")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("unitNo")}
                >
                  <div className="flex items-center">
                    Unit No {renderSortIcon("unitNo")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("fmcUnitNo")}
                >
                  <div className="flex items-center">
                    FMC Unit No {renderSortIcon("fmcUnitNo")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("cvnUnitNo")}
                >
                  <div className="flex items-center">
                    CVN Unit No {renderSortIcon("cvnUnitNo")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("vinNo")}
                >
                  <div className="flex items-center">
                    VIN No {renderSortIcon("vinNo")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("orderDate")}
                >
                  <div className="flex items-center">
                    Order Date {renderSortIcon("orderDate")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("jobRequest")}
                >
                  <div className="flex items-center">
                    Job Request {renderSortIcon("jobRequest")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("aeName")}
                >
                  <div className="flex items-center">
                    AE Name {renderSortIcon("aeName")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("pmName")}
                >
                  <div className="flex items-center">
                    PM Name {renderSortIcon("pmName")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("jobType")}
                >
                  <div className="flex items-center">
                    Job Type {renderSortIcon("jobType")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("jobStatus")}
                >
                  <div className="flex items-center">
                    Job Status {renderSortIcon("jobStatus")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("frameInstallation")}
                >
                  <div className="flex items-center">
                    Frame Installation {renderSortIcon("frameInstallation")}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/40 transition-colors"
                  onClick={() => handleSort("bannerInstallation")}
                >
                  <div className="flex items-center">
                    Banner/Vinyl Installation {renderSortIcon("bannerInstallation")}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.map((order) => (
                <TableRow 
                  key={order.avsoId}
                  className="hover:bg-muted/30 cursor-pointer"
                >
                  <TableCell className="font-medium">
                    <span className="text-primary hover:underline">{order.avsoId}</span>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={order.orderTitle}>
                    {order.orderTitle}
                  </TableCell>
                  <TableCell>{order.unitNo}</TableCell>
                  <TableCell>{order.fmcUnitNo}</TableCell>
                  <TableCell>{order.cvnUnitNo}</TableCell>
                  <TableCell>{order.vinNo}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.jobRequest}</TableCell>
                  <TableCell>{order.aeName}</TableCell>
                  <TableCell>{order.pmName}</TableCell>
                  <TableCell>{order.jobType}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {order.jobStatus}
                    </span>
                  </TableCell>
                  <TableCell>{order.frameInstallation}</TableCell>
                  <TableCell>{order.bannerInstallation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Orders;

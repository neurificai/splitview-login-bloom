
// Order model
export interface Order {
  AV_SO: string;
  Order_Title: string;
  Unit_No: string;
  FMC_Unit_No: string;
  CVN_Unit_No: string;
  VIN_No: string;
  Order_Date: string;
  Job_Request: string;
  AE_Name: string;
  PM_Name: string;
  Job_Type: string;
  Job_Status_Pct: number;
  Frame_Installation: boolean;
  Vinyl_Installation: boolean;
  Customer_Notes: string;
}

// View mode and filter options
export type ViewMode = "card" | "table";
export type FilterOption = "all" | "inProgress" | "completed";

// Sample data based on the provided JSON
export const orders: Order[] = [
  {
    AV_SO: "AVSO1793",
    Order_Title: "3306 Proforce | Qty 15 | Charlotte, NC",
    Unit_No: "U-1204",
    FMC_Unit_No: "FMC-332",
    CVN_Unit_No: "CVN-987",
    VIN_No: "1HGCM82633A004352",
    Order_Date: "2025-05-07",
    Job_Request: "Print And Install",
    AE_Name: "Adam Parrock",
    PM_Name: "Michael Schultz",
    Job_Type: "Print & Install",
    Job_Status_Pct: 45,
    Frame_Installation: true,
    Vinyl_Installation: false,
    Customer_Notes: "Client prefers matte finish on all banners."
  },
  {
    AV_SO: "AVSO1794",
    Order_Title: "4221 Oak Street | Qty 8 | Austin, TX",
    Unit_No: "U-1302",
    FMC_Unit_No: "FMC-348",
    CVN_Unit_No: "CVN-990",
    VIN_No: "2FACP74W6PX109843",
    Order_Date: "2025-05-10",
    Job_Request: "Frame Only",
    AE_Name: "Samantha Lee",
    PM_Name: "Raj Patel",
    Job_Type: "Framing",
    Job_Status_Pct: 75,
    Frame_Installation: true,
    Vinyl_Installation: false,
    Customer_Notes: "Install frames by May 20th."
  }
];

// Helper function to calculate due date (15 days from order date)
export const calculateDueDate = (orderDate: string): Date => {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + 15);
  return date;
};

// Format date to "Month Day, Year" format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

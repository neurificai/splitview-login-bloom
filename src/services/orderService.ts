
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

// Activity timeline items
export interface ActivityItem {
  date: string;
  title: string;
  description: string;
  type: 'estimate' | 'design' | 'print' | 'install' | 'invoice';
  status: 'completed' | 'pending' | 'upcoming';
}

// Order details data model
export interface OrderDetails {
  order: Order;
  activities: ActivityItem[];
  shippingAddresses?: string[];
  vehicleDetails?: {
    model?: string;
    year?: string;
    availabilityDate?: string;
  };
  installLocations?: string[];
  approvedDesigns?: string[];
  invoices?: {
    id: string;
    date: string;
    amount: number;
    status: 'paid' | 'pending';
  }[];
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
  },
  {
    AV_SO: "AVSO1795",
    Order_Title: "Millennium Fleet | Qty 22 | Denver, CO",
    Unit_No: "U-1405",
    FMC_Unit_No: "FMC-350",
    CVN_Unit_No: "CVN-1010",
    VIN_No: "3VWSA29M71M078742",
    Order_Date: "2025-05-01",
    Job_Request: "Full Installation",
    AE_Name: "Thomas Wright",
    PM_Name: "Jennifer Lopez",
    Job_Type: "Design & Install",
    Job_Status_Pct: 90,
    Frame_Installation: true,
    Vinyl_Installation: true,
    Customer_Notes: "Customer requests weather-resistant materials for outdoor application. Previous installation was damaged in harsh conditions."
  },
  {
    AV_SO: "AVSO1796",
    Order_Title: "NewTech Industries | Qty 5 | Seattle, WA",
    Unit_No: "U-1502",
    FMC_Unit_No: "FMC-401",
    CVN_Unit_No: "CVN-1100",
    VIN_No: "5FNRL38409B408100",
    Order_Date: "2025-05-05",
    Job_Request: "Vinyl Only",
    AE_Name: "Sarah Johnson",
    PM_Name: "David Chen",
    Job_Type: "Print Only",
    Job_Status_Pct: 30,
    Frame_Installation: false,
    Vinyl_Installation: true,
    Customer_Notes: "High-visibility reflective material requested for night visibility. Contact client for installation approval before proceeding."
  }
];

// Mock order details data
export const orderDetailsData: Record<string, OrderDetails> = {
  "AVSO1793": {
    order: orders[0],
    activities: [
      {
        date: "2025-04-28",
        title: "Estimate Sent",
        description: "Initial estimate sent to client",
        type: "estimate",
        status: "completed"
      },
      {
        date: "2025-05-01",
        title: "Estimate Signed",
        description: "Client approved and signed the estimate",
        type: "estimate",
        status: "completed"
      },
      {
        date: "2025-05-02",
        title: "Initial Design",
        description: "First design mockup sent for review",
        type: "design",
        status: "completed"
      },
      {
        date: "2025-05-04",
        title: "Design Revisions",
        description: "Client requested changes to color scheme",
        type: "design",
        status: "completed"
      },
      {
        date: "2025-05-05",
        title: "Design Approved",
        description: "Final design approved by client",
        type: "design",
        status: "completed"
      },
      {
        date: "2025-05-06",
        title: "Art Sent to Print",
        description: "Design files sent to production team",
        type: "print",
        status: "completed"
      },
      {
        date: "2025-05-15",
        title: "Install Scheduled",
        description: "Installation scheduled for May 20th",
        type: "install",
        status: "upcoming"
      },
    ],
    shippingAddresses: [
      "3306 Proforce Ave, Charlotte, NC 28205",
      "3310 Proforce Ave, Charlotte, NC 28205",
      "3314 Proforce Ave, Charlotte, NC 28205"
    ],
    vehicleDetails: {
      model: "Ford Transit 2022",
      year: "2022",
      availabilityDate: "2025-05-18"
    },
    installLocations: [
      "Charlotte HQ", "Charlotte Warehouse", "Charlotte Distribution Center"
    ],
    approvedDesigns: ["Design_v2_final.pdf", "Installation_diagram.pdf"],
    invoices: [
      {
        id: "INV-2025-045",
        date: "2025-05-01",
        amount: 2500,
        status: "paid"
      },
      {
        id: "INV-2025-067",
        date: "2025-05-15",
        amount: 2500,
        status: "pending"
      }
    ]
  },
  "AVSO1794": {
    order: orders[1],
    activities: [
      {
        date: "2025-05-03",
        title: "Estimate Sent",
        description: "Initial estimate sent to client",
        type: "estimate",
        status: "completed"
      },
      {
        date: "2025-05-05",
        title: "Estimate Signed",
        description: "Client approved and signed the estimate",
        type: "estimate",
        status: "completed"
      },
      {
        date: "2025-05-08",
        title: "Frame Design Approved",
        description: "Frame specifications approved",
        type: "design",
        status: "completed"
      },
      {
        date: "2025-05-12",
        title: "Frames in Production",
        description: "Frames being manufactured",
        type: "print",
        status: "completed"
      },
      {
        date: "2025-05-15",
        title: "Install Preparation",
        description: "Site preparation for frame installation",
        type: "install",
        status: "completed"
      }
    ],
    shippingAddresses: [
      "4221 Oak Street, Austin, TX 78701"
    ],
    installLocations: [
      "Austin Main Office", "Austin East Wing"
    ],
    approvedDesigns: ["Frame_specs.pdf"],
    invoices: [
      {
        id: "INV-2025-052",
        date: "2025-05-05",
        amount: 3200,
        status: "paid"
      }
    ]
  },
  "AVSO1795": {
    order: orders[2],
    activities: [
      {
        date: "2025-04-20",
        title: "Estimate Sent",
        description: "Initial estimate sent to client",
        type: "estimate",
        status: "completed"
      },
      {
        date: "2025-04-22",
        title: "Estimate Signed",
        description: "Client approved and signed the estimate",
        type: "estimate",
        status: "completed"
      },
      {
        date: "2025-04-24",
        title: "Initial Design",
        description: "First design mockup sent for review",
        type: "design",
        status: "completed"
      },
      {
        date: "2025-04-26",
        title: "Design Revisions",
        description: "Client requested branding changes",
        type: "design",
        status: "completed"
      },
      {
        date: "2025-04-28",
        title: "Design Approved",
        description: "Final design approved by client",
        type: "design",
        status: "completed"
      },
      {
        date: "2025-04-30",
        title: "Art Sent to Print",
        description: "Design files sent to production team",
        type: "print",
        status: "completed"
      },
      {
        date: "2025-05-05",
        title: "Install Started",
        description: "Installation team deployed",
        type: "install",
        status: "completed"
      },
      {
        date: "2025-05-07",
        title: "Installation Complete",
        description: "All items successfully installed",
        type: "install",
        status: "completed"
      },
      {
        date: "2025-05-08",
        title: "Final Invoice Sent",
        description: "Invoice for remaining balance sent",
        type: "invoice",
        status: "pending"
      }
    ],
    shippingAddresses: [
      "1800 Fleet Avenue, Denver, CO 80204",
      "1810 Fleet Avenue, Denver, CO 80204"
    ],
    vehicleDetails: {
      model: "Various Fleet Vehicles",
      year: "2023-2024",
      availabilityDate: "2025-05-01"
    },
    installLocations: [
      "Denver Main Depot", "Denver Secondary Lot"
    ],
    approvedDesigns: ["Fleet_design_final.pdf", "Vehicle_layout.pdf", "Brand_guidelines.pdf"],
    invoices: [
      {
        id: "INV-2025-039",
        date: "2025-04-22",
        amount: 12000,
        status: "paid"
      },
      {
        id: "INV-2025-064",
        date: "2025-05-08",
        amount: 12000,
        status: "pending"
      }
    ]
  },
  "AVSO1796": {
    order: orders[3],
    activities: [
      {
        date: "2025-05-01",
        title: "Estimate Sent",
        description: "Initial estimate sent to client",
        type: "estimate",
        status: "completed"
      },
      {
        date: "2025-05-03",
        title: "Estimate Signed",
        description: "Client approved and signed the estimate",
        type: "estimate",
        status: "completed"
      },
      {
        date: "2025-05-04",
        title: "Initial Design",
        description: "First design mockup sent for review",
        type: "design",
        status: "pending"
      }
    ],
    shippingAddresses: [
      "800 Tech Drive, Seattle, WA 98109"
    ],
    approvedDesigns: [],
    invoices: [
      {
        id: "INV-2025-049",
        date: "2025-05-03",
        amount: 1800,
        status: "paid"
      }
    ]
  }
};

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

// Find an order by its ID
export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.AV_SO === id);
};

// Get order details by order ID
export const getOrderDetailsById = (id: string): OrderDetails | undefined => {
  return orderDetailsData[id];
};

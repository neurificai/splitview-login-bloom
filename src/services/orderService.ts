
// Order model
export interface Order {
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

// View mode and filter options
export type ViewMode = "card" | "table";
export type FilterOption = "all" | "inProgress" | "completed";

// Sample data based on the image
export const orders: Order[] = [
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

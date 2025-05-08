
import { ActivityItem } from "@/services/orderService";

interface TabStatus {
  estimate: boolean;
  design: boolean;
  print: boolean;
  install: boolean;
  invoice: boolean;
}

export const useTabStatus = (activities: ActivityItem[]): TabStatus => {
  const stages = {
    estimate: false,
    design: false,
    print: false,
    install: false,
    invoice: false
  };
  
  // Check for activities that indicate completion of each stage
  const estimateCompleted = activities.some(a => a.type === "estimate" && a.title.includes("Signed"));
  const designCompleted = activities.some(a => a.type === "design" && a.title.includes("Approved"));
  const printCompleted = activities.some(a => a.type === "print" && (a.title.includes("Shipped") || a.title.includes("Production")));
  const installCompleted = activities.some(a => a.type === "install" && (a.title.includes("Complete") || a.title.includes("Preparation")));
  const invoiceCompleted = activities.some(a => a.type === "invoice" && a.title.includes("Paid"));
  
  // Set status based on completion
  stages.estimate = estimateCompleted;
  stages.design = estimateCompleted && designCompleted;
  stages.print = estimateCompleted && designCompleted && printCompleted;
  stages.install = stages.print && installCompleted;
  stages.invoice = stages.install && invoiceCompleted;
  
  return stages;
};

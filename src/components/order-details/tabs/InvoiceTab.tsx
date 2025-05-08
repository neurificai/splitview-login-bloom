
import React from "react";
import { ActivityItem } from "@/services/orderService";
import { FileText, CreditCard, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/services/orderService";
import ActivityTimeline from "../ActivityTimeline";
import TabContainer from "../TabContainer";

interface InvoiceTabProps {
  activities: ActivityItem[];
  invoices?: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending";
  }[];
}

const InvoiceTab: React.FC<InvoiceTabProps> = ({ activities, invoices }) => {
  const invoiceActivities = activities.filter(a => a.type === "invoice");
  
  const colorScheme = {
    activity: "bg-[#FFDEE2]",
    collaborate: "bg-[#FFDEE2]",
    detail: "bg-[#FFDEE2]",
  };
  
  const activityContent = (
    <ActivityTimeline activities={invoiceActivities} title="Activity" />
  );
  
  const collaborateContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <CreditCard size={18} className="text-blue-500" />
        Online Payment
      </h3>
      
      {invoices && invoices.some(inv => inv.status === "pending") && (
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Payment Due</CardTitle>
            <CardDescription>
              {invoices.filter(inv => inv.status === "pending").map(inv => (
                <span key={inv.id}>Invoice #{inv.id}: ${inv.amount.toLocaleString()}</span>
              ))}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="sm" className="w-full">
              Make Payment
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="text-sm text-gray-500">
        {invoices && invoices.some(inv => inv.status === "pending") 
          ? "Please complete payment for pending invoices." 
          : "No payments due at this time."}
      </div>
    </div>
  );
  
  const detailContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <FileText size={18} className="text-blue-500" />
        All Invoices
      </h3>
      
      {invoices && invoices.length > 0 ? (
        <div className="space-y-2">
          {invoices.map((inv, idx) => (
            <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
              <div>
                <div className="text-sm font-medium">{inv.id}</div>
                <div className="text-xs text-gray-500">{formatDate(inv.date)}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={inv.status === "paid" ? "bg-green-500" : "bg-amber-500"}>
                  {inv.status === "paid" ? "Paid" : "Pending"}
                </Badge>
                <span className="text-sm font-medium">${inv.amount.toLocaleString()}</span>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No invoices available.</p>
      )}
    </div>
  );
  
  return (
    <TabContainer
      mainTab="invoice"
      colorScheme={colorScheme}
      children={{
        activity: activityContent,
        collaborate: collaborateContent,
        detail: detailContent,
      }}
    />
  );
};

export default InvoiceTab;

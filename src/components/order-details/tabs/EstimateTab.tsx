
import React from "react";
import { ActivityItem } from "@/services/orderService";
import { MessageSquare, FileText, FileSignature, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActivityTimeline from "../ActivityTimeline";
import TabContainer from "../TabContainer";
import { tabColors } from "../TabColors";

interface EstimateTabProps {
  // activities: ActivityItem[];
  estimates: any[];
}

const EstimateTab: React.FC<EstimateTabProps> = ({ estimates }) => {
  const estimateActivities = [];//activities.filter(a => a.type === "estimate");
  
  const activityContent = (
    <ActivityTimeline activities={estimateActivities} title="Activity" />
  );
  
  const collaborateContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <MessageSquare size={18} className="text-blue-500" />
        Collaborate
      </h3>
      
      {!estimateActivities.some(a => a.title === "Estimate Signed") && (
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pending Estimate</CardTitle>
            <CardDescription>Please review and sign the estimate</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="sm" className="w-full">
              <FileSignature className="mr-2 h-4 w-4" />
              Open DocuSign
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="text-sm text-gray-500">
        {estimateActivities.some(a => a.title === "Estimate Signed") 
          ? "Estimate has been signed and approved."
          : "Your signature is required to proceed."}
      </div>
    </div>
  );
  
  const detailContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <FileText size={18} className="text-blue-500" />
        Detail
      </h3>
      
      <Button size="sm" variant="outline" className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download Estimate PDF
      </Button>
    </div>
  );
  
  return (
    <TabContainer
      mainTab="estimate"
      colorScheme={tabColors.estimate}
      children={{
        activity: activityContent,
        collaborate: collaborateContent,
        detail: detailContent,
      }}
    />
  );
};

export default EstimateTab;


import React from "react";
import { ActivityItem } from "@/services/orderService";
import { MessageSquare, FileText, Edit, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActivityTimeline from "../ActivityTimeline";
import TabContainer from "../TabContainer";
import { tabColors } from "../TabColors";

interface DesignTabProps {
  activities: ActivityItem[];
  approvedDesigns?: string[];
}

const DesignTab: React.FC<DesignTabProps> = ({ activities, approvedDesigns }) => {
  const designActivities = activities.filter(a => a.type === "design");
  const completedActivities = designActivities.filter(a => a.status === "completed");
  
  // Create mock next steps based on the creative process
  const nextSteps: ActivityItem[] = [
    {
      date: "",
      title: "Creative Brief Meeting",
      description: "Account Executive will hold a meeting with the client to discuss design requirements.",
      type: "design",
      status: "upcoming"
    },
    {
      date: "",
      title: "Initial Design Creation",
      description: "Designer will create the first draft based on the creative brief.",
      type: "design",
      status: "upcoming"
    },
    {
      date: "",
      title: "Share Proof with Client",
      description: "The Account Executive will share the proof with the client and collect desired revisions.",
      type: "design",
      status: "upcoming"
    },
    {
      date: "",
      title: "Review Client Feedback",
      description: "Designer will review client feedback and make necessary adjustments.",
      type: "design",
      status: "upcoming"
    },
    {
      date: "",
      title: "Final Approval",
      description: "Client provides final approval for the design.",
      type: "design",
      status: "upcoming"
    }
  ];
  
  // Determine which next steps to show based on the current progress
  const getRelevantNextSteps = () => {
    if (completedActivities.length === 0) {
      // No activity yet, start from beginning
      return nextSteps.slice(0, 3);
    } else if (!completedActivities.some(a => a.title.includes("Design Approved"))) {
      // Design not approved yet, show revision steps
      return nextSteps.slice(2, 5);
    }
    
    // Design is approved, no next steps
    return [];
  };
  
  // Only show next steps if there are no approved designs yet
  const showNextSteps = !approvedDesigns || approvedDesigns.length === 0;
  const relevantNextSteps = showNextSteps ? getRelevantNextSteps() : [];
  
  const activityContent = (
    <ActivityTimeline 
      activities={completedActivities} 
      nextSteps={relevantNextSteps} 
      title="Design Process" 
    />
  );
  
  const collaborateContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <MessageSquare size={18} className="text-blue-500" />
        Collaborate
      </h3>
      
      {designActivities.some(a => a.status === "pending") && (
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Design Pending Approval</CardTitle>
            <CardDescription>Please review the design</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button size="sm" className="w-full">
              Review Design
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="mt-4">
        <h4 className="font-medium text-sm mb-2">Comments</h4>
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Add your comment..." 
            className="flex-1 rounded-md border px-3 py-2 text-sm"
          />
          <Button size="sm">
            <Edit size={16} />
          </Button>
        </div>
        
        <div className="text-sm text-gray-500">
          No comments yet.
        </div>
      </div>
    </div>
  );
  
  const detailContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <FileText size={18} className="text-blue-500" />
        Approved Designs
      </h3>
      
      {approvedDesigns && approvedDesigns.length > 0 ? (
        <div className="space-y-2">
          {approvedDesigns.map((design, idx) => (
            <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
              <span className="text-sm">{design}</span>
              <Button variant="ghost" size="sm">
                <Download size={16} />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No approved designs yet.</p>
      )}
    </div>
  );
  
  return (
    <TabContainer
      mainTab="design"
      colorScheme={tabColors.design}
      children={{
        activity: activityContent,
        collaborate: collaborateContent,
        detail: detailContent,
      }}
    />
  );
};

export default DesignTab;

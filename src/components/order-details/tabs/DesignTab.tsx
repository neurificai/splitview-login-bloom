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
  
  // Create enhanced mock design activities
  const mockPastActivities: ActivityItem[] = [
    {
      date: "2025-04-24",
      title: "First Design Mockup Sent",
      description: "Initial design concepts shared with client",
      type: "design",
      status: "completed"
    },
    {
      date: "2025-04-26",
      title: "Client Requested Color Scheme Changes",
      description: "Client requested adjustments to the color palette",
      type: "design",
      status: "completed"
    },
    {
      date: "2025-04-28",
      title: "Second Mockup Sent",
      description: "Updated design with revised color scheme",
      type: "design",
      status: "completed"
    },
    {
      date: "2025-04-30",
      title: "Client Requested Font Change",
      description: "Client requested alternative typography options",
      type: "design",
      status: "completed"
    },
    {
      date: "2025-05-02",
      title: "Third Mockup Sent",
      description: "Final design revision with updated typography",
      type: "design",
      status: "completed"
    }
  ];
  
  // Enhanced mock next steps
  const mockNextSteps: ActivityItem[] = [
    {
      date: "",
      title: "Await Approval From Client",
      description: "Waiting for client to review final design mockup",
      type: "design",
      status: "upcoming"
    },
    {
      date: "",
      title: "Implement Changes Requested By Client",
      description: "Make any final adjustments based on client feedback",
      type: "design",
      status: "upcoming"
    },
    {
      date: "",
      title: "Send For Approval",
      description: "Submit final design for client approval",
      type: "design",
      status: "upcoming"
    },
    {
      date: "",
      title: "Design Approved",
      description: "Obtain final sign-off from client",
      type: "design",
      status: "upcoming"
    }
  ];
  
  // Determine which activities to display based on the current order state
  const displayPastActivities = () => {
    // If we already have real completed activities, use those
    if (completedActivities.length > 0) {
      return completedActivities;
    }
    
    // Otherwise use our enhanced mock activities
    return mockPastActivities;
  };
  
  // Determine next steps based on order progress
  const displayNextSteps = () => {
    // Only show next steps if there are no approved designs
    if (approvedDesigns && approvedDesigns.length > 0) {
      return [];
    }
    
    // If design is in progress, show appropriate next steps
    if (completedActivities.length > 0) {
      // If final approval is already done, show no next steps
      if (completedActivities.some(a => a.title.includes("Design Approved"))) {
        return [];
      }
      
      // Otherwise show next steps
      return mockNextSteps;
    }
    
    // If no design activities yet, show the full process
    return mockNextSteps;
  };
  
  const activityContent = (
    <ActivityTimeline 
      activities={displayPastActivities()} 
      nextSteps={displayNextSteps()} 
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

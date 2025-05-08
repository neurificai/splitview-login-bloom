
import React from "react";
import { ActivityItem } from "@/services/orderService";
import { Activity, Clock, Check } from "lucide-react";
import { formatDate } from "@/services/orderService";

interface ActivityTimelineProps {
  activities: ActivityItem[];
  nextSteps?: ActivityItem[];
  title?: string;
  showNextStepsFirst?: boolean;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ 
  activities,
  nextSteps = [],
  title = "Activity",
  showNextStepsFirst = false
}) => {
  const renderPastActivities = () => {
    if (activities.length === 0) return null;
    
    return (
      <>
        <h4 className="font-medium text-base mb-4">Past Activity</h4>
        <div className="space-y-6 mb-8">
          <div className="relative">
            {activities.map((activity, index) => (
              <div key={index} className="mb-6 relative">
                {/* Timeline connector */}
                {index < activities.length - 1 && (
                  <div className="absolute left-4 top-6 h-full w-0.5 bg-gray-200"></div>
                )}
                
                <div className="flex items-start">
                  <div className="mr-4 bg-green-100 rounded-full p-1 z-10">
                    {activity.status === "completed" ? (
                      <Check className="h-6 w-6 text-green-500" />
                    ) : (
                      <Clock className="h-6 w-6 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  
  const renderNextSteps = () => {
    if (nextSteps.length === 0) return null;
    
    return (
      <>
        <h4 className="font-medium text-base mb-4">Next Steps</h4>
        <div className="space-y-6 mb-8">
          <div className="relative">
            {nextSteps.map((activity, index) => (
              <div key={index} className="mb-6 relative">
                {/* Timeline connector */}
                {index < nextSteps.length - 1 && (
                  <div className="absolute left-4 top-6 h-full w-0.5 bg-gray-200"></div>
                )}
                
                <div className="flex items-start">
                  <div className="mr-4 bg-blue-100 rounded-full p-1 z-10">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    {activity.date && (
                      <div className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
        <Activity size={18} className="text-green-500" />
        {title}
      </h3>
      
      {showNextStepsFirst ? (
        <>
          {renderNextSteps()}
          {renderPastActivities()}
        </>
      ) : (
        <>
          {renderPastActivities()}
          {renderNextSteps()}
        </>
      )}
      
      {activities.length === 0 && nextSteps.length === 0 && (
        <p className="text-gray-500">No activities yet.</p>
      )}
    </div>
  );
};

export default ActivityTimeline;

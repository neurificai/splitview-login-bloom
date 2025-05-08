
import React from "react";
import { ActivityItem } from "@/services/orderService";
import { FileText, Car, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/services/orderService";
import ActivityTimeline from "../ActivityTimeline";
import TabContainer from "../TabContainer";
import { tabColors } from "../TabColors";

interface InstallTabProps {
  activities: ActivityItem[];
  vehicleDetails?: {
    model?: string;
    year?: string;
    availabilityDate?: string;
  };
  installLocations?: string[];
}

const InstallTab: React.FC<InstallTabProps> = ({ activities, vehicleDetails, installLocations }) => {
  const installActivities = activities.filter(a => a.type === "install");
  
  const activityContent = (
    <ActivityTimeline activities={installActivities} title="Activity" />
  );
  
  const collaborateContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Car size={18} className="text-blue-500" />
        Vehicle Details
      </h3>
      
      {vehicleDetails ? (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Model:</span>
            <span>{vehicleDetails.model || "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Year:</span>
            <span>{vehicleDetails.year || "N/A"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available on:</span>
            <span>{vehicleDetails.availabilityDate ? formatDate(vehicleDetails.availabilityDate) : "N/A"}</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No vehicle details available.</p>
      )}
      
      <Separator className="my-4" />
      
      <h4 className="font-medium text-sm mb-2">Install Locations:</h4>
      {installLocations && installLocations.length > 0 ? (
        <div className="space-y-2">
          {installLocations.map((location, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-gray-500" />
              <span>{location}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No installation locations specified.</p>
      )}
    </div>
  );
  
  const detailContent = (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
        <FileText size={18} className="text-blue-500" />
        Installation Details
      </h3>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="font-medium">Installer:</div>
        <div>Pro Installation Team</div>
        
        <div className="font-medium">Est. Duration:</div>
        <div>3 hours per vehicle</div>
        
        <div className="font-medium">Special Notes:</div>
        <div>Weather-resistant application needed</div>
      </div>
    </div>
  );
  
  return (
    <TabContainer
      mainTab="install"
      colorScheme={tabColors.install}
      children={{
        activity: activityContent,
        collaborate: collaborateContent,
        detail: detailContent,
      }}
    />
  );
};

export default InstallTab;

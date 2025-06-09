
import React from "react";
import { Calendar, MapPin } from "lucide-react";
import DateDisplay from "./DateDisplay";
import { formatDateWithStatus } from "@/utils/dateFormatUtils";

interface InstallationSectionProps {
  installAddress: string;
  installationDate: string;
}

const InstallationSection: React.FC<InstallationSectionProps> = ({
  installAddress,
  installationDate
}) => {
  var installDateInfo: any;
  if (installationDate) {
    installDateInfo = formatDateWithStatus(installationDate);
  }

  return (
    <div className="rounded-lg bg-white/60 p-5 shadow-sm border border-slate-100/60"
      style={{ transform: "translateZ(1px)" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Installation Address</div>
          <div className="text-sm font-medium flex items-start text-gray-800">
            <MapPin size={14} className="text-indigo-400 mt-0.5 mr-1.5 flex-shrink-0" />
            {installAddress}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Installation Date</div>
          {installDateInfo && installDateInfo.date && (
            <DateDisplay
              date={installDateInfo.date}
              statusClass={installDateInfo.statusClass}
              statusLabel={installDateInfo.statusLabel}
              icon={<Calendar size={14} className="text-indigo-400 mr-1.5 flex-shrink-0" />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallationSection;

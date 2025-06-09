
import React from "react";
import { Truck, ExternalLink } from "lucide-react";
import DateDisplay from "./DateDisplay";
import { formatDateWithStatus } from "@/utils/dateFormatUtils";

interface ShippingSectionProps {
  shippingAddress: string;
  shippingDate: string;
  trackingNumber: string;
}

const ShippingSection: React.FC<ShippingSectionProps> = ({
  shippingAddress,
  shippingDate,
  trackingNumber
}) => {
  var shippingDateInfo: any;
  if (shippingDate) {
    shippingDateInfo = formatDateWithStatus(shippingDate);
  }

  return (
    <div className="rounded-lg bg-white/60 p-5 shadow-sm border border-slate-100/60"
      style={{ transform: "translateZ(1px)" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Shipping Address</div>
          <div className="text-sm font-medium text-gray-800">{shippingAddress}</div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Shipping Date</div>
          {shippingDateInfo && shippingDateInfo.date && (
            <DateDisplay
              date={shippingDateInfo.date}
              statusClass={shippingDateInfo.statusClass}
              statusLabel={shippingDateInfo.statusLabel}
              icon={<Truck size={14} className="text-blue-400 mr-1.5 flex-shrink-0" />}
            />
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Tracking Number</div>
          <div className="text-sm font-medium flex items-center text-gray-800">
            {trackingNumber}
            {trackingNumber && (
              <button className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                onClick={() =>
                  window.open(`https://www.ups.com/track?loc=en_US&trackingNumber=${trackingNumber}`, '_blank')
                }
              >
                <ExternalLink size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSection;

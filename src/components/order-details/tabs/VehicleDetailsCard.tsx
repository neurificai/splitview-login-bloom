
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateWithStatus } from "@/utils/dateFormatUtils";
import { Calendar, ExternalLink, Link } from "lucide-react";
import DateDisplay from "../../suborder/DateDisplay";
const NS_API_URL = import.meta.env.VITE_APP_API_URL;

interface SubOrderCardProps {
    vehicleItem: any;
    index: number;
    order: any;
}

const VehicleDetailsCard: React.FC<SubOrderCardProps> = ({ vehicleItem, index, order }) => {

    const isEven = index % 2 === 0;
    var installDateInfo: any;
    var installationDate = vehicleItem.installationDate;
    if (installationDate) {
        installDateInfo = formatDateWithStatus(installationDate);
    }
    console.log('order');
    console.log(order);

    return (
        <Card
            key={vehicleItem.id}
            className="overflow-hidden border-0 relative transition-all duration-300 hover:translate-y-[-2px]"
            style={{
                boxShadow: "0 6px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)",
                transform: `perspective(1200px) rotateX(${isEven ? '0.8deg' : '-0.8deg'})`,
                borderRadius: "16px",
                transformStyle: "preserve-3d"
            }}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: isEven
                        ? 'linear-gradient(to bottom, rgba(248,250,252,0.8) 0%, rgba(239,246,255,0.5) 100%)'
                        : 'linear-gradient(to bottom, rgba(249,250,251,0.8) 0%, rgba(238,242,255,0.5) 100%)',
                    borderLeft: isEven
                        ? '4px solid rgba(59, 130, 246, 0.3)'
                        : '4px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: "16px",
                    transform: "translateZ(-1px)"
                }}
            />
            <CardContent className="p-0 relative z-10">
                <div className="p-6">
                    {/* Header with badges and status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="outline" className="bg-blue-50/80 text-blue-700 hover:bg-blue-100 border-blue-200/50 shadow-sm">
                                VIN: {vehicleItem.vehicleNumber}
                            </Badge>
                        </div>
                    </div>

                    {/* Main content details */}
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white/60 p-5 shadow-sm border border-slate-100/60"
                            style={{ transform: "translateZ(1px)" }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Estimated Installation Date</div>
                                    {installDateInfo && installDateInfo.date && (
                                        <DateDisplay
                                            date={installDateInfo.date}
                                            statusClass={installDateInfo.statusClass}
                                            statusLabel={installDateInfo.statusLabel}
                                            icon={<Calendar size={14} className="text-indigo-400 mr-1.5 flex-shrink-0" />}
                                        />
                                    )}
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Installation Status</div>
                                    <div className="text-sm font-medium text-gray-800">{vehicleItem.installation_status}</div>
                                </div>

                                <div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Tracking #</div>
                                    <div className="text-sm font-medium flex items-center text-gray-800">
                                        {vehicleItem.trackingNumber}
                                        {vehicleItem.trackingNumber && (
                                            <button className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                                                onClick={() =>
                                                    window.open(`https://www.ups.com/track?loc=en_US&trackingNumber=${vehicleItem.trackingNumber}`, '_blank')
                                                }
                                            >
                                                <ExternalLink size={15} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Completion Photos</div>
                                    <div className="text-sm font-medium flex items-center text-gray-800">
                                        {/* {vehicleItem.trackingNumber} */}
                                        {vehicleItem.installation_status == 'Completed' && (
                                            <>
                                                View Photos
                                                <button className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                                                    onClick={() => {
                                                        // window.open(`/installation-images?sid=${vehicleItem.so_number}&wid=${vehicleItem.workOrder}`, '_blank')
                                                        const baseUrl = `/installation-images?sid=${vehicleItem.so_number}&wid=${vehicleItem.workOrder}`;
                                                        const fullUrl =
                                                            (order.display_qty > 1 && (order.project == "Print and Install" || order.project == "Traxx Install" || order.project == "Install/Removal Only"))
                                                                ? `${baseUrl}&subord=` + true
                                                                : baseUrl;
                                                        window.open(fullUrl, '_blank');
                                                    }}
                                                >
                                                    <ExternalLink size={15} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Invoice</div>
                                    <div className="text-sm font-medium flex items-center text-gray-800">
                                        {vehicleItem.invoice_number}
                                        {vehicleItem.invoice_id && (
                                            <button className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                                                onClick={() =>
                                                    window.open(NS_API_URL + `/netsuite-api/get-entity-pdf-from-netsuite/${vehicleItem.invoice_id}`, '_blank')
                                                }
                                            >
                                                <ExternalLink size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card >
    );
};

export default VehicleDetailsCard;

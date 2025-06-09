
import React from "react";
import { ActivityItem } from "@/services/orderService";
import { MessageSquare, FileText, FileSignature, Download } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActivityTimeline from "../order-details/ActivityTimeline";
import TabContainer from "../order-details/TabContainer";
import { tabColors } from "../order-details/TabColors";
import EstimatesTab from "../order-details/tabs/EstimatesTab";
import DesignsTab from "../order-details/tabs/DesignsTab";
import VehicleDetailsTab from "../order-details/tabs/VehicleDetailsTab";
import InvoicesTab from "../order-details/tabs/InvoicesTab";

interface OrderTabProps {
    // activities: ActivityItem[];
    order: any;
    estimates: any[];
    designs: any[];
    vehicleDetails: any[];
    invoices: any[];
}

const OrderTab: React.FC<OrderTabProps> = ({ order, estimates, designs, vehicleDetails, invoices }) => {
    const estimateActivities = [];//activities.filter(a => a.type === "estimate");
    console.log('vehicleDetails');
    console.log(vehicleDetails);
    console.log(invoices);

    const activityContent = (
        <ActivityTimeline activities={estimateActivities} title="Activity" />
    );

    const estimateContent = (
        <EstimatesTab estimates={estimates} />
    );

    const designContent = (
        <DesignsTab designs={designs} />
    );

    const vehicleDetailsContent = (
        <VehicleDetailsTab vehicleDetails={vehicleDetails} order={order} />
    );

    const invoiceContent = (
        <InvoicesTab invoices={invoices} />
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
                estimate: estimateContent,
                design: designContent,
                detail: vehicleDetailsContent,
                invoice: invoiceContent,
            }}
        />
    );
};

export default OrderTab;

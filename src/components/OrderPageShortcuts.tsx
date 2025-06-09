
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface OrderPageShortcutsProps {
  hasEstimate?: boolean;
  hasApprovedDesign?: boolean;
}

const OrderPageShortcuts: React.FC<OrderPageShortcutsProps> = ({
  hasEstimate = true,
  hasApprovedDesign = false,
}) => {
  const handleDownloadEstimate = () => {
    toast({
      title: "Downloading Estimate",
      description: "Your estimate is being downloaded."
    });
  };

  const handleViewDesigns = () => {
    if (hasApprovedDesign) {
      toast({
        title: "Opening Designs",
        description: "Your approved designs are being opened."
      });
    } else {
      toast({
        title: "No Approved Designs",
        description: "There are no approved designs available for this order.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {hasEstimate && (
        <Button
          className={cn(
            "relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
            "border-none text-white shadow-md transition-all duration-300 hover:shadow-lg"
          )}
          onClick={handleDownloadEstimate}
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Estimate
        </Button>
      )}

      <Button
        onClick={handleViewDesigns}
        disabled={!hasApprovedDesign}
        className={cn(
          "relative overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border-none",
          hasApprovedDesign
            ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-500"
        )}
        size="sm"
      >
        <Image className="h-4 w-4 mr-2" />
        View Approved Designs
      </Button>
    </div>
  );
};

export default OrderPageShortcuts;

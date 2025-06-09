
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ActionButtons: React.FC = () => {
  const handleExport = () => {
    console.log("Exporting orders data");
    toast({
      title: "Export initiated",
      description: "Your data is being exported",
    });
    // Export functionality would be implemented here
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={handleExport}
      >
        <FileText className="h-3.5 w-3.5 text-green-200" />
        <span>Export</span>
      </Button>

      <Button className="bg-[#007AFF] hover:bg-blue-600">
        <Plus className="h-4 w-4 mr-1" /> New Order
      </Button>
    </>
  );
};

export default ActionButtons;

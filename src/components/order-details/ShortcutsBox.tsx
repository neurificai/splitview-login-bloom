
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Eye, Download } from "lucide-react";

interface ShortcutsBoxProps {
  hasEstimate?: boolean;
  hasApprovedDesign?: boolean;
  hasInstallPictures?: boolean;
}

const ShortcutsBox: React.FC<ShortcutsBoxProps> = ({ 
  hasEstimate = true, 
  hasApprovedDesign = false,
  hasInstallPictures = false 
}) => {
  return (
    <div>
      <h3 className="font-medium text-xs mb-1 text-gray-700 uppercase tracking-wide">Quick Shortcuts</h3>
      <Card className="shadow-sm border-none bg-white">
        <CardContent className="pt-2 pb-2 px-2 flex flex-col gap-1.5">
          {hasEstimate && (
            <Button 
              variant="outline" 
              className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50 transition-all"
              size="sm"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Download Estimate
            </Button>
          )}
          
          {hasApprovedDesign && (
            <Button 
              variant="outline" 
              className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50 transition-all"
              size="sm"
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              View Approved Design
            </Button>
          )}
          
          {hasInstallPictures && (
            <Button 
              variant="outline" 
              className="w-full justify-start text-orange-600 border-orange-200 hover:bg-orange-50 transition-all"
              size="sm"
            >
              <Image className="h-3.5 w-3.5 mr-1.5" />
              View Install Pictures
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShortcutsBox;

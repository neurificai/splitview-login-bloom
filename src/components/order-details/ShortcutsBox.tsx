
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image, Eye, Download } from "lucide-react";

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
    <Card className="shadow-md border-none bg-white h-full transition-all hover:shadow-lg">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-base font-medium text-blue-700">Quick Shortcuts</CardTitle>
      </CardHeader>
      <CardContent className="pt-3 flex flex-col gap-2">
        {hasEstimate && (
          <Button 
            variant="outline" 
            className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50 transition-all"
          >
            <FileText className="h-4 w-4 mr-2" />
            Download Estimate
          </Button>
        )}
        
        {hasApprovedDesign && (
          <Button 
            variant="outline" 
            className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50 transition-all"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Approved Design
          </Button>
        )}
        
        {hasInstallPictures && (
          <Button 
            variant="outline" 
            className="w-full justify-start text-orange-600 border-orange-200 hover:bg-orange-50 transition-all"
          >
            <Image className="h-4 w-4 mr-2" />
            View Install Pictures
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ShortcutsBox;

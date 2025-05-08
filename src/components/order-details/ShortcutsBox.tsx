
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
    <div>
      <h3 className="font-medium text-base mb-2 text-gray-700 uppercase tracking-wide">Quick Shortcuts</h3>
      <Card className="shadow-md border-none bg-white transition-all hover:shadow-lg">
        <CardContent className="pt-4 flex flex-col gap-2">
          {hasEstimate && (
            <Button 
              variant="outline" 
              className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50 transition-all"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Estimate
            </Button>
          )}
          
          {hasApprovedDesign && (
            <Button 
              variant="outline" 
              className="w-full justify-start text-green-600 border-green-200 hover:bg-green-50 transition-all"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Approved Design
            </Button>
          )}
          
          {hasInstallPictures && (
            <Button 
              variant="outline" 
              className="w-full justify-start text-orange-600 border-orange-200 hover:bg-orange-50 transition-all"
              size="sm"
            >
              <Image className="h-4 w-4 mr-2" />
              View Install Pictures
            </Button>
          )}

          <Button 
            variant="outline" 
            className="w-full justify-start text-purple-600 border-purple-200 hover:bg-purple-50 transition-all"
            size="sm"
          >
            <FileText className="h-4 w-4 mr-2" />
            Download Documentation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShortcutsBox;

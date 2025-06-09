
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Eye, Download, Package } from "lucide-react";

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
    <div className="pl-6">
      <h3 className="font-medium text-xs mb-2 text-gray-700 uppercase tracking-wide">Quick Shortcuts</h3>
      <Card className="shadow-sm border-none bg-white">
        <CardContent className="pt-5 pb-5 px-5 flex flex-col gap-2">
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

          {/* Always show View Designs shortcut */}
          <Button
            variant="outline"
            className="w-full justify-start text-purple-600 border-purple-200 hover:bg-purple-50 transition-all"
            size="sm"
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            View Designs
          </Button>

          {/* Always show View Installs shortcut */}
          <Button
            variant="outline"
            className="w-full justify-start text-amber-600 border-amber-200 hover:bg-amber-50 transition-all"
            size="sm"
          >
            <Package className="h-3.5 w-3.5 mr-1.5" />
            View Installs
          </Button>

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

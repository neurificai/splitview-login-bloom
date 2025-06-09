
import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardTopbar from "./DashboardTopbar";


interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = "Dashboard"
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardSidebar />
      <DashboardTopbar />


      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      <div className="md:pl-64">
        {/* Mobile menu button */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b h-16 flex items-center px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Logo size="sm" />
          </div>
        </div>

        {/* Main content */}
        <main className="p-4 md:p-6 pb-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

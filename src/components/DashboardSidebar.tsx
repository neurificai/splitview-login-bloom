
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ContactBox from "./ContactBox";
import { 
  LayoutDashboard, 
  MessageSquare, 
  User, 
  Settings,
  FilesIcon
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: FilesIcon, label: "Orders", href: "/orders" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const contacts = [
  {
    name: "Adam Parrock",
    role: "Account Executive",
    email: "adam.p@company.com",
    phone: "(555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=150&h=150&fit=crop",
  },
  {
    name: "Michael Schultz",
    role: "Project Manager",
    email: "michael.s@company.com",
    phone: "(555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop",
  },
];

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex h-screen flex-col border-r bg-white w-64 py-4 px-2 fixed left-0 top-0">
      <div className="flex items-center px-4 mb-8">
        <Logo size="md" />
      </div>
      
      <div className="px-3 mb-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=150&h=150&fit=crop" 
              alt="John Doe"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">Member Since 2023</div>
          </div>
        </div>
      </div>
      
      <nav className="space-y-1 px-2 flex-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
              location.pathname === item.href
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted/40"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="px-2 pt-4 mt-auto">
        <ContactBox contacts={contacts} />
      </div>
    </div>
  );
};

export default DashboardSidebar;

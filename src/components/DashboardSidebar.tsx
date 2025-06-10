
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ContactBox from "./ContactBox";
import { useEffect, useState, useRef } from 'react';
import {
  FilesIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
  { icon: FilesIcon, label: "Your Orders", href: "/orders" },
];

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isOrdersPage = location.pathname === "/orders";
  const isProjectsPage = location.pathname === "/projects";
  const isOrderDetailsPage = location.pathname.startsWith("/order/");
  if (!isOrderDetailsPage) {
    localStorage.removeItem("contacts");
  }

  const [sidebarContacts, setContact] = useState(() => {
    const storedContacts = localStorage.getItem("contacts");
    return storedContacts ? JSON.parse(storedContacts) : null;
  });

  //get and set localStorage user data
  useEffect(() => {
    if (!sidebarContacts) {
      const storedContacts = localStorage.getItem("contacts");
      if (storedContacts) {
        setContact(JSON.parse(storedContacts));
      }
    }
  }, [sidebarContacts]);
  console.log('Contacts');
  console.log(sidebarContacts);
  console.log('sidebarContacts');
  return (
    <div className="hidden md:flex h-screen flex-col border-r bg-white w-64 py-4 px-2 fixed left-0 top-0">
      <div className="flex items-center px-4 mb-8">
        <Logo size="md" />
      </div>

      <nav className="space-y-1 px-2 mb-6">
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

      {/* Show contacts in sidebar when on the Orders, Projects, or Suborder page */}
      {(isOrderDetailsPage && sidebarContacts) && (
        <div className="flex-1 overflow-auto pb-4">
          <ContactBox contacts={sidebarContacts} inSidebar={true} />
        </div>
      )}

      {/* Powered by section at the bottom */}
      <div className="mt-auto px-4 py-3 border-t border-gray-100">
        <div className="flex flex-col items-start space-y-2">
          <p className="text-xs text-gray-500 font-medium">Powered by</p>
          <img
            src="/lovable-uploads/c1c8e5bb-3edd-4ac5-9469-452bba7c42bd.png"
            alt="Advertising Vehicles"
            className="h-16 w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;

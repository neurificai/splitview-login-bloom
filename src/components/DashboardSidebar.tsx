
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

  // const [showLogout, setShowLogout] = useState(false);
  // const timeoutRef = useRef(null);
  // const handleMouseEnter = () => {
  //   clearTimeout(timeoutRef.current);
  //   setShowLogout(true);
  // };
  // const handleMouseLeave = () => {
  //   timeoutRef.current = setTimeout(() => {
  //     setShowLogout(false);
  //   }, 1000);
  // };

  // const [user, setUser] = useState(() => {
  //   const storedUser = localStorage.getItem("user");
  //   return storedUser ? JSON.parse(storedUser) : null;
  // });

  // useEffect(() => {
  //   if (!user) {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   }
  // }, [user]);

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

      {/* <div className="px-3 mb-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Avatar className="h-12 w-12 border border-sky-100">
              <AvatarFallback className="bg-gradient-to-br from-sky-100 to-blue-100 text-sky-600 text-lg">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div
              className="font-medium relative mt-4"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setShowLogout((prev) => !prev)}
                className="text-left w-full font-semibold"
              >
                {user.name}
              </button>
              {showLogout && (
                <div className="absolute left-0 top-full mt-1 bg-white border rounded shadow z-10">
                  <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-l border-t rotate-45 z-0" />
                  <button
                    onClick={() => navigate("/logout")}
                    className="relative z-10 text-gray-500 hover:underline"
                    style={{ padding: "0.3rem 0.7rem", background: "ghostwhite" }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div> */}

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
      {/* {(isOrdersPage || isProjectsPage || isOrderDetailsPage) && ( */}
      {(isOrderDetailsPage && sidebarContacts) && (
        <div className="flex-1 overflow-auto pb-4">
          <ContactBox contacts={sidebarContacts} inSidebar={true} />
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;


import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { LogOut, User } from "lucide-react";

const DashboardTopbar = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    //get and set localStorage user data
    useEffect(() => {
        if (!user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [user]);
    
    const handleLogout = () => {
        navigate("/logout")
    };

    return (
        <div className="w-full bg-white shadow-sm border-b border-gray-100 px-6 py-4">
            <div className="flex justify-end items-center">
                <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-end text-right">
                        <p className="text-sm font-medium text-gray-800 leading-tight">
                            Welcome back, {user.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Have a productive day
                        </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-gray-100 shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 text-sm font-semibold">
                                {user.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                        
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md transition-colors duration-200 ease-in-out"
                        >
                            <LogOut size={12} className="mr-1.5" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTopbar;

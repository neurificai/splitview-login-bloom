import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { LogOut } from "lucide-react";

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
        <div className="w-full bg-white shadow-md p-4">
            <div className="flex justify-end items-center">
                <div className="flex items-start space-x-3">
                    <Avatar className="h-12 w-12 border border-sky-100">
                        <AvatarFallback className="bg-gradient-to-br from-sky-100 to-blue-100 text-sky-600 text-lg">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-sm md:text-base font-medium text-gray-700">
                            Welcome, {user.name}
                        </p>
                        <button
                            onClick={handleLogout}
                            className="mt-1 text-xs md:text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-fit flex items-center"
                        >
                            Logout
                        </button>
                        {/* <button
                            onClick={handleLogout}
                            className=" text-xs md:text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center"
                        >
                            <LogOut size={14} className="mr-1" />
                            <span>Logout</span>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTopbar;

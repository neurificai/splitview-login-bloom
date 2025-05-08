
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/c42b608e-28fc-4689-a387-60954aa0a1cd.png" 
        alt="Company Logo" 
        className={`${sizeClasses[size]} w-auto`} 
      />
      <span className="ml-2 font-bold text-gray-800 text-lg hidden sm:inline-block">
        ProAngular
      </span>
    </div>
  );
};

export default Logo;

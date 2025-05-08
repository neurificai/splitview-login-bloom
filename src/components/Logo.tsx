
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
        src="/lovable-uploads/de760570-bd7b-4feb-be5b-7fde0578b566.png" 
        alt="Logo" 
        className={`${sizeClasses[size]} w-auto`} 
      />
    </div>
  );
};

export default Logo;

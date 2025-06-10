
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-8", // Increased from h-6 (25% larger)
    md: "h-10", // Increased from h-8 (25% larger)
    lg: "h-12", // Increased from h-10 (25% larger)
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/lovable-uploads/785a8b91-a426-4252-8ccb-88c1d89c7bf8.png"
        alt="GraphiTrak Logo"
        className={`${sizeClasses[size]} w-auto`}
      />
    </div>
  );
};

export default Logo;


import React, { useEffect, useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { ImageSide } from "@/components/ImageSide";

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image side - hidden on smaller screens and shown first on mobile */}
      {isMobile && (
        <div className="h-40 w-full md:hidden">
          <ImageSide className="h-full" />
        </div>
      )}
      
      {/* Image side - full height on desktop */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5">
        <ImageSide className="h-screen" />
      </div>
      
      {/* Auth form side */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 md:p-12 bg-white">
        <AuthForm className="w-full" />
      </div>
    </div>
  );
};

export default Index;

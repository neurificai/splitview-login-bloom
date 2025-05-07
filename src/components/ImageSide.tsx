
import React from "react";

interface ImageSideProps {
  className?: string;
}

export const ImageSide: React.FC<ImageSideProps> = ({ className }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-blue-700/50 mix-blend-overlay" />
      <div className="absolute inset-0 split-screen-image" style={{ backgroundImage: `url('/lovable-uploads/ebdc18dd-6149-48fb-ac63-307cfa7d9f3d.png')` }} />
      
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div className="flex items-center">
          <div className="backdrop-blur-sm bg-white/20 p-0 pl-0 shadow-lg self-start">
            <img 
              src="/lovable-uploads/2a0eea23-09c1-49d8-ba5d-3d017d76b5ac.png" 
              alt="Advertising Vehicles Logo" 
              className="h-16" 
            />
          </div>
        </div>
        
        <div className="bg-white/90 p-6 rounded-xl shadow-lg backdrop-blur-sm max-w-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">The Fleet Graphics People</h3>
          <p className="text-gray-700">
            Transform your vehicles into moving advertisements with our professional fleet graphics 
            solutions. Reach thousands of potential customers daily.
          </p>
        </div>
      </div>
    </div>
  );
};

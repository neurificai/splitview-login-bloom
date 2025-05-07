
import React, { useState, useEffect } from "react";

interface ImageSideProps {
  className?: string;
}

export const ImageSide: React.FC<ImageSideProps> = ({ className }) => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "The Fleet Graphics People";
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayText("");
    setIsComplete(false);
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-blue-700/50 mix-blend-overlay" />
      
      {/* Replaced image with video background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover"
        >
          <source src="/lovable-uploads/ebdc18dd-6149-48fb-ac63-307cfa7d9f3d.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div className="flex items-center">
          {/* Removed white blurred background */}
          <div className="self-start">
            {/* Cropped square logo without text */}
            <img 
              src="/lovable-uploads/2a0eea23-09c1-49d8-ba5d-3d017d76b5ac.png" 
              alt="Advertising Vehicles Logo" 
              className="h-16 object-cover object-left"
              style={{ clipPath: 'inset(0 70% 0 0)' }} 
            />
          </div>
        </div>
        
        <div className="bg-black/80 p-6 rounded-md shadow-lg backdrop-blur-sm max-w-md transform transition-all duration-300 border-l-4 border-blue-500">
          <h3 className="text-2xl font-light text-white mb-2 font-sans tracking-wide relative">
            {displayText}
            <span className={`inline-block w-1 h-6 bg-blue-400 ml-1 align-middle ${isComplete ? 'animate-pulse' : 'animate-blink'}`}></span>
          </h3>
          <p className="text-gray-300 font-light leading-relaxed">
            Transform your vehicles into moving advertisements with our professional fleet graphics 
            solutions. Reach thousands of potential customers daily.
          </p>
        </div>
      </div>
    </div>
  );
};


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
        setDisplayText(fullText.substring(0, currentIndex + 1));
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
      {/* Light color theme overlay similar to advertisingvehicles.com */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-gray-100/70 mix-blend-overlay" />
      
      {/* Video background with YouTube embed */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative w-[calc(100%+120px)] h-[calc(100%+120px)] -left-[60px] -top-[60px]">
          <iframe 
            src="https://www.youtube.com/embed/EQX_AQB-Eos?autoplay=1&mute=1&loop=1&playlist=EQX_AQB-Eos&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1" 
            allow="autoplay; encrypted-media"
            className="absolute w-full h-full"
            style={{ border: 'none' }}
          ></iframe>
        </div>
      </div>
      
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div className="flex items-center">
          {/* Logo container without blurred background */}
          <div className="self-start">
            {/* New logo image */}
            <img 
              src="/lovable-uploads/06e2c82d-7ee7-4772-bcb4-9236bad6464f.png" 
              alt="Advertising Vehicles Logo" 
              className="h-16 object-contain"
            />
          </div>
        </div>
        
        <div className="bg-black/80 p-6 rounded-md shadow-xl backdrop-blur-sm w-[70%] transform transition-all duration-300 border-l-4 border-blue-500 shadow-lg shadow-black/30">
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

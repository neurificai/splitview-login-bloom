
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

      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        <div className="flex items-center mt-0">
          {/* Logo container with left padding and margin set to 0 */}
          <div className="self-start pl-0 ml-0 pt-0">
            {/* Logo image scaled down to 60% (h-20 instead of h-32) */}
            <img
              src="/lovable-uploads/1aa305fd-db99-4ff2-84a0-f9041679cd58.png"
              alt="Advertising Vehicles Logo"
              className="h-20 object-contain pl-0 ml-0 pt-0" /* Changed from h-24 to h-20 (60% of original size) and added pt-0 */
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

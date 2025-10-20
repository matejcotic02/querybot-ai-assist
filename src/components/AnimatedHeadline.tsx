import { useEffect, useState } from "react";

const words = ["Tickets", "Requests", "Incidents", "Automations"];

export const AnimatedHeadline = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const typeSpeed = 100; // Speed for typing each character
    const pauseAfterWord = 1500; // Pause after typing complete word
    const wipeSpeed = 400; // Duration of black line wipe animation
    const pauseAfterWipe = 100; // Brief pause after wipe before typing

    // Typing phase
    if (displayText.length < currentWord.length && !isWiping) {
      const timer = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      }, typeSpeed);
      return () => clearTimeout(timer);
    }
    
    // Word complete, wait then start wipe
    if (displayText.length === currentWord.length && !isWiping) {
      const timer = setTimeout(() => {
        setIsWiping(true);
        
        // After wipe animation completes, reset and move to next word
        setTimeout(() => {
          setIsWiping(false);
          setDisplayText("");
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, wipeSpeed + pauseAfterWipe);
      }, pauseAfterWord);
      
      return () => clearTimeout(timer);
    }
  }, [displayText, isWiping, currentWordIndex]);

  return (
    <span className="inline-block relative" style={{ minWidth: "340px" }}>
      <span className="inline-block bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] bg-clip-text text-transparent relative">
        {displayText}
        {!isWiping && <span className="animate-pulse">|</span>}
        
        {/* Black wipe line */}
        {isWiping && (
          <span className="absolute top-0 left-0 h-full bg-black animate-wipe-across" style={{ width: '100%' }} />
        )}
      </span>
    </span>
  );
};

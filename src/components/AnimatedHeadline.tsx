import { useEffect, useState } from "react";

const words = ["Tickets", "Requests", "Incidents", "Automations"];

export const AnimatedHeadline = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const typeSpeed = isDeleting ? 50 : 100; // Faster deletion, slower typing
    const pauseAfterWord = 1500; // Pause after typing complete word
    const pauseAfterDelete = 500; // Brief pause after deletion before next word

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Word is complete, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseAfterWord);
        }
      } else {
        // Deleting phase
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          // Deletion complete, move to next word
          setIsDeleting(false);
          setTimeout(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }, pauseAfterDelete);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <span className="inline-block relative" style={{ minWidth: "340px" }}>
      <span className="inline-block bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] bg-clip-text text-transparent">
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  );
};

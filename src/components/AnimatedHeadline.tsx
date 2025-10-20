import { useEffect, useState } from "react";

const words = ["Tickets", "Requests", "Incidents", "Automations"];

export const AnimatedHeadline = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [wipeDirection, setWipeDirection] = useState<"forward" | "reverse">("forward");

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const displayDuration = 2000; // How long to show the word
    const wipeDuration = 400; // Duration of wipe animation
    const pauseBeforeReveal = 100; // Brief pause between wipe and reveal

    // Sequence: Display word -> Wait -> Wipe forward (erase) -> Pause -> Wipe reverse (reveal next)
    const timer1 = setTimeout(() => {
      // Start forward wipe (erase)
      setWipeDirection("forward");
      setIsWiping(true);

      const timer2 = setTimeout(() => {
        // Forward wipe complete, move to next word
        setCurrentWordIndex((prev) => (prev + 1) % words.length);

        const timer3 = setTimeout(() => {
          // Start reverse wipe (reveal)
          setWipeDirection("reverse");

          const timer4 = setTimeout(() => {
            // Reverse wipe complete
            setIsWiping(false);
          }, wipeDuration);

          return () => clearTimeout(timer4);
        }, pauseBeforeReveal);

        return () => clearTimeout(timer3);
      }, wipeDuration);

      return () => clearTimeout(timer2);
    }, displayDuration);

    return () => clearTimeout(timer1);
  }, [currentWordIndex]);

  return (
    <span className="inline-block relative" style={{ minWidth: "340px" }}>
      <span className="inline-block bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] bg-clip-text text-transparent">
        {words[currentWordIndex]}
      </span>
      
      {/* Black wipe line overlay */}
      {isWiping && (
        <span
          className={`absolute top-0 left-0 h-full bg-background ${
            wipeDirection === "forward" ? "animate-wipe-forward" : "animate-wipe-reverse"
          }`}
          style={{ width: "100%" }}
        />
      )}
    </span>
  );
};

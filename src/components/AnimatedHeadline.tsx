import { useEffect, useState } from "react";

const words = ["Tickets", "Requests", "Incidents"];

export const AnimatedHeadline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsExiting(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsExiting(false);
      }, 400); // Exit animation duration
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative overflow-hidden" style={{ minWidth: "340px" }}>
      <span
        className={`inline-block bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] bg-clip-text text-transparent transition-all duration-400 ease-in-out ${
          isExiting
            ? "opacity-0 translate-y-8 blur-sm"
            : "opacity-100 translate-y-0 blur-0"
        }`}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};

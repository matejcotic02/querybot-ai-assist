import { useEffect, useState } from "react";

const words = [
  "Tickets",
  "Issues",
  "Chats",
  "Requests",
  "Emails",
  "Incidents",
  "Support",
  "Automations"
];

export const AnimatedHeadline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(true);
      }, 300); // Fade out duration
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block bg-gradient-to-r from-[#A37BFF] to-[#8B5CF6] bg-clip-text text-transparent transition-all duration-300 ${
        isAnimating ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
      style={{ minWidth: "200px", textAlign: "center" }}
    >
      {words[currentIndex]}
    </span>
  );
};

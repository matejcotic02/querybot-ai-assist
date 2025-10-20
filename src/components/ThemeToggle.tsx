import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      root.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to dark mode
      root.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";
    
    setTheme(newTheme);
    root.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] p-[2px] hover:opacity-90 transition-all duration-300 shadow-lg group"
      aria-label="Toggle theme"
    >
      <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
        {theme === "light" ? (
          <Moon className="h-4 w-4 text-foreground transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <Sun className="h-4 w-4 text-foreground transition-transform duration-300 group-hover:scale-110" />
        )}
      </div>
    </button>
  );
};

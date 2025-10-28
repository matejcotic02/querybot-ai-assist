import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("app-theme") as "light" | "dark" | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const newTheme = theme === "light" ? "dark" : "light";
    
    setTheme(newTheme);
    root.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("app-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-2xl bg-gradient-to-r from-[#A37BFF] to-[#7D5CFF] p-[2px] hover:opacity-90 transition-all duration-300 shadow-lg group"
      aria-label="Toggle theme"
    >
      <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
        {theme === "light" ? (
          <Moon className="h-4 w-4 text-foreground transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <Sun className="h-4 w-4 text-foreground transition-transform duration-300 group-hover:scale-110" />
        )}
      </div>
    </button>
  );
};

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="  transition-all  rounded-lg">
      <button
        onClick={toggleTheme}
        className="
    p-3
    rounded-full
    bg-gray-200 dark:bg-gray-700
    text-gray-800 dark:text-gray-200
    shadow-lg
    hover:bg-gray-300 dark:hover:bg-gray-600
    transition-all duration-300
    cursor-pointer
    flex items-center justify-center
  "
      >
        {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../DarkModeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return ( 
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
};

export default DarkModeToggle;

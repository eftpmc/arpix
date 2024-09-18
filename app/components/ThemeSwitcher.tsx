"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", storedTheme);
        setTheme(storedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return (
        <button
            className="btn btn-ghost text-base-content"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Sun className="w-6 h-6" />  // Lucide Sun icon
            ) : (
                <Moon className="w-6 h-6" /> // Lucide Moon icon
            )}
        </button>
    );
}

import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';


const ThemeToggle = () => {
     const [theme, setTheme] = useState("light");
     useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
     }, []);
    
    const toggleTheme = () => {
    const newTheme = theme === "light" ? "scadark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    };
    
    return (
        <div>
            <button
                      onClick={toggleTheme}
                      className="btn btn-ghost btn-circle text-lg transition-transform duration-300 hover:rotate-180"
                    >
                      {theme === "light" ? <FaMoon /> : <FaSun />}
                    </button>
            
        </div>
    );
};

export default ThemeToggle;
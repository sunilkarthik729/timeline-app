import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

 
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setDark(root.classList.contains("dark")); 
  };

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="header bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo fs-4 fw-bold">Logo</div>
        <button
          id="toggle-theme-btn"
          className="btn btn-outline-light rounded-pill px-3"
          onClick={toggleTheme}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}

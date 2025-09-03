import { Sun, Moon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import "../styles.css";

type Props = {
  onThemeChange?: (theme: "light" | "dark") => void;
  onQueryChange?: (q: string) => void;
};

export default function Header({ onThemeChange, onQueryChange }: Props) {
  const [dark, setDark] = useState(false);
  const [q, setQ] = useState("");

  const toggleTheme = () => {
    const root = document.documentElement; // <html>
    root.classList.toggle("dark");
    const nowDark = root.classList.contains("dark");
    setDark(nowDark);
    localStorage.setItem("theme", nowDark ? "dark" : "light");
    onThemeChange?.(nowDark ? "dark" : "light");
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
      onThemeChange?.("dark");
    }
  }, [onThemeChange]);

  return (
    <header className="header shadow-sm">
      <div className="container d-flex align-items-center justify-content-between gap-3">
        <div className="logo d-flex align-items-center gap-2">
          <span className="fs-4 fw-bold text-white">🚀 Timeline</span>
        </div>

        <div className="d-none d-sm-flex align-items-center bg-white bg-opacity-10 rounded-pill px-3 py-1 header-search">
          <Search size={16} className="me-2 text-white" />
          <input
            aria-label="Search events"
            className="form-control form-control-sm bg-transparent border-0 text-white"
            placeholder="Search by title/year/category…"
            value={q}
            onChange={(e) => {
              const v = e.target.value;
              setQ(v);
              onQueryChange?.(v);
            }}
          />
        </div>

        <button
          id="toggle-theme-btn"
          className="btn btn-outline-light rounded-pill px-3"
          onClick={toggleTheme}
          aria-pressed={dark}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="ms-2">{dark ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Sun, Moon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import "../styles.css";
export default function Header({ onThemeChange, onQueryChange }) {
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
    return (_jsx("header", { className: "header shadow-sm", children: _jsxs("div", { className: "container d-flex align-items-center justify-content-between gap-3", children: [_jsx("div", { className: "logo d-flex align-items-center gap-2", children: _jsx("span", { className: "fs-4 fw-bold text-white", children: "\uD83D\uDE80 Timeline" }) }), _jsxs("div", { className: "d-none d-sm-flex align-items-center bg-white bg-opacity-10 rounded-pill px-3 py-1 header-search", children: [_jsx(Search, { size: 16, className: "me-2 text-white" }), _jsx("input", { "aria-label": "Search events", className: "form-control form-control-sm bg-transparent border-0 text-white", placeholder: "Search by title/year/category\u2026", value: q, onChange: (e) => {
                                const v = e.target.value;
                                setQ(v);
                                onQueryChange?.(v);
                            } })] }), _jsxs("button", { id: "toggle-theme-btn", className: "btn btn-outline-light rounded-pill px-3", onClick: toggleTheme, "aria-pressed": dark, children: [dark ? _jsx(Sun, { size: 18 }) : _jsx(Moon, { size: 18 }), _jsx("span", { className: "ms-2", children: dark ? "Light" : "Dark" })] })] }) }));
}

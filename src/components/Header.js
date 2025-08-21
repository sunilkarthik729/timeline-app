import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("header", { className: "header bg-dark text-white py-3", children: _jsxs("div", { className: "container d-flex justify-content-between align-items-center", children: [_jsx("div", { className: "logo fs-4 fw-bold", children: "Logo" }), _jsx("button", { id: "toggle-theme-btn", className: "btn btn-outline-light rounded-pill px-3", onClick: toggleTheme, children: dark ? _jsx(Sun, { size: 18 }) : _jsx(Moon, { size: 18 }) })] }) }));
}

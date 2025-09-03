import { jsx as _jsx } from "react/jsx-runtime";
import "../styles.css";
export default function FilterPanel({ categories, activeCategory, onFilter }) {
    return (_jsx("nav", { className: "filter-panel", children: categories.map((c) => (_jsx("button", { className: `btn ${activeCategory === c ? "btn-primary" : "btn-outline-light"} me-2`, onClick: () => onFilter(c), children: c }, c))) }));
}

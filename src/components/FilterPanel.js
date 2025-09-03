import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles.css";
export default function FilterPanel({ categories, activeCategory, onFilter }) {
    return (_jsxs("nav", { className: "filter-panel my-3", children: [categories.map((c) => (_jsx("button", { className: `btn me-2 ${activeCategory === c ? "btn-primary" : "btn-outline-light"}`, onClick: () => onFilter(c), children: c }, c))), _jsx("button", { className: `btn ${activeCategory === "All" ? "btn-secondary" : "btn-outline-secondary"}`, onClick: () => onFilter("All"), children: "All" })] }));
}

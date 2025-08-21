import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function FilterPanel({ categories, onFilter }) {
    return (_jsxs("nav", { className: "filter-panel", children: [categories.map((c) => (_jsx("button", { className: "more-btn", onClick: () => onFilter(c), children: c }, c))), _jsx("button", { className: "more-btn", onClick: () => onFilter("All"), children: "All" })] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles.css";
export default function EventMarker({ event, onClick, isActive, refObj, onKeyDown }) {
    return (_jsxs("button", { ref: refObj, className: `event-card ${isActive ? "active" : ""}`, onClick: onClick, onKeyDown: (e) => {
            onKeyDown?.(e);
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
            }
        }, "aria-current": isActive ? "true" : undefined, "aria-label": `Open details for ${event.title}, year ${event.year}`, tabIndex: 0, children: [_jsx("img", { src: event.imageURL, alt: event.title, loading: "lazy", className: "event-img" }), _jsxs("div", { className: "event-info", children: [_jsx("h5", { children: event.title }), _jsx("p", { children: event.year }), _jsx("span", { className: `category-dot ${event.category.toLowerCase()}`, children: event.category })] })] }));
}

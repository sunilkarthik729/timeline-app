import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles.css";
export default function EventMarker({ event, onClick, isActive, refObj, onKeyDown }) {
    return (_jsx("button", { ref: refObj, className: `card h-100 shadow-sm event ${isActive ? "active" : ""}`, onClick: onClick, onKeyDown: (e) => {
            onKeyDown?.(e);
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
            }
        }, "aria-current": isActive ? "true" : undefined, "aria-label": `Open details for ${event.title}, year ${event.year}`, tabIndex: 0, children: _jsxs("div", { className: "card-body text-start", children: [_jsx("img", { src: event.imageURL, alt: event.title, className: "modal-img" }), _jsx("h5", { className: "card-title", children: event.title }), _jsx("p", { className: "card-text text-muted", children: event.year })] }) }));
}

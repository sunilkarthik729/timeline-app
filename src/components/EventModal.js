import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
export default function EventModal({ event, onClose }) {
    if (!event)
        return null;
    return createPortal(_jsx("div", { className: "modal show", onClick: onClose, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "close-btn", onClick: onClose, children: "\u00D7" }), _jsxs("h2", { children: [event.title, " (", event.year, ")"] }), _jsx("img", { src: event.imageURL, alt: event.title, className: "modal-img" }), _jsx("p", { children: event.description }), _jsxs("p", { children: [_jsx("strong", { children: "Category:" }), " ", event.category] })] }) }), document.body);
}

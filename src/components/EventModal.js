import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import "../styles.css";
export default function EventModal({ event, onClose, triggerRef }) {
    const modalRef = useRef(null);
    useEffect(() => {
        if (!event)
            return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape")
                onClose();
            if (e.key === "Tab") {
                const focusable = modalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (!focusable || focusable.length === 0)
                    return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
                else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        const first = modalRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        first?.focus();
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            triggerRef?.current?.focus();
        };
    }, [event, onClose, triggerRef]);
    if (!event)
        return null;
    return createPortal(_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-content", ref: modalRef, onClick: (e) => e.stopPropagation(), children: [_jsx("button", { className: "close-btn", onClick: onClose, "aria-label": "Close dialog", children: "\u00D7" }), _jsxs("h2", { children: [event.title, " (", event.year, ")"] }), _jsx("img", { src: event.imageURL, alt: event.title, className: "modal-img" }), _jsx("p", { children: event.description }), _jsxs("p", { children: [_jsx("strong", { children: "Category:" }), " ", event.category] })] }) }), document.body);
}

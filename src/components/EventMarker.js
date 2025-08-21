import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function EventMarker({ event, onClick }) {
    return (_jsxs("div", { className: "card h-100 shadow-sm event", onClick: onClick, style: { cursor: "pointer" }, children: [_jsx("img", { src: event.imageURL, alt: event.title, className: "card-img-top", style: { height: "180px", objectFit: "cover" } }), _jsxs("div", { className: "card-body", children: [_jsx("h5", { className: "card-title", children: event.title }), _jsx("p", { className: "card-text text-muted", children: event.year }), _jsxs("p", { className: "card-text", children: [event.description.slice(0, 80), "..."] })] })] }));
}

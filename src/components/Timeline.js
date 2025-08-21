import { jsx as _jsx } from "react/jsx-runtime";
import EventMarker from "./EventMarker";
export default function Timeline({ events, onSelect }) {
    return (_jsx("main", { className: "container my-4", children: _jsx("div", { className: "row g-4", children: events.map((event, i) => (_jsx("div", { className: "col-12 col-sm-6 col-md-4", children: _jsx(EventMarker, { event: event, onClick: () => onSelect(event) }) }, i))) }) }));
}

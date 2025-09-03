import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from "react";
import EventMarker from "./EventMarker";
import "../styles.css";
export default function Timeline({ events, activeEvent, onSelect }) {
    const refs = useRef(events.map(() => ({ current: null })));
    const handleKeyDown = (e, index) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            refs.current[(index + 1) % events.length].current?.focus();
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            refs.current[(index - 1 + events.length) % events.length].current?.focus();
        }
    };
    return (_jsx("main", { className: "container my-4", children: _jsx("div", { className: "row g-4", children: events.map((event, i) => {
                const ref = refs.current[i];
                return (_jsx("div", { className: "col-12 col-sm-6 col-md-4", children: _jsx(EventMarker, { event: event, isActive: !!activeEvent && activeEvent.year === event.year && activeEvent.title === event.title, refObj: ref, onClick: () => onSelect(event, ref), onKeyDown: (e) => handleKeyDown(e, i) }) }, `${event.title}-${event.year}-${i}`));
            }) }) }));
}

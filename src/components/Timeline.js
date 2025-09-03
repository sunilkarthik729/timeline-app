import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import EventMarker from "./EventMarker";
import "../styles.css";
import React from "react";
export default function Timeline({ events, activeEvent, onSelect }) {
    const refs = useRef(events.map(() => React.createRef()));
    // Scroll active event into center view
    useEffect(() => {
        if (!activeEvent)
            return;
        const index = events.findIndex((e) => e.title === activeEvent.title && e.year === activeEvent.year);
        refs.current[index]?.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [activeEvent, events]);
    const handleKeyDown = (e, index) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            refs.current[(index + 1) % events.length].current?.focus();
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            refs.current[(index - 1 + events.length) % events.length].current?.focus();
        }
        if (e.key === "Home") {
            e.preventDefault();
            refs.current[0].current?.focus();
        }
        if (e.key === "End") {
            e.preventDefault();
            refs.current[events.length - 1].current?.focus();
        }
    };
    return (_jsx("div", { className: "timeline-container", children: events.map((event, i) => (_jsx(EventMarker, { event: event, isActive: !!activeEvent &&
                activeEvent.year === event.year &&
                activeEvent.title === event.title, refObj: refs.current[i], onClick: () => onSelect(event, refs.current[i]), onKeyDown: (e) => handleKeyDown(e, i) }, `${event.title}-${event.year}-${i}`))) }));
}

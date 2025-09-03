import { useEffect, useRef } from "react";
import EventMarker from "./EventMarker";
import type { EventItem } from "../types";
import "../styles.css";
import React from "react";

type Props = {
  events: EventItem[];
  activeEvent: EventItem | null;
  onSelect: (event: EventItem, ref: React.RefObject<HTMLButtonElement>) => void;
};

export default function Timeline({ events, activeEvent, onSelect }: Props) {
  const refs = useRef<React.RefObject<HTMLButtonElement>[]>(
    events.map(() => React.createRef())
  );

  // Scroll active event into center view
  useEffect(() => {
    if (!activeEvent) return;
    const index = events.findIndex(
      (e) => e.title === activeEvent.title && e.year === activeEvent.year
    );
    refs.current[index]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeEvent, events]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      refs.current[(index + 1) % events.length].current?.focus();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      refs.current[
        (index - 1 + events.length) % events.length
      ].current?.focus();
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

  return (
    <div className="timeline-container">
      {events.map((event, i) => (
        <EventMarker
          key={`${event.title}-${event.year}-${i}`}
          event={event}
          isActive={
            !!activeEvent &&
            activeEvent.year === event.year &&
            activeEvent.title === event.title
          }
          refObj={refs.current[i]}
          onClick={() => onSelect(event, refs.current[i])} 
          onKeyDown={(e) => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
}

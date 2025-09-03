import { useRef } from "react";
import EventMarker from "./EventMarker";
import type { EventItem } from "../types";
import "../styles.css";

type Props = {
  events: EventItem[];
  activeEvent: EventItem | null;
  onSelect: (event: EventItem, ref: React.RefObject<HTMLButtonElement>) => void;
};

export default function Timeline({ events, activeEvent, onSelect }: Props) {
  const refs = useRef<React.RefObject<HTMLButtonElement>[]>(
    events.map(() => ({ current: null }))
  );

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      refs.current[(index + 1) % events.length].current?.focus();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      refs.current[(index - 1 + events.length) % events.length].current?.focus();
    }
  };

  return (
    <main className="container my-4">
      <div className="row g-4">
        {events.map((event, i) => {
          const ref = refs.current[i];
          return (
            <div key={`${event.title}-${event.year}-${i}`} className="col-12 col-sm-6 col-md-4">
              <EventMarker
                event={event}
                isActive={!!activeEvent && activeEvent.year === event.year && activeEvent.title === event.title}
                refObj={ref}
                onClick={() => onSelect(event, ref)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}

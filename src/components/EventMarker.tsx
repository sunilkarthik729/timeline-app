import type { EventItem } from "../types";
import "../styles.css";

type Props = {
  event: EventItem;
  onClick: () => void;
  isActive: boolean;
  refObj: React.RefObject<HTMLButtonElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
};

export default function EventMarker({ event, onClick, isActive, refObj, onKeyDown }: Props) {
  return (
    <button
      ref={refObj}
      className={`event-card ${isActive ? "active" : ""}`}
      onClick={onClick}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-current={isActive ? "true" : undefined}
      aria-label={`Open details for ${event.title}, year ${event.year}`}
      tabIndex={0}
    >
      <img src={event.imageURL} alt={event.title} loading="lazy" className="event-img" />
      <div className="event-info">
        <h5>{event.title}</h5>
        <p>{event.year}</p>
        <span className={`category-dot ${event.category.toLowerCase()}`}>{event.category}</span>
      </div>
    </button>
  );
}

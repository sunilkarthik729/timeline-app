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
      className={`card h-100 shadow-sm event ${isActive ? "active" : ""}`}
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
      <div className="card-body text-start">
        <img src={event.imageURL} alt={event.title} className="modal-img" />
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text text-muted">{event.year}</p>
      </div>
    </button>
  );
}

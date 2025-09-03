import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import type { EventItem } from "../types";
import "../styles.css";

type Props = {
  event: EventItem | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
};

export default function EventModal({ event, onClose, triggerRef }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const first = modalRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    first?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [event, onClose, triggerRef]);

  if (!event) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
   <div
    className="modal-content"
    ref={modalRef}
    onClick={(e) => e.stopPropagation()} 
  >
        <button className="close-btn" onClick={onClose} aria-label="Close dialog">
          &times;
        </button>
        <h2>{event.title} ({event.year})</h2>
        <img src={event.imageURL} alt={event.title} className="modal-img" />
        <p>{event.description}</p>
        <p><strong>Category:</strong> {event.category}</p>
      </div>
    </div>,
    document.body
  );
}

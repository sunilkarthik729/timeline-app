
import { createPortal } from "react-dom";

type Props = {
  event: any;
  onClose: () => void;
};

export default function EventModal({ event, onClose }: Props) {
  if (!event) return null;
  return createPortal(
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
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

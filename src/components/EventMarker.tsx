type Props = {
  event: {
    year: number;
    title: string;
    description: string;
    imageURL: string;
    category: string;
  };
  onClick: () => void;
};

export default function EventMarker({ event, onClick }: Props) {
  return (
    <div className="card h-100 shadow-sm event" onClick={onClick} style={{cursor:"pointer"}}>
      <img
        src={event.imageURL}
        alt={event.title}
        className="card-img-top"
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text text-muted">{event.year}</p>
        <p className="card-text">{event.description.slice(0, 80)}...</p>
      </div>
    </div>
  );
}

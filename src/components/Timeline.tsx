import EventMarker from "./EventMarker";

type Props = {
  events: any[];
  onSelect: (event: any) => void;
};

export default function Timeline({ events, onSelect }: Props) {
  return (
    <main className="container my-4">
      <div className="row g-4">
        {events.map((event, i) => (
          <div key={i} className="col-12 col-sm-6 col-md-4">
            <EventMarker event={event} onClick={() => onSelect(event)} />
          </div>
        ))}
      </div>
    </main>
  );
}

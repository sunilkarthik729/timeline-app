import React, { useEffect, useState, useRef } from "react";
import type { EventItem } from "./types";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import FilterPanel from "./components/FilterPanel";
import EventModal from "./components/EventModal";
import "./App.css"
const App: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selected, setSelected] = useState<EventItem | null>(null);
  
  useEffect(() => {
    fetch("/data/events.json")
      .then((r) => r.json())
      .then((data: EventItem[]) => {
        const sorted = [...data].sort((a, b) => a.year - b.year);
        setEvents(sorted);
      })
      .catch((err) => console.error("Failed to load events:", err));
  }, []);
  const categories = Array.from(new Set(events.map(e => e.category)));
  const [filteredCategory, setFilteredCategory] = useState<string>("All");

  const displayedEvents =
  filteredCategory === "All"
    ? events
    : events.filter(e => e.category === filteredCategory);
  return (
    <div className="app">
      <Header  />

      <main>
        <FilterPanel
  categories={categories}
  activeCategory={filteredCategory}
  onFilter={setFilteredCategory}
/>

        <section id="timeline">
          <Timeline
            events={displayedEvents}
            onSelect={setSelected} activeEvent={null}            
          />
        </section>
      </main>

      <EventModal event={selected} onClose={() => setSelected(null)} />
      <footer className="text-center py-3 " >
        <h6>© 2025 Timeline App</h6>
      </footer>
    </div>
  );
};

export default App;

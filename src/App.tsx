import React, { useEffect, useState, useRef } from "react";
import type { EventItem } from "./types";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import FilterPanel from "./components/FilterPanel";
import EventModal from "./components/EventModal";
import "./App.css";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [filteredCategory, setFilteredCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const modalTriggerRef = useRef<HTMLElement | null>(null);

  // Load events
  useEffect(() => {
    fetch("/data/events.json")
      .then((r) => r.json())
      .then((data: EventItem[]) => {
        const sorted = [...data].sort(
          (a, b) => Number(a.year) - Number(b.year)
        );
        setEvents(sorted);
      })
      .catch((err) => console.error("Failed to load events:", err));
  }, []);

  // Build category list
  const categories = [
    "All",
    ...Array.from(new Set(events.map((e) => e.category))),
  ];

  // Filter + search
  const displayedEvents: EventItem[] = events.filter((e) => {
    const categoryMatch =
      filteredCategory === "All" || e.category === filteredCategory;
    const query = searchQuery.toLowerCase();
    const searchMatch =
      e.title.toLowerCase().includes(query) ||
      String(e.year).includes(query) ||
      e.category.toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });

  return (
    <div className="app">
      <Header onQueryChange={setSearchQuery} />
      <main>
        <FilterPanel
          categories={categories}
          activeCategory={filteredCategory}
          onFilter={setFilteredCategory}
        />
        <section id="timeline">
          <Timeline
            events={displayedEvents}
            activeEvent={selected}
            onSelect={(event, ref) => {
              setSelected(event);
              modalTriggerRef.current = ref.current;
            }}
          />
        </section>
      </main>
      <EventModal
        event={selected}
        onClose={() => setSelected(null)}
        triggerRef={modalTriggerRef}
      />
     <Footer/>
    </div>
  );
};

export default App;

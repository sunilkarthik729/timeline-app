import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import FilterPanel from "./components/FilterPanel";
import EventModal from "./components/EventModal";
import "./App.css";
const App = () => {
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        fetch("/data/events.json")
            .then((r) => r.json())
            .then((data) => {
            const sorted = [...data].sort((a, b) => a.year - b.year);
            setEvents(sorted);
        })
            .catch((err) => console.error("Failed to load events:", err));
    }, []);
    const categories = Array.from(new Set(events.map(e => e.category)));
    const [filteredCategory, setFilteredCategory] = useState("All");
    const displayedEvents = filteredCategory === "All"
        ? events
        : events.filter(e => e.category === filteredCategory);
    return (_jsxs("div", { className: "app", children: [_jsx(Header, {}), _jsxs("main", { children: [_jsx(FilterPanel, { categories: categories, activeCategory: filteredCategory, onFilter: setFilteredCategory }), _jsx("section", { id: "timeline", children: _jsx(Timeline, { events: displayedEvents, onSelect: setSelected, activeEvent: null }) })] }), _jsx(EventModal, { event: selected, onClose: () => setSelected(null) }), _jsx("footer", { className: "text-center py-3 ", children: _jsx("h6", { children: "\u00A9 2025 Timeline App" }) })] }));
};
export default App;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import FilterPanel from "./components/FilterPanel";
import EventModal from "./components/EventModal";
import "./App.css";
import Footer from "./components/Footer";
const App = () => {
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState(null);
    const [filteredCategory, setFilteredCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const modalTriggerRef = useRef(null);
    // Load events
    useEffect(() => {
        fetch("/data/events.json")
            .then((r) => r.json())
            .then((data) => {
            const sorted = [...data].sort((a, b) => Number(a.year) - Number(b.year));
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
    const displayedEvents = events.filter((e) => {
        const categoryMatch = filteredCategory === "All" || e.category === filteredCategory;
        const query = searchQuery.toLowerCase();
        const searchMatch = e.title.toLowerCase().includes(query) ||
            String(e.year).includes(query) ||
            e.category.toLowerCase().includes(query);
        return categoryMatch && searchMatch;
    });
    return (_jsxs("div", { className: "app", children: [_jsx(Header, { onQueryChange: setSearchQuery }), _jsxs("main", { children: [_jsx(FilterPanel, { categories: categories, activeCategory: filteredCategory, onFilter: setFilteredCategory }), _jsx("section", { id: "timeline", children: _jsx(Timeline, { events: displayedEvents, activeEvent: selected, onSelect: (event, ref) => {
                                setSelected(event);
                                modalTriggerRef.current = ref.current;
                            } }) })] }), _jsx(EventModal, { event: selected, onClose: () => setSelected(null), triggerRef: modalTriggerRef }), _jsx(Footer, {})] }));
};
export default App;

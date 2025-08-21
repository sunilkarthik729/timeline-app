import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import FilterPanel from './components/FilterPanel';
import EventModal from './components/EventModal';
const App = () => {
    const [events, setEvents] = useState([]);
    const [selected, setSelected] = useState(null);
    const [theme, setTheme] = useState('dark');
    // Load data from public/data/events.json
    useEffect(() => {
        fetch('/data/events.json')
            .then((r) => r.json())
            .then((data) => {
            const sorted = [...data].sort((a, b) => a.year - b.year);
            setEvents(sorted);
        })
            .catch((err) => console.error('Failed to load events:', err));
    }, []);
    // Apply theme class to <html>
    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
    }, [theme]);
    return (_jsxs("div", { className: "app", children: [_jsx(Header, {}), _jsxs("main", { children: [_jsx(FilterPanel, { categories: [], onFilter: function (category) {
                            throw new Error('Function not implemented.');
                        } }), _jsx("section", { id: "timeline", children: _jsx(Timeline, { events: events, onSelect: setSelected }) })] }), _jsx(EventModal, { event: selected, onClose: () => setSelected(null) }), _jsx("div", { children: _jsx("h6", { children: "\u00A9 2025 Timeline App" }) })] }));
};
export default App;

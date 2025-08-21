import React, { useEffect, useState } from 'react';

import type { EventItem } from './types';
import Header from './components/Header';
import Timeline from './components/Timeline';
import FilterPanel from './components/FilterPanel';
import EventModal from './components/EventModal';


const App: React.FC = () => {
const [events, setEvents] = useState<EventItem[]>([]);
const [selected, setSelected] = useState<EventItem | null>(null);
const [theme, setTheme] = useState<'light' | 'dark'>('dark');


// Load data from public/data/events.json
useEffect(() => {
fetch('/data/events.json')
.then((r) => r.json())
.then((data: EventItem[]) => {
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


return (
<div className="app">
<Header
/>


<main>
<FilterPanel categories={[]} onFilter={function (category: string): void {
        throw new Error('Function not implemented.');
      } } /* future use: onFilterChange={...} */ />
<section id="timeline">
<Timeline events={events} onSelect={setSelected} />
</section>
</main>


<EventModal event={selected} onClose={() => setSelected(null)} />


<div><h6>© 2025 Timeline App</h6></div>
</div>
);
};


export default App;

type Props = {
  categories: string[];
  onFilter: (category: string) => void;
};

export default function FilterPanel({ categories, onFilter }: Props) {
  return (
    <nav className="filter-panel">
      {categories.map((c) => (
        <button key={c} className="more-btn" onClick={() => onFilter(c)}>
          {c}
        </button>
      ))}
      <button className="more-btn" onClick={() => onFilter("All")}>
        All
      </button>
    </nav>
  );
}

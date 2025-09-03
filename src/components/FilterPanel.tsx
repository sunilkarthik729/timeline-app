import "../styles.css";

type Props = {
  categories: string[];
  activeCategory: string;
  onFilter: (category: string) => void;
};

export default function FilterPanel({ categories, activeCategory, onFilter }: Props) {
  return (
    <nav className="filter-panel">
      {categories.map((c) => (
        <button
          key={c}
          className={`btn ${activeCategory === c ? "btn-primary" : "btn-outline-light"} me-2`}
          onClick={() => onFilter(c)}
        >
          {c}
        </button>
      ))}
    </nav>
  );
}

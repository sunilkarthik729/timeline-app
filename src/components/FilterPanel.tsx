import "../styles.css";

type Props = {
  categories: string[];
  activeCategory: string;
  onFilter: (category: string) => void;
};

export default function FilterPanel({ categories, activeCategory, onFilter }: Props) {
  return (
    <nav className="filter-panel my-3">
      {categories.map((c) => (
        <button
          key={c}
          className={`btn me-2 ${activeCategory === c ? "btn-primary" : "btn-outline-light"}`}
          onClick={() => onFilter(c)}
        >
          {c}
        </button>
      ))}
      <button
        className={`btn ${activeCategory === "All" ? "btn-secondary" : "btn-outline-secondary"}`}
        onClick={() => onFilter("All")}
      >
        All
      </button>
    </nav>
  );
}

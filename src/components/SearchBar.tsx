import "./SearchBar.css";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  active: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  active,
  onFocus,
  onBlur,
}) => {
  return (
    <div className={`search-bar ${active ? "active" : ""}`}>
      <div className="container">
        <div className="search-input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="I am looking for..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

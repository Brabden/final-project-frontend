import KeyboardList from "../components/KeyboardList";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

const Shop: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <main>
      <SearchBar
        value={search}
        onChange={setSearch}
        active={searchFocused}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
      <div className="shop-content">
        <h2 className="shop-header">shop</h2>
        <KeyboardList searchTerm={search} />
      </div>
    </main>
  );
};

export default Shop;

import type { ChangeEvent } from "react";

const SearchBar = ({ onType }: { onType: (searchText: string) => void }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onType(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        id="search-bar-input"
        type="text"
        name="search-bar-input"
        placeholder="Search for movies..."
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default SearchBar;

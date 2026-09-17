import type { ChangeEvent } from "react";
import { useGenre } from "../../features/movies/hooks/useMovies";
import React from "react";

type SearchProps = {
  onType: (searchText: string) => void;
  onSelect: (genre: string) => void;
};

const SearchBar = React.memo(({ onType, onSelect }: SearchProps) => {
  const { data, isError, isLoading } = useGenre();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.trim();

    if (!searchText) {
      return onType("");
    }

    onType(searchText);
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) =>
    onSelect(e.target.value);

  return (
    <div className="search-container">
      {isLoading ? (
        <div className="text-white p-2">Loading...</div>
      ) : (
        <>
          <div className="search-bar">
            <input
              id="search-bar-input"
              type="text"
              name="search-bar-input"
              placeholder="Search for movies..."
              onChange={handleSearch}
            />
          </div>
          <div className="genre-selector">
            {isError || !data ? (
              <div className="text-white text-xs bg-red-600/50 p-1.25 pl-2 pr-2 rounded-xl text-ellipsis w-max">
                Genres are not available!
              </div>
            ) : (
              <select
                id="search-bar-selector"
                name="search-bar-selector"
                onChange={handleGenreChange}
              >
                <option value="">All genres</option>
                {data.genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default SearchBar;
